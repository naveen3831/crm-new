import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  TicketCheck,
  LogOut,
  Sparkles,
  UserCheck,
  ShieldCheck,
  ChevronDown
} from "lucide-react";

export default function CustomerLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard Overview", path: "/customer/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "My Quotations", path: "/customer/quotations", icon: <FileText size={18} /> },
    { label: "My Invoices & Payments", path: "/customer/invoices", icon: <CreditCard size={18} /> },
    { label: "Support Tickets", path: "/customer/tickets", icon: <TicketCheck size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-rose-500/10 bg-[#0d1322]/80 backdrop-blur-xl sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#FF5349] flex items-center justify-center shadow-lg shadow-[#FF5349]/30">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-lg text-white tracking-wide">SPESHWAY</span>
            <span className="text-[10px] block text-rose-400 font-mono tracking-widest uppercase font-semibold">Customer Portal</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/admin/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-rose-400 border border-rose-500/30 text-xs font-semibold hover:bg-blue-600/30 transition-all"
          >
            Switch to Admin View →
          </Link>
          <div className="flex items-center gap-2 p-1 rounded-xl border border-rose-500/20 bg-rose-950/20 px-3 py-1.5">
            <UserCheck size={16} className="text-rose-400" />
            <span className="text-xs font-medium text-slate-200">Client Workspace</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#0a0f1c] border-r border-rose-500/10 p-4 flex flex-col justify-between hidden md:flex shrink-0">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold text-rose-400/70 font-mono tracking-wider uppercase">
              Customer Workspace
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#FF5349] text-white font-bold shadow-lg shadow-[#FF5349]/20 border border-[#FF5349]/30"
                      : "text-slate-400 hover:text-slate-100 hover:bg-rose-500/10"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-slate-400"}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-rose-500/10">
            <Link
              to="/"
              className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-all"
            >
              <LogOut size={16} /> Exit Portal
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-[#060912] via-[#090e1a] to-[#04060d]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

