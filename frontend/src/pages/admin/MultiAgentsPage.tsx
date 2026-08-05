import React, { useState, useEffect } from "react";
import { Bot, Sparkles, Play, RefreshCw, Activity, CheckCircle2, ShieldCheck, Cpu, Zap, Clock, Terminal } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface Agent {
  id: string;
  name: string;
  status: string;
  lastRun: string;
  tasksCompleted: number;
  successRate: string;
}

interface AgentLog {
  id: string;
  agentId: string;
  timestamp: string;
  message: string;
}

export default function MultiAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [stats, setStats] = useState({
    activeAgentsCount: 4,
    totalTasksExecuted: 759,
    avgAutomationSpeed: "1.4s",
    workflowUptime: "99.98%"
  });
  const [loading, setLoading] = useState(true);
  const [executingAgentId, setExecutingAgentId] = useState<string | null>(null);

  const fetchAgentStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/crm/agents/status`).then(r => r.json());
      if (res.success) {
        setAgents(res.agents || []);
        setLogs(res.recentLogs || []);
        if (res.systemStats) setStats(res.systemStats);
      }
    } catch (err) {
      console.error("Fetch agents error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentStatus();
    const interval = setInterval(fetchAgentStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRunAgentAction = async (agentId: string, actionType: string) => {
    setExecutingAgentId(agentId);
    try {
      const res = await fetch(`${API_URL}/crm/agents/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId,
          actionType,
          payload: { projectName: "Enterprise Cloud ERP", name: "Global Logistics Inc", budget: 150000 }
        })
      }).then(r => r.json());

      if (res.success) {
        await fetchAgentStatus();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setExecutingAgentId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950 via-[#1d1003] to-blue-950 p-6 sm:p-8 border border-amber-500/30 shadow-2xl shadow-amber-950/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-1">
                <Sparkles size={12} /> Autonomous Multi-Agent Orchestrator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight flex items-center gap-3">
              <Bot size={32} className="text-amber-400" /> Multi-Agent AI Studio & Fleet
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Specialized autonomous AI agents working collaboratively to qualify leads, auto-generate proposal estimations, answer support tickets, and audit financial collections.
            </p>
          </div>
          <button
            onClick={fetchAgentStatus}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 flex items-center gap-2 transition-all self-start md:self-auto"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh Fleet State
          </button>
        </div>
      </div>

      {/* System Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#071E34] border border-amber-500/20 shadow-xl">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Active Fleet</span>
          <span className="text-2xl font-black text-amber-400 font-heading">{stats.activeAgentsCount} Agents</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#071E34] border border-amber-500/20 shadow-xl">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Tasks Completed</span>
          <span className="text-2xl font-black text-emerald-400 font-heading">{stats.totalTasksExecuted}</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#071E34] border border-amber-500/20 shadow-xl">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Avg Latency</span>
          <span className="text-2xl font-black text-rose-400 font-heading">{stats.avgAutomationSpeed}</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#071E34] border border-amber-500/20 shadow-xl">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Workflow Uptime</span>
          <span className="text-2xl font-black text-rose-400 font-heading">{stats.workflowUptime}</span>
        </div>
      </div>

      {/* Agents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => {
          const isExecuting = executingAgentId === agent.id;
          return (
            <div
              key={agent.id}
              className="rounded-2xl bg-[#071E34] border border-rose-500/20 p-6 space-y-4 shadow-xl hover:border-amber-500/40 transition-all relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-700/30">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{agent.name}</h3>
                    <span className="text-[10px] font-mono text-amber-400">{agent.id}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                  agent.status.includes("Executing") 
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse" 
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                }`}>
                  {agent.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block">SUCCESS RATE</span>
                  <span className="font-bold text-emerald-400">{agent.successRate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">TASKS DONE</span>
                  <span className="font-bold text-amber-400">{agent.tasksCompleted}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">LAST RUN</span>
                  <span className="font-semibold text-slate-300 font-mono text-[10px]">Just now</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-rose-500/10">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Cpu size={14} className="text-amber-400" /> Autonomous Trigger Ready
                </span>
                <button
                  onClick={() => handleRunAgentAction(agent.id, "Manual Trigger")}
                  disabled={isExecuting}
                  className="px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-[#FF5349]/20 disabled:opacity-50"
                >
                  <Play size={13} /> {isExecuting ? "Executing Agent..." : "Trigger Action"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Agent Execution Logs Feed */}
      <div className="rounded-2xl bg-[#071E34] border border-rose-500/20 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-rose-500/10 pb-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Terminal size={18} className="text-amber-400" /> Multi-Agent Execution Audit Stream
          </h3>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Stream
          </span>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-2 font-mono text-xs">
          {logs.map((log) => (
            <div key={log.id} className="p-3 rounded-xl bg-black/40 border border-amber-500/10 flex items-start gap-3 hover:border-amber-500/20 transition-all">
              <span className="text-[10px] text-amber-400 shrink-0 mt-0.5">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
              <p className="text-slate-200 leading-relaxed">{log.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

