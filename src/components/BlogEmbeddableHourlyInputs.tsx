'use client';

import React, { useState } from 'react';
import { Clock } from 'lucide-react';

export default function BlogEmbeddableHourlyInputs() {
  const [isHourly, setIsHourly] = useState(true);
  const [rate, setRate] = useState('15.38');
  const [hours, setHours] = useState('37.5');
  const [weeks, setWeeks] = useState('52');

  return (
    <div className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-sm my-6">
      <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-widest flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-zinc-400" />
        Salary vs. Hourly Calculator (Preview)
      </h3>
      <div className="flex gap-2 bg-zinc-50 border border-zinc-200 p-1 rounded-xl mb-4">
        <button
          onClick={() => setIsHourly(false)}
          className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all ${
            !isHourly ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500'
          }`}
        >
          Annual
        </button>
        <button
          onClick={() => setIsHourly(true)}
          className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all ${
            isHourly ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500'
          }`}
        >
          Hourly
        </button>
      </div>

      {isHourly ? (
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-xs font-extrabold text-zinc-800">Rate</label>
            <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-xs" />
          </div>
          <div>
            <label className="text-xs font-extrabold text-zinc-800">Hrs/Wk</label>
            <input type="number" value={hours} onChange={e => setHours(e.target.value)} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-xs" />
          </div>
          <div>
            <label className="text-xs font-extrabold text-zinc-800">Wks/Yr</label>
            <input type="number" value={weeks} onChange={e => setWeeks(e.target.value)} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-xs" />
          </div>
        </div>
      ) : (
        <div>
          <label className="text-xs font-extrabold text-zinc-800">Annual Gross</label>
          <input type="number" defaultValue="30000" className="w-full p-2 mt-1 bg-white border border-zinc-200 rounded-lg text-xs" />
        </div>
      )}
    </div>
  );
}
