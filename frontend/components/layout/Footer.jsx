const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\components\\layout\\Footer.tsx";"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Send, Twitter, Linkedin, Github } from "lucide-react";
import Button from "../ui/Button";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    React.createElement('footer', {
      className: `w-full bg-[#F7FBFA] border-t border-slate-200 pt-14 px-6 md:px-12 ${
        isHomePage ? "pb-32 md:pb-16" : "pb-16"
      }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}}

      , React.createElement('div', { className: "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}
        /* Brand Column */
        , React.createElement('div', { className: "flex flex-col gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}
          , React.createElement(Link, { href: "/", className: "flex items-center gap-2 group"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
            , React.createElement('div', { className: "w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shadow-sm p-1.5"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
              , React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 200 200"   , className: "w-full h-full" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}
                , React.createElement('path', { d: "M 40,95 C 40,55 160,55 160,95"     , stroke: "#FF5349", strokeWidth: "7", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}} )
                , React.createElement('rect', { x: "62", y: "70", width: "18", height: "50", rx: "3", fill: "#EE4047", __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}} )
                , React.createElement('rect', { x: "86", y: "50", width: "18", height: "70", rx: "3", fill: "#FF9F0A", __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}} )
                , React.createElement('rect', { x: "110", y: "30", width: "18", height: "90", rx: "3", fill: "#FF5349", __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}} )
                , React.createElement('ellipse', { cx: "100", cy: "100", rx: "48", ry: "29", stroke: "#071E34", strokeWidth: "10", transform: "rotate(-15, 100, 100)"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}} )
                , React.createElement('path', { d: "M 40,95 C 40,135 160,135 160,95"     , stroke: "#FF5349", strokeWidth: "7", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}} )
                , React.createElement('path', { d: "M 75,122 L 35,167"   , stroke: "#071E34", strokeWidth: "15", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}} )
              )
            )
            , React.createElement('span', { className: "font-heading font-extrabold text-lg text-[#071E34] tracking-tight"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, "CRM")
          )
          , React.createElement('p', { className: "text-sm text-[#475569] leading-relaxed font-sans mt-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}, "Secure, premium customer relationships, smart deal pipeline conversion, and centralized billing automation."

          )
          , React.createElement('div', { className: "flex items-center gap-3 mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
            , React.createElement('a', { href: "#", className: "w-9 h-9 rounded-lg bg-rose-100 hover:bg-blue-200 flex items-center justify-center text-[#475569] transition-colors"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}
              , React.createElement(Twitter, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}} )
            )
            , React.createElement('a', { href: "#", className: "w-9 h-9 rounded-lg bg-rose-100 hover:bg-blue-200 flex items-center justify-center text-[#475569] transition-colors"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}
              , React.createElement(Linkedin, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}} )
            )
            , React.createElement('a', { href: "#", className: "w-9 h-9 rounded-lg bg-rose-100 hover:bg-blue-200 flex items-center justify-center text-[#475569] transition-colors"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}
              , React.createElement(Github, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}} )
            )
          )
        )

        /* Product Links */
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
          , React.createElement('h4', { className: "font-heading font-bold text-sm text-[#071E34] uppercase tracking-wider mb-5"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}, "Product")
          , React.createElement('ul', { className: "flex flex-col gap-3 text-sm text-[#475569] font-sans"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}}
            , React.createElement('li', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}, React.createElement(Link, { href: "/", className: "hover:text-[#071E34] transition-colors" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}, "Core Features" ))
            , React.createElement('li', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}, React.createElement(Link, { href: "/faq", className: "hover:text-[#071E34] transition-colors" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}}, "Security Standards" ))
            , React.createElement('li', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}, React.createElement(Link, { href: "/about", className: "hover:text-[#071E34] transition-colors" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}, "Integrations"))
            , React.createElement('li', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}, React.createElement(Link, { href: "/", className: "hover:text-[#071E34] transition-colors" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}, "Pricing Options" ))
          )
        )

        /* Legal & Support */
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}
          , React.createElement('h4', { className: "font-heading font-bold text-sm text-[#071E34] uppercase tracking-wider mb-5"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}, "Legal & Support"  )
          , React.createElement('ul', { className: "flex flex-col gap-3 text-sm text-[#475569] font-sans"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 76}}
            , React.createElement('li', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}, React.createElement(Link, { href: "/privacy", className: "hover:text-[#071E34] transition-colors" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}, "Privacy Policy" ))
            , React.createElement('li', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}, React.createElement(Link, { href: "/terms", className: "hover:text-[#071E34] transition-colors" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}, "Terms of Service"  ))
            , React.createElement('li', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}, React.createElement(Link, { href: "/faq", className: "hover:text-[#071E34] transition-colors" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}, "Help Center / FAQ"   ))
            , React.createElement('li', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}, React.createElement(Link, { href: "/contact", className: "hover:text-[#071E34] transition-colors" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}, "Contact Support" ))
          )
        )

        /* Newsletter */
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}
          , React.createElement('h4', { className: "font-heading font-bold text-sm text-[#071E34] uppercase tracking-wider mb-5"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}, "Newsletter")
          , React.createElement('p', { className: "text-sm text-[#475569] leading-relaxed font-sans mb-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}, "Subscribe for the latest product features, tips, and enterprise CRM growth reviews."

          )
          , submitted ? (
            React.createElement('div', { className: "p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800 flex items-center gap-2"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
              , React.createElement(Send, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}} ), " Thank you for subscribing!"
            )
          ) : (
            React.createElement('form', { onSubmit: handleSubscribe, className: "flex gap-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}
              , React.createElement('div', { className: "relative flex-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}
                , React.createElement('input', {
                  type: "email",
                  required: true,
                  placeholder: "name@company.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-rose-200 text-[#071E34] text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#FF5349] focus:ring-2 focus:ring-rose-200 transition-colors"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 97}}
                )
                , React.createElement(Mail, { size: 14, className: "absolute left-3.5 top-3.5 text-[#FF5349]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}} )
              )
              , React.createElement(Button, { type: "submit", variant: "primary", size: "sm", className: "px-4 py-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 107}}
                , React.createElement(Send, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}} )
              )
            )
          )
        )
      )

      , React.createElement('div', { className: "max-w-7xl mx-auto border-t border-slate-200 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#475569]"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}
        , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}, "© " , new Date().getFullYear(), " CRM. All rights reserved."    )
        , React.createElement('p', { className: "mt-2 md:mt-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}}, "Enterprise Grade Customer Relationship Platform"    )
      )
    )
  );
}

