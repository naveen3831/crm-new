const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\app\\customer\\dashboard\\page.tsx"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CreditCard,
  FileText,
  Loader2,
  LogOut,
  Plus,
  RefreshCcw,
  CheckSquare,
  TicketCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import GlassCard from "../../../components/ui/GlassCard";
import Button from "../../../components/ui/Button";
import { generateSpeshwayEstimationPdfHtml, generateSpeshwayTaxInvoicePdfHtml, generateSpeshwayAgreementPdfHtml } from "../../../utils/pdfGenerator";
import { getCrmSocket } from "../../../utils/realtime";
import { showToast } from "../../../utils/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const FORM_INPUT_CLASS =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#06132D] outline-none transition placeholder:text-slate-400 focus:border-[#FF5349] focus:ring-4 focus:ring-red-100";









































































































const normalize = (value) => String(value || "").trim().toLowerCase();
const same = (a, b) => normalize(a) === normalize(b) && Boolean(normalize(a));
const isDeletedStatus = (status) => normalize(status) === "deleted";
const money = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value || 0));

const uniqueById = (records) => {
  const seen = new Set();
  return records.filter((record) => {
    const key = record.id || record.number || JSON.stringify(record);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const uniqueProjectsByIdentity = (records) => {
  const byKey = new Map();
  records.forEach((project) => {
    const nameKey = normalize(project.name || project.title);
    const idKey = normalize(project.id);
    const key = nameKey || idKey;
    if (!key) return;

    const existing = byKey.get(key);
    const existingHasRealId = Boolean(_optionalChain([existing, 'optionalAccess', _ => _.id]) && !normalize(existing.id).startsWith("client-project-"));
    const nextHasRealId = Boolean(project.id && !normalize(project.id).startsWith("client-project-"));
    if (!existing || (!existingHasRealId && nextHasRealId)) {
      byKey.set(key, { ...existing, ...project, projectTodos: project.projectTodos || _optionalChain([existing, 'optionalAccess', _2 => _2.projectTodos]) || [] });
    } else {
      byKey.set(key, { ...project, ...existing, projectTodos: existing.projectTodos || project.projectTodos || [] });
    }
  });
  return Array.from(byKey.values());
};

const ProjectStageTimeline = ({ currentStatus }) => {
  const stages = ["Planning", "Designing", "Development", "Testing", "Completed"];
  const normalized = String(currentStatus || "").trim().toLowerCase();
  let activeIndex = 0;
  if (normalized === "designing" || normalized === "design") activeIndex = 1;
  else if (normalized === "development" || normalized === "in progress" || normalized === "in-progress") activeIndex = 2;
  else if (normalized === "testing") activeIndex = 3;
  else if (normalized === "completed") activeIndex = 4;

  return (
    React.createElement('div', { className: "mt-5 w-full border-t border-slate-100 pt-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
      , React.createElement('div', { className: "flex justify-between items-center relative mb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}
        , React.createElement('div', { className: "absolute left-0 right-0 h-1 bg-slate-200 rounded-full top-[14px] -z-10"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}} )
        , React.createElement('div', { 
          className: "absolute left-0 h-1 bg-[#FF5349] rounded-full top-[14px] -z-10 transition-all duration-500"        , 
          style: { width: `${(activeIndex / (stages.length - 1)) * 100}%` }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}
        )

        , stages.map((stage, idx) => {
          const isCompleted = idx < activeIndex;
          const isActive = idx === activeIndex;
          const isPending = idx > activeIndex;

          let circleClass = "";
          if (isActive) {
            circleClass = "bg-[#FF5349] text-white ring-4 ring-red-100 scale-110 shadow-md";
          } else if (isCompleted) {
            circleClass = "bg-[#06132D] text-white shadow-sm";
          } else {
            circleClass = "bg-white border-2 border-slate-300 text-slate-400";
          }

          return (
            React.createElement('div', { key: stage, className: "flex flex-col items-center flex-1 min-w-0"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 202}}
              , React.createElement('div', { className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${circleClass}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 203}}
                , isCompleted ? "✓" : idx + 1
              )
              , React.createElement('span', { className: `mt-2 text-[10px] sm:text-xs font-bold truncate max-w-full px-1 ${
                isActive ? "text-[#FF5349] font-extrabold" : isCompleted ? "text-[#06132D]" : "text-slate-400"
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 206}}
                , stage
              )
            )
          );
        })
      )
    )
  );
};

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentUser, setCurrentUser] = useState(null);
  const [clientProfile, setClientProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [clientDocumentRecords, setClientDocumentRecords] = useState([]);
  const [selectedProjectForTodos, setSelectedProjectForTodos] = useState(null);
  const [projectTodoInputs, setProjectTodoInputs] = useState({});
  const activeTodoProject = selectedProjectForTodos;
  const [isLoading, setIsLoading] = useState(false);
  const [pdfPreview, setPdfPreview] = useState(null);

  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketBody, setTicketBody] = useState("");
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const [showPayModal, setShowPayModal] = useState(false);
  const [payingInvoice, setPayingInvoice] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      window.location.href = "/auth/login";
      return;
    }

    try {
      const parsed = JSON.parse(savedUser);
      if (parsed.role === "admin") {
        window.location.href = "/admin/dashboard";
        return;
      }
      setCurrentUser(parsed);
    } catch (e2) {
      window.location.href = "/auth/login";
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    loadCustomerData(currentUser);
    const timer = window.setInterval(() => loadCustomerData(currentUser, true), 30000);
    return () => window.clearInterval(timer);
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const socket = getCrmSocket();
    if (!socket) return;

    const handleRealtimeUpdate = () => {
      loadCustomerData(currentUser, true);
    };

    const handleSocketReady = () => {
      socket.emit("crm:join", `customer:${currentUser.email || currentUser.id || "portal"}`);
      loadCustomerData(currentUser, true);
    };

    if (socket.connected) {
      handleSocketReady();
    }

    socket.on("crm:data-changed", handleRealtimeUpdate);
    socket.on("connect", handleSocketReady);

    return () => {
      socket.off("crm:data-changed", handleRealtimeUpdate);
      socket.off("connect", handleSocketReady);
    };
  }, [currentUser]);


  const matchClientProfile = (clients, user) => {
    const userEmail = normalize(_optionalChain([user, 'optionalAccess', _3 => _3.email]));
    const userName = normalize(_optionalChain([user, 'optionalAccess', _4 => _4.name]));
    const scoreClient = (client) => {
      const deletedPenalty = isDeletedStatus(client.status) ? -50 : 0;
      const notes = normalize(client.notes);
      let score = deletedPenalty;
      if (same(client.loginEmail, userEmail)) score += 100;
      if (notes.includes(userEmail)) score += 95;
      if (same(client.email, userEmail)) score += 85;
      if (same(client.name, userName)) score += 40;
      if (same(client.company, userName)) score += 35;
      return score;
    };

    return [...clients].sort((a, b) => scoreClient(b) - scoreClient(a)).find((client) => scoreClient(client) > 0) || null;
  };

  const loadCustomerData = async (user = currentUser, silent = false) => {
    if (!user) return;
    try {
      if (!silent) setIsLoading(true);

      let bulkData = null;
      try {
        const bulkRes = await fetch(`${API_URL}/crm/bulk?t=${Date.now()}`).then((r) => r.json());
        if (bulkRes && bulkRes.success && bulkRes.data && typeof bulkRes.data === "object") {
          bulkData = bulkRes.data;
        }
      } catch (e) {}

      let clientsRaw = _optionalChain([bulkData, 'optionalAccess', _5 => _5.client]);
      let projectsRaw = _optionalChain([bulkData, 'optionalAccess', _6 => _6.project]);
      let quotesRaw = _optionalChain([bulkData, 'optionalAccess', _7 => _7.quotation]);
      let invoicesRaw = _optionalChain([bulkData, 'optionalAccess', _8 => _8.invoice]);
      let ticketsRaw = _optionalChain([bulkData, 'optionalAccess', _9 => _9.ticket]);
      let docsRaw = _optionalChain([bulkData, 'optionalAccess', _10 => _10["client-document"]]) || _optionalChain([bulkData, 'optionalAccess', _11 => _11.clientdocuments]);

      if (!bulkData) {
        const [resClients, resProjects, resOurProjects, resQ, resInv, resT, resDocs] = await Promise.all([
          fetch(`${API_URL}/crm/client`).then((r) => r.json()),
          fetch(`${API_URL}/crm/project`).then((r) => r.json()),
          fetch(`${API_URL}/crm/our-projects`).then((r) => r.json()),
          fetch(`${API_URL}/crm/quotation`).then((r) => r.json()),
          fetch(`${API_URL}/crm/invoice`).then((r) => r.json()),
          fetch(`${API_URL}/crm/ticket`).then((r) => r.json()),
          fetch(`${API_URL}/crm/client-document`).then((r) => r.json()).catch(() => ({ data: [] })),
        ]);
        clientsRaw = _optionalChain([resClients, 'optionalAccess', _12 => _12.data]);
        projectsRaw = _optionalChain([resProjects, 'optionalAccess', _13 => _13.data]);
        quotesRaw = _optionalChain([resQ, 'optionalAccess', _14 => _14.data]);
        invoicesRaw = _optionalChain([resInv, 'optionalAccess', _15 => _15.data]);
        ticketsRaw = _optionalChain([resT, 'optionalAccess', _16 => _16.data]);
        docsRaw = _optionalChain([resDocs, 'optionalAccess', _17 => _17.data]);
      }

      const clients = Array.isArray(clientsRaw) ? clientsRaw : [];
      const allClientDocs = Array.isArray(docsRaw) ? docsRaw : [];
      const profile = matchClientProfile(clients, user);
      const matchedByGeneratedLogin = Boolean(
        profile &&
        (
          same(profile.loginEmail, _optionalChain([user, 'optionalAccess', _18 => _18.email])) ||
          normalize(profile.notes).includes(normalize(_optionalChain([user, 'optionalAccess', _19 => _19.email])))
        )
      );

      const clientEmailKeys = Array.from(new Set([
        normalize(_optionalChain([user, 'optionalAccess', _20 => _20.email])),
        normalize(_optionalChain([profile, 'optionalAccess', _21 => _21.email])),
        normalize(_optionalChain([profile, 'optionalAccess', _22 => _22.loginEmail])),
      ].filter(Boolean)));

      const clientIdKeys = Array.from(new Set([
        normalize(_optionalChain([profile, 'optionalAccess', _23 => _23.id])),
      ].filter(Boolean)));

      const belongsToClient = (record) => {
        if (!record) return false;
        const item = record.item || {};
        const emails = [
          record.sentToEmail,
          record.clientEmail,
          record.toEmail,
          record.email,
          record.userEmail,
          item.sentToEmail,
          item.clientEmail,
          item.toEmail,
          item.email,
          item.userEmail,
        ].map(normalize).filter(Boolean);

        const clientIds = [
          record.clientId,
          item.clientId,
        ].map(normalize).filter(Boolean);

        const emailMatch = clientEmailKeys.some((eKey) =>
          emails.some((rEmail) => rEmail === eKey || rEmail.includes(eKey))
        );
        const idMatch = clientIdKeys.some((idKey) =>
          clientIds.some((rId) => rId === idKey)
        );

        return emailMatch || idMatch;
      };

      const allProjects = Array.isArray(projectsRaw) ? projectsRaw : [];
      const scopedProjects = allProjects.filter((project) => {
        if (belongsToClient(project)) return true;
        const pClientName = normalize(project.clientName);
        if (!pClientName) return false;
        const profileName = normalize(_optionalChain([profile, 'optionalAccess', _24 => _24.name]));
        const profileCompany = normalize(_optionalChain([profile, 'optionalAccess', _25 => _25.company]));
        return (
          (profileName && (pClientName === profileName || pClientName.includes(profileName) || profileName.includes(profileName))) ||
          (profileCompany && (pClientName === profileCompany || pClientName.includes(profileCompany) || profileCompany.includes(pClientName)))
        );
      });
      const projectIds = scopedProjects.map((project) => normalize(project.id)).filter(Boolean);
      const projectNames = scopedProjects.map((project) => normalize(project.name || project.title)).filter(Boolean);

      const belongsToProject = (record) =>
        projectIds.includes(normalize(record.projectId)) ||
        projectIds.includes(normalize(record.clientProjectId)) ||
        projectIds.includes(normalize(record.id)) ||
        projectNames.includes(normalize(record.projectName)) ||
        projectNames.includes(normalize(record.productName));

      const allQuotes = Array.isArray(quotesRaw) ? quotesRaw : [];
      const scopedQuotes = allQuotes.filter((record) =>
        belongsToClient(record) || belongsToProject(record)
      );
      const quoteRefs = scopedQuotes.flatMap((quote) => [quote.id, quote.number, quote.documentRef]).map(normalize).filter(Boolean);
      const scopedInvoices = (Array.isArray(invoicesRaw) ? invoicesRaw : []).filter((record) =>
        belongsToClient(record) ||
        belongsToProject(record) ||
        quoteRefs.includes(normalize(record.proposalId)) ||
        quoteRefs.includes(normalize(record.quotationId)) ||
        quoteRefs.includes(normalize(record.documentRef)) ||
        quoteRefs.some((ref) => normalize(record.number).includes(ref))
      );
      const scopedTickets = (Array.isArray(ticketsRaw) ? ticketsRaw : []).filter((record) =>
        belongsToClient(record)
      );
      const sentClientDocs = allClientDocs.filter((record) => {
        const item = record.item || record;
        const overrideKeys = Array.isArray(record.overrideKeys) ? record.overrideKeys : [];
        const keyMatchesClient = overrideKeys.some((key) =>
          clientEmailKeys.some((eKey) => normalize(key).includes(eKey)) ||
          clientIdKeys.some((idKey) => normalize(key).includes(idKey))
        );
        return record.visibleToClient !== false && (
          belongsToClient(record) ||
          belongsToClient(item) ||
          keyMatchesClient
        );
      });
      const sentDocRefs = sentClientDocs
        .flatMap((record) => {
          const item = record.item || record;
          return [
            record.documentRef,
            record.id,
            record.documentKey,
            item.id,
            item.number,
            item.quotationId,
            item.proposalId,
            item.refNumber,
            item.projectId,
            item.projectName,
          ];
        })
        .map(normalize)
        .filter(Boolean);
      const quotesLinkedToVisibleDocs = allQuotes.filter((quote) => {
        const quoteRefs = [quote.id, quote.number, quote.documentRef, quote.projectId, quote.projectName]
          .map(normalize)
          .filter(Boolean);
        return quoteRefs.some((quoteRef) =>
          sentDocRefs.some((docRef) => docRef === quoteRef || docRef.includes(quoteRef) || quoteRef.includes(docRef))
        );
      });
      const sentQuotes = sentClientDocs
        .filter((record) => record.documentType === "quotation")
        .map((record) => ({
          ...(record.item || record),
          id: (record.item || record).id || record.documentRef || record.id,
          number: (record.item || record).number || record.documentRef || record.id,
          htmlContent: record.htmlContent,
          status: (record.item || record).status || "Sent",
        }));
      const sentInvoices = sentClientDocs
        .filter((record) => record.documentType === "invoice")
        .map((record) => ({
          ...(record.item || record),
          id: (record.item || record).id || record.documentRef || record.id,
          number: (record.item || record).number || record.documentRef || record.id,
          htmlContent: record.htmlContent,
          status: (record.item || record).status || "Sent",
        }));
      const sentAgreements = sentClientDocs
        .filter((record) => record.documentType === "agreement")
        .map((record) => ({
          ...(record.item || record),
          id: (record.item || record).id || record.documentRef || record.id,
          number: (record.item || record).number || record.documentRef || record.id,
          htmlContent: record.htmlContent,
          status: (record.item || record).status || "Signed",
        }));
      const docsAndClientRecords = [
        ...sentClientDocs.map((record) => ({ ...record, ...(record.item || {}) })),
        ...sentQuotes,
        ...sentInvoices,
        ...sentAgreements,
        ...quotesLinkedToVisibleDocs,
        ...scopedQuotes,
        ...scopedInvoices,
      ];
      const docLinkedProjects = docsAndClientRecords
        .map((record) => {
          const projectId = record.projectId || record.clientProjectId;
          const projectName = record.projectName || record.productName || record.title || record.name;
          if (!projectId && !projectName) return null;
          return {
            id: projectId || `CLIENT-PROJECT-${normalize(projectName).replace(/[^a-z0-9]+/g, "-")}`,
            name: projectName || projectId,
            title: projectName || projectId,
            clientId: record.clientId || _optionalChain([profile, 'optionalAccess', _26 => _26.id]) || "",
            clientName: record.clientName || _optionalChain([profile, 'optionalAccess', _27 => _27.name]) || _optionalChain([currentUser, 'optionalAccess', _28 => _28.name]) || "",
            clientEmail: record.clientEmail || record.sentToEmail || _optionalChain([profile, 'optionalAccess', _29 => _29.email]) || _optionalChain([currentUser, 'optionalAccess', _30 => _30.email]) || "",
            category: record.category || record.projectType || "Client Project",
            status: record.projectStatus || record.status || "Active",
            progress: Number(record.progress || record.completion || 10),
            budget: Number(record.budget || record.amount || record.rate || record.totalDue || record.planAPrice || 0),
            description: record.description || record.overviewNarrative || "",
            expectedCompletionDate: record.expectedCompletionDate || record.dueDate || "",
            projectTodos: Array.isArray(record.projectTodos) ? record.projectTodos : (Array.isArray(_optionalChain([record, 'access', _31 => _31.item, 'optionalAccess', _32 => _32.projectTodos])) ? record.item.projectTodos : []),
          } ;
        })
        .filter(Boolean) ;

      setClientProfile(profile);
      setClientDocumentRecords(sentClientDocs);
      setProjects(uniqueProjectsByIdentity([...scopedProjects, ...docLinkedProjects]));
      setQuotes(uniqueById([...sentQuotes, ...quotesLinkedToVisibleDocs]));
      setInvoices(uniqueById([...sentInvoices]));
      setAgreements(uniqueById([...sentAgreements]));
      setTickets(uniqueById(scopedTickets));
    } catch (err) {
      console.error("[Customer DB Load Error]", err);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  const sidebarLinks = [
    { name: "Dashboard", id: "overview" , icon: React.createElement(FileText, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 557}} ) },
    { name: "My Projects", id: "projects" , icon: React.createElement(BriefcaseBusiness, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 558}} ) },
    { name: "My Quotations", id: "quotations" , icon: React.createElement(FileText, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 559}} ) },
    { name: "Invoices & Payments", id: "billing" , icon: React.createElement(CreditCard, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 560}} ) },
    { name: "Support Desk", id: "support" , icon: React.createElement(TicketCheck, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 561}} ) },
  ];

  const displayName = _optionalChain([clientProfile, 'optionalAccess', _33 => _33.name]) || _optionalChain([currentUser, 'optionalAccess', _34 => _34.name]) || "Client";
  const displayCompany = _optionalChain([clientProfile, 'optionalAccess', _35 => _35.company]) || _optionalChain([currentUser, 'optionalAccess', _36 => _36.company]) || "Client Workspace";
  const totalInvoiceValue = useMemo(
    () => invoices.reduce((sum, inv) => sum + Number(inv.totalDue || inv.totalAmount || inv.amount || inv.value || inv.rate || 0), 0),
    [invoices]
  );

  const handleAcceptQuote = async (quoteId) => {
    try {
      await fetch(`${API_URL}/crm/quotation/${encodeURIComponent(quoteId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "accepted" }),
      });
      setQuotes((prev) => prev.map((q) => (q.id === quoteId || q.number === quoteId ? { ...q, status: "accepted" } : q)));
    } catch (e3) {}
  };

  const handleRejectQuote = async (quoteId) => {
    try {
      await fetch(`${API_URL}/crm/quotation/${encodeURIComponent(quoteId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      setQuotes((prev) => prev.map((q) => (q.id === quoteId || q.number === quoteId ? { ...q, status: "rejected" } : q)));
    } catch (e4) {}
  };

  const triggerPayment = (invoice) => {
    setPayingInvoice(invoice);
    setPaymentSuccess(false);
    setShowPayModal(true);
  };

  const executeMockPayment = async () => {
    if (!payingInvoice) return;
    setIsPaying(true);
    try {
      const invId = payingInvoice.id;
      await fetch(`${API_URL}/crm/invoice/${encodeURIComponent(invId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "paid" }),
      });

      await fetch(`${API_URL}/crm/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: _optionalChain([clientProfile, 'optionalAccess', _37 => _37.id]),
          clientName: _optionalChain([clientProfile, 'optionalAccess', _38 => _38.name]) || payingInvoice.clientName || displayName,
          amount: payingInvoice.totalDue || payingInvoice.totalAmount || payingInvoice.value || payingInvoice.amount || 0,
          gateway: "Stripe",
          date: new Date().toISOString().split("T")[0],
        }),
      });

      setPaymentSuccess(true);
      setInvoices((prev) => prev.map((inv) => (inv.id === invId ? { ...inv, status: "paid" } : inv)));
      setTimeout(() => {
        setShowPayModal(false);
        setPayingInvoice(null);
      }, 1500);
    } finally {
      setIsPaying(false);
    }
  };

  const handleRaiseTicket = async (e) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketBody.trim()) return;

    const ticketPayload = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject,
      message: ticketBody,
      date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
      status: "open",
      clientId: _optionalChain([clientProfile, 'optionalAccess', _39 => _39.id]),
      userEmail: _optionalChain([clientProfile, 'optionalAccess', _40 => _40.email]) || _optionalChain([currentUser, 'optionalAccess', _41 => _41.email]) || "customer@crm.com",
      userName: _optionalChain([clientProfile, 'optionalAccess', _42 => _42.name]) || _optionalChain([currentUser, 'optionalAccess', _43 => _43.name]) || "Customer Account",
    };

    try {
      await fetch(`${API_URL}/crm/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketPayload),
      });

      setTickets((prev) => [ticketPayload, ...prev]);
      setTicketSuccess(true);
      setTicketSubject("");
      setTicketBody("");
      setTimeout(() => setTicketSuccess(false), 4000);
    } catch (err) {
      console.error("[Create Ticket Error]", err);
    }
  };

  const getProjectDocumentMatches = (project) => {
    const projectKeys = [project.id, project.name, project.title].map(normalize).filter(Boolean);
    return clientDocumentRecords.filter((record) => {
      const item = record.item || {};
      const overrideKeys = Array.isArray(record.overrideKeys) ? record.overrideKeys : [];
      const recordProjectKeys = [
        record.clientProjectId,
        record.projectId,
        record.projectName,
        item.clientProjectId,
        item.projectId,
        item.projectName,
        item.productName,
        item.title,
      ].map(normalize).filter(Boolean);
      return (
        recordProjectKeys.some((key) => projectKeys.includes(key)) ||
        overrideKeys.some((key) => projectKeys.some((projectKey) => normalize(key).includes(`::${projectKey}`)))
      );
    });
  };

  const getProjectTodos = (project) => {
    const match = getProjectDocumentMatches(project).find((record) =>
      Array.isArray(record.projectTodos) || Array.isArray(_optionalChain([record, 'access', _44 => _44.item, 'optionalAccess', _45 => _45.projectTodos]))
    );
    const todos = _optionalChain([match, 'optionalAccess', _46 => _46.projectTodos]) || _optionalChain([match, 'optionalAccess', _47 => _47.item, 'optionalAccess', _48 => _48.projectTodos]) || project.projectTodos || [];
    return Array.isArray(todos) ? todos : [];
  };

  const persistProjectTodos = async (project, todos) => {
    const matches = getProjectDocumentMatches(project);
    const updatedAt = new Date().toISOString();
    const clientId = _optionalChain([clientProfile, 'optionalAccess', _49 => _49.id]) || project.clientId || _optionalChain([currentUser, 'optionalAccess', _50 => _50.id]) || "";
    const documentKey = `${clientId || _optionalChain([currentUser, 'optionalAccess', _51 => _51.email]) || "client"}::project::${project.id}`;
    const baseRecord = {
      documentKey,
      id: documentKey,
      documentType: "project",
      documentRef: project.id,
      visibleToClient: true,
      clientId,
      clientName: _optionalChain([clientProfile, 'optionalAccess', _52 => _52.name]) || project.clientName || displayName,
      clientCompany: _optionalChain([clientProfile, 'optionalAccess', _53 => _53.company]) || displayCompany,
      clientEmail: _optionalChain([clientProfile, 'optionalAccess', _54 => _54.email]) || _optionalChain([currentUser, 'optionalAccess', _55 => _55.email]) || project.clientEmail || "",
      sentToEmail: _optionalChain([currentUser, 'optionalAccess', _56 => _56.email]) || _optionalChain([clientProfile, 'optionalAccess', _57 => _57.email]) || project.clientEmail || "",
      clientProjectId: project.id,
      projectId: project.id,
      projectName: project.name || project.title,
      projectStatus: project.status,
      projectTodos: todos,
      updatedAt,
      item: {
        ...project,
        projectId: project.id,
        projectName: project.name || project.title,
        clientId,
        clientName: _optionalChain([clientProfile, 'optionalAccess', _58 => _58.name]) || project.clientName || displayName,
        clientEmail: _optionalChain([clientProfile, 'optionalAccess', _59 => _59.email]) || _optionalChain([currentUser, 'optionalAccess', _60 => _60.email]) || project.clientEmail || "",
        projectStatus: project.status,
        projectTodos: todos,
        updatedAt,
      },
    };
    const recordsToSave = matches.length ? matches : [baseRecord];

    await Promise.all(recordsToSave.map(async (record) => {
      const key = record.documentKey || record.id || documentKey;
      const updatedRecord = {
        ...record,
        documentKey: key,
        id: record.id || key,
        visibleToClient: true,
        clientProjectId: record.clientProjectId || project.id,
        projectId: record.projectId || project.id,
        projectName: record.projectName || project.name || project.title,
        projectStatus: record.projectStatus || project.status,
        projectTodos: todos,
        updatedAt,
        item: {
          ...(record.item || {}),
          projectId: _optionalChain([record, 'access', _61 => _61.item, 'optionalAccess', _62 => _62.projectId]) || project.id,
          projectName: _optionalChain([record, 'access', _63 => _63.item, 'optionalAccess', _64 => _64.projectName]) || project.name || project.title,
          projectStatus: _optionalChain([record, 'access', _65 => _65.item, 'optionalAccess', _66 => _66.projectStatus]) || project.status,
          projectTodos: todos,
          updatedAt,
        },
      };
      await fetch(`${API_URL}/crm/client-document/${encodeURIComponent(key)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecord),
      });
    }));

    setClientDocumentRecords((prev) => {
      const savedKeys = new Set(recordsToSave.map((record) => record.documentKey || record.id || documentKey));
      const next = prev.map((record) => {
        const key = record.documentKey || record.id;
        if (!savedKeys.has(key)) return record;
        return {
          ...record,
          projectTodos: todos,
          updatedAt,
          item: { ...(record.item || {}), projectTodos: todos, updatedAt },
        };
      });
      return matches.length ? next : [{ ...baseRecord, updatedAt }, ...next];
    });
    setProjects((prev) => uniqueProjectsByIdentity(prev.map((item) => item.id === project.id ? { ...item, projectTodos: todos } : item)));
    setSelectedProjectForTodos((prev) => prev && prev.id === project.id ? { ...prev, projectTodos: todos } : prev);
  };

  const handleAddProjectTodo = async (project) => {
    const text = (projectTodoInputs[project.id] || "").trim();
    if (!text) return;
    const now = new Date().toISOString();
    const todos = [
      ...getProjectTodos(project),
      { id: `TODO-${Date.now()}`, text, completed: false, createdAt: now, updatedAt: now },
    ];
    try {
      await persistProjectTodos(project, todos);
      setProjectTodoInputs((prev) => ({ ...prev, [project.id]: "" }));
      showToast("Project todo added.", "success");
    } catch (err) {
      console.error("[Customer Todo Save Error]", err);
      showToast("Failed to save todo.", "error");
    }
  };

  const handleToggleProjectTodo = async (project, todoId) => {
    const now = new Date().toISOString();
    const todos = getProjectTodos(project).map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed, updatedAt: now } : todo
    );
    try {
      await persistProjectTodos(project, todos);
      showToast("Project todo updated.", "success");
    } catch (err) {
      console.error("[Customer Todo Update Error]", err);
      showToast("Failed to update todo.", "error");
    }
  };

  const handleDeleteProjectTodo = async (project, todoId) => {
    const todos = getProjectTodos(project).filter((todo) => todo.id !== todoId);
    try {
      await persistProjectTodos(project, todos);
      showToast("Project todo removed.", "success");
    } catch (err) {
      console.error("[Customer Todo Delete Error]", err);
      showToast("Failed to remove todo.", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const openQuotationPreview = (quote) => {
    if (quote.htmlContent) {
      setPdfPreview({ title: `Quotation Preview - ${quote.number || quote.id}`, html: quote.htmlContent });
      return;
    }
    const project = projects.find((p) => same(p.id, quote.projectId) || same(p.name, quote.projectName));
    const html = generateSpeshwayEstimationPdfHtml(quote, project || {
      name: quote.projectName || quote.title,
      clientName: quote.clientName || displayCompany,
      category: quote.projectName || "Client Project",
    }, [], 1);
    setPdfPreview({ title: `Quotation Preview - ${quote.number || quote.id}`, html });
  };

  const openInvoicePreview = (invoice) => {
    if (invoice.htmlContent) {
      setPdfPreview({ title: `Invoice Preview - ${invoice.number || invoice.id}`, html: invoice.htmlContent });
      return;
    }
    const project = projects.find((p) => same(p.id, invoice.projectId) || same(p.name, invoice.projectName || invoice.productName));
    const html = generateSpeshwayTaxInvoicePdfHtml(invoice, project || {
      name: invoice.projectName || invoice.productName || invoice.title,
      clientName: invoice.clientName || displayCompany,
    }, 1);
    setPdfPreview({ title: `Invoice Preview - ${invoice.number || invoice.id}`, html });
  };

  const openAgreementPreview = (agreement) => {
    if (agreement.htmlContent) {
      setPdfPreview({ title: `Agreement Preview - ${agreement.number || agreement.id}`, html: agreement.htmlContent });
      return;
    }
    const project = projects.find((p) => same(p.id, agreement.projectId) || same(p.name, agreement.projectName));
    const html = generateSpeshwayAgreementPdfHtml(agreement, project || {
      name: agreement.projectName || agreement.title,
      clientName: agreement.clientName || displayCompany,
    }, 1);
    setPdfPreview({ title: `Agreement Preview - ${agreement.number || agreement.id}`, html });
  };

  const renderStatus = (status) => {
    const value = status || "Pending";
    const tone =
      normalize(value).includes("paid") || normalize(value).includes("approved") || normalize(value).includes("complete") || normalize(value).includes("accepted")
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : normalize(value).includes("reject") || normalize(value).includes("cancel")
          ? "bg-red-50 text-red-700 border-red-200"
          : "bg-amber-50 text-amber-700 border-amber-200";
    return React.createElement('span', { className: `inline-flex rounded-md border px-2.5 py-1 text-[11px] font-extrabold uppercase ${tone}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 874}}, value);
  };

  return (
    React.createElement('div', { className: "min-h-screen bg-[#F8FAFC] text-slate-900 md:flex"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 878}}
      , React.createElement('aside', { className: "w-full bg-[#0F172A] text-white md:sticky md:top-0 md:h-screen md:w-72 border-r border-slate-800/60 shadow-xl"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 879}}
        , React.createElement('div', { className: "flex h-full flex-col justify-between p-6"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 880}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 881}}
            , React.createElement('div', { className: "flex items-center gap-3 border-b border-slate-800/60 pb-6"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 882}}
              , React.createElement('div', { className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shadow-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 883}}
                , React.createElement(UserRound, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 884}} )
              )
              , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 886}}
                , React.createElement('div', { className: "truncate font-heading text-base font-black text-white"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 887}}, "Client Portal" )
                , React.createElement('div', { className: "truncate text-xs font-semibold text-slate-300"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 888}}, _optionalChain([currentUser, 'optionalAccess', _67 => _67.email]) || "customer@crm.com")
              )
            )

            , React.createElement('nav', { className: "mt-6 grid gap-1.5"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 892}}
              , sidebarLinks.map((link) => (
                React.createElement('button', {
                  key: link.id,
                  onClick: () => setActiveTab(link.id),
                  className: `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-extrabold transition-all duration-200 [&>svg]:text-current [&>svg]:w-4 [&>svg]:h-4 ${
                    activeTab === link.id
                      ? "bg-[#FF5349] !text-white shadow-lg shadow-[#FF5349]/30 scale-[1.01]"
                      : "!text-slate-300 hover:!text-white hover:bg-slate-800/60"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 894}}

                  , link.icon
                  , React.createElement('span', { className: "leading-tight", __self: this, __source: {fileName: _jsxFileName, lineNumber: 904}}, link.name)
                )
              ))
            )
          )

          , React.createElement('div', { className: "border-t border-slate-800/60 pt-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 910}}
            , React.createElement('div', { className: "rounded-2xl bg-slate-900 p-4 border border-slate-800 shadow-inner mb-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 911}}
              , React.createElement('div', { className: "text-[11px] font-extrabold uppercase text-indigo-400"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 912}}, "Account Details" )
              , React.createElement('div', { className: "mt-1 truncate text-xs font-black text-white"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 913}}, displayName)
              , React.createElement('div', { className: "truncate text-[11px] font-semibold text-slate-400"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 914}}, displayCompany)
            )
            , React.createElement(Button, {
              onClick: handleLogout,
              variant: "outline",
              className: "w-full justify-center gap-2 rounded-xl border-red-200/40 py-2.5 text-xs font-extrabold text-red-400 hover:bg-red-950/30 transition-colors"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 916}}

              , React.createElement(LogOut, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 921}} ), " Log Out"
            )
          )
        )
      )

      , React.createElement('main', { className: "flex-1 overflow-y-auto" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 927}}
        , React.createElement('div', { className: "mx-auto w-full max-w-[1180px] px-5 py-6 sm:px-8 lg:px-10 lg:py-10"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 928}}
          , React.createElement('header', { className: "mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 929}}
            , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 930}}
              , React.createElement('p', { className: "text-xs font-extrabold uppercase tracking-[0.16em] text-[#FF5349]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 931}}, "Live Client Workspace"  )
              , React.createElement('h1', { className: "mt-2 text-3xl font-heading font-extrabold tracking-tight text-[#06132D]"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 932}}, "Welcome Back, "  , displayName)
              , React.createElement('p', { className: "mt-2 max-w-2xl text-sm font-medium text-slate-600"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 933}}, "Your dashboard is synced to your client profile, projects, quotations, invoices, and support tickets."

              )
            )
            , React.createElement('button', {
              onClick: () => loadCustomerData(currentUser),
              className: "inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-xs font-extrabold text-[#FF5349] shadow-sm transition hover:bg-red-50"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 937}}

              , React.createElement(RefreshCcw, { size: 14, className: isLoading ? "animate-spin" : "", __self: this, __source: {fileName: _jsxFileName, lineNumber: 941}} ), "Refresh Live Data"

            )
          )

          , isLoading && (
            React.createElement('div', { className: "mb-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-extrabold text-[#FF5349]"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 947}}
              , React.createElement(Loader2, { size: 14, className: "animate-spin", __self: this, __source: {fileName: _jsxFileName, lineNumber: 948}} ), " Syncing your live dashboard records..."
            )
          )

          , activeTab === "overview" && (
            React.createElement('div', { className: "grid gap-6" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 953}}
              , React.createElement('section', { className: "grid grid-cols-1 gap-4 md:grid-cols-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 954}}
                , [
                  { label: "Projects", value: projects.length, detail: "Assigned to your account", icon: React.createElement(BriefcaseBusiness, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 956}} ) },
                  { label: "Quotations", value: quotes.length, detail: "Your proposal records", icon: React.createElement(FileText, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 957}} ) },
                  { label: "Invoices", value: invoices.length, detail: money(totalInvoiceValue), icon: React.createElement(CreditCard, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 958}} ) },
                  { label: "Tickets", value: tickets.length, detail: "Support requests", icon: React.createElement(TicketCheck, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 959}} ) },
                ].map((metric) => (
                  React.createElement(GlassCard, { key: metric.label, className: "rounded-lg border border-slate-200 bg-white p-5 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 961}}
                    , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 962}}
                      , React.createElement('span', { className: "text-xs font-extrabold uppercase text-slate-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 963}}, metric.label)
                      , React.createElement('span', { className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 964}}, metric.icon)
                    )
                    , React.createElement('div', { className: "mt-4 text-3xl font-heading font-extrabold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 966}}, metric.value)
                    , React.createElement('div', { className: "mt-1 text-xs font-semibold text-slate-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 967}}, metric.detail)
                  )
                ))
              )

              , React.createElement('section', { className: "grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 972}}
                , React.createElement(GlassCard, { className: "rounded-lg border border-slate-200 bg-white p-6 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 973}}
                  , React.createElement('div', { className: "mb-5 flex items-center justify-between"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 974}}
                    , React.createElement('h2', { className: "font-heading text-xl font-extrabold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 975}}, "My Projects" )
                    , React.createElement('span', { className: "text-xs font-extrabold text-slate-400"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 976}}, projects.length, " live" )
                  )
                  , projects.length === 0 ? (
                    React.createElement(EmptyState, { text: "No projects are assigned to this client profile yet."        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 979}} )
                  ) : (
                    React.createElement('div', { className: "grid gap-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 981}}
                      , projects.slice(0, 4).map((project) => (
                        React.createElement(RecordRow, {
                          key: project.id,
                          title: project.name || project.title || "Client Project",
                          meta: `${project.category || "Project"} - ${money(project.budget)}`,
                          right: renderStatus(project.status || "Planning"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 983}}
                        )
                      ))
                    )
                  )
                )

                , React.createElement(GlassCard, { className: "rounded-lg border border-slate-200 bg-white p-6 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 994}}
                  , React.createElement('h2', { className: "mb-5 font-heading text-xl font-extrabold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 995}}, "Client Profile" )
                  , React.createElement('div', { className: "grid gap-4 text-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 996}}
                    , React.createElement(InfoRow, { label: "Name", value: _optionalChain([clientProfile, 'optionalAccess', _68 => _68.name]) || _optionalChain([currentUser, 'optionalAccess', _69 => _69.name]) || "Client", __self: this, __source: {fileName: _jsxFileName, lineNumber: 997}} )
                    , React.createElement(InfoRow, { label: "Company", value: _optionalChain([clientProfile, 'optionalAccess', _70 => _70.company]) || "Not added", __self: this, __source: {fileName: _jsxFileName, lineNumber: 998}} )
                    , React.createElement(InfoRow, { label: "Email", value: _optionalChain([clientProfile, 'optionalAccess', _71 => _71.email]) || _optionalChain([currentUser, 'optionalAccess', _72 => _72.email]) || "Not added", __self: this, __source: {fileName: _jsxFileName, lineNumber: 999}} )
                    , React.createElement(InfoRow, { label: "Phone", value: _optionalChain([clientProfile, 'optionalAccess', _73 => _73.phone]) || "Not added", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1000}} )
                  )
                )
              )

              , React.createElement('section', { className: "grid gap-6 lg:grid-cols-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1005}}
                , React.createElement(GlassCard, { className: "rounded-lg border border-slate-200 bg-white p-6 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1006}}
                  , React.createElement('div', { className: "mb-5 flex items-center justify-between"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1007}}
                    , React.createElement('h2', { className: "font-heading text-xl font-extrabold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1008}}, "My Quotations" )
                    , React.createElement('button', { onClick: () => setActiveTab("quotations"), className: "text-xs font-extrabold text-[#FF5349] hover:text-[#06132D]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1009}}, "View all" )
                  )
                  , quotes.length === 0 ? (
                    React.createElement(EmptyState, { text: "No quotations issued for your account yet."      , compact: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1012}} )
                  ) : (
                    React.createElement('div', { className: "grid gap-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1014}}
                      , quotes.slice(0, 3).map((quote) => (
                        React.createElement(RecordRow, {
                          key: quote.id || quote.number,
                          title: quote.title || quote.items || "Quotation Proposal",
                          meta: `${quote.number || quote.id} - ${money(quote.totalDue || quote.value || quote.total || quote.planAPrice)}`,
                          right: React.createElement('button', { onClick: () => openQuotationPreview(quote), className: "rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-[11px] font-extrabold text-[#FF5349] hover:bg-red-50"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1020}}, "View"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 1016}}
                        )
                      ))
                    )
                  )
                )

                , React.createElement(GlassCard, { className: "rounded-lg border border-slate-200 bg-white p-6 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1027}}
                  , React.createElement('div', { className: "mb-5 flex items-center justify-between"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1028}}
                    , React.createElement('h2', { className: "font-heading text-xl font-extrabold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1029}}, "My Invoices" )
                    , React.createElement('button', { onClick: () => setActiveTab("billing"), className: "text-xs font-extrabold text-[#FF5349] hover:text-[#06132D]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1030}}, "View all" )
                  )
                  , invoices.length === 0 ? (
                    React.createElement(EmptyState, { text: "No invoices found for your account."     , compact: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1033}} )
                  ) : (
                    React.createElement('div', { className: "grid gap-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1035}}
                      , invoices.slice(0, 3).map((invoice) => (
                        React.createElement(RecordRow, {
                          key: invoice.id || invoice.number,
                          title: invoice.title || invoice.projectName || "Tax Invoice",
                          meta: `${invoice.number || invoice.id} - ${money(invoice.totalDue || invoice.totalAmount || invoice.value || invoice.amount || invoice.rate)}`,
                          right: React.createElement('button', { onClick: () => openInvoicePreview(invoice), className: "rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-[11px] font-extrabold text-[#FF5349] hover:bg-red-50"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1041}}, "View"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 1037}}
                        )
                      ))
                    )
                  )
                )
              )

              , React.createElement(GlassCard, { className: "rounded-lg border border-slate-200 bg-white p-6 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1049}}
                , React.createElement('h2', { className: "mb-5 font-heading text-xl font-extrabold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1050}}, "Recent Support Tickets"  )
                , tickets.length === 0 ? React.createElement(EmptyState, { text: "No support tickets found for your account."      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1051}} ) : React.createElement(TicketTable, { tickets: tickets.slice(0, 5), renderStatus: renderStatus, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1051}} )
              )
            )
          )

          , activeTab === "projects" && (
            React.createElement(Section, { title: "My Projects" , subtitle: "All project workspaces connected to your client account."       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1057}}
              , projects.length === 0 ? (
                React.createElement(EmptyState, { text: "No projects are assigned to this client profile yet."        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1059}} )
              ) : (
                React.createElement('div', { className: "grid gap-5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1061}}
                  , React.createElement('div', { className: "grid grid-cols-1 gap-4 md:grid-cols-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1062}}
                    , projects.map((project) => {
                      const todoCount = getProjectTodos(project).length;
                      const isSelected = Boolean(activeTodoProject && (same(activeTodoProject.id, project.id) || same(activeTodoProject.name, project.name)));
                      return (
                        React.createElement('button', {
                          key: project.id,
                          onClick: () => setSelectedProjectForTodos(project),
                          className: `rounded-lg border bg-white p-5 text-left shadow-sm transition hover:border-[#FF5349]/60 hover:shadow-md ${
                            isSelected ? "border-[#FF5349] ring-4 ring-red-100" : "border-slate-200"
                          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1067}}

                          , React.createElement('div', { className: "flex items-start justify-between gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1074}}
                            , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1075}}
                              , React.createElement('div', { className: "text-xs font-mono font-extrabold text-[#FF5349]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1076}}, project.id)
                              , React.createElement('h3', { className: "mt-1 truncate text-lg font-heading font-extrabold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1077}}, project.name || project.title || "Client Project")
                              , React.createElement('p', { className: "mt-1 text-sm font-semibold text-slate-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1078}}, project.category || "Project Workspace")
                            )
                            , renderStatus(project.status || "Planning")
                          )
                          , React.createElement(ProjectStageTimeline, { currentStatus: project.status || "Planning", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1082}} )
                          , React.createElement('div', { className: "mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-sm"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1083}}
                            , React.createElement(InfoRow, { label: "Budget", value: money(project.budget), __self: this, __source: {fileName: _jsxFileName, lineNumber: 1084}} )
                            , React.createElement(InfoRow, { label: "Due Date" , value: project.expectedCompletionDate || "Not scheduled", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1085}} )
                            , React.createElement(InfoRow, { label: "Tasks", value: `${todoCount} item${todoCount === 1 ? "" : "s"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1086}} )
                          )
                        )
                      );
                    })
                  )

                  , activeTodoProject && (
                    React.createElement(GlassCard, { className: "rounded-lg border border-red-200 bg-white p-6 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1094}}
                      , React.createElement('div', { className: "flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1095}}
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1096}}
                          , React.createElement('div', { className: "flex items-center gap-2 text-xs font-extrabold uppercase text-[#FF5349]"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1097}}
                            , React.createElement(CheckSquare, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1098}} ), " Project To-do List"
                          )
                          , React.createElement('h3', { className: "mt-1 text-xl font-heading font-extrabold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1100}}, activeTodoProject.name || activeTodoProject.title || activeTodoProject.id)
                          , React.createElement('p', { className: "mt-1 text-sm font-semibold text-slate-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1101}}, "Tasks are synced with your admin client workspace."       )
                        )
                        , renderStatus(activeTodoProject.status || "Planning")
                      )

                      , React.createElement('div', { className: "mt-5 flex flex-col gap-3 sm:flex-row"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1106}}
                        , React.createElement('input', {
                          value: projectTodoInputs[activeTodoProject.id] || "",
                          onChange: (event) => setProjectTodoInputs((prev) => ({ ...prev, [activeTodoProject.id]: event.target.value })),
                          onKeyDown: (event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              handleAddProjectTodo(activeTodoProject);
                            }
                          },
                          placeholder: "Add a task for this project"     ,
                          className: FORM_INPUT_CLASS, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1107}}
                        )
                        , React.createElement(Button, {
                          onClick: () => handleAddProjectTodo(activeTodoProject),
                          className: "shrink-0 justify-center gap-2 rounded-lg bg-[#FF5349] px-5 py-3 text-xs font-extrabold text-white hover:bg-[#F05454]"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1119}}

                          , React.createElement(Plus, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1123}} ), " Add Task"
                        )
                      )

                      , React.createElement('div', { className: "mt-5 grid gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1127}}
                        , getProjectTodos(activeTodoProject).length === 0 ? (
                          React.createElement(EmptyState, { text: "No todo items added for this project yet."       , compact: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1129}} )
                        ) : (
                          getProjectTodos(activeTodoProject).map((todo) => (
                            React.createElement('div', { key: todo.id, className: "flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1132}}
                              , React.createElement('input', {
                                type: "checkbox",
                                checked: todo.completed,
                                onChange: () => handleToggleProjectTodo(activeTodoProject, todo.id),
                                className: "h-4 w-4 rounded border-slate-300 text-[#FF5349] focus:ring-[#FF5349]"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1133}}
                              )
                              , React.createElement('span', { className: `min-w-0 flex-1 text-sm font-semibold ${todo.completed ? "text-slate-400 line-through" : "text-[#06132D]"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1139}}
                                , todo.text
                              )
                              , React.createElement('button', {
                                onClick: () => handleDeleteProjectTodo(activeTodoProject, todo.id),
                                className: "rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"    ,
                                title: "Remove task" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1142}}

                                , React.createElement(Trash2, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1147}} )
                              )
                            )
                          ))
                        )
                      )
                    )
                  )
                )
              )
            )
          )

          , activeTab === "quotations" && (
            React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1161}}
              , React.createElement(Section, { title: "My Service Agreements"  , subtitle: "Official service level agreements sent for your signing and review."         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1162}}
                , agreements.length === 0 ? (
                  React.createElement(EmptyState, { text: "No service agreements sent to your account yet."       , compact: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1164}} )
                ) : (
                  React.createElement('div', { className: "grid grid-cols-1 gap-4 md:grid-cols-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1166}}
                    , agreements.map((agr) => (
                      React.createElement(GlassCard, { key: agr.id || agr.number, className: "rounded-lg border border-slate-200 bg-white p-5 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1168}}
                        , React.createElement('div', { className: "flex items-start justify-between gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1169}}
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1170}}
                            , React.createElement('span', { className: "text-xs font-mono font-extrabold text-blue-700"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1171}}, agr.number || agr.id)
                            , React.createElement('h3', { className: "mt-1 text-base font-heading font-extrabold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1172}}, agr.projectName || agr.title || "Service Level Agreement")
                            , React.createElement('p', { className: "mt-1 text-xs font-semibold text-slate-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1173}}, agr.billedByCompany || "SPESHWAY SOLUTIONS PVT LTD")
                          )
                          , renderStatus(agr.status || "Signed")
                        )
                        , React.createElement('div', { className: "mt-5 flex items-center justify-between border-t border-slate-100 pt-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1177}}
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1178}}
                            , React.createElement('span', { className: "block text-[11px] font-extrabold uppercase text-slate-500"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1179}}, "Contract Cost" )
                            , React.createElement('span', { className: "text-xl font-heading font-extrabold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1180}}, money(agr.budget || agr.rate || agr.amount || 80000))
                          )
                          , React.createElement('button', { onClick: () => openAgreementPreview(agr), className: "rounded-lg border border-blue-200 bg-white px-4 py-2 text-xs font-extrabold text-blue-800 hover:bg-blue-50 transition-colors"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1182}}, "View Agreement"

                          )
                        )
                      )
                    ))
                  )
                )
              )

              , React.createElement(Section, { title: "My Quotations" , subtitle: "Only quotations linked to your client profile or your projects."         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1192}}
                , quotes.length === 0 ? (
                  React.createElement(EmptyState, { text: "No quotations issued for your account yet."      , compact: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1194}} )
                ) : (
                  React.createElement('div', { className: "grid grid-cols-1 gap-4 md:grid-cols-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1196}}
                    , quotes.map((q) => (
                      React.createElement(GlassCard, { key: q.id || q.number, className: "rounded-lg border border-slate-200 bg-white p-5 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1198}}
                        , React.createElement('div', { className: "flex items-start justify-between gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1199}}
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1200}}
                            , React.createElement('span', { className: "text-xs font-mono font-extrabold text-[#FF5349]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1201}}, q.id || q.number)
                            , React.createElement('h3', { className: "mt-1 text-base font-heading font-extrabold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1202}}, q.title || q.items || "Quotation Proposal")
                            , React.createElement('p', { className: "mt-1 text-xs font-semibold text-slate-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1203}}, q.projectName || q.clientName || displayCompany)
                          )
                          , renderStatus(q.status || "pending")
                        )
                        , React.createElement('div', { className: "mt-5 flex items-center justify-between border-t border-slate-100 pt-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1207}}
                          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1208}}
                            , React.createElement('span', { className: "block text-[11px] font-extrabold uppercase text-slate-500"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1209}}, "Total Estimate" )
                            , React.createElement('span', { className: "text-xl font-heading font-extrabold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1210}}, money(q.totalDue || q.value || q.total))
                          )
                          , React.createElement('div', { className: "flex flex-wrap justify-end gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1212}}
                            , React.createElement('button', { onClick: () => openQuotationPreview(q), className: "rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-extrabold text-[#FF5349] hover:bg-red-50"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1213}}, "View Quotation"

                            )
                            , (normalize(q.status) === "pending" || normalize(q.status) === "pending approval") && (
                              React.createElement(React.Fragment, null
                                , React.createElement('button', { onClick: () => handleAcceptQuote(q.id || q.number || ""), className: "rounded-lg bg-emerald-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-emerald-700"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1218}}, "Accept")
                                , React.createElement('button', { onClick: () => handleRejectQuote(q.id || q.number || ""), className: "rounded-lg bg-red-50 px-3 py-2 text-xs font-extrabold text-red-700 hover:bg-red-100"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1219}}, "Reject")
                              )
                            )
                          )
                        )
                      )
                    ))
                  )
                )
              )
            )
          )

          , activeTab === "billing" && (
            React.createElement(Section, { title: "Invoices & Payments"  , subtitle: "Only invoices generated for your client profile or projects."        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1233}}
              , invoices.length === 0 ? (
                React.createElement(EmptyState, { text: "No invoices found for your account."     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1235}} )
              ) : (
                React.createElement('div', { className: "grid grid-cols-1 gap-4 md:grid-cols-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1237}}
                  , invoices.map((inv) => (
                    React.createElement(GlassCard, { key: inv.id, className: "rounded-lg border border-slate-200 bg-white p-5 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1239}}
                      , React.createElement('div', { className: "flex items-start justify-between gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1240}}
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1241}}
                          , React.createElement('span', { className: "text-xs font-mono font-extrabold text-[#FF5349]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1242}}, inv.id || inv.number)
                          , React.createElement('h3', { className: "mt-1 text-base font-heading font-extrabold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1243}}, inv.title || inv.projectName || "Tax Invoice")
                          , React.createElement('p', { className: "mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-500"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1244}}
                            , React.createElement(CalendarDays, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1245}} ), " Due: "  , inv.due || inv.dueDate || "Not scheduled"
                          )
                        )
                        , renderStatus(inv.status || "pending")
                      )
                      , React.createElement('div', { className: "mt-5 flex items-center justify-between border-t border-slate-100 pt-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1250}}
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1251}}
                          , React.createElement('span', { className: "block text-[11px] font-extrabold uppercase text-slate-500"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1252}}, "Amount Due" )
                          , React.createElement('span', { className: "text-xl font-heading font-extrabold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1253}}, money(inv.totalDue || inv.totalAmount || inv.value || inv.amount || inv.rate))
                        )
                        , React.createElement('div', { className: "flex flex-wrap justify-end gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1255}}
                          , React.createElement('button', { onClick: () => openInvoicePreview(inv), className: "rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-extrabold text-[#FF5349] hover:bg-red-50"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1256}}, "View Invoice"

                          )
                          , (normalize(inv.status) === "pending" || normalize(inv.status) === "unpaid") && (
                            React.createElement('button', { onClick: () => triggerPayment(inv), className: "rounded-lg bg-[#06132D] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-[#0b2369]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1260}}, "Pay Invoice"

                            )
                          )
                        )
                      )
                    )
                  ))
                )
              )
            )
          )

          , activeTab === "support" && (
            React.createElement(Section, { title: "Support Ticket Desk"  , subtitle: "Raise a support request connected to your client account."        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1274}}
              , React.createElement('div', { className: "grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1275}}
                , React.createElement(GlassCard, { className: "rounded-lg border border-slate-200 bg-white p-6 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1276}}
                  , ticketSuccess && (
                    React.createElement('div', { className: "mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs font-extrabold text-emerald-700"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1278}}
                      , React.createElement(Check, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1279}} ), " Support ticket created successfully."
                    )
                  )
                  , React.createElement('form', { onSubmit: handleRaiseTicket, className: "grid gap-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1282}}
                    , React.createElement(Field, { label: "Ticket Subject" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1283}}
                      , React.createElement('input', { value: ticketSubject, onChange: (e) => setTicketSubject(e.target.value), className: FORM_INPUT_CLASS, placeholder: "Portal access, invoice query, project update..."     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1284}} )
                    )
                    , React.createElement(Field, { label: "Message Details" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1286}}
                      , React.createElement('textarea', { value: ticketBody, onChange: (e) => setTicketBody(e.target.value), className: `${FORM_INPUT_CLASS} min-h-32 resize-y`, placeholder: "Describe your request or issue..."    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1287}} )
                    )
                    , React.createElement(Button, { type: "submit", variant: "primary", className: "w-fit rounded-lg px-5 py-3 text-xs font-extrabold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1289}}, "Submit Support Ticket"  )
                  )
                )

                , React.createElement(GlassCard, { className: "rounded-lg border border-slate-200 bg-white p-6 shadow-sm"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1293}}
                  , React.createElement('h3', { className: "font-heading text-lg font-extrabold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1294}}, "Your Tickets" )
                  , React.createElement('div', { className: "mt-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1295}}
                    , tickets.length === 0 ? React.createElement(EmptyState, { text: "No tickets submitted yet."   , compact: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1296}} ) : React.createElement(TicketTable, { tickets: tickets, renderStatus: renderStatus, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1296}} )
                  )
                )
              )
            )
          )
        )
      )

      , pdfPreview && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex flex-col bg-[#0f172a]"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1306}}
          , React.createElement('div', { className: "shrink-0 border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1307}}
            , React.createElement('div', { className: "flex items-center justify-between gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1308}}
              , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1309}}
                , React.createElement('h3', { className: "truncate font-heading text-base font-extrabold text-[#071E34]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1310}}, pdfPreview.title)
                , React.createElement('p', { className: "text-xs font-semibold text-slate-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1311}}, "Full page customer document preview"    )
              )
              , React.createElement('button', {
                onClick: () => setPdfPreview(null),
                className: "shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-700 hover:bg-slate-50"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1313}}
, "Close"

              )
            )
          )
          , React.createElement('div', { className: "min-h-0 flex-1 overflow-auto px-4 py-6 sm:px-8"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1321}}
            , React.createElement('div', {
              className: "mx-auto w-fit origin-top bg-white shadow-2xl"    ,
              dangerouslySetInnerHTML: { __html: pdfPreview.html }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1322}}
            )
          )
        )
      )

      , showPayModal && payingInvoice && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1331}}
          , React.createElement('div', { className: "w-full max-w-md rounded-lg border border-red-200 bg-white p-6 shadow-2xl sm:p-8"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1332}}
            , React.createElement('h3', { className: "font-heading text-xl font-extrabold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1333}}, "Secure Online Payment"  )
            , React.createElement('p', { className: "mt-2 text-xs font-semibold text-slate-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1334}}, "Invoice " , React.createElement('span', { className: "font-mono text-[#FF5349]" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1334}}, payingInvoice.id))
            , React.createElement('div', { className: "mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1335}}
              , React.createElement('span', { className: "block text-xs font-extrabold uppercase text-slate-500"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1336}}, "Total Amount" )
              , React.createElement('span', { className: "mt-1 block text-3xl font-heading font-extrabold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1337}}, money(payingInvoice.totalDue || payingInvoice.totalAmount || payingInvoice.value || payingInvoice.amount))
            )
            , paymentSuccess ? (
              React.createElement('div', { className: "mt-5 flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-xs font-extrabold text-emerald-700"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1340}}
                , React.createElement(Check, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1341}} ), " Payment logged successfully."
              )
            ) : (
              React.createElement('div', { className: "mt-5 grid gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1344}}
                , React.createElement('input', { className: FORM_INPUT_CLASS, defaultValue: "4242 4242 4242 4242"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1345}} )
                , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1346}}
                  , React.createElement('input', { className: FORM_INPUT_CLASS, defaultValue: "12/28", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1347}} )
                  , React.createElement('input', { className: FORM_INPUT_CLASS, defaultValue: "123", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1348}} )
                )
                , React.createElement(Button, { onClick: executeMockPayment, disabled: isPaying, variant: "primary", className: "mt-2 w-full rounded-lg py-3 text-xs font-extrabold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1350}}
                  , isPaying ? "Processing Payment..." : "Confirm & Pay Now"
                )
                , React.createElement('button', { onClick: () => setShowPayModal(false), className: "py-2 text-center text-xs font-extrabold text-slate-500 hover:text-slate-800"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1353}}, "Cancel")
              )
            )
          )
        )
      )
    )
  );
}

function Section({ title, subtitle, children }) {
  return (
    React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1365}}
      , React.createElement('div', { className: "mb-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1366}}
        , React.createElement('h2', { className: "font-heading text-2xl font-extrabold text-[#071E34]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1367}}, title)
        , React.createElement('p', { className: "mt-1 text-sm font-medium text-slate-600"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1368}}, subtitle)
      )
      , children
    )
  );
}

function EmptyState({ text, compact = false }) {
  return (
    React.createElement('div', { className: `rounded-lg border border-dashed border-slate-200 bg-slate-50 text-center text-sm font-semibold text-slate-500 ${compact ? "p-5" : "p-8"}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 1377}}
      , text
    )
  );
}

function InfoRow({ label, value }) {
  return (
    React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1385}}
      , React.createElement('div', { className: "text-[11px] font-extrabold uppercase text-slate-500"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1386}}, label)
      , React.createElement('div', { className: "mt-1 break-words text-sm font-bold text-[#071E34]"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1387}}, value || "Not added")
    )
  );
}

function Field({ label, children }) {
  return (
    React.createElement('label', { className: "grid gap-1.5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1394}}
      , React.createElement('span', { className: "text-xs font-extrabold uppercase text-[#FF5349]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1395}}, label, " *" )
      , children
    )
  );
}

function RecordRow({ title, meta, right }) {
  return (
    React.createElement('div', { className: "flex items-center justify-between gap-4 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1403}}
      , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1404}}
        , React.createElement('div', { className: "truncate text-sm font-extrabold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1405}}, title)
        , React.createElement('div', { className: "mt-0.5 truncate text-xs font-semibold text-slate-500"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1406}}, meta)
      )
      , React.createElement('div', { className: "shrink-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1408}}, right)
    )
  );
}

function TicketTable({ tickets, renderStatus }) {
  return (
    React.createElement('div', { className: "overflow-x-auto", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1415}}
      , React.createElement('table', { className: "w-full text-left text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1416}}
        , React.createElement('thead', { className: "border-b border-slate-200 text-slate-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1417}}
          , React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1418}}
            , React.createElement('th', { className: "pb-3 font-extrabold uppercase"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1419}}, "Ticket ID" )
            , React.createElement('th', { className: "pb-3 font-extrabold uppercase"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1420}}, "Subject")
            , React.createElement('th', { className: "pb-3 font-extrabold uppercase"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1421}}, "Date")
            , React.createElement('th', { className: "pb-3 font-extrabold uppercase"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1422}}, "Status")
          )
        )
        , React.createElement('tbody', { className: "divide-y divide-slate-100" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1425}}
          , tickets.map((ticket) => (
            React.createElement('tr', { key: ticket.id, className: "hover:bg-red-50/40", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1427}}
              , React.createElement('td', { className: "py-3 font-mono font-extrabold text-[#FF5349]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1428}}, ticket.id)
              , React.createElement('td', { className: "py-3 font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1429}}, ticket.subject)
              , React.createElement('td', { className: "py-3 font-semibold text-slate-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 1430}}, ticket.date)
              , React.createElement('td', { className: "py-3", __self: this, __source: {fileName: _jsxFileName, lineNumber: 1431}}, renderStatus(ticket.status || "open"))
            )
          ))
        )
      )
    )
  );
}
