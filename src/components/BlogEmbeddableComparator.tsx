import React, { useMemo, useState } from 'react';
import { calculateSalaryDetails } from '../calculator';
import BreakdownTable from './BreakdownTable';
import { Settings } from 'lucide-react';

interface BlogEmbeddableComparatorProps {
  grossSalaryA: number;
  grossSalaryB: number;
  region?: 'UK' | 'Scotland';
}

export default function BlogEmbeddableComparator({
  grossSalaryA,
  grossSalaryB,
  region = 'UK',
}: BlogEmbeddableComparatorProps) {
  const [activeScenario, setActiveScenario] = useState<'A' | 'B'>('A');

  const breakdownA = useMemo(() => {
    return calculateSalaryDetails({
      grossSalary: grossSalaryA,
      isHourly: false,
      hourlyRate: 0,
      hoursPerWeek: 37.5,
      weeksPerYear: 52,
      region,
      pensionRate: 5,
      pensionType: 'salarySacrifice',
      pensionOn: 'total',
      studentLoanPlans: [],
      taxCode: '1257L',
      customTaxCode: false,
      blindAllowance: false,
      marriageAllowanceMode: 'none',
      bonus: 0,
      overtime: 0,
      childcareVouchers: 0,
      otherNonTaxedIncome: 0,
    });
  }, [grossSalaryA, region]);

  const breakdownB = useMemo(() => {
    return calculateSalaryDetails({
      grossSalary: grossSalaryB,
      isHourly: false,
      hourlyRate: 0,
      hoursPerWeek: 37.5,
      weeksPerYear: 52,
      region,
      pensionRate: 5,
      pensionType: 'salarySacrifice',
      pensionOn: 'total',
      studentLoanPlans: [],
      taxCode: '1257L',
      customTaxCode: false,
      blindAllowance: false,
      marriageAllowanceMode: 'none',
      bonus: 0,
      overtime: 0,
      childcareVouchers: 0,
      otherNonTaxedIncome: 0,
    });
  }, [grossSalaryB, region]);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-sm">
        <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-widest flex items-center gap-2 mb-4">
          <Settings className="w-4 h-4 text-zinc-400" />
          Compare Salary Offers
        </h3>
        <div className="grid grid-cols-2 gap-2">
            <button
                onClick={() => setActiveScenario('A')}
                className={`cursor-pointer py-2 rounded-xl text-xs font-black transition-all ${
                activeScenario === 'A'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600'
                }`}
            >
                Salary A (£{grossSalaryA.toLocaleString()})
            </button>
            <button
                onClick={() => setActiveScenario('B')}
                className={`cursor-pointer py-2 rounded-xl text-xs font-black transition-all ${
                activeScenario === 'B'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600'
                }`}
            >
                Salary B (£{grossSalaryB.toLocaleString()})
            </button>
        </div>
      </div>
      
      <div className="mt-6">
          <BreakdownTable 
            breakdown={breakdownA} 
            breakdownB={breakdownB} 
            compareMode={true} 
        />
      </div>
    </div>
  );
}
