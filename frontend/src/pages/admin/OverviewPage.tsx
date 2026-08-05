import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  UserSearch,
  Layers,
  Plus,
  PhoneCall,
  MoreHorizontal,
  Archive,
  UserX,
  Trash2,
  PauseCircle,
  FileText,
  Edit,
  Clock,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

export default function OverviewPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "permanent" | "potential">("all");

  const clientsData = [
    {
      id: "CLI-1001",
      name: "Wheels & More Pvt. Ltd.",
      email: "wheels@more.com",
      phone: "+91 98765 43210",
      industry: "Automotive",
      industryColor: "bg-blue-50 text-blue-700 border-blue-200",
      status: "Active",
      letter: "W",
      avatarBg: "bg-[#06132D] text-white"
    },
    {
      id: "CLI-1002",
      name: "Elite Services Co.",
      email: "info@elite.com",
      phone: "+91 91234 56789",
      industry: "Services",
      industryColor: "bg-red-50 text-[#FF5349] border-red-100",
      status: "Active",
      letter: "E",
      avatarBg: "bg-[#FF5349] text-white"
    },
    {
      id: "CLI-1003",
      name: "Bright Future Enterprises",
      email: "contact@bright.com",
      phone: "+91 99887 76655",
      industry: "Manufacturing",
      industryColor: "bg-blue-50 text-blue-700 border-blue-200",
      status: "Active",
      letter: "B",
      avatarBg: "bg-[#06132D] text-white"
    },
    {
      id: "CLI-1004",
      name: "NextGen Solutions",
      email: "hello@nextgen.com",
      phone: "+91 90000 11122",
      industry: "IT & Software",
      industryColor: "bg-slate-100 text-slate-700 border-slate-200",
      status: "Active",
      letter: "N",
      avatarBg: "bg-slate-400 text-white"
    },
    {
      id: "CLI-1005",
      name: "GreenField Industries",
      email: "support@greenfield.com",
      phone: "+91 94444 33322",
      industry: "Industrial",
      industryColor: "bg-red-50 text-[#FF5349] border-red-100",
      status: "Active",
      letter: "G",
      avatarBg: "bg-[#FF5349] text-white"
    }
  ];

  return (
    <div className="space-y-6 antialiased font-sans">
      {/* Top Row: 4 Metric Cards - Matching Image 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold text-slate-600">All Active Clients</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">128</h2>
            <p className="text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
              <span>↑ 12.5%</span> <span className="text-slate-400 font-normal">vs last month</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-11 h-11 rounded-2xl bg-[#06132D] text-white flex items-center justify-center shadow-md">
              <Users size={20} />
            </div>
            {/* Sparkline SVG */}
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="text-[#06132D]">
              <path d="M2 20C12 18 18 10 28 14C38 18 48 4 58 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold text-slate-600">Permanent Clients</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">86</h2>
            <p className="text-[11px] font-bold text-[#FF5349] mt-1 flex items-center gap-1">
              <span>↑ 8.4%</span> <span className="text-slate-400 font-normal">vs last month</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-11 h-11 rounded-2xl bg-[#FF5349] text-white flex items-center justify-center shadow-md">
              <UserCheck size={20} />
            </div>
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="text-[#FF5349]">
              <path d="M2 18C12 16 18 20 28 12C38 4 48 14 58 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold text-slate-600">Potential / Prospects</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">42</h2>
            <p className="text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
              <span>↑ 15.2%</span> <span className="text-slate-400 font-normal">vs last month</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-11 h-11 rounded-2xl bg-[#06132D] text-white flex items-center justify-center shadow-md">
              <UserSearch size={20} />
            </div>
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="text-[#06132D]">
              <path d="M2 16C12 18 22 8 32 14C42 20 50 6 58 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold text-slate-600">Total Industries</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">16</h2>
            <p className="text-[11px] font-bold text-slate-700 mt-1 flex items-center gap-1">
              <span>↑ 2 new</span> <span className="text-slate-400 font-normal">this month</span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center shadow-sm">
              <Layers size={20} />
            </div>
            <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="text-slate-400">
              <path d="M2 14C15 14 25 18 35 10C45 2 52 14 58 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Middle Section: Clients Database Directory (Left) & Clients Overview Donut Chart (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clients Database Directory Card - Left Column (span 2) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#06132D] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Clients Database Directory</h3>
                <p className="text-xs font-medium text-slate-500">
                  Click on any active client profile row to open dedicated client workspace & details.
                </p>
              </div>
            </div>

            {/* Filter Tabs & Button */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "all" ? "bg-[#06132D] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All Active (128)
                </button>
                <button
                  onClick={() => setActiveTab("permanent")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "permanent" ? "bg-[#06132D] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Permanent (86)
                </button>
                <button
                  onClick={() => setActiveTab("potential")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "potential" ? "bg-[#06132D] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Potential (42)
                </button>
              </div>

              <button
                onClick={() => navigate("/admin/clients")}
                className="px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#F05454] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Plus size={15} /> Create Client Profile
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 font-extrabold text-slate-600 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 pl-4">CLIENT ID</th>
                  <th className="p-3.5">CLIENT DETAILS</th>
                  <th className="p-3.5">WHATSAPP / PHONE</th>
                  <th className="p-3.5">INDUSTRY</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {clientsData.map((client) => (
                  <tr 
                    key={client.id}
                    onClick={() => navigate("/admin/clients")}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <td className="p-3.5 pl-4 font-mono font-bold text-slate-800">{client.id}</td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${client.avatarBg} font-black flex items-center justify-center text-xs shrink-0 shadow-sm`}>
                          {client.letter}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900">{client.name}</p>
                          <p className="text-[11px] text-slate-500">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                        <PhoneCall size={13} className="text-[#06132D]" />
                        <span>{client.phone}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${client.industryColor}`}>
                        {client.industry}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                        {client.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pt-2">
            <p>Showing 1 to 5 of 128 entries</p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
                &lt;
              </button>
              <button className="w-8 h-8 rounded-lg bg-[#06132D] text-white font-bold flex items-center justify-center shadow-sm">
                1
              </button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold">
                2
              </button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold">
                3
              </button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Clients Overview & Top Industries Card - Right Column (span 1) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 mb-4">Clients Overview</h3>

            {/* Donut Chart Visual - Matching Image 2 */}
            <div className="relative flex items-center justify-center py-4">
              <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
                {/* Background Ring */}
                <circle cx="90" cy="90" r="70" stroke="#F1F5F9" strokeWidth="20" fill="transparent" />
                {/* Active Clients Ring (50% - Coral Red) */}
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  stroke="#FF5349"
                  strokeWidth="20"
                  strokeDasharray="440"
                  strokeDashoffset="220"
                  fill="transparent"
                  strokeLinecap="round"
                />
                {/* Permanent Clients Ring (34% - Dark Navy) */}
                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  stroke="#06132D"
                  strokeWidth="20"
                  strokeDasharray="440"
                  strokeDashoffset="300"
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>
              {/* Donut Center Label */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-900 leading-none">128</span>
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide mt-1">Total Clients</span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-2 mt-4 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#06132D]"></span>
                  <span className="font-bold text-slate-700">Active Clients</span>
                </div>
                <span className="font-mono font-extrabold text-slate-900">128 (50%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5349]"></span>
                  <span className="font-bold text-slate-700">Permanent Clients</span>
                </div>
                <span className="font-mono font-extrabold text-slate-900">86 (34%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                  <span className="font-bold text-slate-700">Potential / Prospects</span>
                </div>
                <span className="font-mono font-extrabold text-slate-900">42 (16%)</span>
              </div>
            </div>
          </div>

          {/* Top Industries Section */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Top Industries</h4>
            {[
              { name: "Automotive", pct: "32%", barColor: "bg-[#06132D]" },
              { name: "Services", pct: "24%", barColor: "bg-[#FF5349]" },
              { name: "Manufacturing", pct: "20%", barColor: "bg-[#06132D]" },
              { name: "IT & Software", pct: "14%", barColor: "bg-[#FF5349]" },
              { name: "Industrial", pct: "10%", barColor: "bg-[#FF5349]" }
            ].map((ind) => (
              <div key={ind.name} className="space-y-1 text-xs font-semibold">
                <div className="flex justify-between text-slate-700">
                  <span>{ind.name}</span>
                  <span className="font-mono font-bold text-slate-900">{ind.pct}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100">
                  <div className={`h-1.5 rounded-full ${ind.barColor}`} style={{ width: ind.pct }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row Section: Archived Profiles (Left) & Recent Activity (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Archived & Inactive Client Profiles - Left (span 2) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#FF5349] flex items-center justify-center shrink-0 border border-red-100">
                <Archive size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Archived & Inactive Client Profiles</h3>
                <p className="text-xs font-medium text-slate-500">
                  Historical archive of inactive, deleted, suspended, or archived client profiles.
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate("/admin/clients")}
              className="px-3.5 py-1.5 rounded-xl border border-red-200 text-[#FF5349] font-bold text-xs hover:bg-red-50 transition-colors"
            >
              View Archive
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Archive size={18} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500">Archived Clients</p>
                <p className="text-xl font-black text-slate-900">24</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <UserX size={18} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500">Inactive Clients</p>
                <p className="text-xl font-black text-slate-900">18</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 size={18} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500">Deleted Clients</p>
                <p className="text-xl font-black text-slate-900">7</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <PauseCircle size={18} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500">Suspended Clients</p>
                <p className="text-xl font-black text-slate-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Card - Right (span 1) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900">Recent Activity</h3>
              <button 
                onClick={() => navigate("/admin/dashboard")}
                className="px-3 py-1 rounded-lg bg-[#06132D] text-white text-[11px] font-bold shadow-sm"
              >
                View All
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Users size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 leading-snug">
                    New client <span className="text-[#FF5349]">"Wheels & More Pvt. Ltd."</span> added by <span className="font-black text-slate-900">Admin Operator</span>
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">10:30 AM</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-[#FF5349] flex items-center justify-center shrink-0 mt-0.5">
                  <Edit size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 leading-snug">
                    Client <span className="text-[#FF5349]">"Elite Services Co."</span> profile updated by <span className="font-black text-slate-900">Admin Operator</span>
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">Yesterday</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Archive size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 leading-snug">
                    Client <span className="text-[#FF5349]">"OldBridge Logistics"</span> archived by <span className="font-black text-slate-900">Admin Operator</span>
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <div className="pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-semibold gap-2">
        <p>© 2026 CRM Platform. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span>Last updated: May 4, 2026 04:31 PM</span>
          <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> System Status: Online
          </span>
        </div>
      </div>
    </div>
  );
}
