const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\layouts\\AdminLayout.tsx";import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {










  Settings,
  LogOut,
  Bell,
  Search,

} from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDropdown, setUserDropdown] = useState(false);

  // Navigation categories intentionally left empty to remove Overview, CRM Management,
  // Projects Workspace and Corporate Management links from the admin sidebar.
  const navCategories = [];

  const hideSidebar = ["/admin/quotations", "/admin/invoices", "/admin/proposals"].some(path => location.pathname.startsWith(path));

  return (
    React.createElement('div', { className: "min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans antialiased selection:bg-[#4F46E5] selection:text-white"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
      /* Sidebar */
      , !hideSidebar && (
        React.createElement('aside', { className: "w-64 bg-[#0F172A] text-white p-5 flex flex-col justify-between hidden md:flex shrink-0 border-r border-slate-800/60 shadow-xl"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}
            /* Top Brand Logo */
            , React.createElement(Link, { to: "/", className: "flex items-center gap-3 mb-8 group"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}
              , React.createElement('div', { className: "w-10 h-10 rounded-2xl bg-[#FF5349] p-0.5 shadow-lg shadow-[#FF5349]/30 flex items-center justify-center group-hover:scale-105 transition-transform"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}
                , React.createElement('div', { className: "w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
                  , React.createElement('div', { className: "w-5 h-5 border-2 border-[#6366F1] rotate-45 flex items-center justify-center"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}
                    , React.createElement('div', { className: "w-2 h-2 bg-indigo-400 rounded-full"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}})
                  )
                )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}
                , React.createElement('div', { className: "font-heading font-black text-xl text-white tracking-tight leading-none"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}, "CRM")
                , React.createElement('div', { className: "text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1 leading-tight"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}, "CUSTOMER RELATIONSHIP MANAGEMENT"

                )
                , React.createElement('div', { className: "text-[7px] font-mono text-indigo-400 tracking-widest uppercase mt-0.5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}, "SINCE 2026" )
              )
            )

            /* Categorized Navigation Groups */
            , React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}
              , navCategories.map((group) => (
                React.createElement('div', { key: group.category, className: "space-y-1.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}}
                  , group.items.map((item) => {
                    const isActive = location.pathname === item.path || (item.path.includes("tab=") && location.search.includes(item.path.split("tab=")[1]));
                    return (
                      React.createElement(Link, {
                        key: item.label,
                        to: item.path,
                        className: `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 [&>span>svg]:text-current [&>span>svg]:w-4 [&>span>svg]:h-4 ${
                          isActive
                            ? "bg-[#FF5349] !text-white shadow-lg shadow-[#FF5349]/30 scale-[1.02]"
                            : "!text-slate-300 hover:!text-white hover:bg-slate-800/60"
                        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}

                        , React.createElement('span', { className: isActive ? "!text-white" : "!text-indigo-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}}, item.icon)
                        , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}, item.label)
                      )
                    );
                  })
                )
              ))
            )
          )

          /* Bottom Floating White User Card */
          , React.createElement('div', { className: "pt-6 border-t border-slate-800/60"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}
            , React.createElement('div', { className: "bg-white rounded-2xl p-3 shadow-md border border-slate-100 flex items-center justify-between"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}
              , React.createElement('div', { className: "flex items-center gap-2.5 min-w-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}
                , React.createElement('div', { className: "w-9 h-9 rounded-xl bg-[#0F172A] text-white font-black flex items-center justify-center text-xs shrink-0 shadow-sm"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}, "AD"

                )
                , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
                  , React.createElement('p', { className: "text-xs font-black text-slate-900 truncate leading-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}, "Admin Operator" )
                  , React.createElement('p', { className: "text-[10px] text-slate-500 font-medium truncate leading-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}, "Super Admin Account"  )
                )
              )
              , React.createElement('button', { 
                onClick: () => navigate("/auth/login"),
                title: "Log Out" ,
                className: "p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors shrink-0"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}

                , React.createElement(LogOut, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}} )
              )
            )
          )
        )
      )

      /* Right Column Layout */
      , React.createElement('div', { className: "flex-1 flex flex-col min-w-0 overflow-hidden"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
        /* Top Header Bar */
        , React.createElement('header', { className: "bg-white/80 backdrop-blur-md px-6 lg:px-8 py-4 flex items-center justify-between gap-4 border-b border-slate-200/80 shrink-0 sticky top-0 z-30"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
            , React.createElement('h1', { className: "text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}, "Welcome back, "
                , React.createElement('span', { className: "text-[#4F46E5]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}, "Admin Operator" ), " 👋"
            )
            , React.createElement('p', { className: "text-xs font-semibold text-slate-500 mt-0.5"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}, "Here's what's happening with your CRM today."

            )
          )

          , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}
            /* Search Input Box */
            , React.createElement('div', { className: "relative hidden sm:block w-72"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
              , React.createElement(Search, { className: "absolute left-3.5 top-2.5 text-slate-400"   , size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}} )
              , React.createElement('input', {
                type: "text",
                placeholder: "Search clients, projects, leads..."   ,
                className: "w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4F46E5] focus:bg-white focus:ring-2 focus:ring-indigo-500/20 shadow-xs transition-all"                  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}
              )
            )

            /* Notification Bell */
            , React.createElement('button', { className: "relative w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-xs transition-colors"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}
              , React.createElement(Bell, { size: 17, __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}} )
              , React.createElement('span', { className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4F46E5] text-white text-[9px] font-black flex items-center justify-center"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}, "1"

              )
            )

            /* Settings Gear */
            , React.createElement('button', { 
              onClick: () => navigate("/admin/settings"),
              className: "w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-sm transition-colors"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}

              , React.createElement(Settings, { size: 17, __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}} )
            )

            /* Avatar Pill */
            , React.createElement('div', { className: "w-9 h-9 rounded-xl bg-[#06132D] text-white font-black flex items-center justify-center text-xs shadow-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 147}}, "AD"

            )
          )
        )

        /* Main Content Area */
        , React.createElement('main', { className: "flex-1 overflow-y-auto p-6 lg:p-8 bg-[#F4F7FC]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
          , React.createElement(Outlet, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 155}} )
        )
      )
    )
  );
}

