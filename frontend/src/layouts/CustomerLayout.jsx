const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\layouts\\CustomerLayout.tsx";import React, { } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  TicketCheck,
  LogOut,

  UserCheck,
  ShieldCheck,

} from "lucide-react";

export default function CustomerLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard Overview", path: "/customer/dashboard", icon: React.createElement(LayoutDashboard, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 20}} ) },
    { label: "My Quotations", path: "/customer/quotations", icon: React.createElement(FileText, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}} ) },
    { label: "My Invoices & Payments", path: "/customer/invoices", icon: React.createElement(CreditCard, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 22}} ) },
    { label: "Support Tickets", path: "/customer/tickets", icon: React.createElement(TicketCheck, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 23}} ) },
  ];

  return (
    React.createElement('div', { className: "min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}}
      /* Header */
      , React.createElement('header', { className: "h-16 border-b border-rose-500/10 bg-[#0d1322]/80 backdrop-blur-xl sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}
        , React.createElement(Link, { to: "/", className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}
          , React.createElement('div', { className: "w-9 h-9 rounded-xl bg-[#FF5349] flex items-center justify-center shadow-lg shadow-[#FF5349]/30"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}
            , React.createElement(ShieldCheck, { size: 20, className: "text-white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}} )
          )
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}
            , React.createElement('span', { className: "font-heading font-extrabold text-lg text-white tracking-wide"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}, "SPESHWAY")
            , React.createElement('span', { className: "text-[10px] block text-rose-400 font-mono tracking-widest uppercase font-semibold"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}, "Customer Portal" )
          )
        )

        , React.createElement('div', { className: "flex items-center gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}
          , React.createElement(Link, {
            to: "/admin/dashboard",
            className: "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-rose-400 border border-rose-500/30 text-xs font-semibold hover:bg-blue-600/30 transition-all"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
, "Switch to Admin View →"

          )
          , React.createElement('div', { className: "flex items-center gap-2 p-1 rounded-xl border border-rose-500/20 bg-rose-950/20 px-3 py-1.5"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}
            , React.createElement(UserCheck, { size: 16, className: "text-rose-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}} )
            , React.createElement('span', { className: "text-xs font-medium text-slate-200"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, "Client Workspace" )
          )
        )
      )

      , React.createElement('div', { className: "flex flex-1 overflow-hidden"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
        /* Sidebar */
        , React.createElement('aside', { className: "w-64 bg-[#0a0f1c] border-r border-rose-500/10 p-4 flex flex-col justify-between hidden md:flex shrink-0"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}
          , React.createElement('div', { className: "space-y-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}
            , React.createElement('div', { className: "px-3 py-2 text-[10px] font-bold text-rose-400/70 font-mono tracking-wider uppercase"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}, "Customer Workspace"

            )
            , navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                React.createElement(Link, {
                  key: item.path,
                  to: item.path,
                  className: `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#FF5349] text-white font-bold shadow-lg shadow-[#FF5349]/20 border border-[#FF5349]/30"
                      : "text-slate-400 hover:text-slate-100 hover:bg-rose-500/10"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}

                  , React.createElement('span', { className: isActive ? "text-white" : "text-slate-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}, item.icon)
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}, item.label)
                )
              );
            })
          )

          , React.createElement('div', { className: "pt-4 border-t border-rose-500/10"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}
            , React.createElement(Link, {
              to: "/",
              className: "w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-all"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}

              , React.createElement(LogOut, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}} ), " Exit Portal"
            )
          )
        )

        /* Main Content Area */
        , React.createElement('main', { className: "flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-[#060912] via-[#090e1a] to-[#04060d]"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
          , React.createElement(Outlet, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 92}} )
        )
      )
    )
  );
}

