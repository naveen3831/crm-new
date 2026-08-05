import React, { useState, useEffect } from "react";
import { PhoneCall, Plus, Search, Clock, CheckCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface Call {
  id: string;
  clientName: string;
  type: string;
  duration: string;
  purpose: string;
  status: string;
  date: string;
}

export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);

  const fetchCalls = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/call`).then(r => r.json());
      if (res.data && Array.isArray(res.data)) {
        setCalls(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
            <PhoneCall className="text-[#FF5349]" /> Telephony & Call Logs
          </h1>
          <p className="text-xs text-slate-400 mt-1">Record incoming inquiries, sales calls, and follow-up schedules</p>
        </div>
      </div>

      <div className="rounded-2xl bg-[#071E34] border border-rose-500/20 p-5 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-rose-500/10 text-slate-400 font-mono uppercase">
              <th className="pb-3">Call ID</th>
              <th className="pb-3">Client</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Duration</th>
              <th className="pb-3">Purpose</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose-500/10 text-slate-300">
            {calls.map((c) => (
              <tr key={c.id} className="hover:bg-white/5">
                <td className="py-3 font-mono text-rose-400 font-semibold">{c.id}</td>
                <td className="py-3 font-bold text-white">{c.clientName}</td>
                <td className="py-3"><span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">{c.type || "Outgoing"}</span></td>
                <td className="py-3 font-mono text-slate-400">{c.duration || "12 mins"}</td>
                <td className="py-3 text-slate-300">{c.purpose || "Scope Review"}</td>
                <td className="py-3"><span className="text-emerald-400 font-semibold">{c.status || "Completed"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

