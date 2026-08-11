const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\about\\page.tsx";"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Sparkles, Rocket } from "lucide-react";
import Button from "../../components/ui/Button";
import GlassCard from "../../components/ui/GlassCard";

const valueIcons = [
  React.createElement(Shield, { key: "s", className: "text-teal-600", size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 11}} ),
  React.createElement(Sparkles, { key: "sp", className: "text-amber-500", size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 12}} ),
  React.createElement(Rocket, { key: "r", className: "text-green-600", size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 13}} ),
];

const valueData = [
  { title: "Data Security First", description: "Everything, from customer files to invoicing database lines, is fully encrypted and audited." },
  { title: "Premium User Experience", description: "Responsive styling and fast interfaces keep workflows clear and accessible." },
  { title: "Customer Growth Driven", description: "Built to accelerate leads conversion, quotation acceptance, and secure payments." },
];

const team = [
  { name: "Alex Sterling", role: "Lead CRM Architect", initials: "AS" },
  { name: "Marcus Vance", role: "Database Systems Director", initials: "MV" },
  { name: "Elena Rostova", role: "Client Support Executive", initials: "ER" },
];

export default function AboutPage() {
  return (
    React.createElement('div', { className: "min-h-screen py-10 sm:py-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col gap-16 sm:gap-24"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}
      , React.createElement('section', { className: "text-center max-w-3xl mx-auto flex flex-col gap-5"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}
        , React.createElement(motion.h1, { initial: {opacity:0,y:15}, animate: {opacity:1,y:0}, transition: {duration:0.5}, className: "display-lg text-gradient" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}, "Building the Ecosystem of Client Success"

        )
        , React.createElement(motion.p, { initial: {opacity:0}, animate: {opacity:1}, transition: {duration:0.5,delay:0.15}, className: "text-base sm:text-lg text-[#475569] leading-relaxed font-sans font-medium"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}, "Founded on trust and technical excellence, our CRM platform delivers enterprise-level customer relation pipelines, invoicing records, and support ticket automations to teams around the globe."

        )
      )

      , React.createElement('section', { className: "grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}
        , React.createElement('div', { className: "flex flex-col gap-5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
          , React.createElement('h2', { className: "font-heading font-bold text-2xl sm:text-3xl text-[#071E34]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}, "Our Vision" )
          , React.createElement('p', { className: "text-sm sm:text-base text-[#475569] leading-relaxed font-sans"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}, "We believe enterprise software should be fast, delightful, and highly secure. Our team built the CRM platform to eliminate clunky spreadsheets, slow pipeline updates, and complex manual billing operations."                            )
          , React.createElement('p', { className: "text-sm sm:text-base text-[#475569] leading-relaxed font-sans"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, "By combining a high-performance Next.js frontend with Node.js controllers, we guarantee low-latency dashboard speeds, instant search filters, and smooth mobile transitions."                    )
        )
        , React.createElement('div', { className: "p-5 sm:p-7 rounded-2xl bg-white border border-teal-200 flex flex-col gap-5 shadow-md"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}
          , React.createElement('div', { className: "text-sm font-bold text-teal-700 tracking-wider"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}, "SYSTEM INTEGRITY FEATURES"  )
          , ["Secure JWT Authentication with Token Rotation","Active Audit Logs to Track User Changes","Cloud Database Scalability on MongoDB Atlas"].map(feat => (
            React.createElement('div', { key: feat, className: "flex items-start gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
              , React.createElement('div', { className: "w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold shrink-0"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}, "✓")
              , React.createElement('p', { className: "text-sm text-[#071E34] font-semibold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}, feat)
            )
          ))
        )
      )

      , React.createElement('section', { className: "flex flex-col gap-8 sm:gap-12"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}
        , React.createElement('div', { className: "text-center", __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}, React.createElement('h2', { className: "display-md text-gradient font-heading"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}, "Our Core Foundations"  ))
        , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}}
          , valueData.map((val, i) => (
            React.createElement(GlassCard, { key: i, delay: i*0.1, className: "flex flex-col gap-4 bg-white border border-teal-200 shadow-md"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}
              , React.createElement('div', { className: "w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}, valueIcons[i])
              , React.createElement('h3', { className: "font-heading font-bold text-lg text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}, val.title)
              , React.createElement('p', { className: "text-sm text-[#475569] leading-relaxed font-sans"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}, val.description)
            )
          ))
        )
      )

      , React.createElement('section', { className: "flex flex-col gap-8 sm:gap-12"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}}
        , React.createElement('div', { className: "text-center", __self: this, __source: {fileName: _jsxFileName, lineNumber: 71}}
          , React.createElement('h2', { className: "display-md text-gradient font-heading"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}}, "Meet the Engineers"  )
          , React.createElement('p', { className: "text-sm text-[#475569] font-medium max-w-md mx-auto mt-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}, "The technical team dedicated to keeping your customer details secure and pipelines running fast."             )
        )
        , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}
          , team.map((member, i) => (
            React.createElement(GlassCard, { key: i, delay: i*0.1, className: "flex items-center gap-4 bg-white border border-teal-200 shadow-md"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}
              , React.createElement('div', { className: "w-12 h-12 rounded-full bg-gradient-to-tr from-[#0E9F8A] to-[#071E34] flex items-center justify-center text-white font-heading font-bold text-sm shadow-md shrink-0"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}, member.initials)
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
                , React.createElement('h3', { className: "font-heading font-bold text-base text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}, member.name)
                , React.createElement('p', { className: "text-xs text-[#475569] font-semibold font-sans mt-0.5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}, member.role)
              )
            )
          ))
        )
      )

      , React.createElement('section', { className: "p-6 sm:p-10 rounded-2xl bg-white border border-teal-200 shadow-md text-center flex flex-col gap-6 items-center"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
        , React.createElement('h2', { className: "font-heading font-bold text-xl sm:text-2xl text-[#071E34]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}, "Technological Framework" )
        , React.createElement('div', { className: "flex flex-wrap gap-3 sm:gap-6 justify-center font-heading font-semibold text-sm"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
          , ["Next.js 14 / React","Node.js / Express","Mongoose / MongoDB Atlas","Tailwind CSS / Motion"].map(t => (
            React.createElement('span', { key: t, className: "px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 text-[#071E34] hover:border-teal-500 transition-colors shadow-sm"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}, t)
          ))
        )
        , React.createElement(Link, { href: "/auth/register", className: "mt-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}, React.createElement(Button, { variant: "primary", __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}, "Create Customer Account"  ))
      )
    )
  );
}

