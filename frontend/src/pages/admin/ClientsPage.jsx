const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\ClientsPage.tsx"; function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import React, { useState, useEffect } from "react";
import { Users, Plus, Search, Trash2, Edit3, Phone, Mail, Building2, CheckCircle, Eye, FileText, CreditCard, X, Save } from "lucide-react";
import { generateSpeshwayEstimationPdfHtml, generateSpeshwayTaxInvoicePdfHtml, openPdfPrintPreview } from "../../../utils/pdfGenerator";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

















export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clientDocumentOverrides, setClientDocumentOverrides] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("crm_client_document_overrides") || "{}");
    } catch (e2) {
      localStorage.removeItem("crm_client_document_overrides");
      return {};
    }
  });
  const [pdfPreview, setPdfPreview] = useState(null);
  const [editingPdf, setEditingPdf] = useState(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    whatsapp: "",
    industry: "Information Technology",
    type: "Enterprise",
    assignedEmployee: "Admin Operator",
    status: "Active",
    notes: ""
  });

  const getClientDocumentKey = (client, item, type) => {
    const ref = _optionalChain([item, 'optionalAccess', _ => _.number]) || _optionalChain([item, 'optionalAccess', _2 => _2.id]) || `${type}-${client.id}`;
    return `${client.id || client.email || client.name}::${type}::${ref}`;
  };

  const stripLargeClientDocumentFields = (value) => {
    if (Array.isArray(value)) return value.map(stripLargeClientDocumentFields);
    if (!value || typeof value !== "object") return value;
    return Object.fromEntries(Object.entries(value).map(([key, fieldValue]) => {
      if (typeof fieldValue === "string" && fieldValue.length > 5000) {
        return [key, ""];
      }
      return [key, stripLargeClientDocumentFields(fieldValue)];
    }));
  };

  const persistClientDocumentOverridesCache = (overrides) => {
    try {
      const entries = Object.entries(overrides).slice(-12);
      const cache = Object.fromEntries(entries.map(([key, value]) => [key, stripLargeClientDocumentFields(value)]));
      localStorage.setItem("crm_client_document_overrides", JSON.stringify(cache));
    } catch (err) {
      console.warn("Client PDF cache skipped because browser storage is full.", err);
      try {
        localStorage.removeItem("crm_client_document_overrides");
      } catch (e3) {
        // Ignore storage cleanup failures.
      }
    }
  };

  const getClientDocumentOverrideKeys = (client, item, type) => {
    const scopes = Array.from(new Set([client.id, client.email, client.name].filter(Boolean)));
    const refs = Array.from(new Set([
      _optionalChain([item, 'optionalAccess', _3 => _3.number]),
      _optionalChain([item, 'optionalAccess', _4 => _4.id]),
      _optionalChain([item, 'optionalAccess', _5 => _5.refNumber]),
      `${type}-${client.id}`,
      type === "invoice" ? `INV-${client.id}-01` : `QT-${client.id}-01`
    ].map(ref => `${ref || ""}`.trim()).filter(Boolean)));
    return scopes.flatMap(scope => refs.map(ref => `${scope}::${type}::${ref}`));
  };

  const withClientDocumentOverride = (client, item, type) => {
    const override = getClientDocumentOverrideKeys(client, item, type)
      .map(key => clientDocumentOverrides[key])
      .find(Boolean);
    return override ? { ...item, ...override } : item;
  };

  const saveClientDocumentOverride = async (client, item, type) => {
    const overrideKeys = getClientDocumentOverrideKeys(client, item, type);
    const nextOverrides = { ...clientDocumentOverrides };
    overrideKeys.forEach(key => {
      nextOverrides[key] = item;
    });
    setClientDocumentOverrides(nextOverrides);
    persistClientDocumentOverridesCache(nextOverrides);
    const documentKey = overrideKeys[0] || getClientDocumentKey(client, item, type);
    await fetch(`${API_URL}/crm/client-document/${encodeURIComponent(documentKey)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: documentKey,
        documentKey,
        overrideKeys,
        documentType: type,
        clientScope: client.id || client.email || client.name,
        documentRef: _optionalChain([item, 'optionalAccess', _6 => _6.number]) || _optionalChain([item, 'optionalAccess', _7 => _7.id]) || `${type}-${client.id}`,
        clientId: client.id,
        item,
        updatedAt: new Date().toISOString()
      })
    });
  };

  const getDefaultClientDoc = (client, type) => {
    const baseAmount = 50000;
    const taxPct = 18;
    const totalDue = Math.round(baseAmount * (1 + taxPct / 100));
    const common = {
      clientName: client.name,
      clientEmail: client.email,
      productName: client.company || "Software Project",
      title: `${client.company || client.name} ${type === "invoice" ? "Tax Invoice" : "Quotation"}`,
      date: new Date().toISOString().split("T")[0],
      companyName: "Speshway Solutions Private Limited",
      billedByCompany: "Speshway Solutions Private Limited",
      companyTagline: "Software Development Company",
      companyHeaderSub: "Software Development Company",
      billedBySub: "Software Development Company",
      companyAddress: "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
      billedByAddress: "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
      companyEmail: "info@speshway.com",
      companyPhone: "+91 91000 06020",
      companyWebsite: "www.speshway.com",
      companyLogoUrl: "/logo.jpg",
      companyFooterName: "Speshway Solutions Private Limited",
      companyFooterAddress: "T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Serilingampalle (M), Hyderabad 500081",
      companyFooterContact: "www.speshway.com - info@speshway.com - +91 91000 06020",
      pdfFooterTheme: "dark",
      pdfPrimaryColor: type === "invoice" ? "#003b8e" : "#4c1d95",
      pdfSecondaryColor: type === "invoice" ? "#d97706" : "#7c3aed",
      showWatermark: true,
      companyWatermarkText: "SPESHWAY SOLUTIONS",
      companyWatermarkOpacity: type === "invoice" ? 0.08 : 0.2,
      companyWatermarkRotation: -15,
      companyWatermarkSize: 40,
      companyWatermarkImgSize: 220
    };

    if (type === "invoice") {
      return {
        ...common,
        id: `INV-${client.id}-01`,
        number: `INV-${client.id}-01`,
        description: `${client.company || "Software"} Web & Mobile Application`,
        subdesc: `Design, development & delivery of software application for ${client.name}`,
        rate: baseAmount,
        amount: baseAmount,
        taxPct,
        totalDue,
        accountName: "SPESHWAY SOLUTIONS PRIVATE LIMITED",
        accountNumber: "018326900000850",
        ifscCode: "YESB0000183",
        branch: "HITECH CITY"
      };
    }

    return {
      ...common,
      id: `QT-${client.id}-01`,
      number: `QT-${client.id}-01`,
      overviewNarrative: "Full-stack responsive application development and delivery.",
      planAPrice: baseAmount,
      rate: baseAmount,
      taxPct,
      paymentTerms: "50% Advance upon signing proposal, 50% upon deployment.",
      customFeatures: [
        { title: "Responsive Web Portal", description: "Modern responsive web application optimized for mobile and desktop." },
        { title: "Admin Dashboard", description: "Management dashboard for tracking operations, users, and reporting." }
      ]
    };
  };

  const renderClientPdfHtml = (item, type) => (
    type === "invoice"
      ? generateSpeshwayTaxInvoicePdfHtml(item, null, 0.85)
      : generateSpeshwayEstimationPdfHtml(null, item, item.customFeatures || [], 0.85)
  );

  const openClientPdfPreview = (client, type) => {
    const baseDoc = getDefaultClientDoc(client, type);
    const item = withClientDocumentOverride(client, baseDoc, type);
    const html = renderClientPdfHtml(item, type);
    setPdfPreview({
      type,
      title: `${type === "invoice" ? "Tax Invoice" : "Quotation"} Preview - ${item.number || item.id}`,
      html,
      item,
      client
    });
  };

  const saveEditedClientPdf = async () => {
    if (!editingPdf) return;
    const item = {
      ...editingPdf.item,
      companyWebsite: _optionalChain([editingPdf, 'access', _8 => _8.item, 'access', _9 => _9.companyWebsite, 'optionalAccess', _10 => _10.trim, 'call', _11 => _11()]) || "www.speshway.com",
      companyFooterName: _optionalChain([editingPdf, 'access', _12 => _12.item, 'access', _13 => _13.companyFooterName, 'optionalAccess', _14 => _14.trim, 'call', _15 => _15()]) || editingPdf.item.companyName,
      companyFooterAddress: _optionalChain([editingPdf, 'access', _16 => _16.item, 'access', _17 => _17.companyFooterAddress, 'optionalAccess', _18 => _18.trim, 'call', _19 => _19()]) || editingPdf.item.companyAddress,
      companyFooterContact: _optionalChain([editingPdf, 'access', _20 => _20.item, 'access', _21 => _21.companyFooterContact, 'optionalAccess', _22 => _22.trim, 'call', _23 => _23()]) || `${editingPdf.item.companyWebsite || "www.speshway.com"} - ${editingPdf.item.companyEmail} - ${editingPdf.item.companyPhone}`
    };
    const savedType = editingPdf.type;
    const savedClient = editingPdf.client;
    setPdfPreview({
      type: savedType,
      title: `${savedType === "invoice" ? "Tax Invoice" : "Quotation"} Preview - ${item.number || item.id}`,
      html: renderClientPdfHtml(item, savedType),
      item,
      client: savedClient
    });
    setEditingPdf(null);
    saveClientDocumentOverride(savedClient, item, savedType).catch(err => {
      console.error("Save client PDF document override error", err);
      alert("Preview updated, but database save failed. Please try Save again.");
    });
  };

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/client`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setClients(res.data);
      }
    } catch (err) {
      console.error("Fetch clients error", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientDocumentOverrides = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/client-document`).then(r => r.json());
      const records = Array.isArray(_optionalChain([res, 'optionalAccess', _24 => _24.data])) ? res.data : [];
      const nextOverrides = {};
      records.forEach((record) => {
        const item = record.item || record;
        const keys = Array.isArray(record.overrideKeys) && record.overrideKeys.length > 0
          ? record.overrideKeys
          : [record.documentKey || record.id].filter(Boolean);
        keys.forEach((key) => {
          nextOverrides[key] = item;
        });
      });
      if (Object.keys(nextOverrides).length > 0) {
        setClientDocumentOverrides(prev => {
          const merged = { ...prev, ...nextOverrides };
          persistClientDocumentOverridesCache(merged);
          return merged;
        });
      }
    } catch (err) {
      console.error("Fetch client PDF document overrides error", err);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchClientDocumentOverrides();
  }, []);

  const handleCreateClient = async (e) => {
    e.preventDefault();
    const newClient = {
      id: `CLT-${Date.now().toString().slice(-4)}`,
      ...form,
      createdDate: new Date().toISOString().split("T")[0]
    };

    try {
      const res = await fetch(`${API_URL}/crm/client`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient)
      }).then(r => r.json());

      const saved = res.data || newClient;
      setClients(prev => [saved, ...prev]);
      setShowAddModal(false);
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        whatsapp: "",
        industry: "Information Technology",
        type: "Enterprise",
        assignedEmployee: "Admin Operator",
        status: "Active",
        notes: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClient = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    try {
      await fetch(`${API_URL}/crm/client/${id}`, { method: "DELETE" });
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const [clientTypeTab, setClientTypeTab] = useState("All");

  const handleUpgradeToPermanent = async (id) => {
    try {
      await fetch(`${API_URL}/crm/client/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "Permanent", status: "Active" })
      });
    } catch (err) {
      console.error(err);
    }
    setClients(prev => prev.map(c => c.id === id ? { ...c, type: "Permanent", status: "Active" } : c));
  };

  const filteredClients = clients.filter(c => {
    const matchesSearch = (c.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || c.status === filterStatus;
    const isTemp = c.type === "Temporary" || c.status === "Temporary";
    const matchesTypeTab = clientTypeTab === "All" ||
                           (clientTypeTab === "Permanent" && !isTemp);
    return !isTemp && matchesSearch && matchesFilter && matchesTypeTab;
  });

  return (
    React.createElement('div', { className: "space-y-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 358}}
      /* Header Bar */
      , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 360}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 361}}
          , React.createElement('h1', { className: "text-2xl font-extrabold text-white font-heading flex items-center gap-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 362}}
            , React.createElement(Users, { className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 363}} ), " Client Management"
          )
          , React.createElement('p', { className: "text-xs text-slate-400 mt-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 365}}, "Manage enterprise accounts, contacts, temporary prospects & permanent client profiles"         )
        )
        , React.createElement('button', {
          onClick: () => setShowAddModal(true),
          className: "px-4 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all self-start sm:self-auto"               , __self: this, __source: {fileName: _jsxFileName, lineNumber: 367}}

          , React.createElement(Plus, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 371}} ), " Add New Client"
        )
      )

      /* TYPE FILTER TABS */
      , React.createElement('div', { className: "flex items-center gap-2 p-1.5 bg-[#0B2369] border border-white/10 rounded-2xl w-fit"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 376}}
        , React.createElement('button', {
          onClick: () => setClientTypeTab("All"),
          className: `px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
            clientTypeTab === "All" ? "bg-[#F05454] text-white shadow-md" : "text-slate-300 hover:text-white"
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 377}}
, "All Clients ("
            , clients.filter(c => c.type !== "Temporary" && c.status !== "Temporary").length, ")"
        )
        , React.createElement('button', {
          onClick: () => setClientTypeTab("Permanent"),
          className: `px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            clientTypeTab === "Permanent" ? "bg-emerald-500 text-slate-950 shadow-md font-extrabold" : "text-emerald-400/80 hover:text-emerald-300"
          }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 385}}

          , React.createElement(CheckCircle, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 391}} ), "Permanent Clients ("
            , clients.filter(c => c.type !== "Temporary" && c.status !== "Temporary").length, ")"
        )
      )

      /* Controls Bar */
      , React.createElement('div', { className: "flex flex-col sm:flex-row gap-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 397}}
        , React.createElement('div', { className: "relative flex-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 398}}
          , React.createElement(Search, { className: "absolute left-3.5 top-3 text-slate-500"   , size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 399}} )
          , React.createElement('input', {
            type: "text",
            placeholder: "Search clients by name, company, email..."     ,
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF5349]"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 400}}
          )
        )
        , React.createElement('select', {
          value: filterStatus,
          onChange: (e) => setFilterStatus(e.target.value),
          className: "px-3 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 focus:outline-none focus:border-[#FF5349]"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 408}}

          , React.createElement('option', { value: "All", __self: this, __source: {fileName: _jsxFileName, lineNumber: 413}}, "All Statuses" )
          , React.createElement('option', { value: "Active", __self: this, __source: {fileName: _jsxFileName, lineNumber: 414}}, "Active")
          , React.createElement('option', { value: "Temporary", __self: this, __source: {fileName: _jsxFileName, lineNumber: 415}}, "Temporary")
          , React.createElement('option', { value: "Potential", __self: this, __source: {fileName: _jsxFileName, lineNumber: 416}}, "Potential")
          , React.createElement('option', { value: "Existing", __self: this, __source: {fileName: _jsxFileName, lineNumber: 417}}, "Existing")
          , React.createElement('option', { value: "Inactive", __self: this, __source: {fileName: _jsxFileName, lineNumber: 418}}, "Inactive")
        )
      )

      /* Client Cards Grid */
      , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 423}}
        , filteredClients.map((client) => {
          const isTemporary = client.type === "Temporary" || client.status === "Temporary";
          return (
            React.createElement('div', {
              key: client.id,
              className: `rounded-2xl bg-[#071E34] border p-5 space-y-4 hover:border-rose-500/40 transition-all shadow-xl ${
                isTemporary ? "border-amber-500/30 bg-gradient-to-b from-[#071E34] to-[#1a1205]" : "border-rose-500/20"
              }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 427}}

              , React.createElement('div', { className: "flex items-start justify-between gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 433}}
                , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 434}}
                  , React.createElement('div', { className: `w-10 h-10 rounded-xl border font-bold flex items-center justify-center text-sm ${
                    isTemporary ? "bg-amber-500/20 border-amber-500/40 text-amber-300" : "bg-blue-600/20 border-rose-500/30 text-rose-400"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 435}}
                    , client.name.charAt(0)
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 440}}
                    , React.createElement('h3', { className: "text-sm font-bold text-white"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 441}}, client.name)
                    , React.createElement('p', { className: "text-xs text-amber-400 flex items-center gap-1"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 442}}
                      , React.createElement(Building2, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 443}} ), " " , client.company || "Independent"
                    )
                  )
                )

                , React.createElement('div', { className: "flex flex-col items-end gap-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 448}}
                  , isTemporary ? (
                    React.createElement('span', { className: "text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 450}}, "Temporary Client"

                    )
                  ) : (
                    React.createElement('span', { className: "text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 454}}, "Permanent Client"

                    )
                  )
                )
              )

              , React.createElement('div', { className: "space-y-1.5 text-xs text-slate-300 pt-2 border-t border-rose-500/10"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 461}}
                , React.createElement('div', { className: "flex items-center gap-2 text-slate-400"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 462}}
                  , React.createElement(Mail, { size: 14, className: "text-rose-400 shrink-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 463}} )
                  , React.createElement('span', { className: "truncate", __self: this, __source: {fileName: _jsxFileName, lineNumber: 464}}, client.email)
                )
                , React.createElement('div', { className: "flex items-center gap-2 text-slate-400"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 466}}
                  , React.createElement(Phone, { size: 14, className: "text-rose-400 shrink-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 467}} )
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 468}}, client.phone)
                )
              )

              , React.createElement('div', { className: "grid grid-cols-2 gap-2 pt-2 border-t border-rose-500/10"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 472}}
                , React.createElement('button', {
                  onClick: () => openClientPdfPreview(client, "quotation"),
                  className: "px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-300 font-extrabold text-[10px] flex items-center justify-center gap-1.5 transition-all"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 473}}

                  , React.createElement(FileText, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 477}} ), " Preview Quote"
                )
                , React.createElement('button', {
                  onClick: () => openClientPdfPreview(client, "invoice"),
                  className: "px-3 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/25 text-blue-300 font-extrabold text-[10px] flex items-center justify-center gap-1.5 transition-all"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 479}}

                  , React.createElement(CreditCard, { size: 12, __self: this, __source: {fileName: _jsxFileName, lineNumber: 483}} ), " Preview Invoice"
                )
              )

              , React.createElement('div', { className: "flex items-center justify-between pt-3 border-t border-rose-500/10 text-xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 487}}
                , React.createElement('span', { className: "text-[10px] text-slate-500 font-mono"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 488}}, "ID: " , client.id)
                , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 489}}
                  , isTemporary && (
                    React.createElement('button', {
                      onClick: () => handleUpgradeToPermanent(client.id),
                      className: "px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-lg text-[10px] flex items-center gap-1 shadow-md transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 491}}

                      , React.createElement(CheckCircle, { size: 11, __self: this, __source: {fileName: _jsxFileName, lineNumber: 495}} ), " Make Permanent"
                    )
                  )
                  , React.createElement('button', {
                    onClick: () => handleDeleteClient(client.id),
                    className: "text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-500/10 transition-colors"     ,
                    title: "Delete Client" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 498}}

                    , React.createElement(Trash2, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 503}} )
                  )
                )
              )
            )
          );
        })
      )

      , pdfPreview && (
        React.createElement('div', { className: "fixed inset-0 z-50 bg-slate-950 flex flex-col"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 513}}
          , React.createElement('div', { className: "shrink-0 bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between gap-3"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 514}}
            , React.createElement('div', { className: "flex items-center gap-2 min-w-0"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 515}}
              , React.createElement(Eye, { className: "w-5 h-5 text-[#FF5349]"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 516}} )
              , React.createElement('h3', { className: "font-extrabold text-sm text-[#071E34] truncate"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 517}}, pdfPreview.title)
            )
            , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 519}}
              , React.createElement('button', {
                onClick: () => setEditingPdf({ type: pdfPreview.type, item: pdfPreview.item, client: pdfPreview.client }),
                className: "px-3 py-2 bg-rose-50 hover:bg-rose-100 text-[#071E34] border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 520}}

                , React.createElement(Edit3, { size: 13, __self: this, __source: {fileName: _jsxFileName, lineNumber: 524}} ), " Edit PDF"
              )
              , React.createElement('button', {
                onClick: () => openPdfPrintPreview(pdfPreview.html),
                className: "px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 526}}
, "Print / Save"

              )
              , React.createElement('button', {
                onClick: () => setPdfPreview(null),
                className: "w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 532}}

                , React.createElement(X, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 536}} )
              )
            )
          )
          , React.createElement('div', { className: "flex-1 min-h-0 p-4 bg-slate-900"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 540}}
            , React.createElement('iframe', {
              srcDoc: pdfPreview.html,
              className: "w-full h-full rounded-2xl border border-slate-700 bg-slate-900"     ,
              title: "Client PDF Preview"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 541}}
            )
          )
        )
      )

      , editingPdf && (() => {
        const updatePdfItem = (patch) => setEditingPdf({ ...editingPdf, item: { ...editingPdf.item, ...patch } });
        const liveHtml = renderClientPdfHtml(editingPdf.item, editingPdf.type);
        const isInvoice = editingPdf.type === "invoice";

        return (
          React.createElement('div', { className: "fixed inset-0 z-[60] bg-slate-950 flex flex-col"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 556}}
            , React.createElement('div', { className: "shrink-0 bg-slate-900 border-b border-slate-800 px-5 py-3 flex items-center justify-between gap-3"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 557}}
              , React.createElement('div', { className: "min-w-0", __self: this, __source: {fileName: _jsxFileName, lineNumber: 558}}
                , React.createElement('h3', { className: "font-extrabold text-white text-sm"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 559}}, "Edit " , isInvoice ? "Invoice" : "Quotation", " PDF" )
                , React.createElement('p', { className: "text-[10px] text-slate-400" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 560}}, "Only PDF content is editable here. Master quotation and invoice data stays separate."            )
              )
              , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 562}}
                , React.createElement('button', {
                  onClick: saveEditedClientPdf,
                  className: "px-4 py-2 bg-[#FF5349] hover:bg-rose-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 563}}

                  , React.createElement(Save, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 567}} ), " Save PDF Edits"
                )
                , React.createElement('button', {
                  onClick: () => setEditingPdf(null),
                  className: "w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 569}}

                  , React.createElement(X, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 573}} )
                )
              )
            )

            , React.createElement('div', { className: "flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 578}}
              , React.createElement('div', { className: "lg:col-span-5 bg-white rounded-2xl overflow-y-auto p-5 space-y-4 text-xs"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 579}}
                , React.createElement('div', { className: "bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 580}}
                  , React.createElement('h4', { className: "font-extrabold text-slate-950 uppercase tracking-wider"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 581}}, "Document Details" )
                  , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 582}}
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 583}}
                      , React.createElement('label', { className: "font-bold text-slate-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 584}}, "Document Number" )
                      , React.createElement('input', { value: editingPdf.item.number || editingPdf.item.id || "", onChange: e => updatePdfItem({ number: e.target.value, id: e.target.value }), className: "w-full p-2 border border-slate-300 rounded-xl font-mono font-bold"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 585}} )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 587}}
                      , React.createElement('label', { className: "font-bold text-slate-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 588}}, "Date")
                      , React.createElement('input', { value: editingPdf.item.date || "", onChange: e => updatePdfItem({ date: e.target.value }), className: "w-full p-2 border border-slate-300 rounded-xl font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 589}} )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 591}}
                      , React.createElement('label', { className: "font-bold text-slate-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 592}}, "Client Name" )
                      , React.createElement('input', { value: editingPdf.item.clientName || "", onChange: e => updatePdfItem({ clientName: e.target.value }), className: "w-full p-2 border border-slate-300 rounded-xl font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 593}} )
                    )
                    , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 595}}
                      , React.createElement('label', { className: "font-bold text-slate-700 block mb-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 596}}, "Product / Scope"  )
                      , React.createElement('input', { value: editingPdf.item.productName || editingPdf.item.title || "", onChange: e => updatePdfItem({ productName: e.target.value, title: e.target.value }), className: "w-full p-2 border border-slate-300 rounded-xl font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 597}} )
                    )
                  )
                )

                , React.createElement('div', { className: "bg-rose-50 p-4 rounded-2xl border border-rose-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 602}}
                  , React.createElement('h4', { className: "font-extrabold text-rose-950 uppercase tracking-wider"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 603}}, "Company Details" )
                  , React.createElement('input', { placeholder: "Company name" , value: editingPdf.item.companyName || "", onChange: e => updatePdfItem({ companyName: e.target.value, billedByCompany: e.target.value, companyFooterName: e.target.value }), className: "w-full p-2 border border-rose-200 rounded-xl font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 604}} )
                  , React.createElement('input', { placeholder: "Tagline", value: editingPdf.item.companyTagline || "", onChange: e => updatePdfItem({ companyTagline: e.target.value, companyHeaderSub: e.target.value, billedBySub: e.target.value }), className: "w-full p-2 border border-rose-200 rounded-xl font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 605}} )
                  , React.createElement('input', { placeholder: "Email", value: editingPdf.item.companyEmail || "", onChange: e => updatePdfItem({ companyEmail: e.target.value }), className: "w-full p-2 border border-rose-200 rounded-xl font-mono"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 606}} )
                  , React.createElement('input', { placeholder: "Phone", value: editingPdf.item.companyPhone || "", onChange: e => updatePdfItem({ companyPhone: e.target.value }), className: "w-full p-2 border border-rose-200 rounded-xl font-mono"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 607}} )
                  , React.createElement('input', { placeholder: "Address", value: editingPdf.item.companyAddress || "", onChange: e => updatePdfItem({ companyAddress: e.target.value, billedByAddress: e.target.value, companyFooterAddress: e.target.value }), className: "w-full p-2 border border-rose-200 rounded-xl"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 608}} )
                )

                , React.createElement('div', { className: "bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 611}}
                  , React.createElement('h4', { className: "font-extrabold text-slate-950 uppercase tracking-wider"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 612}}, "Footer")
                  , !isInvoice && (
                    React.createElement('select', { value: editingPdf.item.pdfFooterTheme || "dark", onChange: e => updatePdfItem({ pdfFooterTheme: e.target.value }), className: "w-full p-2 border border-slate-300 rounded-xl font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 614}}
                      , React.createElement('option', { value: "dark", __self: this, __source: {fileName: _jsxFileName, lineNumber: 615}}, "Dark Footer" )
                      , React.createElement('option', { value: "white", __self: this, __source: {fileName: _jsxFileName, lineNumber: 616}}, "White Footer" )
                    )
                  )
                  , React.createElement('input', { placeholder: "Footer company name"  , value: editingPdf.item.companyFooterName || editingPdf.item.companyName || "", onChange: e => updatePdfItem({ companyFooterName: e.target.value }), className: "w-full p-2 border border-slate-300 rounded-xl font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 619}} )
                  , React.createElement('input', { placeholder: "Website", value: editingPdf.item.companyWebsite || "www.speshway.com", onChange: e => updatePdfItem({ companyWebsite: e.target.value }), className: "w-full p-2 border border-slate-300 rounded-xl font-mono"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 620}} )
                  , React.createElement('input', { placeholder: "Footer address" , value: editingPdf.item.companyFooterAddress || editingPdf.item.companyAddress || "", onChange: e => updatePdfItem({ companyFooterAddress: e.target.value }), className: "w-full p-2 border border-slate-300 rounded-xl"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 621}} )
                  , React.createElement('input', { placeholder: "Footer contact line"  , value: editingPdf.item.companyFooterContact || `${editingPdf.item.companyWebsite || "www.speshway.com"} - ${editingPdf.item.companyEmail || "info@speshway.com"} - ${editingPdf.item.companyPhone || "+91 91000 06020"}`, onChange: e => updatePdfItem({ companyFooterContact: e.target.value }), className: "w-full p-2 border border-slate-300 rounded-xl font-mono"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 622}} )
                )

                , React.createElement('div', { className: "bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 625}}
                  , React.createElement('h4', { className: "font-extrabold text-purple-950 uppercase tracking-wider"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 626}}, "Theme & Watermark"  )
                  , React.createElement('div', { className: "grid grid-cols-2 gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 627}}
                    , React.createElement('input', { type: "color", value: editingPdf.item.pdfPrimaryColor || "#003b8e", onChange: e => updatePdfItem({ pdfPrimaryColor: e.target.value }), className: "w-full h-10 rounded-xl border border-purple-200"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 628}} )
                    , React.createElement('input', { type: "color", value: editingPdf.item.pdfSecondaryColor || "#d97706", onChange: e => updatePdfItem({ pdfSecondaryColor: e.target.value }), className: "w-full h-10 rounded-xl border border-purple-200"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 629}} )
                  )
                  , React.createElement('input', { placeholder: "Watermark text" , value: editingPdf.item.companyWatermarkText || "", onChange: e => updatePdfItem({ companyWatermarkText: e.target.value }), className: "w-full p-2 border border-purple-200 rounded-xl font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 631}} )
                  , React.createElement('input', { type: "range", min: "0.02", max: "0.4", step: "0.01", value: _nullishCoalesce(editingPdf.item.companyWatermarkOpacity, () => ( 0.08)), onChange: e => updatePdfItem({ companyWatermarkOpacity: Number(e.target.value) }), className: "w-full accent-purple-600" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 632}} )
                )

                , isInvoice ? (
                  React.createElement('div', { className: "bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 636}}
                    , React.createElement('h4', { className: "font-extrabold text-blue-950 uppercase tracking-wider"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 637}}, "Invoice PDF Fields"  )
                    , React.createElement('input', { placeholder: "Line item description"  , value: editingPdf.item.description || "", onChange: e => updatePdfItem({ description: e.target.value }), className: "w-full p-2 border border-blue-200 rounded-xl font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 638}} )
                    , React.createElement('textarea', { rows: 2, placeholder: "Sub-description", value: editingPdf.item.subdesc || "", onChange: e => updatePdfItem({ subdesc: e.target.value }), className: "w-full p-2 border border-blue-200 rounded-xl"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 639}} )
                    , React.createElement('div', { className: "grid grid-cols-3 gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 640}}
                      , React.createElement('input', { type: "number", value: editingPdf.item.rate || editingPdf.item.amount || 0, onChange: e => { const rate = Number(e.target.value); const taxPct = Number(_nullishCoalesce(editingPdf.item.taxPct, () => ( 18))); updatePdfItem({ rate, amount: rate, totalDue: Math.round(rate * (1 + taxPct / 100)) }); }, className: "w-full p-2 border border-blue-200 rounded-xl font-mono"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 641}} )
                      , React.createElement('input', { type: "number", value: _nullishCoalesce(editingPdf.item.taxPct, () => ( 18)), onChange: e => { const taxPct = Number(e.target.value); const rate = Number(editingPdf.item.rate || editingPdf.item.amount || 0); updatePdfItem({ taxPct, totalDue: Math.round(rate * (1 + taxPct / 100)) }); }, className: "w-full p-2 border border-blue-200 rounded-xl font-mono"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 642}} )
                      , React.createElement('input', { type: "number", value: editingPdf.item.totalDue || 0, onChange: e => updatePdfItem({ totalDue: Number(e.target.value) }), className: "w-full p-2 border border-blue-200 rounded-xl font-mono"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 643}} )
                    )
                    , React.createElement('input', { placeholder: "Account name" , value: editingPdf.item.accountName || "", onChange: e => updatePdfItem({ accountName: e.target.value }), className: "w-full p-2 border border-blue-200 rounded-xl font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 645}} )
                    , React.createElement('input', { placeholder: "Account number" , value: editingPdf.item.accountNumber || "", onChange: e => updatePdfItem({ accountNumber: e.target.value }), className: "w-full p-2 border border-blue-200 rounded-xl font-mono"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 646}} )
                    , React.createElement('input', { placeholder: "IFSC", value: editingPdf.item.ifscCode || "", onChange: e => updatePdfItem({ ifscCode: e.target.value }), className: "w-full p-2 border border-blue-200 rounded-xl font-mono"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 647}} )
                    , React.createElement('input', { placeholder: "Branch", value: editingPdf.item.branch || "", onChange: e => updatePdfItem({ branch: e.target.value }), className: "w-full p-2 border border-blue-200 rounded-xl font-bold"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 648}} )
                  )
                ) : (
                  React.createElement('div', { className: "bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-3"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 651}}
                    , React.createElement('h4', { className: "font-extrabold text-blue-950 uppercase tracking-wider"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 652}}, "Quotation PDF Fields"  )
                    , React.createElement('textarea', { rows: 3, value: editingPdf.item.overviewNarrative || "", onChange: e => updatePdfItem({ overviewNarrative: e.target.value }), className: "w-full p-2 border border-blue-200 rounded-xl"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 653}} )
                    , React.createElement('input', { type: "number", value: editingPdf.item.planAPrice || editingPdf.item.rate || 0, onChange: e => updatePdfItem({ planAPrice: Number(e.target.value), rate: Number(e.target.value) }), className: "w-full p-2 border border-blue-200 rounded-xl font-mono"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 654}} )
                    , React.createElement('textarea', { rows: 2, value: editingPdf.item.paymentTerms || "", onChange: e => updatePdfItem({ paymentTerms: e.target.value }), className: "w-full p-2 border border-blue-200 rounded-xl"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 655}} )
                  )
                )
              )

              , React.createElement('div', { className: "lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-4 min-h-0"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 660}}
                , React.createElement('iframe', { srcDoc: liveHtml, className: "w-full h-full rounded-xl border border-slate-700 bg-slate-900"     , title: "Client PDF Live Editor Preview"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 661}} )
              )
            )
          )
        );
      })()

      /* Add Client Modal */
      , showAddModal && (
        React.createElement('div', { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 670}}
          , React.createElement('div', { className: "bg-[#180e03] border border-rose-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 671}}
            , React.createElement('h2', { className: "text-lg font-bold text-white font-heading"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 672}}, "Add New Client Account"   )
            , React.createElement('form', { onSubmit: handleCreateClient, className: "space-y-3 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 673}}
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 674}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 675}}, "Client Full Name *"   )
                , React.createElement('input', {
                  type: "text", required: true,
                  value: form.name,
                  onChange: e => setForm({ ...form, name: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         ,
                  placeholder: "John Doe" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 676}}
                )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 684}}
                , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 685}}, "Company / Organization *"   )
                , React.createElement('input', {
                  type: "text", required: true,
                  value: form.company,
                  onChange: e => setForm({ ...form, company: e.target.value }),
                  className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         ,
                  placeholder: "Acme Corp" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 686}}
                )
              )
              , React.createElement('div', { className: "grid grid-cols-2 gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 694}}
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 695}}
                  , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 696}}, "Email Address *"  )
                  , React.createElement('input', {
                    type: "email", required: true,
                    value: form.email,
                    onChange: e => setForm({ ...form, email: e.target.value }),
                    className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         ,
                    placeholder: "john@acme.com", __self: this, __source: {fileName: _jsxFileName, lineNumber: 697}}
                  )
                )
                , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 705}}
                  , React.createElement('label', { className: "block text-slate-400 mb-1 font-semibold"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 706}}, "Phone Number *"  )
                  , React.createElement('input', {
                    type: "text", required: true,
                    value: form.phone,
                    onChange: e => setForm({ ...form, phone: e.target.value }),
                    className: "w-full px-3 py-2 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"         ,
                    placeholder: "+91 9876543210" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 707}}
                  )
                )
              )
              , React.createElement('div', { className: "flex justify-end gap-2 pt-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 716}}
                , React.createElement('button', {
                  type: "button",
                  onClick: () => setShowAddModal(false),
                  className: "px-4 py-2 rounded-xl bg-white/10 text-slate-300 font-semibold hover:bg-white/15"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 717}}
, "Cancel"

                )
                , React.createElement('button', {
                  type: "submit",
                  className: "px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold transition-all"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 724}}
, "Save Client"

                )
              )
            )
          )
        )
      )
    )
  );
}

