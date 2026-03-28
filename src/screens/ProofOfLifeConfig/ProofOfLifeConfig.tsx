import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Wallet, Mail, MessageSquare, AlertTriangle } from 'lucide-react';
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import alarmBuzzIcon from "@assets/alarm-buzz.svg";
import facialBiometricIcon from "@assets/facial-biometric.svg";
import passphraseIcon from "@assets/passphrase.svg";
import paperEditIcon from "@assets/paper-edit.svg";



export const ProofOfLifeConfig = (): JSX.Element => {
  const navigate = useNavigate();

  const onSaveChanges = () => {
    navigate("/proof-of-life-check");
  };

  const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'bi-annually'>('monthly');
  const [walletTrigger, setWalletTrigger] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [verificationMethod, setVerificationMethod] = useState<'facial' | 'passphrase' | 'wallet'>('facial');
  const [email, setEmail] = useState('user@example.com');

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221810] text-white [font-family:'Manrope',Helvetica]">
      <header className="w-full h-[61px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#393028]">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
          </Link>
          <span className="text-lg font-bold leading-[22.5px] tracking-[-0.45px] text-white [font-family:'Manrope',Helvetica]">
            CIP&nbsp;&nbsp;Protocol
          </span>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-300 text-sm font-semibold"
          >
            Create Plan
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            My Plans
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Settings
          </a>
          <div className="w-9 h-9 bg-gray-400 rounded-full"></div>
        </nav>
      </header>


      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-3">Proof-of-Life Configuration</h1>
            <p className="text-gray-400">Configure how the protocol verifies your activity to keep your assets secure.</p>
          </div>
          <button
            onClick={onSaveChanges}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg font-medium transition"
          >
            Save Changes
          </button>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Frequency & Triggers</h2>
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-3 block">Check-in Frequency</label>
            <div className="flex gap-0 bg-[#393128] rounded-lg p-1">
              <button
                onClick={() => setFrequency('monthly')}
                className={`flex-1 px-6 py-2.5 rounded-md transition ${
                  frequency === 'monthly' ? 'bg-[#181411] text-white' : 'text-[#B9AF9D] hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setFrequency('quarterly')}
                className={`flex-1 px-6 py-2.5 rounded-md transition ${
                  frequency === 'quarterly' ? 'bg-[#181411] text-white' : 'text-[#B9AF9D] hover:text-white'
                }`}
              >
                Quarterly
              </button>
              <button
                onClick={() => setFrequency('bi-annually')}
                className={`flex-1 px-6 py-2.5 rounded-md transition ${
                  frequency === 'bi-annually' ? 'bg-[#181411] text-white' : 'text-[#B9AF9D] hover:text-white'
                }`}
              >
                Bi-annually
              </button>
            </div>
          </div>

          <div className="bg-[#37281F] rounded-lg p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Wallet Inactivity Trigger</h3>
                <p className="text-sm text-gray-400">
                  Automatically trigger inheritance plan if wallet has 0 transactions for the selected duration.
                </p>
              </div>
            </div>
            <button
              onClick={() => setWalletTrigger(!walletTrigger)}
              className={`relative w-12 h-6 rounded-full transition ${
                walletTrigger ? 'bg-white' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-gray-900 rounded-full transition-transform ${
                  walletTrigger ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="bg-[#37281F] rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Notifications</h3>
                    <p className="text-sm text-[#B9AF9D]">Receive monthly digest and urgent alerts</p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative w-12 h-6 rounded-full transition ${
                    emailNotifications ? 'bg-white' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-gray-900 rounded-full transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              {emailNotifications && (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                  placeholder="user@example.com"
                />
              )}
            </div>

            <div className="bg-[#37281F] rounded-lg p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <img src={alarmBuzzIcon} className='w-5 h-5' alt="Alarm Buzz" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Push Notifications</h3>
                  <p className="text-sm text-[#B9AF9D]">Instant alerts on your mobile device</p>
                </div>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative w-12 h-6 rounded-full transition ${
                  pushNotifications ? 'bg-white' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-gray-900 rounded-full transition-transform ${
                    pushNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="bg-[#37281F] rounded-lg p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">SMS Alerts</h3>
                  <p className="text-sm text-[#B9AF9D]">Critical failure warnings via text</p>
                </div>
              </div>
              <button
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`relative w-12 h-6 rounded-full transition ${
                  smsAlerts ? 'bg-white' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-gray-900 rounded-full transition-transform ${
                    smsAlerts ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Backup Verification Method</h2>
            <div className='bg-[#FF66001A] px-3 rounded-lg py-1'>
            <span className="text-orange-500 text-sm font-medium">Required</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setVerificationMethod('facial')}
              className={`bg-[#37281F] rounded-lg p-6 text-left transition border-2 ${
                verificationMethod === 'facial' ? 'border-orange-600 bg-[#FF66000D]' : 'border-transparent hover:border-gray-700'
              }`}
            >
              <div className="w-14 h-14 bg-[#393128] rounded-full flex items-center justify-center mb-4">
                <img src={facialBiometricIcon} className='w-5 h-5' alt="Facial Biometric" />
              </div>
              <h3 className="font-medium mb-2">Facial Biometric</h3>
              <p className="text-sm text-[#B9AF9D] mb-4">Verify liveness using your device's camera.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                <span className="text-xs text-white">High Security</span>
              </div>
            </button>

            <button
              onClick={() => setVerificationMethod('passphrase')}
              className={`bg-[#37281F] rounded-lg p-6 text-left transition border-2 ${
                verificationMethod === 'passphrase' ? 'border-orange-600 bg-[#FF66000D]' : 'border-transparent hover:border-[#393128]'
              }`}
            >
              <div className="w-14 h-14 bg-[#393128] rounded-full flex items-center justify-center mb-4">
                <img src={passphraseIcon} className='w-5 h-5' alt="Passphrase" />
              </div>
              <h3 className="font-medium mb-2">Passphrase</h3>
              <p className="text-sm text-[#B9AF9D] mb-4">Enter your secret 12-word recovery phrase.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#EAB308] rounded-full"></div>
                <span className="text-xs text-white">Medium Security</span>
              </div>
            </button>

            <button
              onClick={() => setVerificationMethod('wallet')}
              className={`bg-[#37281F] rounded-lg p-6 text-left transition border-2 ${
                verificationMethod === 'wallet' ? 'border-orange-600 bg-[#FF66000D]' : 'border-transparent hover:border-[#393128]'
              }`}
            >
              <div className="w-14 h-14 bg-[#393128] rounded-full flex items-center justify-center mb-4">
                <img src={paperEditIcon} className='w-5 h-5' alt="" />
              </div>
              <h3 className="font-medium mb-2">Wallet Signature</h3>
              <p className="text-sm text-[#B9AF9D] mb-4">Sign a verification message with your wallet.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                <span className="text-xs text-white">High Security</span>
              </div>
            </button>
          </div>
        </section>

        <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-5">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-500 font-semibold mb-2">Critical Warning</h3>
              <p className="text-sm text-gray-300">
                If Proof-of-Life fails after the selected grace period, the inheritance process will initiate automatically. Ensure your notification settings are correct.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
