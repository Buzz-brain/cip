import React, { useState } from 'react';
import { generateEnterpriseApiKey } from '../../lib/api/enterprise';
import { useAuth } from '../../context/useAuth';
import { toast } from 'react-toastify';

export default function GenerateApiKey(): JSX.Element {
  const { user } = useAuth();
  const token = user?.token;
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const onGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateEnterpriseApiKey(token);
      // backend may return { api_key } or { data: { api_key } } or string
      let key = null as any;
      if (!res) key = null;
      else if (typeof res === 'string') key = res;
      else if (res.api_key) key = res.api_key;
      else if (res.data && res.data.api_key) key = res.data.api_key;
      setApiKey(key);
      toast.success('API key generated');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to generate API key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1510] border border-[#2a2520] rounded-xl p-6">
        <h3 className="text-white font-semibold mb-2">API Key</h3>
        <p className="text-gray-400 text-sm mb-4">Generate a new enterprise API key for programmatic access.</p>
        <div className="flex gap-3">
          <button className={`px-4 py-2 rounded bg-[#FF6600] text-white ${loading ? 'opacity-70 cursor-not-allowed' : ''}`} onClick={onGenerate} disabled={loading}>{loading ? 'Generating...' : 'Generate API Key'}</button>
          {apiKey && (
            <div className="bg-[#13100d] border border-[#2a2520] rounded p-3 text-sm text-white break-all">{apiKey}</div>
          )}
        </div>
      </div>
    </div>
  );
}
