const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\components\\layout\\Navbar.tsx"; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Info, Mail, LogIn, Layout, ArrowLeft } from "lucide-react";
import Button from "../ui/Button";






function MobileTabIcon({
  name,
  isHome,
  isLoggedIn,
}



) {
  if (name === "nav_home") return isHome ? React.createElement(Home, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}} ) : React.createElement(ArrowLeft, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}} );
  if (name === "nav_about") return React.createElement(Info, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}} );
  if (name === "nav_contact") return React.createElement(Mail, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}} );
  if (name === "nav_auth") return isLoggedIn ? React.createElement(Layout, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}} ) : React.createElement(LogIn, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}} );
  return null;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

const mobileTabConfig = [
  { id: "nav_home", label: "Home", baseHref: "/" },
  { id: "nav_about", label: "About", baseHref: "/about" },
  { id: "nav_contact", label: "Contact", baseHref: "/contact" },
  { id: "nav_auth", label: "Log In", baseHref: "/auth/login" },
];

export default function Navbar() {
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const isHome = pathname === "/";

  const getTabHref = (id) => {
    if (id === "nav_home") return "/";
    if (id === "nav_auth" && user) {
      return user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard";
    }
    return _nullishCoalesce(_optionalChain([mobileTabConfig, 'access', _ => _.find, 'call', _2 => _2((t) => t.id === id), 'optionalAccess', _3 => _3.baseHref]), () => ( "/"));
  };

  const getTabLabel = (id) => {
    if (id === "nav_home") return isHome ? "Home" : "Back";
    if (id === "nav_auth") return user ? "Dashboard" : "Log In";
    return _nullishCoalesce(_optionalChain([mobileTabConfig, 'access', _4 => _4.find, 'call', _5 => _5((t) => t.id === id), 'optionalAccess', _6 => _6.label]), () => ( ""));
  };

  return (
    React.createElement(React.Fragment, null
      /* Top Navbar */
      , React.createElement('nav', {
        className: `sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 px-6 md:px-12 flex items-center justify-between transition-transform duration-300 shadow-sm ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}

        /* Logo */
        , React.createElement(Link, { href: "/", className: "flex items-center gap-2 group"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}
          , React.createElement('div', { className: "w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shadow-sm p-1.5 group-hover:scale-105 transition-transform duration-300"             , __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}
            , React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 200 200"   , className: "w-full h-full" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
              , React.createElement('path', { d: "M 40,95 C 40,55 160,55 160,95"     , stroke: "#FF5349", strokeWidth: "7", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}} )
              , React.createElement('rect', { x: "62", y: "70", width: "18", height: "50", rx: "3", fill: "#EE4047", __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}} )
              , React.createElement('rect', { x: "86", y: "50", width: "18", height: "70", rx: "3", fill: "#FF9F0A", __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}} )
              , React.createElement('rect', { x: "110", y: "30", width: "18", height: "90", rx: "3", fill: "#FF5349", __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}} )
              , React.createElement('ellipse', { cx: "100", cy: "100", rx: "48", ry: "29", stroke: "#071E34", strokeWidth: "10", transform: "rotate(-15, 100, 100)"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}} )
              , React.createElement('path', { d: "M 40,95 C 40,135 160,135 160,95"     , stroke: "#FF5349", strokeWidth: "7", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}} )
              , React.createElement('path', { d: "M 75,122 L 35,167"   , stroke: "#071E34", strokeWidth: "15", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}} )
            )
          )
          , React.createElement('span', { className: "font-heading font-extrabold text-xl text-[#071E34] tracking-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}, "CRM"

          )
        )

        /* Desktop Links */
        , React.createElement('div', { className: "hidden md:flex items-center gap-8"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
          , navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              React.createElement(Link, {
                key: link.name,
                href: link.href,
                className: "relative text-sm font-medium tracking-wide transition-colors duration-200 py-1"      ,
                style: { color: isActive ? "#071E34" : "#475569" }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}

                , React.createElement('span', { className: "hover:text-[#071E34] transition-colors" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}, link.name)
                , isActive && (
                  React.createElement(motion.div, {
                    layoutId: "activeNavIndicator",
                    className: "absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5349] rounded-full"      ,
                    transition: { type: "spring", stiffness: 380, damping: 30 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
                  )
                )
              )
            );
          })
        )

        /* Desktop Auth Buttons */
        , React.createElement('div', { className: "hidden md:flex items-center gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 150}}
          , user ? (
            React.createElement(React.Fragment, null
              , React.createElement(Link, { href: user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard", __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}
                , React.createElement(Button, { variant: "outline", size: "sm", className: "font-semibold text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 154}}
                  , user.role === "admin" ? "Admin Panel" : "My Dashboard"
                )
              )
              , React.createElement(Button, {
                onClick: handleLogout,
                variant: "ghost",
                size: "sm",
                className: "text-xs font-semibold text-red-600 hover:text-red-700"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}
, "Log Out"

              )
            )
          ) : (
            React.createElement(React.Fragment, null
              , React.createElement(Link, { href: "/auth/login", __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}}
                , React.createElement(Button, { variant: "ghost", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}, "Log In" )
              )
              , React.createElement(Link, { href: "/auth/register", __self: this, __source: {fileName: _jsxFileName, lineNumber: 172}}
                , React.createElement(Button, { variant: "primary", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}}, "Register")
              )
            )
          )
        )
      )

      /* Mobile Bottom Tab Bar */
      , isHome && (
        React.createElement('div', { className: "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 py-3 px-6 flex items-center justify-around shadow-lg"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}
          , mobileTabConfig.map((tab) => {
            const href = getTabHref(tab.id);
            const label = getTabLabel(tab.id);
            const isActive = pathname === href;
            return (
              React.createElement(Link, {
                key: tab.id,
                href: href,
                className: `flex flex-col items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive ? "text-[#FF5349] scale-105" : "text-gray-400 hover:text-[#071E34]"
                }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}

                , React.createElement('div', { className: `p-1 rounded-lg transition-colors ${isActive ? "bg-rose-50" : ""}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 195}}
                  , React.createElement(MobileTabIcon, { name: tab.id, isHome: isHome, isLoggedIn: !!user, __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}} )
                )
                , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 198}}, label)
              )
            );
          })
        )
      )
    )
  );
}

