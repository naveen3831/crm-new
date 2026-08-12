const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\components\\layout\\ThemeLayoutWrapper.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ThemeLayoutWrapper({ children }) {
  const pathname = usePathname();

  // Hide public navbar and footer on admin & customer dashboard layouts
  const isDashboardRoute = _optionalChain([pathname, 'optionalAccess', _ => _.startsWith, 'call', _2 => _2("/admin")]) || _optionalChain([pathname, 'optionalAccess', _3 => _3.startsWith, 'call', _4 => _4("/customer")]);

  if (isDashboardRoute) {
    return React.createElement('main', { className: "w-full relative min-h-screen flex flex-col"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 17}}, children);
  }

  const isHomePage = pathname === "/";

  return (
    React.createElement('div', { className: "w-full min-h-screen flex flex-col justify-between"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 23}}
      , React.createElement(Navbar, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 24}} )

      /* Mobile Back Button (Only visible on non-home subpages) */
      , !isHomePage && (
        React.createElement('div', { className: "md:hidden w-full px-6 pt-4 pb-1 max-w-7xl mx-auto"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}
          , React.createElement(Link, {
            href: "/",
            className: "inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#06132D] transition-all duration-200 py-1.5 px-3.5 rounded-xl bg-white border border-red-100 shadow-sm"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}

            , React.createElement(ArrowLeft, { size: 13, className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}} )
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}, "Back to Home"  )
          )
        )
      )

      , React.createElement('main', { className: `flex-grow w-full relative ${isHomePage ? "pb-24 md:pb-0" : ""}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}
        , children
      )

      , React.createElement(Footer, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 43}} )
    )
  );
}




