
interface ToggleBillingProps {
  value: boolean; // true = yearly, false = monthly
  onChange: (v: boolean) => void;
  className?: string;
}

export const ToggleBilling = ({ value, onChange, className }: ToggleBillingProps) => {
  return (
    <div className={`relative w-full max-w-xs mx-auto ${className ?? ""}`}>
      <div className="bg-[#32241a] border border-[#554233] rounded-full p-1">
        <div className="relative">
          <div
            className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] bg-[#ff6600] rounded-full transition-transform duration-200 ${
              value ? "translate-x-full" : "translate-x-0"
            }`}
          />
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => onChange(false)}
              className={`relative z-10 w-1/2 text-sm py-2 text-center [font-family:'Manrope',Helvetica] transition-colors ${
                value ? "text-[#b8a494]" : "text-white font-bold"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => onChange(true)}
              className={`relative z-10 w-1/2 text-sm py-2 text-center [font-family:'Manrope',Helvetica] transition-colors ${
                value ? "text-white font-bold" : "text-[#b8a494]"
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
