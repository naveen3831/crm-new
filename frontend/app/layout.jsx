const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\layout.tsx";import React from "react";

import "./globals.css";
import ThemeLayoutWrapper from "../components/layout/ThemeLayoutWrapper";

export const metadata = {
  title: "CRM - Customer Relationship Management",
  description:
    "A premium, production-level MERN CRM featuring glassmorphism, responsive deal staging, dynamic invoice tracking, and customer ticket support.",
  keywords: ["CRM", "MERN", "Customer Management", "Invoice System", "Deal pipeline", "Enterprise CRM"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}

) {
  return (
    React.createElement('html', { lang: "en", __self: this, __source: {fileName: _jsxFileName, lineNumber: 23}}
      , React.createElement('body', { className: "font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-teal-500/30 selection:text-[#071E34]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}}
        , React.createElement(ThemeLayoutWrapper, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}, children)
      )
    )
  );
}

