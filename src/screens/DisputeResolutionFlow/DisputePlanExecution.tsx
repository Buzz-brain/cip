import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRaiseDispute } from '../../lib/hooks/useRaiseDispute';
import { useDisputeReasons } from '../../lib/hooks/useDisputeReasons';
import { SkeletonCard } from '../../components/ui/skeleton-card';
import getReasonDisplay from '../../lib/data/getDisputeReasonDisplay';
import { Button } from '../../components/ui/button';
import signalIcon from '@assets/signal.svg';
import gavelIcon from '@assets/gavel-orange.svg';
import familyIcon from '@assets/family.svg';
import threeDotIcon from '@assets/three-dot.svg';
import pdfRedIcon from '@assets/pdf-red.svg';
import thumbprintIcon from '@assets/thumbprint.svg';
import { Trash2, Wallet } from 'lucide-react';
import { toast } from 'react-toastify';

interface DisputePlanExecutionProps {
  initialPlanId?: string | number;
  redirectPath?: string; // optional path to navigate to after successful submit; may include ':id' placeholder
  onSuccess?: () => void | Promise<void>;
  useOrange?: boolean;
}

export const DisputePlanExecution = ({ initialPlanId, redirectPath, onSuccess, useOrange = false }: DisputePlanExecutionProps): JSX.Element => {
  const params = useParams<{ planId: string }>();
  const planId = String(initialPlanId ?? params?.planId ?? '');
  const navigate = useNavigate();

  const { reasons, loading: reasonsLoading } = useDisputeReasons();
  const { raiseDispute, loading: raisingDispute } = useRaiseDispute();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [details, setDetails] = useState('');
  const [evidence, setEvidence] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleReason = (r: string) => {
    setSelectedReason((prev) => (prev === r ? null : r));
  };

  const onFileChange = (f?: FileList | null) => {
    const file = f && f.length > 0 ? f[0] : undefined;
    if (file) {
      setEvidence(file);
      try {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } catch (e) {
        setPreviewUrl(null);
      }
    }
  };

  const removeEvidence = () => {
    setEvidence(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!planId) {
      toast.error('Missing plan id');
      return;
    }
    if (!selectedReason) {
      toast.error('Select at least one reason');
      return;
    }

    try {
      const result = await raiseDispute({
        planId: parseInt(planId),
        reason: selectedReason,
        description: details,
        file: evidence ?? undefined,
      });
      toast.success('Dispute submitted');
      // call optional onSuccess so parent can refetch lists
      try {
        await Promise.resolve(onSuccess?.());
      } catch (e) {
        // swallow errors from onSuccess to avoid blocking navigation
        console.warn('onSuccess handler failed', e);
      }

      // If redirectPath provided, prefer it. If it contains :id and result has an id, substitute.
      if (redirectPath) {
        const id = result?.id ?? result?.dispute_id ?? result?.data?.id ?? null;
        if (id && redirectPath.includes(':id')) {
          navigate(redirectPath.replace(':id', String(id)));
          return;
        }
        navigate(redirectPath);
        return;
      }

      // Default beneficiary behavior
      navigate('/beneficiary-dashboard');
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to submit dispute');
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen [font-family:'Manrope',Helvetica]">
      <main className="flex-1 flex flex-col items-center px-4 py-4">
        <div className="w-full max-w-[1040px]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4 [font-family:'Manrope',Helvetica]">
                Dispute Plan Execution
              </h1>
              <div className="[font-family:'Manrope',Helvetica]">
                <span className="text-[#9DB8A6] pr-1">Plan ID:</span>{' '}
                <span className="text-white bg-[#FFFFFF1A] px-2 py-1 rounded-md">{`#${planId ?? ''}`}</span>
              </div>
            </div>

            <div className={`bg-[#163a1f4d] ${useOrange ? 'text-[#F97316] border-[#F9731633]' : 'text-[#2ccd2c] border-[#2ccd2c33]'} rounded-xl p-4 w-[480px]`}>
              <div className="flex items-start gap-3">
                <svg className={`w-5 h-5 ${useOrange ? 'text-[#F97316]' : 'text-[#2ccd2c]'} flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
                <div>
                  <h3 className={`font-bold ${useOrange ? 'text-[#F97316]' : 'text-[#2ccd2c]'} mb-1 [font-family:'Manrope',Helvetica]`}>Escrow Freeze Imminent</h3>
                  <p className="text-[#9DB8A6] text-sm [font-family:'Manrope',Helvetica]">Initiating a dispute will immediately pause asset distribution. Assets will be locked in the smart contract until resolution.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="bg-[#1C2620] border border-[#2a2420] rounded-2xl p-8">
              <h2 className="text-lg font-bold text-white mb-6 [font-family:'Manrope',Helvetica]">Reason for Dispute</h2>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {reasonsLoading ? ( 
                  Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)
                ) : (
                  reasons.map((r) => {
                    const disp = getReasonDisplay(r);
                    const code = String(r).toUpperCase();
                    const iconBg = code.includes('OWNER')
                      ? 'bg-[#111813]'
                      : code.includes('ASSET')
                      ? 'bg-[#A855F71A]'
                      : code.includes('EXECUTOR')
                      ? 'bg-[#F973161A]'
                      : code.includes('FAMILY')
                      ? 'bg-[#F43F5E1A]'
                      : 'bg-[#6B72801A]';

                    return (
                      <label key={r} className={`p-4 bg-[#111813] text-left border border-[#3C5344] rounded-xl ${useOrange ? 'hover:border-[#F97316]' : 'hover:border-[#2ccd2c]'} transition-all cursor-pointer flex flex-col`}>
                        <div className="flex justify-between items-center mb-4">
                          <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center`}>{/* icon */}
                            {code.includes('OWNER') && <img src={signalIcon} className="w-5 h-5" alt="Signal" />}
                            {code.includes('ASSET') && <Wallet className="text-[#C084FC]" />}
                            {code.includes('EXECUTOR') && <img src={gavelIcon} className="w-5 h-5" alt="Gavel" />}
                            {code.includes('FAMILY') && <img src={familyIcon} className="w-5 h-5" alt="Family" />}
                            {code.includes('OTHER') && <img src={threeDotIcon} className="w-5 h-5" alt="Other" />}
                          </div>
                          <input className="sr-only" type="radio" name="dispute-reason" checked={selectedReason === r} onChange={() => toggleReason(r)} />
                          <div className={`w-6 h-6 rounded-full border border-[#4B5563] flex items-center justify-center ${selectedReason === r ? (useOrange ? 'bg-[#F97316]/20' : 'bg-[#2ccd2c]/20') : ''}`}>
                            {selectedReason === r && <div className={`w-3 h-3 rounded-full ${useOrange ? 'bg-[#F97316]' : 'bg-[#2ccd2c]'}`} />}
                          </div>
                        </div>

                        <h3 className="text-white font-semibold [font-family:'Manrope',Helvetica] text-sm">{disp.title}</h3>
                        <p className="text-[#9CA3AF] text-xs mt-1 [font-family:'Manrope',Helvetica]">{disp.description}</p>
                      </label>
                    );
                  })
                )}
              </div>
            </div>

            <div className="bg-[#1C2620] border border-[#2a2420] rounded-2xl p-8 mt-6">
                <h2 className="text-lg font-bold text-white mb-2 [font-family:'Manrope',Helvetica]">Dispute Details</h2>
              <p className="text-[#9DB8A6] text-sm mb-4 [font-family:'Manrope',Helvetica]">Provide a detailed explanation of your claim</p>
              <textarea value={details} onChange={(e) => setDetails(e.target.value)} className={`w-full h-32 bg-[#111813] border border-[#3C5344] rounded-lg p-4 text-[#9CA3AF] [font-family:'Manrope',Helvetica] focus:outline-none ${useOrange ? 'focus:border-[#F97316]' : 'focus:border-[#2ccd2c]'}`} placeholder="Enter dispute details..." />
            </div>

            <div className="bg-[#1C2620] border border-[#2a2420] rounded-2xl p-8 mt-6">
                <h2 className="text-lg font-bold text-white mb-4 [font-family:'Manrope',Helvetica]">Evidence Upload</h2>
              <div onClick={() => fileInputRef.current?.click()} className={`border-2 bg-[#111813] border-dashed border-[#3C5344] rounded-lg p-12 text-center ${useOrange ? 'hover:border-[#F97316]' : 'hover:border-[#2ccd2c]'} transition-colors cursor-pointer`}>
                <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                <p className="text-white font-semibold [font-family:'Manrope',Helvetica] mb-1">Click to upload or drag and drop</p>
                <p className="text-[#9DB8A6] text-xs [font-family:'Manrope',Helvetica]">SVG, PNG, JPG, PDF or MP3 (max. 10MB)</p>
                <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="mt-4 px-4 py-2 bg-[#29382E] border border-[#3C5344] rounded-lg text-gray-300 hover:text-white hover:border-[#ffffff] transition-colors [font-family:'Manrope',Helvetica] text-sm font-semibold">Select Files</button>
                <input ref={fileInputRef} onChange={(e) => onFileChange(e.target.files)} type="file" className="hidden" />
              </div>

              {evidence && (
                <div className="mt-4 flex items-center justify-between p-4 bg-[#1C2620] border border-[#29382E] rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-md bg-[#7F1D1D4D] flex items-center justify-center">
                      <img src={pdfRedIcon} alt="PDF" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold [font-family:'Manrope',Helvetica]">{evidence.name}</p>
                      <p className="text-[#6B7280] text-xs [font-family:'Manrope',Helvetica]">{(evidence.size/1024/1024).toFixed(2)} MB • Uploaded just now</p>
                    </div>
                  </div>
                  <button onClick={removeEvidence} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" /></button>
                </div>
              )}
            </div>

            <div className="bg-[#111813] border border-[#2a2420] rounded-2xl p-8 mt-6">
              <div className="flex gap-4 justify-between">
                <p className="text-[#9DB8A6] text-sm [font-family:'Manrope',Helvetica] self-center">By submitting this dispute, you initiate an on-chain arbitration process.<br/>You will be required to sign a transaction. <span className="text-white">Gas fees apply.</span></p>
                <div className="flex gap-4">
                  <Button className="bg-transparent px-8 py-2 border-transparent hover:bg-[#9DB8A6] hover:text-[#221810] gap-2" onClick={() => navigate(-1)}>Cancel</Button>

                  <Button onClick={handleSubmit} disabled={raisingDispute} className="px-8 py-2 bg-[#1A1A1A] hover:bg-[#9DB8A6] hover:text-[#000000] gap-2">
                    <img src={thumbprintIcon} alt="" />
                    Sign & Submit Dispute
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
