import { Link } from "react-router-dom";
import { ReactNode, MouseEvent, useState, useEffect } from "react";

export type NavItem = {
  label: string;
  href: string;
};

interface NavbarProps {
  logo?: string;
  brand?: string;
  navItems?: NavItem[];
  rightActions?: ReactNode;
  headerClassName?: string;
  navHeight?: string;
  logoClassName?: string;
  logoHref?: string;
}

export const Navbar = ({
  logo,
  // brand = "CIP",
  navItems = [],
  rightActions,
  headerClassName = "bg-[#0d0501] border-b border-[#483423]",
  navHeight = "h-16",
  logoClassName = "h-[45px] object-cover",
  logoHref = "/onboarding/step-one",
}: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  return (
    <header className={headerClassName}>
      <div className="container mx-auto px-4">
        <nav className={`flex items-center justify-between ${navHeight}`}>
          <div className="flex items-center gap-1">
            <div>
              {logo ? (
                window.location.pathname === logoHref ? (
                  <button onClick={() => window.location.reload()}>
                    <img src={logo} alt="Logo" className={logoClassName} />
                  </button>
                ) : (
                  <Link to={logoHref}>
                    <img src={logo} alt="Logo" className={logoClassName} />
                  </Link>
                )
              ) : null}
            </div>
            {/* <span className="[font-family:'Space_Grotesk',Helvetica] text-[19.4px] font-bold text-white">
              {brand}
            </span> */}
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                if (item.href.startsWith("/")) {
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="[font-family:'Noto_Sans',Helvetica] font-medium text-slate-300 text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  );
                } else if (item.href.startsWith("#")) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="[font-family:'Noto_Sans',Helvetica] font-medium text-slate-300 text-sm hover:text-white transition-colors"
                      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        const id = item.href.replace("#", "");
                        const el = document.getElementById(id);
                        if (el) {
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  );
                } else {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="[font-family:'Noto_Sans',Helvetica] font-medium text-slate-300 text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  );
                }
              })}
            </div>

            <div className="md:hidden">
              <button
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((s) => !s)}
                className="p-2 rounded-md text-slate-300 hover:text-white focus:outline-none"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {menuOpen ? (
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M3 7h18M3 12h18M3 17h18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </button>
            </div>
            <div className="hidden md:block">{rightActions ?? null}</div>
          </div>
        </nav>

        <div
          className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
              menuOpen ? "opacity-60" : "opacity-0"
            }`}
            onClick={() => setMenuOpen(false)}
          />

          <div
            className={`absolute top-0 left-0 w-3/4 max-w-xs h-full bg-[#0d0501] p-6 shadow-lg transform transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                {logo ? (
                  <Link to={logoHref} onClick={() => setMenuOpen(false)}>
                    <img src={logo} alt="Logo" className={logoClassName} />
                  </Link>
                ) : null}
              </div>
            </div>

            <nav className="mt-6 flex flex-col gap-4">
              {navItems.map((item) => {
                if (item.href.startsWith("/")) {
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-medium text-slate-200"
                    >
                      {item.label}
                    </Link>
                  );
                } else if (item.href.startsWith("#")) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="font-medium text-slate-200"
                      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        const id = item.href.replace("#", "");
                        const el = document.getElementById(id);
                        if (el)
                          el.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        setMenuOpen(false);
                      }}
                    >
                      {item.label}
                    </a>
                  );
                } else {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-medium text-slate-200"
                    >
                      {item.label}
                    </a>
                  );
                }
              })}
            </nav>

            <div className="mt-6">{rightActions ?? null}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
