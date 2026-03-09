import { Link } from "react-router-dom";
import { ReactNode } from "react";

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
}

export const Navbar = ({
  logo,
  brand = "CIP",
  navItems = [],
  rightActions,
  headerClassName = "bg-[#0d0501] border-b border-[#483423]",
  navHeight = "h-16",
  logoClassName = "h-[45px] object-cover",
}: NavbarProps) => {
  return (
    <header className={headerClassName}>
      <div className="container mx-auto px-4">
        <nav className={`flex items-center justify-between ${navHeight}`}>
          <div className="flex items-center gap-1">
            <div>
              {logo ? <img src={logo} alt="Logo" className={logoClassName} /> : null}
            </div>
            <span className="[font-family:'Space_Grotesk',Helvetica] text-[19.4px] font-bold text-white">
              {brand}
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="[font-family:'Noto_Sans',Helvetica] font-medium text-slate-300 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="[font-family:'Noto_Sans',Helvetica] font-medium text-slate-300 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>

            <div>{rightActions ?? null}</div>
          </div>
        </nav>
      </div>
    </header>
  );
};
