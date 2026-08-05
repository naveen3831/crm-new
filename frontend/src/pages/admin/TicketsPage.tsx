import React, { useState, useEffect } from "react";
import { TicketCheck, Plus, Search, Bot, MessageSquare, CheckCircle, Clock } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface Ticket {
  id: string;
  subject: string;
  clientName: string;
  priority: string;
  status: string;
  description: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDraftingAI, setIsDraftingAI] = useState(false);

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/ticket`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setTickets(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDraftAIResponse = async (ticket: Ticket) => {
    setIsDraftingAI(true);
    try {
      const res = await fetch(`${API_URL}/crm/agents/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "agent-support",
          actionType: "Draft Ticket Response",
          payload: { ticketId: ticket.id, subject: ticket.subject }
        })
      }).then(r => r.json());

      alert(res.result || "Support Desk Agent generated draft resolution note!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsDraftingAI(false);
    }
  };

  const filteredTickets = tickets.filter(t =>
    (t.subject || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.clientName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
            <TicketCheck className="text-rose-400" /> Customer Support Queue
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage technical tickets, SLA resolutions, and AI response drafts</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-3 text-slate-500" size={16} />
        <input
          type="text"
          placeholder="Search tickets by subject or client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071E34] border border-rose-500/20 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#FF5349]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTickets.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl bg-[#071E34] border border-rose-500/20 p-5 space-y-4 hover:border-rose-500/40 transition-all shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-rose-400 font-bold block">{t.id}</span>
                <h3 className="text-sm font-bold text-white">{t.subject}</h3>
                <p className="text-xs text-slate-400">{t.clientName}</p>
              </div>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {t.priority || "High"}
              </span>
            </div>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {t.description || "Client requested technical investigation regarding API configuration."}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-rose-500/10 text-xs">
              <span className="text-[10px] text-slate-500 font-mono">Status: {t.status || "Open"}</span>
              <button
                onClick={() => handleDraftAIResponse(t)}
                disabled={isDraftingAI}
                className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-semibold border border-rose-500/30 flex items-center gap-1 transition-all text-xs"
              >
                <Bot size={13} /> AI Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

