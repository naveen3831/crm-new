import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Bot, FileText, Layers, Receipt, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";

const features: Array<{ title: string; body: string; icon: LucideIcon; color: string }> = [
  { title: "Client Workspace", body: "Profiles, contacts, assignments, activity history, archive, and restore workflows.", icon: Users, color: "text-[#F05454] bg-red-50 border-red-100" },
  { title: "Lead Pipeline", body: "Track new, open, won, and lost leads with sources, values, follow-ups, and owners.", icon: Layers, color: "text-[#10B981] bg-emerald-50 border-emerald-100" },
  { title: "Proposal Studio", body: "Create structured proposal workspaces with project scope, sections, pricing, and quotation handoff.", icon: FileText, color: "text-[#1743BF] bg-blue-50 border-blue-100" },
  { title: "Invoice & Payments", body: "Generate invoices, manage receipts, monitor outstanding balances, and review finance totals.", icon: Receipt, color: "text-[#F05454] bg-red-50 border-red-100" },
  { title: "Reports & Analytics", body: "See counts, conversion rates, project health, finance summaries, and team workload at a glance.", icon: BarChart3, color: "text-[#0B2369] bg-slate-100 border-slate-200" },
  { title: "Secure Roles", body: "Admin, team, and customer experiences stay separated with professional access patterns.", icon: ShieldCheck, color: "text-[#0B2369] bg-slate-100 border-slate-200" },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#F3F6FC] text-[#0B2369] font-sans flex flex-col justify-between">
      <div>
        <PublicNavbar />

        <main className="animate-page-enter mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#F05454]">
                Platform Features
              </span>
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                A complete CRM workspace for everyday business operations.
              </h1>
              <p className="text-base font-medium leading-relaxed text-slate-600">
                The platform brings sales, project delivery, billing, customer communication, and analytics into a single professional interface.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white interactive-lift p-6 shadow-2xl shadow-navy-950/10">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F05454]">Reports</p>
                  <h2 className="text-xl font-black">Performance Snapshot</h2>
                </div>
                <Bot className="text-[#F05454]" size={26} />
              </div>
              <div className="space-y-4">
                {[
                  ["Client Growth", "82%", "bg-[#F05454]"],
                  ["Proposal Wins", "67%", "bg-[#10B981]"],
                  ["Invoice Collection", "91%", "bg-[#0B2369]"],
                  ["Support Closure", "74%", "bg-[#1743BF]"],
                ].map(([label, value, color]) => (
                  <div key={label} className="rounded-2xl border border-slate-100 bg-[#F3F6FC] p-4">
                    <div className="mb-2 flex justify-between text-xs font-bold text-slate-600">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200">
                      <div className={`h-2 rounded-full ${color}`} style={{ width: value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, body, icon: FeatureIcon, color }) => {
              return (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white interactive-lift p-7 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/10">
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${color}`}>
                    <FeatureIcon size={23} />
                  </div>
                  <h3 className="text-lg font-black">{title}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{body}</p>
                </div>
              );
            })}
          </section>

          <section className="mt-16 rounded-[28px] bg-gradient-to-r from-[#0B2369] via-[#1743BF] to-[#F05454] p-8 text-white shadow-xl shadow-navy-950/20 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-3xl font-black">Ready to run your CRM professionally?</h2>
                <p className="mt-2 max-w-2xl text-sm font-medium text-slate-200">
                  Start with the admin control center, then connect clients, leads, proposals, invoices, and reports.
                </p>
              </div>
              <Link to="/auth/register" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-[#0B2369]">
                Register Account <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </main>
      </div>

      <PublicFooter />
    </div>
  );
}


