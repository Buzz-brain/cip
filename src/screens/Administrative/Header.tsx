import { Search, Bell, User, Menu } from "lucide-react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBreadcrumb?: boolean;
  breadcrumbItems?: string[];
  rightContent?: React.ReactNode;
}

export function Header({
  title,
  subtitle,
  showBreadcrumb,
  breadcrumbItems,
  rightContent,
  onToggleMenu,
}: HeaderProps & { onToggleMenu?: () => void }) {
  return (
    <div className="bg-[#0f0c0a] border-b border-[#2a2520] px-4 sm:px-8 py-4">
      <div className="flex items-center">
        <div className="flex items-center w-full justify-between">
          <button
            onClick={onToggleMenu}
            className="sm:hidden p-2 mr-3 rounded-lg bg-[#1a1510] border border-[#2a2520] text-gray-300"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            {showBreadcrumb && breadcrumbItems && (
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                {breadcrumbItems.map((item, index) => (
                  <span key={index}>
                    {index > 0 && <span className="mx-2">/</span>}
                    {item}
                  </span>
                ))}
              </div>
            )}
            {title && (
              <h1 className="text-white text-xl font-semibold">{title}</h1>
            )}
            {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
