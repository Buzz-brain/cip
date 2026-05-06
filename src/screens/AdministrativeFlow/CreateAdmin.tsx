import React, { useState } from "react";
import { createAdmin } from "../../lib/api/admin";
import { useAuth } from "../../context/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logoImg from "@assets/cip-logo.png";
import loginBgImg from "@assets/login-bg.svg";
import shieldPadlockIcon from "@assets/shield-padlock-orange.svg";
import loginArrowIcon from "@assets/login-arrow.svg";

export default function CreateAdmin(): JSX.Element {
  const { user } = useAuth();
  const token = user && (user as any).token;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await createAdmin(token, { email, user_name: userName, password, full_name: fullName, secret_code: secretCode });
      toast.success("Admin user created");
      setEmail(""); setUserName(""); setPassword(""); setFullName(""); setSecretCode("");
      setTimeout(() => navigate("/administrative-login"), 1000);
    } catch (err: any) {
      const message = err?.message || "Failed to create admin";
      try {
        const parsed = JSON.parse(message);
        if (parsed && parsed.detail && Array.isArray(parsed.detail)) {
          const map: Record<string,string> = {};
          parsed.detail.forEach((d: any) => {
            const loc = d.loc && Array.isArray(d.loc) ? d.loc[d.loc.length-1] : undefined;
            const key = loc || d.input || 'general';
            map[String(key)] = d.msg || String(d);
          });
          setErrors(map);
        } else {
          toast.error(message);
        }
      } catch (parseErr) {
        toast.error(message);
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col w-full min-h-screen text-white [font-family:'Manrope',Helvetica]"
      style={{ backgroundImage: `url(${loginBgImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >

      <header className="w-full h-[61px] flex items-center justify-between px-10 bg-[#0d0501] border-b border-[#393028]">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Logo" className="h-[45px] object-cover" />
        </div>
        <div />
      </header>

      <main className="relative z-10 flex items-center justify-center px-4" style={{ minHeight: "150vh" }}>
        <div className="w-full max-w-md">
          <div className="bg-[#27231C] backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-zinc-800">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#FF66001A] rounded-full flex items-center justify-center">
                <img src={shieldPadlockIcon} className="w-8 h-8" alt="" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-4">Create Admin</h1>
            <p className="text-[#B9AF9D] text-sm pl-3 mb-8">Create a new administrative user.</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input className="w-full bg-[#181411] border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none" placeholder="Full name" value={fullName} onChange={e=>setFullName(e.target.value)} />
                {errors.full_name && <div className="text-red-400 text-sm mt-1">{errors.full_name}</div>}
              </div>

              <div className="mb-3">
                <input className="w-full bg-[#181411] border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
                {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <input className="w-full bg-[#181411] border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none" placeholder="Username" value={userName} onChange={e=>setUserName(e.target.value)} />
                {errors.user_name && <div className="text-red-400 text-sm mt-1">{errors.user_name}</div>}
              </div>

              <div className="mb-3">
                <input type="password" className="w-full bg-[#181411] border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                {errors.password && <div className="text-red-400 text-sm mt-1">{errors.password}</div>}
              </div>

              <div className="mb-6">
                <input className="w-full bg-[#181411] border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none" placeholder="Secret code" value={secretCode} onChange={e=>setSecretCode(e.target.value)} />
                {errors.secret_code && <div className="text-red-400 text-sm mt-1">{errors.secret_code}</div>}
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#FF6600] text-white font-medium py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2">
                {loading ? 'Creating...' : 'Create Admin'}
                <img src={loginArrowIcon} alt="" />
              </button>
            </form>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-zinc-800">
              <span className="text-gray-400 text-xs">© 2026 CIP Foundation</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
