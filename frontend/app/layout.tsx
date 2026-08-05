import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import ThemeLayoutWrapper from "../components/layout/ThemeLayoutWrapper";

export const metadata: Metadata = {
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-teal-500/30 selection:text-[#071E34]">
        <ThemeLayoutWrapper>{children}</ThemeLayoutWrapper>
      </body>
    </html>
  );
}

