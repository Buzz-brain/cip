import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { CircleCheck as CheckCircle2, Upload, FileText, CircleAlert as AlertCircle, ShieldCheck } from "lucide-react";

export const LegalComplianceCheck = (): JSX.Element => {
  const navigate = useNavigate();
  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [willFile, setWillFile] = useState<File | null>(null);
  const [executorFile, setExecutorFile] = useState<File | null>(null);

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setter(file);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0d0501] flex flex-col">
      <header className="w-full h-[60px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#2a2420]">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-[#ff6600] rounded-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
            </svg>
          </div>
          <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-base">
            CIP Protocol
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-green-400 text-sm font-medium [font-family:'Manrope',Helvetica]">
              Secure Connection
            </span>
          </div>
          <button className="w-10 h-10 rounded-lg bg-[#2a2420] hover:bg-[#3a3430] flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
          <Button className="bg-[#ff6600] hover:bg-[#ff7700] text-white font-bold [font-family:'Manrope',Helvetica] px-6">
            My Profile
          </Button>
          <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-[420px] bg-[#0d0501] border-r border-[#2a2420] p-8 flex flex-col gap-6">
          <div className="bg-[#1a1410] border border-[#2a2420] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg [font-family:'Manrope',Helvetica]">
                Setup Progress
              </h2>
              <span className="text-[#ff6600] text-sm font-semibold [font-family:'Manrope',Helvetica]">
                Step 3 of 5
              </span>
            </div>
            <div className="w-full h-2 bg-[#2a2420] rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#ff6600] rounded-full" style={{ width: "60%" }}></div>
            </div>
            <p className="text-gray-400 text-sm [font-family:'Manrope',Helvetica]">
              Next: Executor assignment confirmation.
            </p>
          </div>

          <div className="bg-[#1a1410] border border-[#2a2420] rounded-xl p-6">
            <h2 className="text-white font-bold text-lg [font-family:'Manrope',Helvetica] mb-6">
              Requirements Status
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm [font-family:'Manrope',Helvetica]">
                    Jurisdiction Passed
                  </p>
                  <p className="text-green-400 text-xs [font-family:'Manrope',Helvetica]">
                    New York, USA
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm [font-family:'Manrope',Helvetica]">
                    Identity Verified
                  </p>
                  <p className="text-orange-400 text-xs [font-family:'Manrope',Helvetica]">
                    Action Required
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#2a2420] border border-[#3a3430] rounded-lg opacity-50">
                <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-400 font-semibold text-sm [font-family:'Manrope',Helvetica]">
                    Will Uploaded
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#2a2420] border border-[#3a3430] rounded-lg opacity-50">
                <Upload className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-400 font-semibold text-sm [font-family:'Manrope',Helvetica]">
                    Executor Validated
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1410] border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-300 text-sm [font-family:'Manrope',Helvetica] mb-1">
                  Need help obtaining these documents?
                </p>
                <a href="#guide" className="text-[#ff6600] text-sm font-semibold [font-family:'Manrope',Helvetica] hover:text-[#ff7700]">
                  Download our legal guide
                </a>
                <span className="text-gray-400 text-sm [font-family:'Manrope',Helvetica]"> for NY jurisdiction.</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4 [font-family:'Manrope',Helvetica]">
                Legal Compliance Check
              </h1>
              <p className="text-gray-400 text-base [font-family:'Manrope',Helvetica] mb-6">
                Based on your detected jurisdiction (New York), local laws require additional verification
                to secure your inheritance plan. Please upload the following documents.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400 [font-family:'Manrope',Helvetica]">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                Files are encrypted client-side before upload using AES-256.
              </div>
            </div>

            <div className="border-2 border-dashed border-[#3a3430] rounded-xl p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#2a2420] flex items-center justify-center">
                    <Upload className="w-6 h-6 text-[#ff6600]" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg [font-family:'Manrope',Helvetica]">
                      Proof of Identity
                    </h3>
                    <p className="text-gray-400 text-sm [font-family:'Manrope',Helvetica]">
                      Government-issued ID (Passport, Driver's License) showing full legal name.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded [font-family:'Manrope',Helvetica]">
                  Required
                </span>
              </div>

              <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-[#3a3430] rounded-lg bg-[#1a1410] hover:border-[#ff6600] transition-colors cursor-pointer">
                <input
                  type="file"
                  id="identity-upload"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileSelect(e, setIdentityFile)}
                />
                <label
                  htmlFor="identity-upload"
                  className="flex flex-col items-center cursor-pointer w-full"
                >
                  <Button className="bg-[#ff6600] hover:bg-[#ff7700] text-white font-bold [font-family:'Manrope',Helvetica] mb-3">
                    Choose File
                  </Button>
                  <p className="text-gray-400 text-sm [font-family:'Manrope',Helvetica]">
                    or drag and drop here
                  </p>
                  <p className="text-gray-500 text-xs [font-family:'Manrope',Helvetica] mt-2">
                    Supported formats: JPG, PNG, PDF (Max 5MB)
                  </p>
                </label>
              </div>
              {identityFile && (
                <p className="text-green-400 text-sm mt-3 [font-family:'Manrope',Helvetica]">
                  Selected: {identityFile.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-2 border-dashed border-[#3a3430] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2a2420] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2 flex-1 justify-between">
                    <h3 className="text-white font-bold text-base [font-family:'Manrope',Helvetica]">
                      Physical Will Copy
                    </h3>
                    <button className="text-gray-400 hover:text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm [font-family:'Manrope',Helvetica] mb-6">
                  Scan of the notarized physical document.
                </p>
                <input
                  type="file"
                  id="will-upload"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileSelect(e, setWillFile)}
                />
                <label htmlFor="will-upload">
                  <Button
                    variant="outline"
                    className="w-full border-[#3a3430] text-gray-300 hover:text-white hover:border-[#ff6600] [font-family:'Manrope',Helvetica]"
                    asChild
                  >
                    <span>Browse Files</span>
                  </Button>
                </label>
                {willFile && (
                  <p className="text-green-400 text-xs mt-2 [font-family:'Manrope',Helvetica]">
                    {willFile.name}
                  </p>
                )}
              </div>

              <div className="border-2 border-dashed border-[#3a3430] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2a2420] flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 flex-1 justify-between">
                    <h3 className="text-white font-bold text-base [font-family:'Manrope',Helvetica]">
                      Executor Confirmation
                    </h3>
                    <button className="text-gray-400 hover:text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm [font-family:'Manrope',Helvetica] mb-6">
                  Signed letter of acceptance from executor.
                </p>
                <input
                  type="file"
                  id="executor-upload"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileSelect(e, setExecutorFile)}
                />
                <label htmlFor="executor-upload">
                  <Button
                    variant="outline"
                    className="w-full border-[#3a3430] text-gray-300 hover:text-white hover:border-[#ff6600] [font-family:'Manrope',Helvetica]"
                    asChild
                  >
                    <span>Browse Files</span>
                  </Button>
                </label>
                {executorFile && (
                  <p className="text-green-400 text-xs mt-2 [font-family:'Manrope',Helvetica]">
                    {executorFile.name}
                  </p>
                )}
              </div>
            </div>

            <Alert className="bg-[#3a2f1e] border-yellow-500/30 mb-8">
              <AlertDescription className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm [font-family:'Manrope',Helvetica]">
                  Please complete all required fields to proceed.
                </p>
              </AlertDescription>
            </Alert>

            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                className="border-[#3a3430] text-gray-300 hover:text-white hover:border-[#ff6600] [font-family:'Manrope',Helvetica] px-8"
              >
                Save Draft
              </Button>
              <Button
                className="bg-[#ff6600] hover:bg-[#ff7700] text-white font-bold [font-family:'Manrope',Helvetica] px-8 gap-2"
                disabled={!identityFile}
              >
                Submit for Verification
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
