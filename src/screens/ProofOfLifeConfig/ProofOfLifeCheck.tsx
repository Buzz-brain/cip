import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoImg from "@assets/cip-logo.svg";
import alarmBuzzOrangeIcon from "@assets/alarm-buzz-orange.svg";
import thumbprintIcon from "@assets/thumbprint.svg";

export const ProofOfLifeCheck = (): JSX.Element => {
  const navigate = useNavigate();

  const onConfirmLife = () => {
    navigate("/proof-of-life-check-missed");
  };

  const [timeRemaining, setTimeRemaining] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
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
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#221810] text-white [font-family:'Manrope',Helvetica]">
      {/* <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-amber-950/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-amber-950/20 rounded-full blur-3xl"></div> */}

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
            Assets
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Beneficiaries
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300 text-sm">
            Settings
          </a>
          <div className="w-9 h-9 bg-gray-400 rounded-full"></div>
        </nav>
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-73px)] mt-20 px-8">
        <div className="w-full max-w-2xl mb-20">

          <div className="border-t-4 border-[#EC7813] rounded-lg p-12 bg-[#2E261C] to-transparent">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-[#FF66001A] rounded-full flex items-center justify-center">
                <img src={alarmBuzzOrangeIcon} className="w-7 h-7" alt="Alarm Buzz" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-center mb-2">
              Proof-of-Life Check
            </h1>

            <div className="rounded-lg p-4">
              <p className="text-[#CBD5E1] leading-relaxed mb-4">
                Please confirm that you are active. Failure to respond within the deadline below will automatically initiate your inheritance protocol distribution.
              </p>
            </div>

            <div className="mb-8">
              <div className="gap-3 bg-[#181411] border border-[#393128] rounded-lg p-6">
                <p className="text-[#B8A194] text-center mb-4 flex items-center justify-center gap-2">
                  Time Remaining
                </p>


                <div className="grid grid-cols-4 gap-6">

                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2 bg-[#393128] rounded-lg p-5">
                      {String(timeRemaining.days).padStart(2, "0")}
                    </div>

                    <div className="text-sm text-[#B8A194]">Days</div>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2 bg-[#393128] rounded-lg p-5">
                      {String(timeRemaining.hours).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-[#B8A194]">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2 bg-[#393128] rounded-lg p-5">
                      {String(timeRemaining.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-[#B8A194]">Mins</div>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl text-[#FF6600] font-bold mb-2 bg-[#393128] rounded-lg p-5">
                      {String(timeRemaining.seconds).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-[#B8A194]">Secs</div>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex gap-3">

              <button
                onClick={onConfirmLife}
                className="w-full bg-[#FF6600] hover:bg-orange-700 text-white py-4 rounded-lg font-bold transition flex gap-3 items-center justify-center"
              >
                <img src={thumbprintIcon} className="w-5 h-5" alt="Thumbprint" />
                <span>Confirm Life</span>
              </button>
              <button
                onClick={onConfirmLife}
                className="w-full bg-transparent border border[#63564B] hover:border-gray-600 text-white py-3 rounded-lg font-medium transition"
              >
                Remind Me Later
              </button>
            </div>


            <p className="text-sm text-[#B8A194] text-center mt-6 flex items-center justify-center gap-4">
              <span>Secured CIP X TEE</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
