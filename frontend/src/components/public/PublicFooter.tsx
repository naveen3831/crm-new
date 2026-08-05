import * as React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe2,
  Mail,
  MessageCircle,
  MapPin,
  Phone,
  Send,
  Share2,
} from "lucide-react";
import CrmBrandLogo from "./CrmBrandLogo";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Features", to: "/features" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Client Management", to: "/features" },
      { label: "Lead Pipeline", to: "/features" },
      { label: "My Projects", to: "/admin/dashboard?tab=our-projects" },
      { label: "Project Workspace", to: "/admin/dashboard?tab=projects" },
      { label: "Proposals & Quotations", to: "/features" },
      { label: "Invoices & Payments", to: "/services" },
    ],
  },
];

const actionLinks = [
  { label: "Website", to: "/", icon: Globe2, type: "internal" },
  { label: "My Projects", to: "/admin/dashboard?tab=our-projects", icon: Share2, type: "internal" },
  { label: "WhatsApp", to: "https://wa.me/919100006020", icon: MessageCircle, type: "external" },
  { label: "Email", to: "mailto:info@speshway.com", icon: Send, type: "external" },
];

export default function PublicFooter() {
  return (
    <footer className="border-t border-navy-800/40 bg-[#061858] px-6 pt-9 text-white lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1.15fr]">
          <div>
            <CrmBrandLogo size="md" dark />
            <p className="mt-4 max-w-xs text-xs font-medium leading-relaxed text-slate-300">
              Professional CRM platform for clients, leads, projects, proposals, invoices, payments, and business reports.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {actionLinks.map(({ label, to, icon: Icon, type }) =>
                type === "internal" ? (
                  <Link
                    key={label}
                    to={to}
                    aria-label={label}
                    title={label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-slate-300 hover:border-[#F05454] hover:text-[#F05454]"
                  >
                    <Icon size={15} />
                  </Link>
                ) : (
                  <a
                    key={label}
                    href={to}
                    aria-label={label}
                    title={label}
                    target={to.startsWith("http") ? "_blank" : undefined}
                    rel={to.startsWith("http") ? "noreferrer" : undefined}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-slate-300 hover:border-[#F05454] hover:text-[#F05454]"
                  >
                    <Icon size={15} />
                  </a>
                )
              )}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-black text-white">{group.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-[#F05454]"
                    >
                      <ArrowRight size={12} className="text-[#F05454] transition-transform group-hover:translate-x-0.5" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-black text-white">Contact</h3>
            <div className="mt-4 space-y-3 text-xs font-medium leading-relaxed text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-[#F05454]" size={15} />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=T-Hub%20Hyderabad%20Telangana%20500032"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F05454]"
                >
                  T-Hub, Hyderabad, Telangana 500032
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="shrink-0 text-[#F05454]" size={15} />
                <a href="tel:+919100006020" className="hover:text-[#F05454]">+91 91000 06020</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="shrink-0 text-[#F05454]" size={15} />
                <a href="mailto:info@speshway.com" className="hover:text-[#F05454]">info@speshway.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-5 text-xs font-medium text-slate-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} CRM Customer Relationship Management. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard?tab=projects" className="hover:text-[#F05454]">Projects</Link>
            <Link to="/contact" className="hover:text-[#F05454]">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
