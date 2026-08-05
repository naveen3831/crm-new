import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FolderKanban,
  TrendingUp,
  CreditCard,
  DollarSign,
  Receipt,
  UserCheck,
  UserCog,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown
} from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDropdown, setUserDropdown] = useState(false);

  // Navigation categories intentionally left empty to remove Overview, CRM Management,
  // Projects Workspace and Corporate Management links from the admin sidebar.
  const navCategories: any[] = [];

  const hideSidebar = ["/admin/quotations", "/admin/invoices", "/admin/proposals"].some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans antialiased selection:bg-[#4F46E5] selection:text-white">
      {/* Sidebar */}
      {!hideSidebar && (
        <aside className="w-64 bg-[#0F172A] text-white p-5 flex flex-col justify-between hidden md:flex shrink-0 border-r border-slate-800/60 shadow-xl">
          <div>
            {/* Top Brand Logo */}
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 rounded-2xl bg-[#FF5349] p-0.5 shadow-lg shadow-[#FF5349]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-[#6366F1] rotate-45 flex items-center justify-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-heading font-black text-xl text-white tracking-tight leading-none">CRM</div>
                <div className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1 leading-tight">
                  CUSTOMER RELATIONSHIP MANAGEMENT
                </div>
                <div className="text-[7px] font-mono text-indigo-400 tracking-widest uppercase mt-0.5">SINCE 2026</div>
              </div>
            </Link>

            {/* Categorized Navigation Groups */}
            <div className="space-y-6">
              {navCategories.map((group) => (
                <div key={group.category} className="space-y-1.5">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.path || (item.path.includes("tab=") && location.search.includes(item.path.split("tab=")[1]));
                    return (
                      <Link
                        key={item.label}
                        to={item.path}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 [&>span>svg]:text-current [&>span>svg]:w-4 [&>span>svg]:h-4 ${
                          isActive
                            ? "bg-[#FF5349] !text-white shadow-lg shadow-[#FF5349]/30 scale-[1.02]"
                            : "!text-slate-300 hover:!text-white hover:bg-slate-800/60"
                        }`}
                      >
                        <span className={isActive ? "!text-white" : "!text-indigo-400"}>{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Floating White User Card */}
          <div className="pt-6 border-t border-slate-800/60">
            <div className="bg-white rounded-2xl p-3 shadow-md border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#0F172A] text-white font-black flex items-center justify-center text-xs shrink-0 shadow-sm">
                  AD
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-slate-900 truncate leading-tight">Admin Operator</p>
                  <p className="text-[10px] text-slate-500 font-medium truncate leading-tight">Super Admin Account</p>
                </div>
              </div>
              <button 
                onClick={() => navigate("/auth/login")}
                title="Log Out"
                className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors shrink-0"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Right Column Layout */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="bg-white/80 backdrop-blur-md px-6 lg:px-8 py-4 flex items-center justify-between gap-4 border-b border-slate-200/80 shrink-0 sticky top-0 z-30">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Welcome back, <span className="text-[#4F46E5]">Admin Operator</span> 👋
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Here's what's happening with your CRM today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input Box */}
            <div className="relative hidden sm:block w-72">
              <Search className="absolute left-3.5 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search clients, projects, leads..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:bg-white focus:ring-2 focus:ring-indigo-500/20 shadow-xs transition-all"
              />
            </div>

            {/* Notification Bell */}
            <button className="relative w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-xs transition-colors">
              <Bell size={17} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4F46E5] text-white text-[9px] font-black flex items-center justify-center">
                1
              </span>
            </button>

            {/* Settings Gear */}
            <button 
              onClick={() => navigate("/admin/settings")}
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-sm transition-colors"
            >
              <Settings size={17} />
            </button>

            {/* Avatar Pill */}
            <div className="w-9 h-9 rounded-xl bg-[#06132D] text-white font-black flex items-center justify-center text-xs shadow-sm">
              AD
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#F4F7FC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

