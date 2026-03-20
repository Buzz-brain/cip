import { Search, LogOut } from "lucide-react";

interface ClientManagementProps {
  onBackToDashboard?: () => void;
  onLogout?: () => void;
}

export const ClientManagement = ({
  onBackToDashboard = () => {},
  onLogout = () => {},
}: ClientManagementProps): JSX.Element => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-6 h-6 bg-orange-500 rounded"></div>
          <span className="font-bold text-lg">CIP PROTOCOL</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={onBackToDashboard}
            className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition"
          >
            Dashboard
          </button>
          <button className="w-full text-left px-4 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-medium transition">
            Client Management
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition">
            Reports
          </button>
          <button className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition">
            Settings
          </button>
        </nav>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Client Management
          </h1>
          <p className="text-slate-600 mt-1">
            Manage and monitor all your enterprise clients
          </p>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search clients by name, ID, or entity..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">
                    Entity Name
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">
                    Client ID
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">
                    Plan Type
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">
                    Assets Managed
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-6 text-slate-900 font-medium">
                    Acme Corporation
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono">
                    CLI-001847
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-xs font-medium">
                      Premium
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">$4.2M</td>
                  <td className="py-4 px-6">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-medium">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-xs">
                      View
                    </button>
                  </td>
                </tr>

                <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-6 text-slate-900 font-medium">
                    Global Tech Inc
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono">
                    CLI-002541
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-medium">
                      Enterprise
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">$8.7M</td>
                  <td className="py-4 px-6">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-medium">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-xs">
                      View
                    </button>
                  </td>
                </tr>

                <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-6 text-slate-900 font-medium">
                    Innovation Labs
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono">
                    CLI-003156
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded text-xs font-medium">
                      Professional
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">$2.1M</td>
                  <td className="py-4 px-6">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-xs font-medium">
                      Pending
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-xs">
                      View
                    </button>
                  </td>
                </tr>

                <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-6 text-slate-900 font-medium">
                    Digital Solutions Ltd
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono">
                    CLI-004289
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-xs font-medium">
                      Premium
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">$5.3M</td>
                  <td className="py-4 px-6">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-medium">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-xs">
                      View
                    </button>
                  </td>
                </tr>

                <tr className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-6 text-slate-900 font-medium">
                    Finance Partners Group
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono">
                    CLI-005672
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-medium">
                      Enterprise
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">$12.1M</td>
                  <td className="py-4 px-6">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-medium">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-xs">
                      View
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 transition">
                  <td className="py-4 px-6 text-slate-900 font-medium">
                    NextGen Ventures
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono">
                    CLI-006834
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded text-xs font-medium">
                      Professional
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">$1.8M</td>
                  <td className="py-4 px-6">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-medium">
                      Inactive
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-xs">
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-600">Showing 6 of 42 clients</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition">
                Previous
              </button>
              <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
