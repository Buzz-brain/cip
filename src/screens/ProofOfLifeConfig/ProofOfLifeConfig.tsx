import { useState } from 'react';
import { Settings, Wallet, Mail, Smartphone, MessageSquare, Scan, Key, PenTool, AlertTriangle } from 'lucide-react';

interface ProofOfLifeConfigProps {
  onSaveChanges?: () => void;
}

export const ProofOfLifeConfig = ({ onSaveChanges = () => {} }: ProofOfLifeConfigProps): JSX.Element => {
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'bi-annually'>('monthly');
  const [walletTrigger, setWalletTrigger] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [verificationMethod, setVerificationMethod] = useState<'facial' | 'passphrase' | 'wallet'>('facial');
  const [email, setEmail] = useState('user@example.com');

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <header className="bg-[#2a2a2a] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">CIP Protocol</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
          </div>
        </div>
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
            <div className="flex gap-0 bg-[#2a2a2a] rounded-lg p-1">
              <button
                onClick={() => setFrequency('monthly')}
                className={`flex-1 px-6 py-2.5 rounded-md transition ${
                  frequency === 'monthly' ? 'bg-[#3a3a3a] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setFrequency('quarterly')}
                className={`flex-1 px-6 py-2.5 rounded-md transition ${
                  frequency === 'quarterly' ? 'bg-[#3a3a3a] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Quarterly
              </button>
              <button
                onClick={() => setFrequency('bi-annually')}
                className={`flex-1 px-6 py-2.5 rounded-md transition ${
                  frequency === 'bi-annually' ? 'bg-[#3a3a3a] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Bi-annually
              </button>
            </div>
          </div>

          <div className="bg-[#2a2a2a] rounded-lg p-5 flex items-center justify-between">
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
            <div className="bg-[#2a2a2a] rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Receive monthly digest and urgent alerts</p>
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

            <div className="bg-[#2a2a2a] rounded-lg p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Push Notifications</h3>
                  <p className="text-sm text-gray-400">Instant alerts on your mobile device</p>
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

            <div className="bg-[#2a2a2a] rounded-lg p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">SMS Alerts</h3>
                  <p className="text-sm text-gray-400">Critical failure warnings via text</p>
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
            <span className="text-orange-500 text-sm font-medium">Required</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setVerificationMethod('facial')}
              className={`bg-[#2a2a2a] rounded-lg p-6 text-left transition border-2 ${
                verificationMethod === 'facial' ? 'border-orange-600' : 'border-transparent hover:border-gray-700'
              }`}
            >
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <Scan className="w-5 h-5 text-gray-300" />
              </div>
              <h3 className="font-medium mb-2">Facial Biometric</h3>
              <p className="text-sm text-gray-400 mb-4">Verify liveness using your device's camera.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-gray-400">High Security</span>
              </div>
            </button>

            <button
              onClick={() => setVerificationMethod('passphrase')}
              className={`bg-[#2a2a2a] rounded-lg p-6 text-left transition border-2 ${
                verificationMethod === 'passphrase' ? 'border-orange-600' : 'border-transparent hover:border-gray-700'
              }`}
            >
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <Key className="w-5 h-5 text-gray-300" />
              </div>
              <h3 className="font-medium mb-2">Passphrase</h3>
              <p className="text-sm text-gray-400 mb-4">Enter your secret 12-word recovery phrase.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-gray-400">Medium Security</span>
              </div>
            </button>

            <button
              onClick={() => setVerificationMethod('wallet')}
              className={`bg-[#2a2a2a] rounded-lg p-6 text-left transition border-2 ${
                verificationMethod === 'wallet' ? 'border-orange-600' : 'border-transparent hover:border-gray-700'
              }`}
            >
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                <PenTool className="w-5 h-5 text-gray-300" />
              </div>
              <h3 className="font-medium mb-2">Wallet Signature</h3>
              <p className="text-sm text-gray-400 mb-4">Sign a verification message with your wallet.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-400">High Security</span>
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
