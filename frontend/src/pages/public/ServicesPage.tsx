import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, CreditCard, Globe, Layers, ShieldCheck, Smartphone, Users } from "lucide-react";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";

const services = [
  {
    icon: Globe,
    title: "CRM Web Platforms",
    description: "Custom MERN dashboards for clients, leads, calls, proposals, projects, invoices, and payments.",
    color: "text-[#F05454] bg-red-50 border-red-100",
  },
  {
    icon: Smartphone,
    title: "Mobile CRM Apps",
    description: "Fast mobile access for field teams, client follow-ups, project updates, and approval workflows.",
    color: "text-[#10B981] bg-emerald-50 border-emerald-100",
  },
  {
    icon: Layers,
    title: "Enterprise Automation",
    description: "Connected workflows that move leads into proposals, projects, billing, and reports without repeated entry.",
    color: "text-[#1743BF] bg-blue-50 border-blue-100",
  },
  {
    icon: Bot,
    title: "AI Operations",
    description: "Smart assistants for lead scoring, reminders, proposal drafting, support replies, and analytics summaries.",
    color: "text-[#F05454] bg-red-50 border-red-100",
  },
  {
    icon: ShieldCheck,
    title: "Cloud & Security",
    description: "Role-based access, secure APIs, protected data storage, backups, and production deployment support.",
    color: "text-[#0B2369] bg-slate-100 border-slate-200",
  },
  {
    icon: CreditCard,
    title: "Payments & Billing",
    description: "Invoice tracking, receipts, payment status, tax-ready summaries, and customer account visibility.",
    color: "text-[#0B2369] bg-slate-100 border-slate-200",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F3F6FC] text-[#0B2369] font-sans flex flex-col justify-between">
      <div>
        <PublicNavbar />

        <main className="animate-page-enter mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#F05454]">
                Professional CRM Services
              </span>
              <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Build a CRM system around the way your business actually works.
              </h1>
              <p className="text-base font-medium leading-relaxed text-slate-600">
                We design and develop customer management platforms for sales teams, service teams, project teams, and finance teams that need one reliable workspace.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl premium-button px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-navy-950/20"
              >
                Start Your CRM Project <ArrowRight size={16} />
              </Link>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white interactive-lift p-6 shadow-2xl shadow-navy-950/10">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Lead Capture", "New enquiries routed to sales", "bg-[#F05454]"],
                  ["Project Scope", "Work items and proposals aligned", "bg-[#0B2369]"],
                  ["Client Care", "Calls, follow-ups, and history", "bg-[#10B981]"],
                  ["Billing", "Invoices and payments visible", "bg-[#1743BF]"],
                ].map(([title, body, color]) => (
                  <div key={title} className="rounded-2xl border border-slate-100 bg-[#F3F6FC] p-5">
                    <span className={`mb-4 block h-2 w-16 rounded-full ${color}`} />
                    <h3 className="text-sm font-black">{title}</h3>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="rounded-2xl border border-slate-200 bg-white interactive-lift p-7 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/10">
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${service.color}`}>
                    <Icon size={23} />
                  </div>
                  <h3 className="text-lg font-black">{service.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{service.description}</p>
                </div>
              );
            })}
          </section>
        </main>
      </div>

      <PublicFooter />
    </div>
  );
}


