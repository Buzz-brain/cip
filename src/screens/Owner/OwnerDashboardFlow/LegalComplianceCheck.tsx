import { useState } from "react";
import { Button } from "@components/ui/button";
import { Alert, AlertDescription } from "@components/ui/alert";
import {
  CircleCheck as CheckCircle2,
  Upload,
  FileText,
  CircleAlert as AlertCircle,
  ShieldCheck,
} from "lucide-react";

export const LegalComplianceCheck = (): JSX.Element => {
  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [willFile, setWillFile] = useState<File | null>(null);
  const [executorFile, setExecutorFile] = useState<File | null>(null);

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = event.target.files?.[0] ?? null;
    setter(file);
  };

  return (
    <div className="min-h-screen bg-[#0d0501] text-white">
      <div className="p-8">
        <div className="flex flex-col xl:flex-row gap-8">
          <aside className="xl:w-80 space-y-6">
            <div className="bg-[#1a1410] border border-[#2a2420] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-white font-bold text-lg">Setup Progress</h2>
                <span className="text-[#ff6600] text-sm font-semibold">Step 3 of 5</span>
              </div>
              <div className="w-full h-2 bg-[#2a2420] rounded-full overflow-hidden">
                <div className="h-full bg-[#ff6600] rounded-full" style={{ width: "60%" }}></div>
              </div>
              <p className="text-gray-400 text-sm">Next: Executor assignment confirmation.</p>
            </div>

            <div className="bg-[#1a1410] border border-[#2a2420] rounded-xl p-6 space-y-4">
              <h2 className="text-white font-bold text-lg">Requirements Status</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-semibold text-sm">Jurisdiction Passed</p>
                    <p className="text-green-400 text-xs">New York, USA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-white font-semibold text-sm">Identity Verified</p>
                    <p className="text-orange-400 text-xs">Action Required</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#2a2420] border border-[#3a3430] rounded-lg opacity-70">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-400 text-sm">Will Uploaded</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#2a2420] border border-[#3a3430] rounded-lg opacity-70">
                  <Upload className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-400 text-sm">Executor Validated</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1410] border border-orange-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-400 mt-1" />
                <div>
                  <p className="text-gray-300 text-sm mb-1">Need help obtaining these documents?</p>
                  <a
                    href="#guide"
                    className="text-[#ff6600] text-sm font-semibold hover:text-[#ff7700]"
                  >
                    Download our legal guide
                  </a>
                  <p className="text-gray-400 text-sm">for NY jurisdiction.</p>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="max-w-4xl space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-white">Legal Compliance Check</h1>
                <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
                  Based on your detected jurisdiction (New York), local laws require additional verification to secure your inheritance plan. Please upload the following documents.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  Files are encrypted client-side before upload using AES-256.
                </div>
              </div>

              <div className="border-2 border-dashed border-[#3a3430] rounded-xl p-8 bg-[#11100d] space-y-6">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#2a2420] flex items-center justify-center">
                      <Upload className="w-6 h-6 text-[#ff6600]" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg">Proof of Identity</h2>
                      <p className="text-gray-400 text-sm">
                        Government-issued ID (Passport, Driver&apos;s License) showing full legal name.
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded">Required</span>
                </div>

                <div className="rounded-xl bg-[#1a1410] border border-dashed border-[#3a3430] p-8 text-center hover:border-[#ff6600] transition-colors">
                  <input
                    type="file"
                    id="identity-upload"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileSelect(e, setIdentityFile)}
                  />
                  <label htmlFor="identity-upload" className="flex flex-col items-center gap-3 cursor-pointer">
                    <Button className="bg-[#ff6600] hover:bg-[#ff7700] text-white font-bold px-6 py-3">
                      Choose File
                    </Button>
                    <p className="text-gray-400 text-sm">or drag and drop here</p>
                    <p className="text-gray-500 text-xs">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
                  </label>
                </div>

                {identityFile && (
                  <p className="text-green-400 text-sm">Selected: {identityFile.name}</p>
                )}
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="border-2 border-dashed border-[#3a3430] rounded-xl p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2a2420] flex items-center justify-center">
                      <FileText className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold">Physical Will Copy</h3>
                      <p className="text-gray-400 text-sm">Scan of the notarized physical document.</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="will-upload"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileSelect(e, setWillFile)}
                  />
                  <label htmlFor="will-upload">
                    <Button variant="outline" className="w-full border-[#3a3430] text-gray-300 hover:text-white hover:border-[#ff6600]">
                      Browse Files
                    </Button>
                  </label>
                  {willFile && <p className="text-green-400 text-xs">{willFile.name}</p>}
                </div>

                <div className="border-2 border-dashed border-[#3a3430] rounded-xl p-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2a2420] flex items-center justify-center">
                      <Upload className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold">Executor Confirmation</h3>
                      <p className="text-gray-400 text-sm">Signed letter of acceptance from executor.</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="executor-upload"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileSelect(e, setExecutorFile)}
                  />
                  <label htmlFor="executor-upload">
                    <Button variant="outline" className="w-full border-[#3a3430] text-gray-300 hover:text-white hover:border-[#ff6600]">
                      Browse Files
                    </Button>
                  </label>
                  {executorFile && <p className="text-green-400 text-xs">{executorFile.name}</p>}
                </div>
              </div>

              <Alert className="bg-[#3a2f1e] border-yellow-500/30">
                <AlertDescription className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300 text-sm">Please complete all required fields to proceed.</span>
                </AlertDescription>
              </Alert>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                <Button variant="outline" className="border-[#3a3430] text-gray-300 hover:text-white hover:border-[#ff6600] px-8">
                  Save Draft
                </Button>
                <Button
                  className="bg-[#ff6600] hover:bg-[#ff7700] text-white px-8 gap-2"
                  disabled={!identityFile}
                >
                  Submit for Verification
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
