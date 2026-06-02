import React, { useState, useMemo } from 'react';
import { Sparkles, Coins, HelpCircle, AlertCircle, CreditCard, ShieldAlert, Zap, Calendar, Trophy, Check } from 'lucide-react';

interface DebtOverpaymentProps {
  monthlySurplus: number;
  allocatedSavings: number;
  formatGBP: (v: number) => string;
}

export default function DebtOverpayment({
  monthlySurplus,
  allocatedSavings,
  formatGBP
}: DebtOverpaymentProps) {
  // Inputs & states
  const [debtType, setDebtType] = useState<'mortgage' | 'creditcard' | 'personalloan'>('mortgage');
  const [debtAmount, setDebtAmount] = useState<string>('150000');
  const [interestRate, setInterestRate] = useState<string>('4.5');
  const [remainingTerm, setRemainingTerm] = useState<number>(25);

  const [overpaySource, setOverpaySource] = useState<'allocated' | 'surplus' | 'custom'>('allocated');
  const [customOverpay, setCustomOverpay] = useState<string>('200');

  const parsedDebt = useMemo(() => {
    const parsed = parseFloat(debtAmount);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [debtAmount]);

  const parsedRate = useMemo(() => {
    const parsed = parseFloat(interestRate);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [interestRate]);

  // Lock to debt presets to help the user get started
  const applyPreset = (type: 'mortgage' | 'creditcard' | 'personalloan') => {
    setDebtType(type);
    if (type === 'mortgage') {
      setDebtAmount('150000');
      setInterestRate('4.5');
      setRemainingTerm(25);
    } else if (type === 'creditcard') {
      setDebtAmount('8000');
      setInterestRate('19.9');
      setRemainingTerm(5);
    } else if (type === 'personalloan') {
      setDebtAmount('15000');
      setInterestRate('6.8');
      setRemainingTerm(5);
    }
  };

  const overpaymentAmount = useMemo(() => {
    if (overpaySource === 'allocated') {
      return allocatedSavings;
    }
    if (overpaySource === 'surplus') {
      return monthlySurplus;
    }
    const parsed = parseFloat(customOverpay);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [overpaySource, allocatedSavings, monthlySurplus, customOverpay]);

  // Calculate Standard Monthly Minimum Amortization Payment
  const standardMonthlyPayment = useMemo(() => {
    const P = parsedDebt;
    const r = (parsedRate / 100) / 12;
    const n = remainingTerm * 12;

    if (P <= 0 || n <= 0) return 0;
    if (r === 0) return P / n;

    // Formula: M = P * [ r(1+r)^n ] / [ (1+r)^n - 1 ]
    const pmt = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(pmt) || !isFinite(pmt) ? 0 : pmt;
  }, [parsedDebt, parsedRate, remainingTerm]);

  // Run Amortization Simulation For Both Scenarios
  const simulation = useMemo(() => {
    const P_initial = parsedDebt;
    const r_monthly = (parsedRate / 100) / 12;
    const standardPmt = standardMonthlyPayment;
    const overpmt = overpaymentAmount;

    if (P_initial <= 0 || standardPmt <= 0) {
      return {
        standardTotalInterest: 0,
        standardMonths: 0,
        overpayTotalInterest: 0,
        overpayMonths: 0,
        interestSaved: 0,
        timeSavedMonths: 0,
        timelines: []
      };
    }

    // 1. Standard Timeline Simulation
    let balanceA = P_initial;
    let totalInterestA = 0;
    let monthsA = 0;
    const maxSafetyMonths = 600; // 50 years max safety anchor

    while (balanceA > 0.01 && monthsA < maxSafetyMonths) {
      const interest = balanceA * r_monthly;
      const principalPaid = Math.min(balanceA, standardPmt - interest);
      
      totalInterestA += interest;
      balanceA -= principalPaid;
      monthsA++;

      if (principalPaid <= 0 && balanceA > 0) {
        // Standard payment doesn't cover interest!
        totalInterestA = Infinity;
        monthsA = Infinity;
        break;
      }
    }

    // 2. Overpayment Timeline Simulation
    let balanceB = P_initial;
    let totalInterestB = 0;
    let monthsB = 0;
    const totalPmtB = standardPmt + overpmt;
    const yearlyBalances: { year: number; balanceA: number; balanceB: number }[] = [];

    while (balanceB > 0.01 && monthsB < maxSafetyMonths) {
      const interest = balanceB * r_monthly;
      const paymentAmount = Math.min(balanceB + interest, totalPmtB);
      const principalPaid = paymentAmount - interest;

      totalInterestB += interest;
      balanceB -= principalPaid;
      monthsB++;

      // Record chart milestone every 12 months (each year)
      if (monthsB % 12 === 0 || balanceB <= 0) {
        const yr = Math.ceil(monthsB / 12);
        // Estimate standard balance at same year index
        let estBalanceA = P_initial;
        let tempMonths = 0;
        while (estBalanceA > 0.01 && tempMonths < monthsB) {
          const tempInt = estBalanceA * r_monthly;
          const tempPrincipal = Math.min(estBalanceA, standardPmt - tempInt);
          estBalanceA -= tempPrincipal;
          tempMonths++;
        }

        yearlyBalances.push({
          year: yr,
          balanceA: Math.max(0, estBalanceA),
          balanceB: Math.max(0, balanceB)
        });
      }

      if (balanceB <= 0) break;
    }

    const interestSaved = Math.max(0, totalInterestA - totalInterestB);
    const timeSavedMonths = Math.max(0, monthsA - monthsB);

    return {
      standardTotalInterest: totalInterestA,
      standardMonths: monthsA,
      overpayTotalInterest: totalInterestB,
      overpayMonths: monthsB,
      interestSaved,
      timeSavedMonths,
      timelines: yearlyBalances
    };
  }, [parsedDebt, parsedRate, standardMonthlyPayment, overpaymentAmount]);

  const yearsSaved = Math.floor(simulation.timeSavedMonths / 12);
  const remainingMonthsSaved = simulation.timeSavedMonths % 12;

  return (
    <div className="space-y-8" id="debt-overpay-container">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
        <div>
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-2.5 py-1 rounded-full">
            Accelerated Debt Paydown
          </span>
          <h2 className="text-xl font-black text-zinc-950 mt-1.5 flex items-center gap-2">
            Debt Overpayment Simulator
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Simulate adding your budget surplus to your mortgage or credit card payoffs to save interest.</p>
        </div>

        {/* Preset Selector */}
        <div className="inline-flex rounded-xl bg-zinc-100 p-1 border border-zinc-200 self-start md:self-center">
          <button
            onClick={() => applyPreset('mortgage')}
            className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              debtType === 'mortgage' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Mortgage
          </button>
          <button
            onClick={() => applyPreset('creditcard')}
            className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              debtType === 'creditcard' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Credit Card
          </button>
          <button
            onClick={() => applyPreset('personalloan')}
            className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              debtType === 'personalloan' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Personal Loan
          </button>
        </div>
      </div>

      {simulation.standardTotalInterest === Infinity && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 text-red-500" />
          <div className="text-xs">
            <span className="font-bold">Debt Default Warning!</span>
            <p className="mt-1 leading-relaxed">
              Your standard minimum monthly payment is too low to cover the monthly accruing interest. The outstanding balance will grow indefinitely. Please decrease the term, lower interest rates, or add overpayments to bring standard repayment back on track.
            </p>
          </div>
        </div>
      )}

      {/* Inputs and Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* INPUT PANEL */}
        <div className="lg:col-span-5 bg-white border border-zinc-250 p-5 rounded-2xl shadow-sm space-y-5">
          <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-rose-500 animate-pulse" />
            Specify Outstanding Debt
          </h3>

          {/* Debt Amount */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 block">Current Outstanding Balance</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold font-mono">£</span>
              <input
                type="number"
                min="0"
                value={debtAmount}
                onChange={e => setDebtAmount(e.target.value)}
                className="w-full text-xs pl-8 pr-4.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-zinc-400 focus:bg-white focus:outline-none font-bold animate-pulse-once"
              />
            </div>
          </div>

          {/* Interest Rate */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 block">Annual Interest Rate (%)</label>
              <div className="relative">
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold">%</span>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  value={interestRate}
                  onChange={e => setInterestRate(e.target.value)}
                  className="w-full text-xs pl-3.5 pr-8 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-zinc-400 focus:bg-white focus:outline-none font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 block">Remaining Term (Years)</label>
              <input
                type="number"
                min="1"
                max="40"
                value={remainingTerm}
                onChange={e => setRemainingTerm(parseInt(e.target.value, 10))}
                className="w-full text-xs px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-zinc-400 focus:bg-white focus:outline-none font-bold"
              />
            </div>
          </div>

          {/* Overpayment Link Option */}
          <div className="p-3.5 border border-rose-100 rounded-xl bg-rose-50/15 space-y-3.5">
            <div>
              <label className="text-xs font-bold text-zinc-855 flex items-center gap-1.5 mb-2">
                <Zap className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                Additional Overpayment Source
              </label>

              <div className="grid grid-cols-1 gap-2">
                {/* 1. Allocated budget */}
                <button
                  type="button"
                  onClick={() => setOverpaySource('allocated')}
                  className={`text-left text-xs p-2.5 rounded-lg border transition-all flex justify-between items-center cursor-pointer ${
                    overpaySource === 'allocated'
                      ? 'border-rose-600 bg-rose-50/20'
                      : 'border-zinc-200 bg-white hover:border-zinc-350'
                  }`}
                >
                  <div>
                    <span className="font-bold text-zinc-900 block">Allocated Target</span>
                    <span className="text-[10px] text-zinc-550 block">From Budget Planner slider</span>
                  </div>
                  <span className="text-sm font-black text-rose-700">
                    {formatGBP(allocatedSavings)}/mo
                  </span>
                </button>

                {/* 2. Full Surplus */}
                <button
                  type="button"
                  onClick={() => setOverpaySource('surplus')}
                  className={`text-left text-xs p-2.5 rounded-lg border transition-all flex justify-between items-center cursor-pointer ${
                    overpaySource === 'surplus'
                      ? 'border-rose-600 bg-rose-50/20'
                      : 'border-zinc-200 bg-white hover:border-zinc-350'
                  }`}
                >
                  <div>
                    <span className="font-bold text-zinc-900 block">Total Leftover Surplus</span>
                    <span className="text-[10px] text-zinc-550 block">Full monthly remainder</span>
                  </div>
                  <span className="text-sm font-black text-rose-700">
                    {formatGBP(monthlySurplus)}/mo
                  </span>
                </button>

                {/* 3. Custom */}
                <button
                  type="button"
                  onClick={() => setOverpaySource('custom')}
                  className={`text-left text-xs p-2.5 rounded-lg border transition-all flex justify-between items-center cursor-pointer ${
                    overpaySource === 'custom'
                      ? 'border-rose-600 bg-rose-50/20'
                      : 'border-zinc-200 bg-white hover:border-zinc-350'
                  }`}
                >
                  <div>
                    <span className="font-bold text-zinc-900 block">Custom Amount</span>
                    <span className="text-[10px] text-zinc-550 block">Specify any different sum</span>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold text-zinc-400 font-mono">
                    Editable Below
                  </span>
                </button>
              </div>
            </div>

            {overpaySource === 'custom' ? (
              <div className="relative pt-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold font-mono">£</span>
                <input
                  type="number"
                  min="0"
                  value={customOverpay}
                  onChange={e => setCustomOverpay(e.target.value)}
                  className="w-full text-xs pl-8 pr-4 py-2 bg-white border border-zinc-200 rounded-xl focus:border-rose-405 focus:outline-none font-bold h-9"
                  placeholder="e.g. 150"
                />
              </div>
            ) : (
              <p className="text-[10px] text-zinc-500 italic px-0.5 leading-relaxed">
                Linked actively to your dynamic budget planner. Updates automatically when you tweak variables.
              </p>
            )}
          </div>

          {/* Standard monthly amortization indicator */}
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-150 flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">Standard Payment</span>
            <div className="text-xs font-black text-zinc-900">
              {formatGBP(standardMonthlyPayment)} / month
            </div>
          </div>
        </div>

        {/* RESULTS PANEL */}
        <div className="lg:col-span-7 space-y-6">
          {/* Core Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="debt-highlights-grid">
            <div className="bg-white border border-zinc-250 p-4.5 rounded-2xl shadow-sm space-y-0.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Time Saved</span>
              <div className="text-xl font-black text-rose-500 transition-all flex items-center gap-1.5 leading-tight">
                <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
                <span>
                  {yearsSaved > 0 ? `${yearsSaved}y ` : ''}
                  {remainingMonthsSaved > 0 ? `${remainingMonthsSaved}m` : yearsSaved === 0 ? '0m' : ''}
                </span>
              </div>
              <span className="text-[9px] text-zinc-400 block font-medium">Debt-free faster!</span>
            </div>

            <div className="bg-white border border-zinc-250 p-4.5 rounded-2xl shadow-sm space-y-0.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Interest Saved</span>
              <div className="text-xl font-black text-emerald-600">
                {formatGBP(simulation.interestSaved)}
              </div>
              <span className="text-[9px] text-zinc-500 block font-semibold leading-tight mt-1">
                Kept in your pocket!
              </span>
            </div>

            <div className="bg-white border border-zinc-250 p-4.5 rounded-2xl shadow-sm space-y-0.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Accelerated Interest</span>
              <div className="text-xl font-black text-zinc-850">
                {simulation.overpayTotalInterest !== Infinity ? formatGBP(simulation.overpayTotalInterest) : 'Loading...'}
              </div>
              <span className="text-[9px] text-zinc-455 block font-semibold">
                Vs standard {simulation.standardTotalInterest !== Infinity ? formatGBP(simulation.standardTotalInterest) : 'Loading...'}
              </span>
            </div>
          </div>

          {/* Quick simulation bar representation */}
          {simulation.timelines.length > 0 && (
            <div className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-sm space-y-4">
              <h4 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">Paydown Horizon Map</h4>
              
              <div className="space-y-3.5">
                {/* Standard Scenario Line */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-zinc-500 font-bold">
                    <span>Standard Payments Only ({remainingTerm} Years)</span>
                    <span>Total Cost: {formatGBP(parsedDebt + simulation.standardTotalInterest)}</span>
                  </div>
                  <div className="h-3 w-full bg-zinc-100 border border-zinc-200 rounded-lg overflow-hidden">
                    <div className="h-full bg-zinc-800 rounded-lg" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Overpayment Scenario Line */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-zinc-500 font-bold">
                    <span>With {formatGBP(overpaymentAmount)}/mo Overpayment ({(simulation.overpayMonths / 12).toFixed(1)} Years)</span>
                    <span className="text-emerald-600">Total Cost: {formatGBP(parsedDebt + simulation.overpayTotalInterest)}</span>
                  </div>
                  <div className="h-3 w-full bg-zinc-100 border border-zinc-200 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-lg transition-all duration-300"
                      style={{ width: `${(simulation.overpayMonths / (simulation.standardMonths || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Historical Amortization Table snippet */}
          <div className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-sm space-y-4">
            <h4 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-500" />
              Paydown Balance Comparison
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-600 border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 text-zinc-400">
                    <th className="py-2.5 font-bold uppercase text-[9px]">Year</th>
                    <th className="py-2.5 font-bold uppercase text-[9px] text-right">Standard Balance</th>
                    <th className="py-2.5 font-bold uppercase text-[9px] text-right">Overpaid Balance</th>
                    <th className="py-2.5 font-bold uppercase text-[9px] text-right text-emerald-600">Equity Gained</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50 font-medium">
                  {simulation.timelines.filter((_, idx) => idx % 4 === 0 || idx === simulation.timelines.length - 1).map(tl => {
                    const equity = Math.max(0, tl.balanceA - tl.balanceB);
                    return (
                      <tr key={tl.year} className="hover:bg-zinc-50/50">
                        <td className="py-2.5 text-zinc-900 font-bold">Year {tl.year}</td>
                        <td className="py-2.5 text-right">{formatGBP(tl.balanceA)}</td>
                        <td className="py-2.5 text-right font-bold text-zinc-900">
                          {tl.balanceB <= 0 ? (
                            <span className="text-emerald-600 font-black">PAID OFF 🎉</span>
                          ) : (
                            formatGBP(tl.balanceB)
                          )}
                        </td>
                        <td className="py-2.5 text-right font-bold text-emerald-600">
                          +{formatGBP(equity)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
