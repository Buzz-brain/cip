import { Link } from "react-router-dom";
import { ReactNode, MouseEvent } from "react";

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
  brand = "CIP",
  navItems = [],
  rightActions,
  headerClassName = "bg-[#0d0501] border-b border-[#483423]",
  navHeight = "h-16",
  logoClassName = "h-[45px] object-cover",
  logoHref = "/onboarding/step-one",
}: NavbarProps) => {
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
            <span className="[font-family:'Space_Grotesk',Helvetica] text-[19.4px] font-bold text-white">
              {brand}
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
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
                        const id = item.href.replace('#', '');
                        const el = document.getElementById(id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

            <div>{rightActions ?? null}</div>
          </div>
        </nav>
      </div>
    </header>
  );
};
