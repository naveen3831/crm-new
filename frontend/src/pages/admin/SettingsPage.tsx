import React, { useState } from "react";
import { Settings, Save, ShieldCheck, Database, Key, Mail } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "Speshway Technologies",
    smtpHost: "smtp.speshway.com",
    stripeKey: "pk_test_51Px92...",
    taxRate: 18,
    currency: "INR (₹)"
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("System Settings saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white font-heading flex items-center gap-2">
          <Settings className="text-[#FF5349]" /> System Settings & Configuration
        </h1>
        <p className="text-xs text-slate-400 mt-1">Configure company branding, SMTP mailer, payment gateways, and security controls</p>
      </div>

      <form onSubmit={handleSave} className="rounded-2xl bg-[#071E34] border border-rose-500/20 p-6 space-y-6 shadow-xl">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-amber-400 font-heading uppercase tracking-wider">Company Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={e => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Default Currency</label>
              <input
                type="text"
                value={settings.currency}
                onChange={e => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-rose-500/10">
          <h3 className="text-sm font-bold text-amber-400 font-heading uppercase tracking-wider">Payment Gateways & Taxes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Stripe Publishable Key</label>
              <input
                type="text"
                value={settings.stripeKey}
                onChange={e => setSettings({ ...settings, stripeKey: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white font-mono focus:outline-none focus:border-[#FF5349]"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Standard GST / Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={e => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-rose-500/20 text-white focus:outline-none focus:border-[#FF5349]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-rose-500/10 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#FF5349] hover:bg-[#e04940] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5349]/30 transition-all"
          >
            <Save size={16} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

