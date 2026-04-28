import { ChevronRight as ChevronRightIcon, Download as DownloadIcon, CircleAlert as AlertCircleIcon, CircleCheck as CheckCircleIcon, TriangleAlert as WarningIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
// Sidebar removed — layout provides it

export const ComplianceSummary = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d0501]">
      <div className="px-8 py-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm mb-6">
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64]">
              Home
            </span>
            <ChevronRightIcon className="w-4 h-4 text-[#8b7b64]" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64]">
              Jurisdiction Selection
            </span>
            <ChevronRightIcon className="w-4 h-4 text-[#8b7b64]" />
            <span className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64]">
              Compliance Summary
            </span>
          </div>

          <div className="flex items-start justify-between gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="[font-family:'Manrope',Helvetica] font-bold text-white text-5xl">
                Nigeria
              </h1>
              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                Legal Compliance Report · Generated on Oct 24, 2023
              </p>
            </div>

            <Button className="bg-[#3d2a23] hover:bg-[#4a3a2a] text-[#ff6600] border border-[#ff6600] [font-family:'Manrope',Helvetica] font-bold text-sm px-6 py-2 flex items-center gap-2 transition-colors">
              <DownloadIcon className="w-4 h-4" />
              Export PDF Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                  Global Compliance Score
                </p>
                <CheckCircleIcon className="w-5 h-5 text-[#2ccd2c]" />
              </div>
              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-4xl">
                85%
              </p>
              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#2ccd2c] text-xs">
                +5% vs Global Avg
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                  Jurisdiction Status
                </p>
                <span className="[font-family:'Manrope',Helvetica] font-bold text-[#8b7b64] text-xs bg-[#27221c] px-2 py-1 rounded">
                  public
                </span>
              </div>
              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-4xl">
                Common Law
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#181511] border border-[#392f28] rounded-xl">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                  Pending Actions
                </p>
                <WarningIcon className="w-5 h-5 text-[#ff9500]" />
              </div>
              <p className="[font-family:'Manrope',Helvetica] font-bold text-white text-4xl">
                2
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-[#3d2a23] to-[#2a1f18] border-l-4 border-l-[#ff3b30] rounded-xl mb-8">
          <CardContent className="p-6 flex items-start gap-4">
            <AlertCircleIcon className="w-6 h-6 text-[#ff3b30] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base mb-2">
                Digital Wills Not Legally Binding
              </h3>
              <p className="[font-family:'Manrope',Helvetica] font-normal text-[#b9ae9d] text-sm mb-4">
                In the United Kingdom, pure digital wills are not yet legally recognized. To ensure your plan is valid, you must execute a physical will alongside your smart contract.
              </p>
              <Button className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white [font-family:'Manrope',Helvetica] font-bold text-sm px-6 py-2 flex items-center gap-2 transition-colors">
                <DownloadIcon className="w-4 h-4" />
                Download Template
              </Button>
            </div>
          </CardContent>
        </Card>

        <section className="mb-12">
          <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl mb-6">
            Regulatory Analysis
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-[#181511] border border-[#392f28] rounded-xl hover:border-[#4a3a2a] transition-colors">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#2ccd2c] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base mb-2">
                      Smart Contracts Recognized
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                      Recognized as legally binding agreements under the UK Law Commission's guidelines.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181511] border border-[#392f28] rounded-xl hover:border-[#4a3a2a] transition-colors">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#2ccd2c] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base mb-2">
                      Cryptocurrency Assets
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                      Crypto assets are treated as property and can be fully bequeathed in a will.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181511] border border-[#392f28] rounded-xl hover:border-[#4a3a2a] transition-colors">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <WarningIcon className="w-5 h-5 text-[#ff9500] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base mb-2">
                      Executor Verification
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm mb-3">
                      Your designated executor has not completed KYC verification. This may delay asset release.
                    </p>
                    <button className="[font-family:'Manrope',Helvetica] font-bold text-[#ff6600] hover:text-[#ff6600]/80 text-sm transition-colors">
                      Send Reminder
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181511] border border-[#392f28] rounded-xl hover:border-[#4a3a2a] transition-colors">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#2ccd2c] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base mb-2">
                      Inheritance Tax Threshold
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                      Your estimated estate value is below the £325,000 tax-free threshold.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181511] border border-[#392f28] rounded-xl hover:border-[#4a3a2a] transition-colors">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <WarningIcon className="w-5 h-5 text-[#ff9500] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base mb-2">
                      Witness Requirement
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                      Physical will signing requires two independent witnesses present at the same time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#181511] border border-[#392f28] rounded-xl hover:border-[#4a3a2a] transition-colors">
              <CardContent className="p-6 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#2ccd2c] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base mb-2">
                      Data Privacy (GDPR)
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#8b7b64] text-sm">
                      Storage of beneficiary data is fully compliant with UK GDPR standards.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="flex items-center justify-between gap-4 pt-8 border-t border-[#392f28]">
          <Button
            onClick={() => navigate("/overview")}
            className="px-8 py-3 bg-[#27221c] border border-[#392f28] text-white hover:bg-[#2d251f] [font-family:'Manrope',Helvetica] font-bold text-base rounded-lg transition-colors"
          >
            Back
          </Button>

          <Button className="px-8 py-3 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white [font-family:'Manrope',Helvetica] font-bold text-base rounded-lg transition-colors">
            Proceed to Plan Setup
          </Button>
        </div>
      </div>
    </div>
  );
};
