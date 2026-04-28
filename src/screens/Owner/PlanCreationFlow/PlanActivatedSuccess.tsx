import { useLocation, useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";
import { useState } from "react";
import { useDataProtector } from "../../../lib/hooks/useDataProtector";
import shieldCheckOrangeIcon from "@assets/shield-check-orange.svg";
import { toast } from "react-toastify";

export const PlanActivatedSuccess = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getProtectedData, getGrantedAccess } = useDataProtector();
  const [accessList, setAccessList] = useState<any>(null);
  const [loadingAccess, setLoadingAccess] = useState(false);
  const [grantedAccess, setGrantedAccess] = useState<any>(null);
  const [loadingGranted, setLoadingGranted] = useState(false);
  const state = location.state as {
    referenceId?: string;
    triggerMechanism?: string;
    assetsIncluded?: string;
    mainBeneficiary?: string;
    securityLevel?: string;
    protectedDataAddress?: string;
    plan_id_to_fund?: number;
    trx_hex?: string;
    backendMessage?: string;
  } | null;

  const formatTimestamp = (ts?: string | number) => {
    try {
      if (!ts) return null;
      let d: Date;
      if (typeof ts === "number") d = new Date(ts * 1000);
      else d = new Date(ts);
      if (isNaN(d.getTime())) return null;
      const date = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
      const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      return { date, time };
    } catch (e) {
      return null;
    }
  };

  const handleViewPlans = () => {
    navigate("/view-plan-history");
  };

  const handleReturnDashboard = () => {
    navigate("/owner-dashboard");
  };

  const handleFetchAccessList = async () => {
    if (!state?.protectedDataAddress) return;
    setLoadingAccess(true);
    try {
      const details = await getProtectedData(state.protectedDataAddress);
      setAccessList(details);
      console.log('Protected Data Details:', details);
    } catch (error) {
      console.error('Error fetching access list:', error);
      setAccessList({ error: 'Failed to fetch access list' });
    } finally {
      setLoadingAccess(false);
    }
  };

  const handleFetchGrantedAccess = async () => {
    if (!state?.protectedDataAddress) return;
    setLoadingGranted(true);
    try {
      const granted = await getGrantedAccess(state.protectedDataAddress);
      setGrantedAccess(granted);
      console.log('Granted Access:', granted);
    } catch (error) {
      console.error('Error fetching granted access:', error);
      setGrantedAccess({ error: 'Failed to fetch granted access' });
    } finally {
      setLoadingGranted(false);
    }
  };

  return (
    <div className="flex flex-col [font-family:'Manrope',Helvetica]">
      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <div className="max-w-3xl w-full bg-[#3D2E21] rounded-xl p-12 shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-28 h-28 rounded-full border-2 border-[#FF6600] flex items-center justify-center bg-[#FF660033]">
              <img src={shieldCheckOrangeIcon} alt="" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Plan Activated Successfully
          </h1>

          <p className="text-[#FFC589] text-center text-md mb-8">
            Your inheritance plan has been secured on-chain. The smart contract
            has been deployed and assets are now monitored.
          </p>

          <div style={{ width: "55%", margin: "20px auto" }} className="bg-[#181411] rounded-lg p-4 flex flex-col gap-2 items-center">
            <div className="flex w-full justify-between items-center">
              <p className="text-gray-400 text-xl">PLAN ID</p>
              <p className="text-white text-xl font-semibold">{state?.plan_id_to_fund ?? "—"}</p>
              <button
                className="text-orange-600 hover:text-orange-500 transition-colors"
                onClick={async () => {
                  const toCopy = state?.plan_id_to_fund?.toString() ?? "";
                  try {
                    await navigator.clipboard.writeText(toCopy);
                    toast.success("Plan ID copied to clipboard");
                  } catch (e) {
                    toast.error("Failed to copy Plan ID");
                  }
                }}
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            {state?.trx_hex && (
              <div className="w-full mt-2">
                <div className="text-gray-400 text-xs mb-1">Transaction Hex</div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs break-all">{state.trx_hex}</span>
                  <button
                    className="text-orange-600 hover:text-orange-500 transition-colors"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(state.trx_hex!);
                        toast.success("Transaction hex copied");
                      } catch (e) {
                        toast.error("Failed to copy transaction hex");
                      }
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            {state?.backendMessage && (
              <div className="w-full mt-2 text-green-400 text-xs text-center">{state.backendMessage}</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#181411] rounded-lg p-6 border border-gray-700">
                <div className="text-[#FFC589] text-sm font-semibold mb-2">
                  Trigger Mechanism
                </div>
                <div className="text-white font-semibold text-sm mb-1">
                  {state?.triggerMechanism || "Inactivity Monitor (12 Months)"}
                </div>
            </div>
            <div className="bg-[#181411] rounded-lg p-6 border border-gray-700">
              <div className="text-[#FFC589] text-sm font-semibold mb-2">
                Assets Included
              </div>
                <div className="text-white font-semibold text-sm mb-1">
                  {state?.assetsIncluded || '12 Assets'} {state?.assetsIncluded ? null : (
                    <span className="text-[#FFC589] text-xs font-light">(ETH, SOL, USDC)</span>
                  )}
                </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#181411] rounded-lg p-6 border border-gray-700">
              <div className="text-[#FFC589] text-sm font-semibold mb-2">
                Main Beneficiary
              </div>
              <div className="text-white font-semibold text-sm font-mono break-all">
                {state?.mainBeneficiary || "0x71c...9a21"}
              </div>
            </div>
            <div className="bg-[#181411] rounded-lg p-6 border border-gray-700">
              <div className="text-[#FFC589] text-sm font-semibold mb-2">
                Security Level
              </div>
              <div className="text-white font-semibold text-sm">
                {state?.securityLevel || "AES-256 ENCRYPTED"}
              </div>
            </div>
          </div>

          {state?.protectedDataAddress && (
            <div className="bg-[#181411] rounded-lg p-4 mb-6 border border-gray-700 text-sm text-gray-300">
              <div className="text-[#FFC589] text-xs font-semibold mb-2">
                Protected Data Address
              </div>
              <div className="break-all">{state.protectedDataAddress}</div>
              <button
                onClick={handleFetchAccessList}
                disabled={loadingAccess}
                className="mt-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white text-xs rounded"
              >
                {loadingAccess ? 'Fetching...' : 'Check iApp Access'}
              </button>
              <button
                onClick={handleFetchGrantedAccess}
                disabled={loadingGranted}
                className="mt-2 ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-xs rounded"
              >
                {loadingGranted ? 'Fetching...' : 'Check Granted Access'}
              </button>
            </div>
          )}

          {accessList && (
            <div className="bg-[#181411] rounded-lg p-4 mb-6 border border-gray-700 text-sm text-gray-300">
              <div className="text-[#FFC589] text-xs font-semibold mb-2">
                Access List
              </div>
              <pre className="text-xs break-all whitespace-pre-wrap">
                {JSON.stringify(accessList, null, 2)}
              </pre>
            </div>
          )}

          {grantedAccess && (
            <div className="bg-[#181411] rounded-lg p-4 mb-6 border border-gray-700 text-sm text-gray-300">
              <div className="text-[#FFC589] text-xs font-semibold mb-2">
                Granted Access List
              </div>
              <pre className="text-xs break-all whitespace-pre-wrap">
                {JSON.stringify(grantedAccess, null, 2)}
              </pre>
            </div>
          )}

          <div className="text-center text-gray-400 text-xs mb-8">
            <div className="flex items-center justify-center gap-2">
              <span>Creation Timestamp</span>
              {(() => {
                const formatted = formatTimestamp((state as any)?.creationTimestamp);
                if (formatted) {
                  return (<>
                    <span className="text-orange-600">{formatted.date}</span>
                    <span className="text-orange-600">{formatted.time} UTC</span>
                  </>);
                }
                const now = new Date();
                const date = now.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
                const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
                return (<>
                  <span className="text-orange-600">{date}</span>
                  <span className="text-orange-600">{time} UTC</span>
                </>);
              })()}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleViewPlans}
              className="flex-1 bg-orange-600 hover:bg-orange-700 transition-colors text-white font-semibold py-4 rounded-lg"
            >
              View my Plans
            </button>
            <button
              onClick={handleReturnDashboard}
              className="flex-1 border border-[#84461C] text-white hover:bg-orange-700 transition-colors font-semibold py-4 rounded-lg"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#1B1613] px-8 py-6">
        <div className="flex items-center justify-center flex-col gap-4 text-gray-400 text-xs">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Smart Contract Audit
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Documentation
            </a>
          </div>

          <div className="flex items-center gap-2"  >
            <div className="relative flex h-2 w-2 items-start">
              <div className="absolute inset-0 rounded-full bg-green-400" />
              <div className="relative h-2 w-2 rounded-full bg-green-500" />
            </div>
            <span>
              AI Systems Operational
            </span>
          </div>

          <p>2025 Multi-Chain Inheritance Protocol. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
