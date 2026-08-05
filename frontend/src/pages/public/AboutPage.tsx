import * as React from "react";
import { CheckCircle2, Code2, Database, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import PublicNavbar from "../../components/public/PublicNavbar";
import CrmBrandLogo from "../../components/public/CrmBrandLogo";
import PublicFooter from "../../components/public/PublicFooter";

const values = [
  "Clear CRM workflows instead of scattered spreadsheets",
  "Modern MERN architecture with responsive interfaces",
  "Secure customer, project, invoice, and reporting data",
  "Practical automation that supports sales and operations teams",
];

const identityCards: Array<{ icon: LucideIcon; label: string; color: string }> = [
  { icon: Users, label: "Customers", color: "bg-red-50 text-[#F05454]" },
  { icon: Code2, label: "Workflows", color: "bg-blue-50 text-[#1743BF]" },
  { icon: Database, label: "Data", color: "bg-slate-100 text-[#0B2369]" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F3F6FC] text-[#0B2369] font-sans flex flex-col justify-between">
      <div>
        <PublicNavbar />

        <main className="animate-page-enter mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#F05454]">
                About CRM
              </span>
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                We build professional CRM systems for teams that need clarity.
              </h1>
              <p className="text-base font-medium leading-relaxed text-slate-600">
                Our focus is simple: help businesses manage clients, leads, proposals, projects, invoices, payments, and reports from one visible operating system.
              </p>

              <div className="space-y-3 pt-2">
                {values.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" />
                    <span className="text-sm font-bold text-[#0B2369]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white interactive-lift p-7 shadow-2xl shadow-navy-950/10">
              <div className="rounded-3xl border border-slate-200 bg-[#F3F6FC] p-6">
                <CrmBrandLogo size="hero" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {identityCards.map(({ icon: ItemIcon, label, color }) => {
                  return (
                    <div key={label} className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
                      <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                        <ItemIcon size={20} />
                      </div>
                      <p className="text-[11px] font-black uppercase tracking-wide text-slate-600">{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              ["Mission", "Make CRM operations easier to understand, faster to run, and cleaner to report."],
              ["Approach", "Design the workflow first, then build screens, data models, reports, and automation around it."],
              ["Trust", "Keep business data visible, structured, and protected across the admin and customer experience."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white interactive-lift p-7 shadow-sm">
                <ShieldCheck className="mb-5 text-[#F05454]" size={26} />
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </section>
        </main>
      </div>

      <PublicFooter />
    </div>
  );
}


