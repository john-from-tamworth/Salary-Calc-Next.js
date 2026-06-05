'use client'

import React, { useState, useMemo } from 'react';
import { calculateSalaryDetails } from '../calculator';
import { SalaryInputs } from '../types';
import { formatGBP } from '../lib/utils';
import { PiggyBank, Briefcase } from 'lucide-react';

export default function BlogEmbeddableSalarySacrifice() {
  const [grossSalary, setGrossSalary] = useState(50000);
  const [pensionRate, setPensionRate] = useState(5);

  const baseInputs: Omit<SalaryInputs, 'grossSalary'> = {
    isHourly: false,
    hourlyRate: 0,
    hoursPerWeek: 0,
    weeksPerYear: 0,
    region: 'UK',
    pensionRate: pensionRate,
    pensionType: 'salarySacrifice',
    pensionOn: 'total',
    studentLoanPlans: [],
    taxCode: '1257L',
    customTaxCode: false,
    blindAllowance: false,
    marriageAllowanceMode: 'none',
  };

  const netPayBreakdown = useMemo(() => calculateSalaryDetails({
    ...baseInputs,
    grossSalary,
    pensionType: 'netPay',
  }), [grossSalary, pensionRate]);

  const salarySacrificeBreakdown = useMemo(() => calculateSalaryDetails({
    ...baseInputs,
    grossSalary,
    pensionType: 'salarySacrifice',
  }), [grossSalary, pensionRate]);

  return (
    <div className="bg-white border border-zinc-200 p-6 rounded-2xl shadow-sm space-y-6">
      <h3 className="text-lg font-extrabold text-zinc-900 flex items-center gap-2">
        <PiggyBank className="w-5 h-5 text-emerald-600" />
        Interactive Salary Sacrifice Simulator
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
            <div>
              <label className="text-xs font-extrabold text-zinc-800">Annual Gross Salary (£)</label>
              <input type="number" value={grossSalary} onChange={e => setGrossSalary(Number(e.target.value))} className="w-full mt-1 p-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-bold" />
            </div>
            <div>
              <label className="text-xs font-extrabold text-zinc-800">Pension Contribution (%)</label>
              <input type="range" min="1" max="25" value={pensionRate} onChange={e => setPensionRate(Number(e.target.value))} className="w-full mt-1 accent-zinc-900" />
              <div className="text-right text-xs font-bold text-zinc-600">{pensionRate}%</div>
            </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-extrabold text-zinc-500 uppercase tracking-widest">Net Pay Comparison</div>
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-zinc-100 p-2 rounded-lg">
                <div className="font-bold">Net Pay</div>
                <div className="text-lg font-black text-zinc-900">{formatGBP(netPayBreakdown.takeHome)}</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-lg">
                <div className="font-bold text-emerald-900">Salary Sacrifice</div>
                <div className="text-lg font-black text-emerald-600">{formatGBP(salarySacrificeBreakdown.takeHome)}</div>
            </div>
          </div>
          <div className="text-xs text-zinc-600 italic">Example based on typical UK tax rules.</div>
        </div>
      </div>
    </div>
  );
}
