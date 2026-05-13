import { Link } from "react-router-dom";
import { Card, CardContent } from "@components/ui/card";

const templates = [
  {
    id: "template-child",
    title: "Children's Trust",
    description: "Automatic release when a beneficiary reaches adulthood (e.g. 18 years).",
    defaults: { releaseAge: 18, frequency: 'Monthly', stablecoin: 'BUSD', contributionAmount: '100' },
  },
  {
    id: "template-family",
    title: "Family Trust",
    description: "Distribute funds to multiple family members on a chosen unlock date.",
    defaults: { releaseAge: 21, frequency: 'Monthly', stablecoin: 'USDT', contributionAmount: '200' },
  },
  {
    id: "template-education",
    title: "Education Trust",
    description: "Release funds to pay for education expenses at a chosen age or date.",
    defaults: { releaseAge: 22, frequency: 'Monthly', stablecoin: 'USDC', contributionAmount: '150' },
  },
  {
    id: "template-retirement",
    title: "Retirement Trust",
    description: "Long-term lock designed to support retirement goals.",
    defaults: { releaseAge: 60, frequency: 'Monthly', stablecoin: 'USDC', contributionAmount: '500' },
  },
];

export const TrustsList = (): JSX.Element => {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="[font-family:'Noto_Sans',Helvetica] text-[#8b7664] text-sm">
          Dashboard <span className="text-[#8b7664]">/</span> Trusts
        </div>

        <h1 className="[font-family:'Space_Grotesk',Helvetica] font-bold text-white text-3xl">
          Trust Accounts
        </h1>

        <div className="flex justify-end">
          <Link to="/owner-dashboard/select-assets">
            <button className="bg-[#ff6600] text-white px-4 py-2 rounded-lg font-bold text-sm">Custom Trust</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <Link key={tpl.id} to={`/owner-dashboard/trusts/${tpl.id}`}>
              <Card className="bg-[#1a1410] border-[#3a2f1e] hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[#8b7664]">Template</div>
                      <div className="text-white font-bold text-lg">{tpl.title}</div>
                      <div className="text-[#b8a494] text-xs mt-2">{tpl.description}</div>
                    </div>
                    <div className="text-sm text-[#ff6600]">Preset: {tpl.defaults.releaseAge} yrs</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustsList;
