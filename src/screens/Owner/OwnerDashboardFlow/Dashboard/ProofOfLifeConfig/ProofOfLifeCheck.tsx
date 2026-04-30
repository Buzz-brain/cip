import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../context/useAuth";
import { toast } from 'react-toastify';
import { activateProofOfLife, getActiveProofPlan } from '../../../../../lib/api/inherit';
import { usePlan } from '../../../../../context/usePlan';
import alarmBuzzOrangeIcon from "@assets/alarm-buzz-orange.svg";
import thumbprintIcon from "@assets/thumbprint.svg";

export type ProofOfLifeModalProps = {
  open?: boolean;
  onClose?: () => void;
};

export const ProofOfLifeCheck = (props?: ProofOfLifeModalProps): JSX.Element | null => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { emitPlansUpdated } = usePlan();
  const open = !!props?.open;
  const onClose = props?.onClose;

  const onConfirmLife = async () => {
    if (!user?.token) {
      toast.error('Not authenticated');
      return;
    }
      try {
        setConfirming(true);
        console.log('[ProofOfLifeCheck] clicking confirm, tokenLen=', String(user.token).length);
        const resp = await activateProofOfLife(user.token);
        console.log('[ProofOfLifeCheck] activateProofOfLife response', resp);
        toast.success('Proof-of-Life confirmed');
        // notify dashboard to refresh via PlanContext
        try {
          emitPlansUpdated?.(resp);
        } catch (e) {
          console.warn('Could not emit plans updated via context', e);
        }
        if (open && onClose) {
          onClose();
        } else {
          navigate(-1);
        }
    } catch (err) {
      console.error('ProofOfLifeCheck activate error', err);
      toast.error('Failed to confirm proof-of-life');
    } finally {
      setConfirming(false);
    }
  };

  const [confirming, setConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [hasActivePlan, setHasActivePlan] = useState(false);

  useEffect(() => {
    // Fetch active plan from backend and initialize countdown
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        const plan = await getActiveProofPlan(user?.token);
        if (!mounted) return;
        
        if (!plan) {
          setHasActivePlan(false);
          setIsLoading(false);
          return;
        }
        console.log('[ProofOfLifeCheck] active plan', plan);
        // determine last active timestamp
        const baseTs = Number(plan.last_active_at ?? plan.created_at ?? 0);
        const inactivityDays = Number(plan.inactivity_period_days ?? plan.inactivityPeriodDays ?? 0);
        const graceDays = Number(plan.grace_period ?? plan.gracePeriod ?? 0);
        if (baseTs && (inactivityDays || graceDays)) {
          const expirySec = baseTs + (inactivityDays + graceDays) * 24 * 60 * 60;
          const remainingMs = expirySec * 1000 - Date.now();
          if (remainingMs > 0) {
            const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
            setTimeRemaining({ days, hours, minutes, seconds });
            setHasActivePlan(true);
          }
        }
        setIsLoading(false);
      } catch (err) {
        console.warn('Could not fetch active proof plan', err);
        setHasActivePlan(false);
        setIsLoading(false);
      }
    })();

    const interval = setInterval(() => {
      if (!hasActivePlan) return;
      
      setTimeRemaining((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasActivePlan]);

  // Handle Escape to close and manage focus trap when modal is open
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose && onClose();
      }
    };
    window.addEventListener("keydown", onKey);

    // Focus management: save previous focused element and focus modal
    const previousActive = document.activeElement as HTMLElement | null;
    const focusWithin = () => {
      try {
        const el = modalRef.current;
        if (!el) return;
        const focusable = el.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && focusable.length > 0) {
          focusable[0].focus();
        } else {
          el.focus();
        }
      } catch (e) {
        // ignore
      }
    };
    // small timeout to ensure element is mounted
    const t = window.setTimeout(focusWithin, 0);

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const el = modalRef.current;
      if (!el) return;
      const focusable = Array.from(el.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )).filter((f) => f.offsetParent !== null);
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement;
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    };

    window.addEventListener("keydown", onTab);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keydown", onTab);
      clearTimeout(t);
      try {
        previousActive?.focus?.();
      } catch (e) {}
    };
  }, [open, onClose]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-white [font-family:'Manrope',Helvetica]">
      {/* backdrop does not capture pointer events so background can still be scrolled */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="relative w-full max-w-2xl mx-4 pointer-events-auto">
        <div ref={modalRef} role="dialog" aria-labelledby="pol-title" aria-modal="false" tabIndex={-1} className="border-t-4 border-[#EC7813] rounded-lg p-8 bg-[#2E261C] relative">
          {/* close button */}
          <button aria-label="Close proof of life modal" onClick={() => onClose && onClose()} className="absolute top-3 right-3 text-[#B9B09D] hover:text-white">✕</button>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#FF66001A] rounded-full flex items-center justify-center">
                <img src={alarmBuzzOrangeIcon} className="w-6 h-6" alt="Alarm Buzz" />
              </div>
            </div>

            <h2 id="pol-title" className="text-2xl font-bold text-center mb-2">Proof-of-Life Check</h2>

            <div className="rounded-lg p-3 mb-4">
              <p className="text-[#CBD5E1] leading-relaxed text-sm text-center">
                Please confirm that you are active. Failure to respond within the deadline below will initiate your inheritance protocol.
              </p>
            </div>

            <div className="mb-6">
              <div className="gap-3 bg-[#181411] border border-[#393128] rounded-lg p-4">
                <p className="text-[#B8A194] text-center mb-3">Time Remaining</p>
                {isLoading ? (
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1 bg-[#393128] rounded-lg p-4 animate-pulse h-12"></div>
                      <div className="text-sm text-[#B8A194]">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1 bg-[#393128] rounded-lg p-4 animate-pulse h-12"></div>
                      <div className="text-sm text-[#B8A194]">Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1 bg-[#393128] rounded-lg p-4 animate-pulse h-12"></div>
                      <div className="text-sm text-[#B8A194]">Mins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1 bg-[#393128] rounded-lg p-4 animate-pulse h-12"></div>
                      <div className="text-sm text-[#B8A194]">Secs</div>
                    </div>
                  </div>
                ) : hasActivePlan ? (
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1 bg-[#393128] rounded-lg p-4">{String(timeRemaining.days).padStart(2, "0")}</div>
                      <div className="text-sm text-[#B8A194]">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1 bg-[#393128] rounded-lg p-4">{String(timeRemaining.hours).padStart(2, "0")}</div>
                      <div className="text-sm text-[#B8A194]">Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1 bg-[#393128] rounded-lg p-4">{String(timeRemaining.minutes).padStart(2, "0")}</div>
                      <div className="text-sm text-[#B8A194]">Mins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl text-[#FF6600] font-bold mb-1 bg-[#393128] rounded-lg p-4">{String(timeRemaining.seconds).padStart(2, "0")}</div>
                      <div className="text-sm text-[#B8A194]">Secs</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-[#B8A194] text-center">No current Proof-of-Life check scheduled.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onConfirmLife}
                disabled={confirming || !hasActivePlan || isLoading}
                className={`w-full ${confirming || !hasActivePlan || isLoading ? 'opacity-60 cursor-not-allowed' : 'bg-[#FF6600] hover:bg-orange-700'} text-white py-3 rounded-lg font-bold transition flex gap-3 items-center justify-center`}
              >
                <img src={thumbprintIcon} className="w-5 h-5" alt="Thumbprint" />
                <span>{isLoading ? 'Loading...' : confirming ? 'Confirming...' : 'Confirm Life'}</span>
              </button>
              <button
                onClick={() => onClose ? onClose() : navigate(-1)}
                className="w-full bg-transparent border border-[#63564B] hover:border-gray-600 text-white py-3 rounded-lg font-medium transition"
              >
                Later
              </button>
            </div>
              <p className="text-sm text-[#B8A194] text-center mt-6 flex items-center justify-center gap-4"><span>Secured CIP X TEE</span></p>

          </div>
        </div>
    </div>
  );
}
