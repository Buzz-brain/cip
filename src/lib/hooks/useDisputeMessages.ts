import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export interface DisputeMessage {
  id: number;
  dispute_id: number;
  sender_id: string;
  content: string;
  file_url?: string;
  created_at: string;
  [key: string]: any;
}

export const useDisputeMessages = (disputeId: number | null) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<DisputeMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    if (!user?.token || !disputeId) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_API_URL}/dis/view-a-dispute/${disputeId}/messages`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch messages: ${res.status}`);
      }

      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err?.message ?? 'Error fetching messages');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [user?.token, disputeId]);

  return { messages, loading, error, refetch: fetchMessages };
};

export const useSendDisputeMessage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (disputeId: number, content: string, file?: File) => {
    if (!user?.token) {
      setError('User not authenticated');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('content', content);
      if (file) {
        formData.append('file', file);
      }

      const res = await fetch(`${BACKEND_API_URL}/dis/send-a-message-dispute/${disputeId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed to send message: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (err: any) {
      const message = err?.message ?? 'Error sending message';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
};
