const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\blogs\\[id]\\page.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }"use client";

import React from "react";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, BookOpen, Share2, Twitter, Linkedin } from "lucide-react";
import Button from "../../../components/ui/Button";
import GlassCard from "../../../components/ui/GlassCard";











export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = _optionalChain([params, 'optionalAccess', _ => _.id]) ;

  const articles = {
    "accelerate-sales-pipeline": {
      title: "How to Accelerate Your Sales Pipeline in 2026",
      category: "Sales",
      author: "Alex Sterling",
      date: "Jul 18, 2026",
      readTime: "5 min read",
      gradient: "from-blue-700 to-indigo-800",
      content: [
        "A healthy sales pipeline is the lifeblood of any growing business. In 2026, manual tracking, loose notes, and outdated spreadsheets are no longer sufficient. To scale client interactions and drive revenue, teams must embrace intelligent automated CRMs.",
        "First, qualifying leads is crucial. When a prospective customer contacts your business, categorizing their budget, industry vertical, and urgent requirements determines their potential value. Placing them into standard stages (New, Qualified, Proposal) provides clarity.",
        "Next, speed of proposal delivery makes all the difference. With the CRM platform, admins can immediately generate detailed quotation line items, configure tax percentages, and send the quote to the customer's portal. Direct online approvals remove negotiation lag.",
        "Lastly, follow up efficiently. Using automated email alerts and tracking when a client logs in to view their invoices keeps deals active and speeds up conversions."
      ]
    },
    "role-based-access-control": {
      title: "Best Practices for Role-Based Access Control (RBAC)",
      category: "Security",
      author: "Marcus Vance",
      date: "Jul 14, 2026",
      readTime: "7 min read",
      gradient: "from-purple-800 to-navy-900",
      content: [
        "Role-Based Access Control (RBAC) is essential to protecting customer databases, financial records, and core system settings. In a dual-role application (Admin and Customer), secure credential boundaries must be enforced.",
        "First, implement strict backend validations. Customers must never be allowed to register with an 'admin' role payload. The backend registration controllers should ignore or reject custom role fields, forcing all public registrants to the 'customer' role.",
        "Second, protect route middlewares. Every sensitive API endpoint must check the decoded JWT payload to verify that the user possesses the correct credentials before processing database edits.",
        "Third, maintain detailed Audit Logs. Logging login activity, password resets, and database changes establishes user accountability and alerts operators to anomalous account operations."
      ]
    },
    "reducing-friction": {
      title: "Reducing Invoicing Friction via Online UPI & Cards",
      category: "Billing",
      author: "Elena Rostova",
      date: "Jul 10, 2026",
      readTime: "4 min read",
      gradient: "from-emerald-700 to-blue-800",
      content: [
        "Fast accounts clearing is heavily dependent on payment accessibility. If customers are forced to send manual wire confirmations or navigate complex banking transfers, payment delays will inevitably rise.",
        "Integrating Stripe and Razorpay payment gateways directly inside the invoice layout allows clients to click, select Card or UPI, and settle payments in seconds.",
        "When an online transaction finishes, the database should immediately update the invoice status to 'Paid', record the gateway transaction ID in the Payments collection, and update the Admin dashboard's Revenue charts.",
        "Automating this flow reduces accounting errors, provides clients with quick payment receipts, and maintains high business cash flow."
      ]
    },
    "building-customer-retention": {
      title: "Building Customer Retention through Support Tickets",
      category: "Customer Success",
      author: "Sarah Jenkins",
      date: "Jun 28, 2026",
      readTime: "6 min read",
      gradient: "from-pink-700 to-purple-900",
      content: [
        "Onboarding a customer is only the first step. Long-term customer satisfaction relies on how fast you respond to their concerns and resolve support requests.",
        "A secure ticket desk allows customers to raise tickets, classify severity levels, explain technical issues, and upload diagnostic files.",
        "Admins can reply in real-time, record comments, escalate critical tickets, and track the average duration between submission and final resolution.",
        "Combining support tracking with automated SMTP email alerts keeps the client updated and ensures no service requests are lost or ignored."
      ]
    }
  };

  const article = articles[id];

  if (!article) {
    return (
      React.createElement('div', { className: "min-h-screen flex flex-col items-center justify-center gap-6"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
        , React.createElement('h2', { className: "text-xl text-navy-950 font-heading"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}, "Article Not Found"  )
        , React.createElement(Button, { onClick: () => router.push("/blogs"), variant: "primary", __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}, "Back to Blogs"

        )
      )
    );
  }

  return (
    React.createElement('div', { className: "min-h-screen py-16 px-6 md:px-12 max-w-4xl mx-auto flex flex-col gap-8"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}
      /* Back navigation */
      , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 100}}
        , React.createElement('button', {
          onClick: () => router.push("/blogs"),
          className: "inline-flex items-center gap-2 text-xs font-semibold uppercase text-gray-500 hover:text-navy-950 transition-colors"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}

          , React.createElement(ArrowLeft, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}} ), " Back to Insights"
        )
      )

      /* Hero Banner Grid */
      , React.createElement(GlassCard, { className: "p-0 overflow-hidden bg-white/50 border border-teal-500/10 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
        , React.createElement('div', { className: `w-full h-72 bg-gradient-to-tr ${article.gradient} flex items-center justify-center relative`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
          , React.createElement(BookOpen, { size: 64, className: "text-white/20", __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}} )
        )
        , React.createElement('div', { className: "p-6 md:p-8 flex flex-col gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
          , React.createElement('div', { className: "inline-flex max-w-fit px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-600 text-xs font-bold font-heading uppercase tracking-wide"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}
            , article.category
          )
          , React.createElement('h1', { className: "font-heading font-extrabold text-2xl md:text-3xl text-navy-950 leading-tight"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}
            , article.title
          )
          , React.createElement('div', { className: "flex flex-wrap items-center gap-6 text-xs text-gray-500 border-t border-gray-100 pt-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
            , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}, "By " , React.createElement('strong', { className: "text-gray-700", __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}, article.author))
            , React.createElement('span', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}, React.createElement(Calendar, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}} ), " " , article.date)
            , React.createElement('span', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}, React.createElement(Clock, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}} ), " " , article.readTime)
          )
        )
      )

      /* Content */
      , React.createElement('section', { className: "flex flex-col gap-6 text-gray-700 font-sans text-sm sm:text-base leading-relaxed max-w-3xl mx-auto"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}
        , article.content.map((paragraph, idx) => (
          React.createElement('p', { key: idx, __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}, paragraph)
        ))
      )

      /* Social / Sharing block */
      , React.createElement('section', { className: "border-t border-gray-200 pt-8 mt-4 flex items-center justify-between text-xs text-gray-500 max-w-3xl mx-auto w-full"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
        , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}, "Article Categories: "  , React.createElement('strong', { className: "text-gray-700", __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}, article.category))
        , React.createElement('div', { className: "flex items-center gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}
          , React.createElement('span', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}}, React.createElement(Share2, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 140}} ), " Share" )
          , React.createElement('button', { className: "text-gray-500 hover:text-navy-950 transition-colors"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}
            , React.createElement(Twitter, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}} )
          )
          , React.createElement('button', { className: "text-gray-500 hover:text-navy-950 transition-colors"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 144}}
            , React.createElement(Linkedin, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}} )
          )
        )
      )
    )
  );
}
