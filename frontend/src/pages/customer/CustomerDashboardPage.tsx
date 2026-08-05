import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, CreditCard, TicketCheck, ShieldCheck, ArrowRight } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 via-[#0d162d] to-indigo-950 p-6 sm:p-8 border border-rose-500/20 shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck size={24} className="text-rose-400" />
          <span className="text-xs font-semibold text-rose-300 font-mono">Verified Client Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">Welcome to Your Speshway Client Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
          Review active project quotations, process pending invoices securely, and track support ticket resolutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/customer/quotations"
          className="rounded-2xl bg-[#0b101f] border border-rose-500/20 p-6 hover:border-rose-500/40 transition-all space-y-4 shadow-xl group"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">My Quotations</h3>
            <p className="text-xs text-slate-400 mt-1">Review proposals, download PDF specifications, and accept plan tiers.</p>
          </div>
          <div className="text-xs text-rose-400 font-semibold flex items-center gap-1">
            View Proposals <ArrowRight size={14} />
          </div>
        </Link>

        <Link
          to="/customer/invoices"
          className="rounded-2xl bg-[#0b101f] border border-rose-500/20 p-6 hover:border-rose-500/40 transition-all space-y-4 shadow-xl group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <CreditCard size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">My Invoices & Payments</h3>
            <p className="text-xs text-slate-400 mt-1">View billing statements and pay milestone invoices online via Stripe.</p>
          </div>
          <div className="text-xs text-amber-400 font-semibold flex items-center gap-1">
            Manage Billing <ArrowRight size={14} />
          </div>
        </Link>

        <Link
          to="/customer/tickets"
          className="rounded-2xl bg-[#0b101f] border border-rose-500/20 p-6 hover:border-rose-500/40 transition-all space-y-4 shadow-xl group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <TicketCheck size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">Support Tickets</h3>
            <p className="text-xs text-slate-400 mt-1">Raise support inquiries and communicate directly with assigned engineering leads.</p>
          </div>
          <div className="text-xs text-purple-400 font-semibold flex items-center gap-1">
            Get Support <ArrowRight size={14} />
          </div>
        </Link>
      </div>
    </div>
  );
}

