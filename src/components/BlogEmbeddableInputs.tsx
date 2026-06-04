import React from 'react';
import { Settings, MapPin, PiggyBank } from 'lucide-react';

export default function BlogEmbeddableInputs() {
  return (
    <div className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-sm">
      <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-widest flex items-center gap-2 mb-4">
        <Settings className="w-4 h-4 text-zinc-400" />
        Adjust Income Details (Preview)
      </h3>
      <div className="space-y-4">
        {/* Mock inputs */}
        <div>
          <label className="text-xs font-extrabold text-zinc-800">Annual Gross Salary</label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">£</span>
            <input type="text" value="40,000" disabled className="w-full pl-8 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-bold" />
          </div>
        </div>
        <div>
          <label className="text-xs font-extrabold text-zinc-800">Pension Contribution (%)</label>
          <input type="range" disabled className="w-full mt-1 accent-zinc-900" />
        </div>
      </div>
    </div>
  );
}
