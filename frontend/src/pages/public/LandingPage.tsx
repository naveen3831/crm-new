import * as React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  FileText,
  Headphones,
  Layers,
  LogIn,
  Receipt,
  ShieldCheck,
  Users,
} from "lucide-react";
import PublicNavbar from "../../components/public/PublicNavbar";
import CrmBrandLogo from "../../components/public/CrmBrandLogo";
import PublicFooter from "../../components/public/PublicFooter";

const brandCards = [
  { label: "Clients", value: "4,200+", color: "bg-[#F05454]", icon: Users },
  { label: "Leads", value: "18K", color: "bg-[#1743BF]", icon: BarChart3 },
  { label: "Projects", value: "320", color: "bg-[#0B2369]", icon: Layers },
  { label: "Revenue", value: "98%", color: "bg-[#FF5349]", icon: Receipt },
];

const relatedPages = [
  {
    title: "Services",
    body: "CRM setup, web apps, mobile apps, automation, payments, and cloud support.",
    to: "/services",
    icon: Headphones,
    color: "text-[#F05454] bg-red-50 border-red-100",
  },
  {
    title: "Features",
    body: "Lead pipeline, quotations, invoices, reporting, permissions, and AI assistance.",
    to: "/features",
    icon: ShieldCheck,
    color: "text-[#1743BF] bg-blue-50 border-blue-100",
  },
  {
    title: "About Us",
    body: "A focused software team building practical CRM systems for modern businesses.",
    to: "/about",
    icon: Bot,
    color: "text-[#0B2369] bg-slate-100 border-slate-200",
  },
  {
    title: "Contact Us",
    body: "Talk to the team about your CRM workflow, project scope, or implementation plan.",
    to: "/contact",
    icon: FileText,
    color: "text-[#F05454] bg-red-50 border-red-100",
  },
];

const workflow = [
  "Capture client enquiries and lead sources",
  "Assign sales follow-ups and project ownership",
  "Build proposals, quotations, and scope documents",
  "Track invoices, payments, and operational reports",
];

function CrmDashboardVisual() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white interactive-lift p-5 shadow-2xl shadow-navy-950/10">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#F05454]">Live CRM Console</p>
          <h3 className="text-xl font-black text-[#0B2369]">Business Command Center</h3>
        </div>
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#F05454]" />
          <span className="h-3 w-3 rounded-full bg-[#0B2369]" />
          <span className="h-3 w-3 rounded-full bg-[#10B981]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 py-5">
        {brandCards.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl text-white ${item.color}`}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-black text-[#0B2369]">{item.value}</p>
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{item.label}</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4">
        {[
          ["Proposal Stage", "72%", "bg-[#F05454]"],
          ["Closed Won", "58%", "bg-[#10B981]"],
          ["Invoice Paid", "86%", "bg-[#0B2369]"],
        ].map(([label, value, color]) => (
          <div key={label}>
            <div className="mb-1 flex items-center justify-between text-[11px] font-bold text-slate-600">
              <span>{label}</span>
              <span>{value}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className={`h-2 rounded-full ${color}`} style={{ width: value }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F3F6FC] text-[#0B2369] font-sans selection:bg-[#F05454] selection:text-white flex flex-col justify-between">
      <PublicNavbar />

      <main className="animate-page-enter flex-1">
        <section className="border-b border-slate-200 bg-white px-6 py-14 lg:px-12 lg:py-18">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="space-y-7">
              <div className="w-fit rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-navy-950/10">
                <CrmBrandLogo size="hero" />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-extrabold text-[#F05454]">
                <Bot size={15} /> Smart CRM for sales, service, projects, and finance
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#0B2369] sm:text-6xl">
                  Professional CRM Platform for{" "}
                  <span className="premium-text-gradient">
                    Modern Business
                  </span>
                </h1>
                <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                  Manage customers, leads, calls, proposals, projects, invoices, payments, and reports from one polished MERN CRM workspace.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/admin/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl premium-button px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-navy-950/20 transition-all duration-200 ease-out hover:opacity-95"
                >
                  Explore Admin Control Center <ArrowRight size={16} />
                </Link>
                <Link
                  to="/auth/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-[#0B2369] shadow-sm transition-all duration-200 ease-out hover:bg-slate-50"
                >
                  <LogIn size={16} className="text-[#F05454]" /> Sign In to Portal
                </Link>
              </div>
            </div>

            <CrmDashboardVisual />
          </div>
        </section>

        <section className="px-6 py-16 lg:px-12">
          <div className="mx-auto max-w-7xl space-y-10">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F05454]">Related Pages</p>
              <h2 className="mt-2 text-3xl font-black text-[#0B2369] sm:text-4xl">Everything your team needs is connected.</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                The public website now guides visitors through services, platform features, company background, and contact options with a consistent CRM identity.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {relatedPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Link
                    key={page.title}
                    to={page.to}
                    className="group rounded-2xl border border-slate-200 bg-white interactive-lift p-6 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/10"
                  >
                    <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${page.color}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-black text-[#0B2369]">{page.title}</h3>
                    <p className="mt-2 min-h-[64px] text-xs font-medium leading-relaxed text-slate-600">{page.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-xs font-extrabold text-[#F05454]">
                      Open page <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-rose-100 bg-white px-6 py-16 lg:px-12">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FF5349]">CRM Workflow</p>
              <h2 className="mt-2 text-3xl font-black text-[#071E34]">From first enquiry to final payment.</h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600">
                A professional CRM should reduce daily admin work. This platform keeps sales, project delivery, billing, and reporting visible in one clean operating flow.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {workflow.map((item, index) => (
                <div key={item} className="rounded-2xl border border-slate-100 bg-[#F7FBFA] p-5">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[#071E34] text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF5349]" />
                    <p className="text-sm font-bold leading-relaxed text-[#071E34]">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}


