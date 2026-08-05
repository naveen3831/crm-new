import * as React from "react";
import { CheckCircle, Mail, MapPin, Phone, Send, ShieldCheck, type LucideIcon } from "lucide-react";
import PublicNavbar from "../../components/public/PublicNavbar";
import PublicFooter from "../../components/public/PublicFooter";

const contactCards: Array<{ icon: LucideIcon; title: string; body: string; color: string }> = [
  { icon: Mail, title: "Official Email", body: "info@speshway.com", color: "text-[#F05454] bg-red-50 border-red-100" },
  { icon: Phone, title: "Phone / WhatsApp", body: "+91 91000 06020", color: "text-[#10B981] bg-emerald-50 border-emerald-100" },
  { icon: MapPin, title: "Registered Address", body: "T-Hub, Knowledge City Rd, Panmaktha, Hyderabad, Telangana 500032", color: "text-[#1743BF] bg-blue-50 border-blue-100" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F3F6FC] text-[#0B2369] font-sans flex flex-col justify-between">
      <div>
        <PublicNavbar />

        <main className="animate-page-enter mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <section className="mb-14 max-w-3xl space-y-5">
            <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#F05454]">
              Contact Sales & Support
            </span>
            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Tell us what your CRM needs to manage.
            </h1>
            <p className="text-base font-medium leading-relaxed text-slate-600">
              Share your business workflow, current pain points, or project scope. We will help you plan the right CRM pages, reports, roles, and automation.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-5">
              {contactCards.map(({ icon: ContactIcon, title, body, color }) => {
                return (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-white interactive-lift p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${color}`}>
                        <ContactIcon size={22} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black">{title}</h3>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600">{body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="rounded-2xl border border-slate-200 bg-[#0B2369] p-6 text-white shadow-lg shadow-navy-950/20">
                <ShieldCheck className="mb-4 text-[#F05454]" size={28} />
                <h3 className="text-lg font-black">Professional CRM consultation</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200">
                  We review your client flow, lead stages, proposal format, invoice process, and reporting needs before suggesting implementation.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white interactive-lift p-7 shadow-2xl shadow-navy-950/10 sm:p-9">
              {submitted ? (
                <div className="py-14 text-center">
                  <CheckCircle className="mx-auto h-16 w-16 text-[#10B981]" />
                  <h3 className="mt-5 text-2xl font-black">Message Sent Successfully</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-600">
                    Thank you for contacting us. Our team will review your CRM requirement and respond shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-xl bg-[#F05454] px-6 py-3 text-sm font-extrabold text-white shadow-md shadow-navy-950/20"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-black">Send a Direct Inquiry</h2>
                    <p className="mt-1 text-sm font-medium text-slate-600">We usually need your workflow, team size, and required CRM modules.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">Full Name</span>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-[#F3F6FC] p-3 text-sm font-semibold outline-none focus:border-[#F05454] focus:bg-white"
                        placeholder="Your name"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">Email Address</span>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-[#F3F6FC] p-3 text-sm font-semibold outline-none focus:border-[#F05454] focus:bg-white"
                        placeholder="name@company.com"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">Phone</span>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-[#F3F6FC] p-3 text-sm font-semibold outline-none focus:border-[#F05454] focus:bg-white"
                        placeholder="+91..."
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">Subject</span>
                      <input
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-[#F3F6FC] p-3 text-sm font-semibold outline-none focus:border-[#F05454] focus:bg-white"
                        placeholder="CRM implementation"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-600">Message</span>
                    <textarea
                      rows={6}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-[#F3F6FC] p-3 text-sm font-semibold outline-none focus:border-[#F05454] focus:bg-white"
                      placeholder="Describe your clients, leads, projects, invoices, reports, or automation needs..."
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl premium-button py-3.5 text-sm font-extrabold text-white shadow-lg shadow-navy-950/20"
                  >
                    <Send size={16} /> Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>
      </div>

      <PublicFooter />
    </div>
  );
}


