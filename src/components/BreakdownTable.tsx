import { useState } from 'react';
import { SalaryBreakdown } from '../types';
import { Calendar, Clock, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

interface BreakdownTableProps {
  breakdown: SalaryBreakdown;
  breakdownB?: SalaryBreakdown;
  compareMode?: boolean;
}

export default function BreakdownTable({ breakdown, breakdownB, compareMode = false }: BreakdownTableProps) {
  const [dailyBasis, setDailyBasis] = useState<'working' | 'calendar'>('working');
  const [activePeriod, setActivePeriod] = useState<'yearly' | 'monthly' | 'weekly' | 'daily'>('monthly');

  const getDivisor = (period: 'yearly' | 'monthly' | 'weekly' | 'daily') => {
    switch (period) {
      case 'yearly': return 1;
      case 'monthly': return 12;
      case 'weekly': return 52;
      case 'daily': return dailyBasis === 'working' ? 52 * 5 : 365;
    }
  };

  const format = (val: number, period: 'yearly' | 'monthly' | 'weekly' | 'daily') => {
    const divided = val / getDivisor(period);
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: period === 'yearly' ? 0 : 2,
      maximumFractionDigits: period === 'yearly' ? 0 : 2,
    }).format(divided);
  };

  const downloadSalaryCSV = () => {
    let csvContent = "";
    if (compareMode && breakdownB) {
      const header = ['Category', 'Salary A', 'Salary B', 'Difference'];
      const rows = [
        ['Gross Salary', breakdown.gross, breakdownB.gross, breakdownB.gross - breakdown.gross],
        ['Tax Due', breakdown.taxDue, breakdownB.taxDue, breakdownB.taxDue - breakdown.taxDue],
        ['NI Due', breakdown.niDue, breakdownB.niDue, breakdownB.niDue - breakdown.niDue],
        ['Student Loan', breakdown.studentLoanRepayment, breakdownB.studentLoanRepayment, breakdownB.studentLoanRepayment - breakdown.studentLoanRepayment],
        ['Pension', breakdown.pensionContribution, breakdownB.pensionContribution, breakdownB.pensionContribution - breakdown.pensionContribution],
        ['Take Home', breakdown.takeHome, breakdownB.takeHome, breakdownB.takeHome - breakdown.takeHome],
      ];
      csvContent = [header, ...rows.map(e => e.join(','))].join('\n');
    } else {
      const header = ['Category', 'Amount'];
      const rows = [
        ['Gross Salary', breakdown.gross],
        ['Tax Due', breakdown.taxDue],
        ['NI Due', breakdown.niDue],
        ['Student Loan', breakdown.studentLoanRepayment],
        ['Pension', breakdown.pensionContribution],
        ['Take Home', breakdown.takeHome],
      ];
      csvContent = [header, ...rows.map(e => e.join(','))].join('\n');
    }
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = compareMode ? 'salary_comparison.csv' : 'salary_breakdown.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const rows = [
    { label: 'Gross Salary', key: 'gross', val: breakdown.gross, valB: breakdownB?.gross ?? 0, isHeader: false, style: 'text-zinc-900 font-semibold' },
    { label: 'Pension Contribution', key: 'pension', val: breakdown.pensionContribution, valB: breakdownB?.pensionContribution ?? 0, isHeader: false, style: 'text-cyan-650 font-medium' },
    { label: 'Personal Allowance', key: 'allowance', val: breakdown.adjustedAllowance, valB: breakdownB?.adjustedAllowance ?? 0, isHeader: false, style: 'text-emerald-650 font-medium' },
    { label: 'Taxable Income', key: 'taxable', val: breakdown.taxableIncome, valB: breakdownB?.taxableIncome ?? 0, isHeader: false, style: 'text-zinc-650 font-medium' },
    { label: 'Income Tax', key: 'tax', val: breakdown.taxDue, valB: breakdownB?.taxDue ?? 0, isHeader: false, style: 'text-rose-600 font-medium' },
    { label: 'National Insurance', key: 'ni', val: breakdown.niDue, valB: breakdownB?.niDue ?? 0, isHeader: false, style: 'text-indigo-600 font-medium' },
    { label: 'Student Loan Repayment', key: 'loan', val: breakdown.studentLoanRepayment, valB: breakdownB?.studentLoanRepayment ?? 0, isHeader: false, style: 'text-amber-600 font-medium' },
    { label: 'Net Take-Home Pay', key: 'takehome', val: breakdown.takeHome, valB: breakdownB?.takeHome ?? 0, isHeader: true, style: 'text-emerald-700 bg-emerald-50/75 font-bold border-y border-emerald-100' },
  ];

  if (compareMode && breakdownB) {
    return (
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm space-y-4" id="breakdown-comparison-table">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
          <div>
            <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wider flex items-center gap-1.5">
              <span>Pay Comparison Matrix</span>
            </h3>
            <p className="text-xs text-zinc-500 mt-1">Side-by-side break-down of salary differences</p>
          </div>
          
          <button
            onClick={downloadSalaryCSV}
            className="text-xs font-bold text-white bg-emerald-600 px-4 py-2 rounded-xl hover:bg-emerald-700"
          >
            Download CSV
          </button>

          <div className="inline-flex rounded-xl bg-zinc-100 p-1 border border-zinc-200 self-start sm:self-center">
            {['yearly', 'monthly', 'weekly', 'daily'].map((period) => (
              <button
                key={period}
                onClick={() => setActivePeriod(period as any)}
                className={`cursor-pointer px-2.5 py-1.5 rounded-lg text-2xs font-bold uppercase transition-all ${
                  activePeriod === period
                    ? 'bg-white text-zinc-950 shadow-xs border border-zinc-200/50'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {activePeriod === 'daily' && (
          <div className="flex justify-end pr-1">
            <div className="inline-flex rounded-lg bg-zinc-50 p-1 border border-zinc-200">
              <button
                onClick={() => setDailyBasis('working')}
                className={`cursor-pointer px-2 py-0.5 rounded text-[9px] font-bold ${
                  dailyBasis === 'working' ? 'bg-white text-zinc-900 border border-zinc-150 shadow-2xs' : 'text-zinc-400'
                }`}
              >
                5-Day Week (260d)
              </button>
              <button
                onClick={() => setDailyBasis('calendar')}
                className={`cursor-pointer px-2 py-0.5 rounded text-[9px] font-bold ${
                  dailyBasis === 'calendar' ? 'bg-white text-zinc-900 border border-zinc-150 shadow-2xs' : 'text-zinc-400'
                }`}
              >
                365d Year
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="py-2.5 text-xs font-semibold text-zinc-400">Category</th>
                <th className="py-2.5 text-xs font-semibold text-zinc-400 text-right">Salary A</th>
                <th className="py-2.5 text-xs font-semibold text-zinc-400 text-right">Salary B</th>
                <th className="py-2.5 text-xs font-semibold text-zinc-400 text-right">Difference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {rows.map((row) => {
                const diff = row.valB - row.val;
                const isPositiveBetter = row.key === 'gross' || row.key === 'pension' || row.key === 'allowance' || row.key === 'takehome';
                const isBetter = isPositiveBetter ? diff > 0 : diff < 0;
                const isSame = Math.abs(diff) < 0.01;

                // Color of difference column
                let diffStyle = 'text-zinc-500';
                if (!isSame) {
                  if (row.key === 'taxable' || row.key === 'gross') {
                    diffStyle = diff > 0 ? 'text-zinc-700 font-semibold' : 'text-zinc-700';
                  } else {
                    diffStyle = isBetter ? 'text-emerald-600 font-bold' : 'text-rose-500 font-semibold';
                  }
                }

                return (
                  <tr
                    key={row.key}
                    className={`group transition-colors ${
                      row.isHeader ? 'bg-zinc-50/40' : 'hover:bg-zinc-50/50'
                    }`}
                  >
                    <td className={`py-3 text-xs font-semibold ${row.isHeader ? 'px-3 rounded-l-xl text-zinc-950' : 'text-zinc-600'}`}>
                      {row.label}
                    </td>
                    <td className={`py-3 text-xs text-right pr-2 font-medium ${row.style} ${row.isHeader ? 'px-1' : ''}`}>
                      {format(row.val, activePeriod)}
                    </td>
                    <td className={`py-3 text-xs text-right pr-2 font-medium ${row.style} ${row.isHeader ? 'px-1' : ''}`}>
                      {format(row.valB, activePeriod)}
                    </td>
                    <td className={`py-3 text-xs text-right ${diffStyle} ${row.isHeader ? 'px-3 rounded-r-xl' : ''}`}>
                      {isSame ? (
                        <span className="text-zinc-300">—</span>
                      ) : (
                        <span className="flex items-center justify-end gap-1">
                          {diff > 0 ? '+' : ''}
                          {format(diff, activePeriod)}
                          {row.key === 'takehome' && (
                            diff > 0 ? (
                              <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            ) : (
                              <TrendingDown className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            )
                          )}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-100 flex items-start gap-2.5">
          <span className="text-xs text-emerald-800 font-medium leading-relaxed">
            <strong>Key Insights:</strong> {((breakdownB.takeHome - breakdown.takeHome) > 0) ? (
              <span>Your net take-home pay would increase by <strong>{format(breakdownB.takeHome - breakdown.takeHome, 'yearly')}</strong> per year with <strong>Salary B</strong>. Compare pension and Student Loans to ensure maximum retention.</span>
            ) : (
              <span><strong>Salary B</strong> results in a cash shortfall of <strong>{format(breakdown.takeHome - breakdownB.takeHome, 'yearly')}</strong> per year in take-home pay. Check pension contributions or BiK.</span>
            )}
          </span>
        </div>
      </div>
    );
  }

  const rowsSingle = [
    { label: 'Gross Salary', key: 'gross', val: breakdown.gross, isHeader: false, style: 'text-zinc-900 font-semibold' },
    { label: 'Pension Contribution', key: 'pension', val: breakdown.pensionContribution, isHeader: false, style: 'text-cyan-600 font-medium' },
    { label: 'Personal Allowance', key: 'allowance', val: breakdown.adjustedAllowance, isHeader: false, style: 'text-emerald-600 font-medium' },
    { label: 'Taxable Income', key: 'taxable', val: breakdown.taxableIncome, isHeader: false, style: 'text-zinc-650 font-medium' },
    { label: 'Income Tax', key: 'tax', val: breakdown.taxDue, isHeader: false, style: 'text-rose-600 font-medium' },
    { label: 'National Insurance', key: 'ni', val: breakdown.niDue, isHeader: false, style: 'text-indigo-600 font-medium' },
    { label: 'Student Loan Repayment', key: 'loan', val: breakdown.studentLoanRepayment, isHeader: false, style: 'text-amber-600 font-medium' },
    { label: 'Net Take-Home Pay', key: 'takehome', val: breakdown.takeHome, isHeader: true, style: 'text-emerald-700 bg-emerald-50/70 font-bold border-y border-emerald-100' },
  ];

  return (
    <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm space-y-4" id="breakdown-pay-table">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Salary Breakdown</h3>
          <p className="text-xs text-zinc-500 mt-0.5">Comparative pay splits across standard timelines</p>
        </div>

        <button
          onClick={downloadSalaryCSV}
          className="text-xs font-bold text-white bg-emerald-600 px-4 py-2 rounded-xl hover:bg-emerald-700"
        >
          Download CSV
        </button>

        {/* Daily basis toggling */}
        <div className="inline-flex rounded-xl bg-zinc-100 p-1 border border-zinc-250 self-start sm:self-center">
          <button
            onClick={() => setDailyBasis('working')}
            className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              dailyBasis === 'working'
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            5-Day Week (260d)
          </button>
          <button
            onClick={() => setDailyBasis('calendar')}
            className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              dailyBasis === 'calendar'
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Calendar (365d)
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="py-2.5 text-xs font-semibold text-zinc-400">Category</th>
              <th className="py-2.5 text-xs font-semibold text-zinc-400 text-right">Yearly</th>
              <th className="py-2.5 text-xs font-semibold text-zinc-400 text-right">Monthly</th>
              <th className="py-2.5 text-xs font-semibold text-zinc-400 text-right">Weekly</th>
              <th className="py-2.5 text-xs font-semibold text-zinc-400 text-right">Daily</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {rowsSingle.map((row) => (
              <tr
                key={row.key}
                className={`group transition-colors ${
                  row.isHeader ? 'bg-zinc-50/30' : 'hover:bg-zinc-50/50'
                }`}
              >
                <td className={`py-3 text-xs font-medium ${row.isHeader ? 'px-3 rounded-l-xl text-zinc-900' : 'text-zinc-650'}`}>
                  {row.label}
                </td>
                <td className={`py-3 text-xs text-right pr-1 ${row.style} ${row.isHeader ? 'px-1' : ''}`}>
                  {format(row.val, 'yearly')}
                </td>
                <td className={`py-3 text-xs text-right pr-1 ${row.style} ${row.isHeader ? 'px-1' : ''}`}>
                  {format(row.val, 'monthly')}
                </td>
                <td className={`py-3 text-xs text-right pr-1 ${row.style} ${row.isHeader ? 'px-1' : ''}`}>
                  {format(row.val, 'weekly')}
                </td>
                <td className={`py-3 text-xs text-right ${row.style} ${row.isHeader ? 'px-3 rounded-r-xl' : ''}`}>
                  {format(row.val, 'daily')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100 flex items-start gap-2.5">
        <span className="text-xs text-zinc-500 font-medium leading-relaxed">
          <strong>Note:</strong> Estimates assume consistent weekly salaries. For pension contributions, we map the selected pension type (e.g., Salary Sacrifice savings) to maximize tax-efficiency as calculated above.
        </span>
      </div>
    </div>
  );
}
