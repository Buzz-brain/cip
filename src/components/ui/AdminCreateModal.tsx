import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { createAdmin } from "../../lib/api/admin";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
  token?: string | null;
}

const AdminCreateModal: React.FC<Props> = ({ open, onClose, onCreated, token = null }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await createAdmin(token, { email, user_name: userName, password, full_name: fullName, secret_code: secretCode });
      toast.success("Admin user created");
      setEmail(""); setUserName(""); setPassword(""); setFullName(""); setSecretCode("");
      onCreated && onCreated();
      onClose();
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
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[#1f1915] border border-[#3a2f1e] rounded-lg w-[92%] max-w-md p-6 z-70">
        <h3 className="text-white font-bold mb-4">Create Admin</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-[#d1c3b4] block mb-2">Full Name</label>
            <Input value={fullName} onChange={(e)=>setFullName(e.target.value)} className="text-white" placeholder="Full name" />
            {errors.full_name && <div className="text-red-400 text-sm mt-1">{errors.full_name}</div>}
          </div>

          <div>
            <label className="text-sm text-[#d1c3b4] block mb-2">Email</label>
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} className="text-white" placeholder="Email" />
            {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
          </div>

          <div>
            <label className="text-sm text-[#d1c3b4] block mb-2">Username</label>
            <Input value={userName} onChange={(e)=>setUserName(e.target.value)} className="text-white" placeholder="Username" />
            {errors.user_name && <div className="text-red-400 text-sm mt-1">{errors.user_name}</div>}
          </div>

          <div>
            <label className="text-sm text-[#d1c3b4] block mb-2">Password</label>
            <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="text-white" placeholder="Password" />
            {errors.password && <div className="text-red-400 text-sm mt-1">{errors.password}</div>}
          </div>

          <div>
            <label className="text-sm text-[#d1c3b4] block mb-2">Secret Code</label>
            <Input value={secretCode} onChange={(e)=>setSecretCode(e.target.value)} className="text-white" placeholder="Secret code" />
            {errors.secret_code && <div className="text-red-400 text-sm mt-1">{errors.secret_code}</div>}
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={onClose} className="bg-[#393028]" variant="outline">Cancel</Button>
            <Button type="submit" className="bg-[#2ccd2c]" disabled={loading}>{loading ? 'Creating...' : 'Create Admin'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateModal;
