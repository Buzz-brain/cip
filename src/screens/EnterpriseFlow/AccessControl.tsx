import {
  Grid3x3 as Grid3X3,
  Users,
  BookOpen,
  Lock,
  Search,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
  Shield,
  AlertTriangle,
} from "lucide-react";

interface AccessControlProps {
  onBackToDashboard?: () => void;
  onLogout?: () => void;
}

export const AccessControl = ({
  onBackToDashboard = () => {},
}: AccessControlProps): JSX.Element => {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      <aside className="w-48 bg-slate-950 text-white p-6 flex flex-col border-r border-slate-800">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">CIP</span>
          </div>
          <div>
            <p className="font-bold text-sm">CIP B2B</p>
            <p className="text-xs text-slate-400">TrustWallet</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <button
            onClick={onBackToDashboard}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm"
          >
            <Grid3X3 className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <Users className="w-4 h-4" />
            <span>Client Management</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <BookOpen className="w-4 h-4" />
            <span>Inheritance Plans</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-orange-500 bg-orange-500/10 rounded text-sm font-medium">
            <Lock className="w-4 h-4" />
            <span>Access Control</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <BookOpen className="w-4 h-4" />
            <span>Audit Logs</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <Grid3X3 className="w-4 h-4" />
            <span>API & Developer</span>
          </button>
        </nav>

        <div className="border-t border-slate-800 pt-4 mt-4">
          <p className="text-xs text-slate-500 px-3 mb-3 font-semibold">
            Systems
          </p>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Protocol Active</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-xs">Nodes Synced (12/12)</span>
          </button>
        </div>

        <div className="border-t border-slate-800 pt-4 mt-4 space-y-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white transition text-sm">
            <Users className="w-4 h-4" />
            <span>Support</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-slate-900 flex flex-col">
        <div className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search users, roles, or policies..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" />
            <Settings className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" />
            <div className="flex items-center gap-2 pl-4 border-l border-slate-700">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                T
              </div>
              <div className="text-sm">
                <p className="text-white font-medium">Thomas K.</p>
                <p className="text-slate-400 text-xs">Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
              <span>Enterprise</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Access Control</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Team Access & Permissions
                </h1>
                <p className="text-slate-400 text-sm">
                  Manage user roles, granular permissions, and security settings
                  for your organization members.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded text-sm font-medium transition border border-slate-600">
                  <Shield className="w-4 h-4" />
                  <span>Security Policy</span>
                </button>
                <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm font-medium transition">
                  <span>+ Add User</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800 rounded border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm font-medium">
                  Total Users
                </p>
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-4xl font-bold text-white">24</p>
            </div>

            <div className="bg-slate-800 rounded border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm font-medium">
                  Administrators
                </p>
                <Shield className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-4xl font-bold text-white">3</p>
            </div>

            <div className="bg-slate-800 rounded border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm font-medium">
                  2FA Enforced
                </p>
                <Lock className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-4xl font-bold text-white">100%</p>
            </div>

            <div className="bg-slate-800 rounded border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm font-medium">
                  Pending Invites
                </p>
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-4xl font-bold text-white">2</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded border border-slate-700 mb-6">
            <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-white">
                  Authorized Users
                </h2>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium rounded transition">
                    All (26)
                  </button>
                  <button className="px-3 py-1 text-slate-400 hover:text-white text-xs font-medium">
                    Admins (3)
                  </button>
                  <button className="px-3 py-1 text-slate-400 hover:text-white text-xs font-medium">
                    Editors (12)
                  </button>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter users..."
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    User Details
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    Role
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    Granular Permissions
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    MFA Status
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-medium text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr className="hover:bg-slate-700/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        T
                      </div>
                      <div>
                        <p className="text-white font-medium">Thomas K.</p>
                        <p className="text-slate-500 text-xs">
                          thomas@apex.ent
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded text-xs font-medium">
                      <Shield className="w-3 h-3" />
                      Admin
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        Full Access
                      </span>
                      <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        Billing
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Enabled
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 hover:text-white text-xs font-medium cursor-pointer">
                    Edit
                  </td>
                </tr>

                <tr className="hover:bg-slate-700/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        S
                      </div>
                      <div>
                        <p className="text-white font-medium">Sarah M.</p>
                        <p className="text-slate-500 text-xs">sarah@apex.ent</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 bg-orange-600 text-white px-3 py-1 rounded text-xs font-medium">
                      <Users className="w-3 h-3" />
                      Manager
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        Manage Clients
                      </span>
                      <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        Create Plans
                      </span>
                      <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        View Logs
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Enabled
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 hover:text-white text-xs font-medium cursor-pointer">
                    Edit
                  </td>
                </tr>

                <tr className="hover:bg-slate-700/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        D
                      </div>
                      <div>
                        <p className="text-white font-medium">David L.</p>
                        <p className="text-slate-500 text-xs">david@apex.ent</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 bg-orange-600 text-white px-3 py-1 rounded text-xs font-medium">
                      Editor
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        Create Plans
                      </span>
                      <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        Edit Drafts
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Enabled
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-orange-400 text-xs">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      Away
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 hover:text-white text-xs font-medium cursor-pointer">
                    Edit
                  </td>
                </tr>

                <tr className="hover:bg-slate-700/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        J
                      </div>
                      <div>
                        <p className="text-white font-medium">Jessica W.</p>
                        <p className="text-slate-500 text-xs">
                          jessica@apex.ent
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 bg-slate-700 text-slate-300 px-3 py-1 rounded text-xs font-medium">
                      <Lock className="w-3 h-3" />
                      Viewer
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        View Client Data
                      </span>
                      <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                        Read Reports
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                      Setup Req.
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                      Invited
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 hover:text-white text-xs font-medium cursor-pointer">
                    Edit
                  </td>
                </tr>

                <tr className="hover:bg-slate-700/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        M
                      </div>
                      <div>
                        <p className="text-white font-medium">Michael R.</p>
                        <p className="text-slate-500 text-xs">
                          michael@apex.ent
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 bg-red-700 text-white px-3 py-1 rounded text-xs font-medium">
                      Restricted
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-slate-400 text-xs">
                      Access Revoked on 12/08/2023
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-slate-400 text-xs">N/A</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-red-400 text-xs">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      Suspended
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 hover:text-white text-xs font-medium cursor-pointer">
                    Edit
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="border-t border-slate-700 px-6 py-4 text-sm text-slate-400">
              Showing 1-5 of 26 users
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded border border-slate-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-white">
                  Role Permissions Guide
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-white font-medium text-sm mb-1">
                    Administrator
                  </p>
                  <p className="text-slate-400 text-xs">
                    Full access to all settings, billing, user management, and
                    security logs. Can invite new members.
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Manager</p>
                  <p className="text-slate-400 text-xs">
                    Can manage client accounts, create inheritance plans, and
                    view billing access.
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Viewer</p>
                  <p className="text-slate-400 text-xs">
                    Read-only access to specific client data and reports. Cannot
                    modify plans or settings
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-600/10 rounded border border-orange-600 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Need Custom Roles?
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Enterprise clients can define custom roles with specific
                granular permissions to match your organization's compliance
                structure.
              </p>
              <button className="bg-white text-orange-600 hover:bg-slate-100 px-4 py-2 rounded text-sm font-medium transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
