import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import { createAdmin } from "../../lib/api/admin";
import { useAuth } from "../../context/useAuth";
import { toast } from "react-toastify";

export default function CreateAdmin(): JSX.Element {
  const { user } = useAuth();
  const token = user?.token;

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
    } catch (err: any) {
      // Try to parse validation errors returned by backend
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
    <AdminLayout title="Create Admin">
      <div className="max-w-lg bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
        <h2 className="text-white text-xl font-semibold mb-4">Create Admin User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input className="w-full p-3 bg-[#0f0c0a] border border-[#2a2520] rounded text-white" placeholder="Full name" value={fullName} onChange={e=>setFullName(e.target.value)} />
            {errors.full_name && <div className="text-red-400 text-sm mt-1">{errors.full_name}</div>}
          </div>
          <div>
            <input className="w-full p-3 bg-[#0f0c0a] border border-[#2a2520] rounded text-white" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
          </div>
          <div>
            <input className="w-full p-3 bg-[#0f0c0a] border border-[#2a2520] rounded text-white" placeholder="Username" value={userName} onChange={e=>setUserName(e.target.value)} />
            {errors.user_name && <div className="text-red-400 text-sm mt-1">{errors.user_name}</div>}
          </div>
          <div>
            <input type="password" className="w-full p-3 bg-[#0f0c0a] border border-[#2a2520] rounded text-white" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            {errors.password && <div className="text-red-400 text-sm mt-1">{errors.password}</div>}
          </div>
          <div>
            <input className="w-full p-3 bg-[#0f0c0a] border border-[#2a2520] rounded text-white" placeholder="Secret code" value={secretCode} onChange={e=>setSecretCode(e.target.value)} />
            {errors.secret_code && <div className="text-red-400 text-sm mt-1">{errors.secret_code}</div>}
          </div>
          <div className="flex justify-end">
            <button disabled={loading} className="bg-orange-600 px-4 py-2 rounded text-white">{loading? 'Creating...' : 'Create Admin'}</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
