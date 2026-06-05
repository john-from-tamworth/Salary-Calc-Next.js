'use client';
import React, { useState } from 'react';

export default function BlogEmbeddableProRataSlider() {
  const [proRataDays, setProRataDays] = useState(4);

  return (
    <div className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-sm my-4">
        <div className="space-y-4">
            <label className="text-xs font-bold text-zinc-800 flex justify-between items-center">
                <span>Days per Week Worked</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1.5 rounded">{proRataDays} days</span>
            </label>
            <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={proRataDays}
                onChange={e => setProRataDays(parseFloat(e.target.value))}
                className="w-full h-1.5 accent-zinc-950 bg-zinc-150 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-zinc-500">
                Your gross salary is pro-rated based on a {proRataDays}-day week out of a full-time 5-day week.
            </p>
      </div>
    </div>
  );
}
