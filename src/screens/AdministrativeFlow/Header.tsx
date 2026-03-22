import { Search, Bell, User } from "lucide-react";

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
}: HeaderProps) {
  return (
    <div className="bg-[#0f0c0a] border-b border-[#2a2520] px-8 py-4">
      <div className="flex items-center justify-between">
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

        <div className="flex items-center gap-4">
          {rightContent || (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search data..."
                  className="bg-[#1a1510] border border-[#2a2520] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-600 w-64"
                />
              </div>
              <button className="relative p-2 bg-[#1a1510] border border-[#2a2520] rounded-lg hover:border-orange-600 transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 bg-[#1a1510] border border-[#2a2520] rounded-lg hover:border-orange-600 transition-colors">
                <User className="w-5 h-5 text-gray-400" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
