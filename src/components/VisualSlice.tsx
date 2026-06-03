import { SalaryBreakdown } from '../types';

interface VisualSliceProps {
  breakdown: SalaryBreakdown;
  breakdownB?: SalaryBreakdown;
  compareMode?: boolean;
}

export default function VisualSlice({ breakdown, breakdownB, compareMode = false }: VisualSliceProps) {
  const { gross, taxDue, niDue, pensionContribution, studentLoanRepayment, takeHome } = breakdown;

  // Let's format nicely
  const formatVal = (v: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(v);

  const getItemsForBreakdown = (bd: SalaryBreakdown) => {
    const g = bd.gross || 1;
    return [
      { name: 'Take-Home Pay', val: bd.takeHome, pct: (bd.takeHome / g) * 100, color: 'bg-emerald-500', textColor: 'text-emerald-700', bgClass: 'bg-emerald-50' },
      { name: 'Income Tax', val: bd.taxDue, pct: (bd.taxDue / g) * 100, color: 'bg-rose-500', textColor: 'text-rose-600', bgClass: 'bg-rose-50' },
      { name: 'National Insurance', val: bd.niDue, pct: (bd.niDue / g) * 100, color: 'bg-indigo-500', textColor: 'text-indigo-600', bgClass: 'bg-indigo-50' },
      { name: 'Pension Contribution', val: bd.pensionContribution, pct: (bd.pensionContribution / g) * 100, color: 'bg-cyan-500', textColor: 'text-cyan-600', bgClass: 'bg-cyan-50' },
      { name: 'Student Loan', val: bd.studentLoanRepayment, pct: (bd.studentLoanRepayment / g) * 100, color: 'bg-amber-500', textColor: 'text-amber-600', bgClass: 'bg-amber-50' },
    ].filter(i => i.val > 0);
  };

  if (gross <= 0) {
    return (
      <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-6 text-center text-zinc-500 text-sm">
        Enter a salary amount to see your visual pay distribution.
      </div>
    );
  }

  const itemsA = getItemsForBreakdown(breakdown);

  if (compareMode && breakdownB && breakdownB.gross > 0) {
    const itemsB = getItemsForBreakdown(breakdownB);
    return (
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm space-y-5" id="visual-pay-distribution-comparison">
        <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wider">Salary Structure Comparison</h3>

        {/* Job A stacked bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-700">
            <span>Salary A ({formatVal(breakdown.gross)})</span>
            <span className="text-emerald-600 font-extrabold text-[11px]">Net: {((breakdown.takeHome / breakdown.gross) * 100).toFixed(1)}%</span>
          </div>
          <div className="h-5 w-full rounded-lg flex overflow-hidden bg-zinc-100 shadow-inner border border-zinc-200">
            {itemsA.map((item, idx) => (
              <div
                key={idx}
                className={`${item.color} h-full transition-all duration-300 ease-out`}
                style={{ width: `${item.pct}%` }}
                title={`${item.name}: ${formatVal(item.val)} (${item.pct.toFixed(1)}%)`}
              />
            ))}
          </div>
        </div>

        {/* Job B stacked bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-700">
            <span>Salary B ({formatVal(breakdownB.gross)})</span>
            <span className="text-emerald-600 font-extrabold text-[11px]">Net: {((breakdownB.takeHome / breakdownB.gross) * 100).toFixed(1)}%</span>
          </div>
          <div className="h-5 w-full rounded-lg flex overflow-hidden bg-zinc-100 shadow-inner border border-zinc-200">
            {itemsB.map((item, idx) => (
              <div
                key={idx}
                className={`${item.color} h-full transition-all duration-300 ease-out`}
                style={{ width: `${item.pct}%` }}
                title={`${item.name}: ${formatVal(item.val)} (${item.pct.toFixed(1)}%)`}
              />
            ))}
          </div>
        </div>

        {/* Aggregated legend details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-1 border-t border-zinc-100 pt-3">
          {itemsA.map((item, idx) => {
            const correspondingItemB = itemsB.find(i => i.name === item.name);
            const valB = correspondingItemB?.val ?? 0;
            const diff = valB - item.val;

            return (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-150 bg-zinc-50/50"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                  <span className="text-2xs font-extrabold text-zinc-700 uppercase tracking-wide">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-zinc-950">
                    {formatVal(item.val)} <span className="text-zinc-400 font-normal">→</span> {formatVal(valB)}
                  </div>
                  <div className={`text-[10px] font-bold ${diff > 0 ? 'text-emerald-600' : diff < 0 ? 'text-rose-500' : 'text-zinc-400'}`}>
                    {diff === 0 ? 'No change' : `${diff > 0 ? 'Increases by' : 'Decreases by'} ${formatVal(Math.abs(diff))}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const taxPct = (taxDue / gross) * 100;
  const niPct = (niDue / gross) * 100;
  const pensionPct = (pensionContribution / gross) * 100;
  const studentLoanPct = (studentLoanRepayment / gross) * 100;
  const takeHomePct = (takeHome / gross) * 100;

  const items = [
    { name: 'Take-Home Pay', val: takeHome, pct: takeHomePct, color: 'bg-emerald-500 text-emerald-850', textColor: 'text-emerald-705', bgClass: 'bg-emerald-50' },
    { name: 'Income Tax', val: taxDue, pct: taxPct, color: 'bg-rose-500 text-rose-850', textColor: 'text-rose-705', bgClass: 'bg-rose-50' },
    { name: 'National Insurance', val: niDue, pct: niPct, color: 'bg-indigo-505 bg-indigo-500', bgClass: 'bg-indigo-50 text-indigo-705 text-indigo-700' },
    { name: 'Pension Contribution', val: pensionContribution, pct: pensionPct, color: 'bg-cyan-500 text-cyan-850', textColor: 'text-cyan-705', bgClass: 'bg-cyan-50' },
    { name: 'Student Loan', val: studentLoanRepayment, pct: studentLoanPct, color: 'bg-amber-500 text-amber-850', textColor: 'text-amber-705', bgClass: 'bg-amber-50' },
  ].filter(i => i.val > 0);

  return (
    <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm space-y-5" id="visual-pay-distribution">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Salary Distribution</h3>
        <span className="text-xs font-semibold text-zinc-500">
          Effective Deductions: {((1 - takeHome / gross) * 100).toFixed(1)}%
        </span>
      </div>

      {/* Stacked Proportional Bar */}
      <div className="h-6 w-full rounded-xl flex overflow-hidden bg-zinc-100 shadow-inner border border-zinc-200">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`${item.color.split(' ')[0]} h-full transition-all duration-300 ease-out`}
            style={{ width: `${item.pct}%` }}
            title={`${item.name}: ${formatVal(item.val)} (${item.pct.toFixed(1)}%)`}
          />
        ))}
      </div>

      {/* Legend & Details cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-2.5 rounded-xl border border-zinc-100 transition-colors ${item.bgClass}`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${item.color.split(' ')[0]}`}></span>
              <span className="text-xs font-semibold text-zinc-800">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-zinc-950">{formatVal(item.val)}</div>
              <div className="text-[10px] font-semibold text-zinc-500">{item.pct.toFixed(1)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
