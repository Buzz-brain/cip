import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Separator } from './separator';
import { DisputeMessage } from '../../lib/hooks/useDisputeMessages';
import getReasonDisplay from '../../lib/data/getDisputeReasonDisplay';

interface DisputeDetailProps {
  dispute: {
    id: number;
    plan_id: number;
    raised_by: string;
    reason: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    [key: string]: any;
  };
  messages: DisputeMessage[];
  onSendMessage?: (content: string, file?: File) => Promise<void>;
  canResolve?: boolean;
  onResolve?: (resolutionNote: string) => Promise<void>;
  loading?: boolean;
  useOrange?: boolean;
}

export const DisputeDetail: React.FC<DisputeDetailProps> = ({
  dispute,
  messages,
  onSendMessage,
  canResolve = false,
  onResolve,
  loading = false,
  useOrange = false,
}) => {
  const [messageContent, setMessageContent] = useState('');
  const [messageFile, setMessageFile] = useState<File | null>(null);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [resolutionNote, setResolutionNote] = useState('');
  const [resolving, setResolving] = useState(false);

  const canSendMessages = dispute.status === 'in_progess' || dispute.status === 'in_progress' || dispute.status === 'in_progess';

  const handleSendMessage = async () => {
    if (!messageContent.trim()) return;

    setSendingMessage(true);
    try {
      await onSendMessage?.(messageContent, messageFile || undefined);
      setMessageContent('');
      setMessageFile(null);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleResolve = async () => {
    if (!resolutionNote.trim()) return;

    setResolving(true);
    try {
      await onResolve?.(resolutionNote);
      setResolutionNote('');
    } catch (err) {
      console.error('Error resolving dispute:', err);
    } finally {
      setResolving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dispute Header */}
      <Card className={`${useOrange ? 'bg-[#191012] border border-[#2a2018]' : 'bg-[#1C2620] border border-[#2a2420]'} ${useOrange ? 'hover:border-[#F97316]' : 'hover:border-[#2ccd2c]'}`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-white text-2xl font-bold">
                Dispute #{dispute.id}
              </h2>
              <p className="text-[#AFA89C] text-sm">Plan #{dispute.plan_id}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                dispute.status === "resolved"
                  ? "bg-green-500/20 text-green-400"
                  : dispute.status === "pending"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {dispute.status?.toUpperCase()}
            </span>
          </div>

          <Separator className="bg-[#554233] my-4" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#8b7664] text-xs mb-1">Reason</p>
              <p className="text-white font-medium">
                {getReasonDisplay(dispute.reason).title}
              </p>
              {getReasonDisplay(dispute.reason).description && (
                <p className="text-[#AFA89C] text-xs mt-1">
                  {getReasonDisplay(dispute.reason).description}
                </p>
              )}
            </div>
            <div>
              <p className="text-[#8b7664] text-xs mb-1">Raised By</p>
              <p className="text-white font-medium">{dispute.raised_by}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-[#8b7664] text-xs mb-1">Description</p>
            <p className="text-white">{dispute.description}</p>
                {dispute.file && (
              <p className="mt-2">
                <a
                  href={dispute.file}
                  target="_blank"
                  rel="noreferrer"
                  className={useOrange ? 'text-[#F97316] text-sm' : 'text-[#2ccd2c] text-sm'}
                >
                  View attachment
                </a>
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-[#8b7664] text-xs mb-1">Created</p>
              <p className="text-white text-sm">
                {dispute.created_at
                  ? new Date(dispute.created_at).toLocaleString()
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-[#8b7664] text-xs mb-1">Updated</p>
              <p className="text-white text-sm">
                {dispute.updated_at
                  ? new Date(dispute.updated_at).toLocaleString()
                  : "—"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card className={`${useOrange ? 'bg-[#191012] border border-[#2a2018]' : 'bg-[#1C2620] border border-[#2a2420]'} ${useOrange ? 'hover:border-[#F97316]' : 'hover:border-[#2ccd2c]'}`}>
        <CardContent className="p-6">
          <h3 className="text-white font-bold mb-4">Messages</h3>

          <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
              <p className="text-[#AFA89C] text-sm">No messages yet</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`${useOrange ? 'bg-[#32261d]' : 'bg-[#2d241a]'} p-3 rounded`}>
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-white font-medium text-sm">
                      {msg.sender_id}
                    </p>
                    <p className="text-[#8b7664] text-xs">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-[#d1c3b4] text-sm">{msg.content}</p>
                  {msg.file_url && (
                    <a
                      href={msg.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className={useOrange ? 'text-[#F97316] text-xs mt-2' : 'text-[#2ccd2c] text-xs mt-2'}
                    >
                      View attachment
                    </a>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Send Message Form */}
          <Separator className="bg-[#554233] mb-4" />

          {canSendMessages ? (
            <div className="space-y-3">
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message..."
                className={`w-full ${useOrange ? 'bg-[#32261d] border border-[#4b3a2f]' : 'bg-[#2d241a] border border-[#554233]'} text-white rounded px-3 py-2 h-20`}
              />

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  onChange={(e) => setMessageFile(e.target.files?.[0] || null)}
                  className="text-white text-sm flex-1"
                />
                {messageFile && (
                  <span className="text-[#8b7664] text-xs">
                    {messageFile.name}
                  </span>
                )}
              </div>

              <Button
                onClick={handleSendMessage}
                className={useOrange ? 'bg-[#F97316] w-full' : 'bg-[#2ccd2c] w-full'}
                disabled={sendingMessage || loading || !messageContent.trim()}
              >
                {sendingMessage ? "Sending..." : "Send Message"}
              </Button>
            </div>
          ) : (
            <div className="text-[#AFA89C] text-sm">
              You can only send messages when the dispute is in progress.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resolve Dispute (Mediator Only) */}
      {canResolve && dispute.status !== "resolved" && (
        <Card className="bg-[#33261A] border-[#B5927B]">
          <CardContent className="p-6">
            <h3 className="text-white font-bold mb-4">Resolve Dispute</h3>

            <textarea
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              placeholder="Enter resolution note..."
              className="w-full bg-[#2d241a] border border-[#554233] text-white rounded px-3 py-2 h-24 mb-4"
            />

            <Button
              onClick={handleResolve}
              className="bg-green-600 hover:bg-green-700 w-full"
              disabled={resolving || loading || !resolutionNote.trim()}
            >
              {resolving ? "Resolving..." : "Resolve Dispute"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
