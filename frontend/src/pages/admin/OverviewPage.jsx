const _jsxFileName = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\CRM\\frontend\\src\\pages\\admin\\OverviewPage.tsx";import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  Edit,




} from "lucide-react";

export default function OverviewPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

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
    React.createElement('div', { className: "space-y-6 antialiased font-sans"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}
      /* Top Row: 4 Metric Cards - Matching Image 2 */
      , React.createElement('div', { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
        /* Card 1 */
        , React.createElement('div', { className: "bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
            , React.createElement('p', { className: "text-xs font-bold text-slate-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}, "All Active Clients"  )
            , React.createElement('h2', { className: "text-3xl font-black text-slate-900 mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}, "128")
            , React.createElement('p', { className: "text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}, "↑ 12.5%" ), " " , React.createElement('span', { className: "text-slate-400 font-normal" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}, "vs last month"  )
            )
          )
          , React.createElement('div', { className: "flex flex-col items-end gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}
            , React.createElement('div', { className: "w-11 h-11 rounded-2xl bg-[#06132D] text-white flex items-center justify-center shadow-md"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 99}}
              , React.createElement(Users, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}} )
            )
            /* Sparkline SVG */
            , React.createElement('svg', { width: "60", height: "24", viewBox: "0 0 60 24"   , fill: "none", className: "text-[#06132D]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}
              , React.createElement('path', { d: "M2 20C12 18 18 10 28 14C38 18 48 4 58 6"           , stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}} )
            )
          )
        )

        /* Card 2 */
        , React.createElement('div', { className: "bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}
            , React.createElement('p', { className: "text-xs font-bold text-slate-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 112}}, "Permanent Clients" )
            , React.createElement('h2', { className: "text-3xl font-black text-slate-900 mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 113}}, "86")
            , React.createElement('p', { className: "text-[11px] font-bold text-[#FF5349] mt-1 flex items-center gap-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}, "↑ 8.4%" ), " " , React.createElement('span', { className: "text-slate-400 font-normal" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}, "vs last month"  )
            )
          )
          , React.createElement('div', { className: "flex flex-col items-end gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}
            , React.createElement('div', { className: "w-11 h-11 rounded-2xl bg-[#FF5349] text-white flex items-center justify-center shadow-md"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}
              , React.createElement(UserCheck, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}} )
            )
            , React.createElement('svg', { width: "60", height: "24", viewBox: "0 0 60 24"   , fill: "none", className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}
              , React.createElement('path', { d: "M2 18C12 16 18 20 28 12C38 4 48 14 58 8"           , stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 123}} )
            )
          )
        )

        /* Card 3 */
        , React.createElement('div', { className: "bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 129}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 130}}
            , React.createElement('p', { className: "text-xs font-bold text-slate-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}, "Potential / Prospects"  )
            , React.createElement('h2', { className: "text-3xl font-black text-slate-900 mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}, "42")
            , React.createElement('p', { className: "text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}, "↑ 15.2%" ), " " , React.createElement('span', { className: "text-slate-400 font-normal" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}, "vs last month"  )
            )
          )
          , React.createElement('div', { className: "flex flex-col items-end gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}
            , React.createElement('div', { className: "w-11 h-11 rounded-2xl bg-[#06132D] text-white flex items-center justify-center shadow-md"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}}
              , React.createElement(UserSearch, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}} )
            )
            , React.createElement('svg', { width: "60", height: "24", viewBox: "0 0 60 24"   , fill: "none", className: "text-[#06132D]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}
              , React.createElement('path', { d: "M2 16C12 18 22 8 32 14C42 20 50 6 58 4"           , stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}} )
            )
          )
        )

        /* Card 4 */
        , React.createElement('div', { className: "bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}
            , React.createElement('p', { className: "text-xs font-bold text-slate-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 150}}, "Total Industries" )
            , React.createElement('h2', { className: "text-3xl font-black text-slate-900 mt-1"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 151}}, "16")
            , React.createElement('p', { className: "text-[11px] font-bold text-slate-700 mt-1 flex items-center gap-1"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 152}}
              , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}, "↑ 2 new"  ), " " , React.createElement('span', { className: "text-slate-400 font-normal" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}, "this month" )
            )
          )
          , React.createElement('div', { className: "flex flex-col items-end gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}
            , React.createElement('div', { className: "w-11 h-11 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center shadow-sm"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
              , React.createElement(Layers, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}} )
            )
            , React.createElement('svg', { width: "60", height: "24", viewBox: "0 0 60 24"   , fill: "none", className: "text-slate-400", __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}}
              , React.createElement('path', { d: "M2 14C15 14 25 18 35 10C45 2 52 14 58 12"           , stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}} )
            )
          )
        )
      )

      /* Middle Section: Clients Database Directory (Left) & Clients Overview Donut Chart (Right) */
      , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-3 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}
        /* Clients Database Directory Card - Left Column (span 2) */
        , React.createElement('div', { className: "lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 170}}
          /* Header Row */
          , React.createElement('div', { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 172}}
            , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 173}}
              , React.createElement('div', { className: "w-10 h-10 rounded-2xl bg-[#06132D] text-white flex items-center justify-center shrink-0 shadow-sm"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}
                , React.createElement(Users, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 175}} )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 177}}
                , React.createElement('h3', { className: "text-base font-black text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 178}}, "Clients Database Directory"  )
                , React.createElement('p', { className: "text-xs font-medium text-slate-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}, "Click on any active client profile row to open dedicated client workspace & details."

                )
              )
            )

            /* Filter Tabs & Button */
            , React.createElement('div', { className: "flex flex-wrap items-center gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}}
              , React.createElement('div', { className: "flex items-center gap-1 bg-slate-100 p-1 rounded-xl"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 187}}
                , React.createElement('button', {
                  onClick: () => setActiveTab("all"),
                  className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "all" ? "bg-[#06132D] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}
, "All Active (128)"

                )
                , React.createElement('button', {
                  onClick: () => setActiveTab("permanent"),
                  className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "permanent" ? "bg-[#06132D] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 196}}
, "Permanent (86)"

                )
                , React.createElement('button', {
                  onClick: () => setActiveTab("potential"),
                  className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "potential" ? "bg-[#06132D] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 204}}
, "Potential (42)"

                )
              )

              , React.createElement('button', {
                onClick: () => navigate("/admin/clients"),
                className: "px-4 py-2 rounded-xl bg-[#FF5349] hover:bg-[#F05454] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"            , __self: this, __source: {fileName: _jsxFileName, lineNumber: 214}}

                , React.createElement(Plus, { size: 15, __self: this, __source: {fileName: _jsxFileName, lineNumber: 218}} ), " Create Client Profile"
              )
            )
          )

          /* Table Container */
          , React.createElement('div', { className: "overflow-x-auto rounded-xl border border-slate-100"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 224}}
            , React.createElement('table', { className: "w-full text-left text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 225}}
              , React.createElement('thead', { className: "bg-slate-50 border-b border-slate-100 font-extrabold text-slate-600 uppercase tracking-wider text-[10px]"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 226}}
                , React.createElement('tr', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 227}}
                  , React.createElement('th', { className: "p-3.5 pl-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 228}}, "CLIENT ID" )
                  , React.createElement('th', { className: "p-3.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 229}}, "CLIENT DETAILS" )
                  , React.createElement('th', { className: "p-3.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 230}}, "WHATSAPP / PHONE"  )
                  , React.createElement('th', { className: "p-3.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 231}}, "INDUSTRY")
                  , React.createElement('th', { className: "p-3.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 232}}, "STATUS")
                  , React.createElement('th', { className: "p-3.5 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 233}}, "ACTIONS")
                )
              )
              , React.createElement('tbody', { className: "divide-y divide-slate-100 font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 236}}
                , clientsData.map((client) => (
                  React.createElement('tr', { 
                    key: client.id,
                    onClick: () => navigate("/admin/clients"),
                    className: "hover:bg-slate-50/80 transition-colors cursor-pointer"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 238}}

                    , React.createElement('td', { className: "p-3.5 pl-4 font-mono font-bold text-slate-800"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 243}}, client.id)
                    , React.createElement('td', { className: "p-3.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 244}}
                      , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 245}}
                        , React.createElement('div', { className: `w-8 h-8 rounded-full ${client.avatarBg} font-black flex items-center justify-center text-xs shrink-0 shadow-sm`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 246}}
                          , client.letter
                        )
                        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 249}}
                          , React.createElement('p', { className: "font-extrabold text-slate-900" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 250}}, client.name)
                          , React.createElement('p', { className: "text-[11px] text-slate-500" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 251}}, client.email)
                        )
                      )
                    )
                    , React.createElement('td', { className: "p-3.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 255}}
                      , React.createElement('div', { className: "flex items-center gap-1.5 text-slate-700 font-semibold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 256}}
                        , React.createElement(PhoneCall, { size: 13, className: "text-[#06132D]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 257}} )
                        , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 258}}, client.phone)
                      )
                    )
                    , React.createElement('td', { className: "p-3.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 261}}
                      , React.createElement('span', { className: `px-2.5 py-1 rounded-full text-[11px] font-bold border ${client.industryColor}`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 262}}
                        , client.industry
                      )
                    )
                    , React.createElement('td', { className: "p-3.5", __self: this, __source: {fileName: _jsxFileName, lineNumber: 266}}
                      , React.createElement('span', { className: "px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 267}}
                        , client.status
                      )
                    )
                    , React.createElement('td', { className: "p-3.5 text-center" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 271}}
                      , React.createElement('button', { className: "p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 272}}
                        , React.createElement(MoreHorizontal, { size: 16, __self: this, __source: {fileName: _jsxFileName, lineNumber: 273}} )
                      )
                    )
                  )
                ))
              )
            )
          )

          /* Pagination Footer */
          , React.createElement('div', { className: "flex items-center justify-between text-xs text-slate-500 font-semibold pt-2"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 283}}
            , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 284}}, "Showing 1 to 5 of 128 entries"      )
            , React.createElement('div', { className: "flex items-center gap-1"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 285}}
              , React.createElement('button', { className: "w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 286}}, "<"

              )
              , React.createElement('button', { className: "w-8 h-8 rounded-lg bg-[#06132D] text-white font-bold flex items-center justify-center shadow-sm"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 289}}, "1"

              )
              , React.createElement('button', { className: "w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 292}}, "2"

              )
              , React.createElement('button', { className: "w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-bold"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 295}}, "3"

              )
              , React.createElement('button', { className: "w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 298}}, ">"

              )
            )
          )
        )

        /* Clients Overview & Top Industries Card - Right Column (span 1) */
        , React.createElement('div', { className: "bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6 flex flex-col justify-between"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 306}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 307}}
            , React.createElement('h3', { className: "text-base font-black text-slate-900 mb-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 308}}, "Clients Overview" )

            /* Donut Chart Visual - Matching Image 2 */
            , React.createElement('div', { className: "relative flex items-center justify-center py-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 311}}
              , React.createElement('svg', { width: "180", height: "180", viewBox: "0 0 180 180"   , className: "transform -rotate-90" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 312}}
                /* Background Ring */
                , React.createElement('circle', { cx: "90", cy: "90", r: "70", stroke: "#F1F5F9", strokeWidth: "20", fill: "transparent", __self: this, __source: {fileName: _jsxFileName, lineNumber: 314}} )
                /* Active Clients Ring (50% - Coral Red) */
                , React.createElement('circle', {
                  cx: "90",
                  cy: "90",
                  r: "70",
                  stroke: "#FF5349",
                  strokeWidth: "20",
                  strokeDasharray: "440",
                  strokeDashoffset: "220",
                  fill: "transparent",
                  strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 316}}
                )
                /* Permanent Clients Ring (34% - Dark Navy) */
                , React.createElement('circle', {
                  cx: "90",
                  cy: "90",
                  r: "70",
                  stroke: "#06132D",
                  strokeWidth: "20",
                  strokeDasharray: "440",
                  strokeDashoffset: "300",
                  fill: "transparent",
                  strokeLinecap: "round", __self: this, __source: {fileName: _jsxFileName, lineNumber: 328}}
                )
              )
              /* Donut Center Label */
              , React.createElement('div', { className: "absolute flex flex-col items-center justify-center text-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 341}}
                , React.createElement('span', { className: "text-2xl font-black text-slate-900 leading-none"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 342}}, "128")
                , React.createElement('span', { className: "text-[10px] font-extrabold text-slate-500 uppercase tracking-wide mt-1"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 343}}, "Total Clients" )
              )
            )

            /* Donut Legend */
            , React.createElement('div', { className: "space-y-2 mt-4 text-xs"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 348}}
              , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 349}}
                , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 350}}
                  , React.createElement('span', { className: "w-3 h-3 rounded-full bg-[#06132D]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 351}})
                  , React.createElement('span', { className: "font-bold text-slate-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 352}}, "Active Clients" )
                )
                , React.createElement('span', { className: "font-mono font-extrabold text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 354}}, "128 (50%)" )
              )
              , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 356}}
                , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 357}}
                  , React.createElement('span', { className: "w-3 h-3 rounded-full bg-[#FF5349]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 358}})
                  , React.createElement('span', { className: "font-bold text-slate-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 359}}, "Permanent Clients" )
                )
                , React.createElement('span', { className: "font-mono font-extrabold text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 361}}, "86 (34%)" )
              )
              , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 363}}
                , React.createElement('div', { className: "flex items-center gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 364}}
                  , React.createElement('span', { className: "w-3 h-3 rounded-full bg-slate-300"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 365}})
                  , React.createElement('span', { className: "font-bold text-slate-700" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 366}}, "Potential / Prospects"  )
                )
                , React.createElement('span', { className: "font-mono font-extrabold text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 368}}, "42 (16%)" )
              )
            )
          )

          /* Top Industries Section */
          , React.createElement('div', { className: "pt-4 border-t border-slate-100 space-y-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 374}}
            , React.createElement('h4', { className: "text-xs font-black text-slate-900 uppercase tracking-wider"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 375}}, "Top Industries" )
            , [
              { name: "Automotive", pct: "32%", barColor: "bg-[#06132D]" },
              { name: "Services", pct: "24%", barColor: "bg-[#FF5349]" },
              { name: "Manufacturing", pct: "20%", barColor: "bg-[#06132D]" },
              { name: "IT & Software", pct: "14%", barColor: "bg-[#FF5349]" },
              { name: "Industrial", pct: "10%", barColor: "bg-[#FF5349]" }
            ].map((ind) => (
              React.createElement('div', { key: ind.name, className: "space-y-1 text-xs font-semibold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 383}}
                , React.createElement('div', { className: "flex justify-between text-slate-700"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 384}}
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 385}}, ind.name)
                  , React.createElement('span', { className: "font-mono font-bold text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 386}}, ind.pct)
                )
                , React.createElement('div', { className: "h-1.5 rounded-full bg-slate-100"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 388}}
                  , React.createElement('div', { className: `h-1.5 rounded-full ${ind.barColor}`, style: { width: ind.pct }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 389}})
                )
              )
            ))
          )
        )
      )

      /* Bottom Row Section: Archived Profiles (Left) & Recent Activity (Right) */
      , React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-3 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 398}}
        /* Archived & Inactive Client Profiles - Left (span 2) */
        , React.createElement('div', { className: "lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 400}}
          , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 401}}
            , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 402}}
              , React.createElement('div', { className: "w-10 h-10 rounded-2xl bg-red-50 text-[#FF5349] flex items-center justify-center shrink-0 border border-red-100"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 403}}
                , React.createElement(Archive, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 404}} )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 406}}
                , React.createElement('h3', { className: "text-base font-black text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 407}}, "Archived & Inactive Client Profiles"    )
                , React.createElement('p', { className: "text-xs font-medium text-slate-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 408}}, "Historical archive of inactive, deleted, suspended, or archived client profiles."

                )
              )
            )
            , React.createElement('button', { 
              onClick: () => navigate("/admin/clients"),
              className: "px-3.5 py-1.5 rounded-xl border border-red-200 text-[#FF5349] font-bold text-xs hover:bg-red-50 transition-colors"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 413}}
, "View Archive"

            )
          )

          , React.createElement('div', { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 421}}
            , React.createElement('div', { className: "p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 422}}
              , React.createElement('div', { className: "w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 423}}
                , React.createElement(Archive, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 424}} )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 426}}
                , React.createElement('p', { className: "text-[11px] font-bold text-slate-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 427}}, "Archived Clients" )
                , React.createElement('p', { className: "text-xl font-black text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 428}}, "24")
              )
            )

            , React.createElement('div', { className: "p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 432}}
              , React.createElement('div', { className: "w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 433}}
                , React.createElement(UserX, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 434}} )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 436}}
                , React.createElement('p', { className: "text-[11px] font-bold text-slate-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 437}}, "Inactive Clients" )
                , React.createElement('p', { className: "text-xl font-black text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 438}}, "18")
              )
            )

            , React.createElement('div', { className: "p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 442}}
              , React.createElement('div', { className: "w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 443}}
                , React.createElement(Trash2, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 444}} )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 446}}
                , React.createElement('p', { className: "text-[11px] font-bold text-slate-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 447}}, "Deleted Clients" )
                , React.createElement('p', { className: "text-xl font-black text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 448}}, "7")
              )
            )

            , React.createElement('div', { className: "p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-3"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 452}}
              , React.createElement('div', { className: "w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 453}}
                , React.createElement(PauseCircle, { size: 18, __self: this, __source: {fileName: _jsxFileName, lineNumber: 454}} )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 456}}
                , React.createElement('p', { className: "text-[11px] font-bold text-slate-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 457}}, "Suspended Clients" )
                , React.createElement('p', { className: "text-xl font-black text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 458}}, "3")
              )
            )
          )
        )

        /* Recent Activity Card - Right (span 1) */
        , React.createElement('div', { className: "bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 465}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 466}}
            , React.createElement('div', { className: "flex items-center justify-between mb-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 467}}
              , React.createElement('h3', { className: "text-base font-black text-slate-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 468}}, "Recent Activity" )
              , React.createElement('button', { 
                onClick: () => navigate("/admin/dashboard"),
                className: "px-3 py-1 rounded-lg bg-[#06132D] text-white text-[11px] font-bold shadow-sm"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 469}}
, "View All"

              )
            )

            , React.createElement('div', { className: "space-y-4 text-xs" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 477}}
              , React.createElement('div', { className: "flex items-start gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 478}}
                , React.createElement('div', { className: "w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 479}}
                  , React.createElement(Users, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 480}} )
                )
                , React.createElement('div', { className: "flex-1 min-w-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 482}}
                  , React.createElement('p', { className: "font-bold text-slate-900 leading-snug"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 483}}, "New client "
                      , React.createElement('span', { className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 484}}, "\"Wheels & More Pvt. Ltd.\""    ), " added by "   , React.createElement('span', { className: "font-black text-slate-900" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 484}}, "Admin Operator" )
                  )
                  , React.createElement('span', { className: "text-[10px] text-slate-400 font-mono mt-0.5 block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 486}}, "10:30 AM" )
                )
              )

              , React.createElement('div', { className: "flex items-start gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 490}}
                , React.createElement('div', { className: "w-7 h-7 rounded-lg bg-red-50 text-[#FF5349] flex items-center justify-center shrink-0 mt-0.5"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 491}}
                  , React.createElement(Edit, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 492}} )
                )
                , React.createElement('div', { className: "flex-1 min-w-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 494}}
                  , React.createElement('p', { className: "font-bold text-slate-900 leading-snug"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 495}}, "Client "
                     , React.createElement('span', { className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 496}}, "\"Elite Services Co.\""  ), " profile updated by "    , React.createElement('span', { className: "font-black text-slate-900" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 496}}, "Admin Operator" )
                  )
                  , React.createElement('span', { className: "text-[10px] text-slate-400 font-mono mt-0.5 block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 498}}, "Yesterday")
                )
              )

              , React.createElement('div', { className: "flex items-start gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 502}}
                , React.createElement('div', { className: "w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 503}}
                  , React.createElement(Archive, { size: 14, __self: this, __source: {fileName: _jsxFileName, lineNumber: 504}} )
                )
                , React.createElement('div', { className: "flex-1 min-w-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 506}}
                  , React.createElement('p', { className: "font-bold text-slate-900 leading-snug"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 507}}, "Client "
                     , React.createElement('span', { className: "text-[#FF5349]", __self: this, __source: {fileName: _jsxFileName, lineNumber: 508}}, "\"OldBridge Logistics\"" ), " archived by "   , React.createElement('span', { className: "font-black text-slate-900" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 508}}, "Admin Operator" )
                  )
                  , React.createElement('span', { className: "text-[10px] text-slate-400 font-mono mt-0.5 block"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 510}}, "2 days ago"  )
                )
              )
            )
          )
        )
      )

      /* Page Footer */
      , React.createElement('div', { className: "pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-semibold gap-2"           , __self: this, __source: {fileName: _jsxFileName, lineNumber: 519}}
        , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 520}}, "© 2026 CRM Platform. All rights reserved."      )
        , React.createElement('div', { className: "flex items-center gap-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 521}}
          , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 522}}, "Last updated: May 4, 2026 04:31 PM"      )
          , React.createElement('span', { className: "flex items-center gap-1.5 text-emerald-600 font-bold"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 523}}
            , React.createElement('span', { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 524}}), " System Status: Online"
          )
        )
      )
    )
  );
}
