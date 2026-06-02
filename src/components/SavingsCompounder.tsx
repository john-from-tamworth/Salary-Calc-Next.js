import React, { useState, useMemo } from 'react';
import { TrendingUp, Sparkles, Coins, HelpCircle, Landmark, Check, AlertCircle, Target, Plus, Trash2, PiggyBank } from 'lucide-react';

interface SavingsCompounderProps {
  monthlySurplus: number;
  allocatedSavings: number;
  formatGBP: (v: number) => string;
}

interface SavingsAccount {
  id: string;
  name: string;
  initialCapital: string;
  depositSource: 'allocated' | 'surplus' | 'custom';
  customMonthly: string;
  returnRate: string;
  compoundingPeriods: '12' | '4' | '1';
  years: number;
}

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  linkedAccountId: string;
}

export default function SavingsCompounder({
  monthlySurplus,
  allocatedSavings,
  formatGBP
}: SavingsCompounderProps) {
  // Multiple Accounts state
  const [accounts, setAccounts] = useState<SavingsAccount[]>([
    {
      id: 'acc-1',
      name: 'Investment Account',
      initialCapital: '5000',
      depositSource: 'allocated',
      customMonthly: '250',
      returnRate: '6.5',
      compoundingPeriods: '12',
      years: 15,
    },
    {
      id: 'acc-2',
      name: 'High Interest Savings',
      initialCapital: '1000',
      depositSource: 'custom',
      customMonthly: '150',
      returnRate: '5.0',
      compoundingPeriods: '12',
      years: 5,
    }
  ]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('acc-1');

  // Savings Goals state
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: 'goal-1',
      name: 'New Car Fund',
      targetAmount: 10000,
      linkedAccountId: 'acc-1'
    },
    {
      id: 'goal-2',
      name: 'Emergency Buffer',
      targetAmount: 5000,
      linkedAccountId: 'acc-2'
    }
  ]);

  // Modal / inline input states for additions
  const [newGoalName, setNewGoalName] = useState<string>('');
  const [newGoalTarget, setNewGoalTarget] = useState<string>('');
  const [newGoalAccountId, setNewGoalAccountId] = useState<string>('acc-1');

  const [newAccountName, setNewAccountName] = useState<string>('');
  const [isAddingAccount, setIsAddingAccount] = useState<boolean>(false);

  const [showTolerance, setShowTolerance] = useState<boolean>(false);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Active Account Derivations
  const activeAccount = useMemo(() => {
    return accounts.find(a => a.id === selectedAccountId) || accounts[0];
  }, [accounts, selectedAccountId]);

  const activeGoal = useMemo(() => {
    return goals.find(g => g.linkedAccountId === selectedAccountId);
  }, [goals, selectedAccountId]);

  // Helpers to preserve dynamic calculations without breaking slider form fields
  const initialCapital = activeAccount.initialCapital;
  const depositSource = activeAccount.depositSource;
  const customMonthly = activeAccount.customMonthly;
  const returnRate = activeAccount.returnRate;
  const compoundingPeriods = activeAccount.compoundingPeriods;
  const years = activeAccount.years;

  const updateActiveAccount = (updated: Partial<SavingsAccount>) => {
    setAccounts(prev => prev.map(a => a.id === selectedAccountId ? { ...a, ...updated } : a));
  };

  // Local state shims mapping slider modifiers safely to activeAccount item in state
  const setInitialCapital = (val: string) => updateActiveAccount({ initialCapital: val });
  const setDepositSource = (val: 'allocated' | 'surplus' | 'custom') => updateActiveAccount({ depositSource: val });
  const setCustomMonthly = (val: string) => updateActiveAccount({ customMonthly: val });
  const setReturnRate = (val: string) => updateActiveAccount({ returnRate: val });
  const setCompoundingPeriods = (val: '12' | '4' | '1') => updateActiveAccount({ compoundingPeriods: val });
  const setYears = (val: number) => updateActiveAccount({ years: val });

  // Advice calculator of duration required to reach goal
  const calculateTimeToReachGoal = (account: SavingsAccount, target: number) => {
    const pv = parseFloat(account.initialCapital) || 0;
    if (pv >= target) return { years: 0, months: 0, impossible: false, reached: true };

    const r = (parseFloat(account.returnRate) || 0) / 100;
    const k = parseInt(account.compoundingPeriods, 10) || 12;
    const ratePerPeriod = r / k;
    
    let deposit = 0;
    if (account.depositSource === 'allocated') {
      deposit = allocatedSavings;
    } else if (account.depositSource === 'surplus') {
      deposit = monthlySurplus;
    } else {
      deposit = parseFloat(account.customMonthly) || 0;
    }

    if (deposit <= 0 && ratePerPeriod <= 0) {
      return { years: 0, months: 0, impossible: true, reached: false };
    }

    let val = pv;
    const monthsInYear = 12;
    const depositPerPeriod = deposit * (monthsInYear / k);
    let periods = 0;
    const maxPeriods = k * 1000; // safety ceiling

    while (val < target && periods < maxPeriods) {
      val += val * ratePerPeriod + depositPerPeriod;
      periods++;
    }

    if (periods >= maxPeriods) {
      return { years: 0, months: 0, impossible: true, reached: false };
    }

    const totalMonths = Math.ceil(periods * (monthsInYear / k));
    const yrs = Math.floor(totalMonths / 12);
    const mths = totalMonths % 12;

    return { years: yrs, months: mths, impossible: false, reached: false };
  };

  const parsedInitial = useMemo(() => {
    const parsed = parseFloat(initialCapital);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [initialCapital]);

  const monthlyDeposit = useMemo(() => {
    if (depositSource === 'allocated') {
      return allocatedSavings;
    }
    if (depositSource === 'surplus') {
      return monthlySurplus;
    }
    const parsed = parseFloat(customMonthly);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [depositSource, allocatedSavings, monthlySurplus, customMonthly]);

  const parsedRate = useMemo(() => {
    const parsed = parseFloat(returnRate);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [returnRate]);

  // Core Compounding Maths
  const projections = useMemo(() => {
    const pv = parsedInitial;
    const r = parsedRate / 100;
    const k = parseInt(compoundingPeriods, 10); // compounding times per year
    const ratePerPeriod = r / k;
    const monthsInYear = 12;
    const depositPerCompoundingPeriod = monthlyDeposit * (monthsInYear / k);

    let totalVal = pv;
    let totalDeposits = pv;
    const yearlyMilestones: { year: number; balance: number; deposits: number; interest: number }[] = [];

    // Calculate period-by-period to capture interest accruals accurately
    const totalPeriods = k * years;
    for (let p = 1; p <= totalPeriods; p++) {
      // Interest on current balance
      const interestEarned = totalVal * ratePerPeriod;
      totalVal += interestEarned + depositPerCompoundingPeriod;
      totalDeposits += depositPerCompoundingPeriod;

      // Keep yearly records
      if (p % k === 0) {
        const yr = p / k;
        yearlyMilestones.push({
          year: yr,
          balance: totalVal,
          deposits: totalDeposits,
          interest: Math.max(0, totalVal - totalDeposits)
        });
      }
    }

    const totalInterest = Math.max(0, totalVal - totalDeposits);

    return {
      endBalance: totalVal,
      totalDeposits,
      totalInterest,
      yearlyMilestones
    };
  }, [parsedInitial, monthlyDeposit, parsedRate, compoundingPeriods, years]);

  // Projection generator helper for chart lines (including Year 0 starting point)
  const getProjectionsForRate = (rateValue: number) => {
    const pv = parsedInitial;
    const r = rateValue / 100;
    const k = parseInt(compoundingPeriods, 10);
    const ratePerPeriod = r / k;
    const monthsInYear = 12;
    const depositPerPeriod = monthlyDeposit * (monthsInYear / k);

    let val = pv;
    let dep = pv;
    const milestones = [{ year: 0, balance: pv, deposits: pv, interest: 0 }];

    const totalPeriods = k * years;
    for (let p = 1; p <= totalPeriods; p++) {
      val += val * ratePerPeriod + depositPerPeriod;
      dep += depositPerPeriod;

      if (p % k === 0) {
        const yr = p / k;
        milestones.push({
          year: yr,
          balance: val,
          deposits: dep,
          interest: Math.max(0, val - dep)
        });
      }
    }
    return milestones;
  };

  const standardSeries = useMemo(() => {
    return getProjectionsForRate(parsedRate);
  }, [parsedInitial, monthlyDeposit, parsedRate, compoundingPeriods, years]);

  const lowSeries = useMemo(() => {
    return getProjectionsForRate(Math.max(0, parsedRate - 1));
  }, [parsedInitial, monthlyDeposit, parsedRate, compoundingPeriods, years]);

  const highSeries = useMemo(() => {
    return getProjectionsForRate(parsedRate + 1);
  }, [parsedInitial, monthlyDeposit, parsedRate, compoundingPeriods, years]);

  // Max value calculation for Y-axis scaling (auto scales to fit dynamic target goal thresholds)
  const maxBalance = useMemo(() => {
    const highestPoint = showTolerance 
      ? highSeries[highSeries.length - 1].balance 
      : standardSeries[standardSeries.length - 1].balance;
    let chartMax = highestPoint > 0 ? highestPoint : 1000;
    if (activeGoal && activeGoal.targetAmount > 0) {
      chartMax = Math.max(chartMax, activeGoal.targetAmount * 1.15);
    }
    return chartMax;
  }, [standardSeries, highSeries, showTolerance, activeGoal]);

  // Comparative benchmarks
  const benchmarks = [
    { name: 'Traditional Cash ISA', rate: 4.2, desc: 'Secure cash savings rate' },
    { name: 'Global Index Fund (S&P 500)', rate: 8.5, desc: 'Average stock market returns' },
    { name: 'High Interest Savings Account', rate: 5.0, desc: 'Standard liquid deposit wrapper' }
  ];

  const calculateTerminalBalanceForBenchmark = (rate: number) => {
    const pv = parsedInitial;
    const r = rate / 100;
    const k = parseInt(compoundingPeriods, 10);
    const ratePerPeriod = r / k;
    const monthsInYear = 12;
    const depositPerPeriod = monthlyDeposit * (monthsInYear / k);

    let val = pv;
    const totalPeriods = k * years;
    for (let p = 1; p <= totalPeriods; p++) {
      val += val * ratePerPeriod + depositPerPeriod;
    }
    return val;
  };

  const principalRatio = useMemo(() => {
    const total = projections.endBalance || 1;
    return (projections.totalDeposits / total) * 100;
  }, [projections]);

  const interestRatio = 100 - principalRatio;

  return (
    <div className="space-y-8" id="savings-compounder-container">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
        <div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full">
            Compound Interest Simulator
          </span>
          <h2 className="text-xl font-black text-zinc-950 mt-1.5 flex items-center gap-2">
            Savings & Investments Compounder
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Visualize how today’s deposits snowball over decades of compounding investment yields.</p>
        </div>
      </div>

      {/* Dynamic Link Notification */}
      {depositSource === 'surplus' && monthlySurplus <= 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-500" />
          <div className="text-xs space-y-1">
            <span className="font-bold">No active dynamic surplus detected!</span>
            <p className="leading-relaxed">
              You currently have a budget surplus of <strong>£0</strong>. Go to the **Budget Planner** page to select your income stream and manage your expenses. Alternatively, select custom monthly contribution below!
            </p>
          </div>
        </div>
      )}

      {depositSource === 'allocated' && allocatedSavings <= 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-500" />
          <div className="text-xs space-y-1">
            <span className="font-bold">No active allocated savings target!</span>
            <p className="leading-relaxed">
              Your allocated savings budget in the **Budget Planner** is currently **£0**. Please adjust the slider in the planner page first, or opt to select the Full Surplus/Custom amount below.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-5 bg-white border border-zinc-250 p-5 rounded-2xl shadow-sm space-y-5">
          {/* Accounts selector */}
          <div className="space-y-3 pb-4 border-b border-zinc-150">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-zinc-550 uppercase tracking-widest block">Active Savings Accounts</span>
              <button
                type="button"
                onClick={() => {
                  setIsAddingAccount(!isAddingAccount);
                  setNewAccountName('');
                }}
                className="cursor-pointer text-[10px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded"
              >
                <Plus className="w-3 h-3" />
                <span>Add Account</span>
              </button>
            </div>

            {isAddingAccount && (
              <div className="p-3 bg-zinc-50 border border-zinc-250 rounded-xl space-y-2">
                <span className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-wider block">Create New Account</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAccountName}
                    onChange={e => setNewAccountName(e.target.value)}
                    placeholder="e.g. Dream House Fund"
                    className="flex-1 text-xs px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-400 font-bold"
                  />
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        const trimmed = newAccountName.trim();
                        if (!trimmed) return;
                        const newId = `acc-${Date.now()}`;
                        const newAcc: SavingsAccount = {
                          id: newId,
                          name: trimmed,
                          initialCapital: '1000',
                          depositSource: 'custom',
                          customMonthly: '100',
                          returnRate: '6.0',
                          compoundingPeriods: '12',
                          years: 10,
                        };
                        setAccounts(prev => [...prev, newAcc]);
                        setSelectedAccountId(newId);
                        setIsAddingAccount(false);
                        setNewAccountName('');
                      }}
                      className="cursor-pointer bg-zinc-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingAccount(false)}
                      className="cursor-pointer bg-zinc-200 text-zinc-700 text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-zinc-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {accounts.map(acc => {
                const isActive = acc.id === selectedAccountId;
                let compoundDep = 0;
                if (acc.depositSource === 'allocated') {
                  compoundDep = allocatedSavings;
                } else if (acc.depositSource === 'surplus') {
                  compoundDep = monthlySurplus;
                } else {
                  compoundDep = parseFloat(acc.customMonthly) || 0;
                }

                return (
                  <div
                    key={acc.id}
                    className={`p-2.5 rounded-xl border flex justify-between items-center transition-all ${
                      isActive
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                        : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedAccountId(acc.id)}
                      className="flex-1 text-left cursor-pointer"
                    >
                      <span className="text-[11px] font-black block leading-snug">{acc.name}</span>
                      <span className={`text-[9px] block ${isActive ? 'text-zinc-350' : 'text-zinc-500'}`}>
                        Start: {formatGBP(parseFloat(acc.initialCapital) || 0)} • {formatGBP(compoundDep)}/mo
                      </span>
                    </button>

                    {accounts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const remAccounts = accounts.filter(a => a.id !== acc.id);
                          setAccounts(remAccounts);
                          if (isActive) {
                            setSelectedAccountId(remAccounts[0].id);
                          }
                          setGoals(prev => prev.map(g => g.linkedAccountId === acc.id ? { ...g, linkedAccountId: remAccounts[0].id } : g));
                        }}
                        className={`p-1.5 rounded hover:bg-red-550/10 hover:text-red-650 transition-all ${
                          isActive ? 'text-zinc-400 hover:text-red-400' : 'text-zinc-400 hover:text-red-600'
                        }`}
                        title="Delete account"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-500" />
            Set Investment Options
          </h3>

          {/* Initial capital */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 block">Initial Starting Capital</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold font-mono">£</span>
              <input
                type="number"
                min="0"
                value={initialCapital}
                onChange={e => setInitialCapital(e.target.value)}
                className="w-full text-xs pl-8 pr-4.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:border-zinc-400 focus:bg-white focus:outline-none font-bold"
                placeholder="e.g. 5000"
              />
            </div>
          </div>

          {/* Monthly contributions source selection */}
          <div className="space-y-3.5 p-3.5 border border-emerald-100 rounded-xl bg-emerald-50/20">
            <div>
              <label className="text-xs font-bold text-zinc-850 block mb-2">Monthly Contribution Source</label>
              
              <div className="grid grid-cols-1 gap-2">
                {/* 1. Allocated */}
                <button
                  type="button"
                  onClick={() => setDepositSource('allocated')}
                  className={`text-left text-xs p-2.5 rounded-lg border transition-all flex justify-between items-center cursor-pointer ${
                    depositSource === 'allocated'
                      ? 'border-emerald-600 bg-emerald-100/30'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <div>
                    <span className="font-bold text-zinc-900 block">Allocated Target</span>
                    <span className="text-[10px] text-zinc-550 block">From Budget Planner slider</span>
                  </div>
                  <span className="text-sm font-black text-emerald-700">
                    {formatGBP(allocatedSavings)}/mo
                  </span>
                </button>

                {/* 2. Full Surplus */}
                <button
                  type="button"
                  onClick={() => setDepositSource('surplus')}
                  className={`text-left text-xs p-2.5 rounded-lg border transition-all flex justify-between items-center cursor-pointer ${
                    depositSource === 'surplus'
                      ? 'border-emerald-600 bg-emerald-100/30'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <div>
                    <span className="font-bold text-zinc-900 block">Total Leftover Surplus</span>
                    <span className="text-[10px] text-zinc-550 block">Full monthly remainder</span>
                  </div>
                  <span className="text-sm font-black text-emerald-700">
                    {formatGBP(monthlySurplus)}/mo
                  </span>
                </button>

                {/* 3. Custom */}
                <button
                  type="button"
                  onClick={() => setDepositSource('custom')}
                  className={`text-left text-xs p-2.5 rounded-lg border transition-all flex justify-between items-center cursor-pointer ${
                    depositSource === 'custom'
                      ? 'border-emerald-600 bg-emerald-100/30'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <div>
                    <span className="font-bold text-zinc-900 block">Custom Amount</span>
                    <span className="text-[10px] text-zinc-550 block">Input your custom monthly sum</span>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold text-zinc-400 font-mono">
                    Editable Below
                  </span>
                </button>
              </div>
            </div>

            {depositSource === 'custom' ? (
              <div className="relative pt-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold font-mono">£</span>
                <input
                  type="number"
                  min="0"
                  value={customMonthly}
                  onChange={e => setCustomMonthly(e.target.value)}
                  className="w-full text-xs pl-8 pr-4 py-2 bg-white border border-zinc-200 rounded-xl focus:border-emerald-405 focus:outline-none font-bold h-9"
                  placeholder="e.g. 250"
                />
              </div>
            ) : (
              <p className="text-[10px] text-zinc-500 italic px-0.5 leading-relaxed">
                Linked actively to your dynamic budget planner. Updates instantaneously across pages.
              </p>
            )}
          </div>

          {/* Expected Return Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-700">Estimated Annual Return Rate</label>
              <span className="text-xs font-bold text-indigo-650 font-mono">{returnRate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={returnRate}
              onChange={e => setReturnRate(e.target.value)}
              className="w-full accent-zinc-900 h-1 rounded-lg bg-zinc-200 cursor-pointer"
            />
            <div className="grid grid-cols-3 gap-1 pt-1">
              {[4.0, 7.0, 10.0].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setReturnRate(val.toFixed(1))}
                  className="cursor-pointer text-[9px] font-bold border border-zinc-200 rounded py-1 bg-zinc-50 text-zinc-650 hover:bg-zinc-100/70"
                >
                  {val}% Acc
                </button>
              ))}
            </div>

            {/* Interest Tolerance Band Toggle */}
            <div className="pt-2.5 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 mt-2 flex items-center justify-between">
              <div className="space-y-0.5 max-w-[70%]">
                <span className="text-[10px] font-extrabold text-zinc-800 block uppercase tracking-wider">Interest tolerance band</span>
                <span className="text-[9px] text-zinc-500 block leading-tight">Show dynamic forecasts at ±1.0% tolerance</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showTolerance}
                  onChange={e => setShowTolerance(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-zinc-200 rounded-full peer peer-focus:ring-1 peer-focus:ring-zinc-300 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 before:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          {/* Investment Term Years */}
          <div className="space-y-2 pt-4 border-t border-zinc-100">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-700">Investment Period (Years)</label>
              <span className="text-xs font-bold text-zinc-950 font-mono">{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={years}
              onChange={e => setYears(parseInt(e.target.value, 10))}
              className="w-full accent-zinc-900 h-1 rounded-lg bg-zinc-200 cursor-pointer"
            />
          </div>

          {/* Compounding Frequency */}
          <div className="space-y-2 pt-4 border-t border-zinc-100">
            <label className="text-xs font-bold text-zinc-700 block">Compounding Intervals</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Monthly', value: '12' },
                { label: 'Quarterly', value: '4' },
                { label: 'Annually', value: '1' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setCompoundingPeriods(opt.value as any)}
                  className={`cursor-pointer px-2 py-2 text-xs font-bold border rounded-xl transition-all capitalize ${
                    compoundingPeriods === opt.value
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                      : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ANALYTICS COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="compound-highlights-grid">
            <div className="bg-white border border-zinc-200 p-4.5 rounded-2xl shadow-sm space-y-0.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Estimated Total</span>
              <div className="text-xl font-black text-emerald-600 transition-all">
                {formatGBP(projections.endBalance)}
              </div>
              <span className="text-[9px] text-zinc-400 block font-medium">After {years} years</span>
            </div>

            <div className="bg-white border border-zinc-200 p-4.5 rounded-2xl shadow-sm space-y-0.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Total Deposits</span>
              <div className="text-xl font-black text-zinc-750">
                {formatGBP(projections.totalDeposits)}
              </div>
              <span className="text-[9px] text-zinc-500 block font-semibold">What you put in</span>
            </div>

            <div className="bg-white border border-zinc-200 p-4.5 rounded-2xl shadow-sm space-y-0.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Interest Earned</span>
              <div className="text-xl font-black text-indigo-650">
                {formatGBP(projections.totalInterest)}
              </div>
              <span className="text-[9px] text-zinc-500 block font-semibold font-mono text-emerald-600">
                {interestRatio.toFixed(1)}% interest share
              </span>
            </div>
          </div>

          {/* Interactive Chart Section */}
          {(() => {
            // SVG drawing configuration
            const chartWidth = 600;
            const chartHeight = 240;
            const paddingLeft = 65;
            const paddingRight = 20;
            const paddingTop = 15;
            const paddingBottom = 25;

            const plotWidth = chartWidth - paddingLeft - paddingRight;
            const plotHeight = chartHeight - paddingTop - paddingBottom;

            const getX = (index: number) => {
              return paddingLeft + (index / years) * plotWidth;
            };

            const getY = (value: number) => {
              if (maxBalance === 0) return paddingTop + plotHeight;
              return paddingTop + plotHeight - (value / maxBalance) * plotHeight;
            };

            // Generate ticks for Y axis (4 segments)
            const yTicks: number[] = [];
            for (let i = 0; i <= 4; i++) {
              yTicks.push((maxBalance / 4) * i);
            }

            // Generate ticks for X axis
            let step = 5;
            if (years <= 8) step = 1;
            else if (years <= 15) step = 3;
            else if (years <= 25) step = 5;
            else step = 10;

            const xTicks: number[] = [];
            for (let i = 0; i <= years; i += step) {
              xTicks.push(i);
            }
            if (xTicks[xTicks.length - 1] !== years) {
              xTicks.push(years);
            }

            // Map points to SVG coordinates
            const standardLinePath = standardSeries.map((pt, idx) => `${getX(idx).toFixed(1)},${getY(pt.balance).toFixed(1)}`).join(' L ');
            const standardAreaPath = `M ${getX(0).toFixed(1)},${getY(0).toFixed(1)} L ${standardLinePath} L ${getX(years).toFixed(1)},${(paddingTop + plotHeight).toFixed(1)} L ${getX(0).toFixed(1)},${(paddingTop + plotHeight).toFixed(1)} Z`;

            const depositsLinePath = standardSeries.map((pt, idx) => `${getX(idx).toFixed(1)},${getY(pt.deposits).toFixed(1)}`).join(' L ');
            const depositsAreaPath = `M ${getX(0).toFixed(1)},${getY(0).toFixed(1)} L ${depositsLinePath} L ${getX(years).toFixed(1)},${(paddingTop + plotHeight).toFixed(1)} L ${getX(0).toFixed(1)},${(paddingTop + plotHeight).toFixed(1)} Z`;

            // Shaded tolerance range polygon
            let toleranceBandPath = '';
            if (showTolerance) {
              const pointsHigh = highSeries.map((pt, idx) => `${getX(idx).toFixed(1)},${getY(pt.balance).toFixed(1)}`);
              const pointsLow = [...lowSeries].reverse().map((pt, idx) => {
                const realIndex = years - idx;
                return `${getX(realIndex).toFixed(1)},${getY(pt.balance).toFixed(1)}`;
              });
              toleranceBandPath = `M ${pointsHigh.join(' L ')} L ${pointsLow.join(' L ')} Z`;
            }

            // Active index for hover details
            const activeHoverIdx = hoveredYear !== null && hoveredYear >= 0 && hoveredYear <= years ? hoveredYear : years;
            const activeStandard = standardSeries[activeHoverIdx];
            const activeLow = lowSeries[activeHoverIdx];
            const activeHigh = highSeries[activeHoverIdx];

            const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const mouseX = e.clientX - rect.left;
              
              // Map responsive client coordinate back to true SVG dimensions
              const scaleFactor = chartWidth / rect.width;
              const svgMouseX = mouseX * scaleFactor;
              
              const relativeX = svgMouseX - paddingLeft;
              const fraction = relativeX / plotWidth;
              let index = Math.round(fraction * years);
              
              if (index < 0) index = 0;
              if (index > years) index = years;
              setHoveredYear(index);
            };

            const lowLinePathStr = lowSeries.map((pt, idx) => `${getX(idx).toFixed(1)},${getY(pt.balance).toFixed(1)}`).join(' L ');
            const highLinePathStr = highSeries.map((pt, idx) => `${getX(idx).toFixed(1)},${getY(pt.balance).toFixed(1)}`).join(' L ');

            return (
              <div className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-sm space-y-4" id="interactive-savings-chart">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-zinc-150">
                  <div>
                    <h4 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      Dynamic Growth Trajectory
                    </h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                      Sweep credentials or hover cursor across the chart to view milestone balances by year.
                    </p>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 self-start shadow-4xs">
                    <span className="text-[10px] font-bold text-zinc-500">Selected Point:</span>
                    <span className="text-[10px] font-black text-zinc-900 bg-white border border-zinc-150 px-1.5 py-0.5 rounded font-mono">
                      Year {activeHoverIdx}
                    </span>
                  </div>
                </div>

                {/* Dynamic Status Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-50/50 p-3 rounded-xl border border-zinc-200 text-xs">
                  <div>
                    <span className="text-[9px] font-bold text-zinc-450 uppercase tracking-wider block leading-none mb-1">Total Contributions</span>
                    <span className="font-extrabold text-zinc-700">{formatGBP(activeStandard.deposits)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider block leading-none mb-1">Projected Balance</span>
                    <span className="font-black text-emerald-600 font-mono">{formatGBP(activeStandard.balance)}</span>
                  </div>
                  {showTolerance ? (
                    <>
                      <div>
                        <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider block leading-none mb-1">Low Est. (-1%)</span>
                        <span className="font-semibold text-amber-600">{formatGBP(activeLow.balance)}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-indigo-650 uppercase tracking-wider block leading-none mb-1">High Est. (+1%)</span>
                        <span className="font-semibold text-indigo-650">{formatGBP(activeHigh.balance)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-2 text-[10px] text-zinc-400 italic flex items-center justify-end">
                      💡 Toggle "Interest tolerance band" below expected rate to overlay outer ±1% spreads
                    </div>
                  )}
                </div>

                {/* SVG Render */}
                <div className="relative w-full overflow-hidden">
                  <svg 
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                    className="w-full h-auto select-none"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    <defs>
                      <linearGradient id="areaGradStandard" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
                      </linearGradient>
                      <linearGradient id="areaGradDeposits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#71717a" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#71717a" stopOpacity="0.01" />
                      </linearGradient>
                      <linearGradient id="areaGradTolerance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.07" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>

                    {/* horizontal gridlines and Y-axis units */}
                    {yTicks.map((tickVal, idx) => {
                      const yPos = getY(tickVal);
                      return (
                        <g key={idx}>
                          <line
                            x1={paddingLeft}
                            y1={yPos}
                            x2={chartWidth - paddingRight}
                            y2={yPos}
                            stroke="#f4f4f5"
                            strokeWidth="1"
                            strokeDasharray={idx === 0 ? "none" : "3 3"}
                          />
                          <text
                            x={paddingLeft - 8}
                            y={yPos + 3}
                            textAnchor="end"
                            className="text-[9px] font-bold text-zinc-400 font-mono"
                          >
                            {formatGBP(tickVal).replace(/\.00$/, '')}
                          </text>
                        </g>
                      );
                    })}

                    {/* vertical gridlines and X-axis years */}
                    {xTicks.map((yr, idx) => {
                      const xPos = getX(yr);
                      return (
                        <g key={idx}>
                          <line
                            x1={xPos}
                            y1={paddingTop}
                            x2={xPos}
                            y2={paddingTop + plotHeight}
                            stroke="#fafafa"
                            strokeWidth="1"
                          />
                          <text
                            x={xPos}
                            y={paddingTop + plotHeight + 13}
                            textAnchor="middle"
                            className="text-[9px] font-black text-zinc-550 font-mono"
                          >
                            Yr {yr}
                          </text>
                        </g>
                      );
                    })}

                    {/* Shaded tolerance range */}
                    {showTolerance && (
                      <path
                        d={toleranceBandPath}
                        fill="url(#areaGradTolerance)"
                        className="transition-all duration-300"
                      />
                    )}

                    {/* Area fills */}
                    <path d={depositsAreaPath} fill="url(#areaGradDeposits)" />
                    <path d={standardAreaPath} fill="url(#areaGradStandard)" />

                    {/* Tolerance boundary lines */}
                    {showTolerance && (
                      <>
                        <path
                          d={`M ${lowLinePathStr}`}
                          fill="none"
                          stroke="#d97706"
                          strokeWidth="1.2"
                          strokeDasharray="4 3"
                          className="transition-all duration-300 opacity-80"
                        />
                        <path
                          d={`M ${highLinePathStr}`}
                          fill="none"
                          stroke="#4f46e5"
                          strokeWidth="1.2"
                          strokeDasharray="4 3"
                          className="transition-all duration-300 opacity-80"
                        />
                      </>
                    )}

                    {/* Solid series lines */}
                    <path
                      d={`M ${depositsLinePath}`}
                      fill="none"
                      stroke="#71717a"
                      strokeWidth="1.5"
                    />
                    <path
                      d={`M ${standardLinePath}`}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    />

                    {/* Goal Line Threshold Overlay */}
                    {activeGoal && activeGoal.targetAmount > 0 && (
                      <g>
                        <line
                          x1={paddingLeft}
                          y1={getY(activeGoal.targetAmount)}
                          x2={chartWidth - paddingRight}
                          y2={getY(activeGoal.targetAmount)}
                          stroke="#d97706"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                          className="transition-all duration-300 pointer-events-none"
                        />
                        {/* Text label bubble on the left, bound securely inside chart viewport */}
                        <g transform={`translate(${paddingLeft + 6}, ${Math.max(paddingTop + 10, Math.min(paddingTop + plotHeight - 4, getY(activeGoal.targetAmount) - 15))})`}>
                          <rect
                            width="122"
                            height="14"
                            rx="3.5"
                            fill="#fef3c7"
                            stroke="#f59e0b"
                            strokeWidth="1"
                            className="pointer-events-none shadow"
                          />
                          <text
                            x="6"
                            y="10"
                            className="fill-amber-900 text-[8.5px] font-extrabold uppercase font-mono pointer-events-none"
                          >
                            Target Goal: {formatGBP(activeGoal.targetAmount)}
                          </text>
                        </g>
                      </g>
                    )}

                    {/* Highlight cursor guidelineline */}
                    <line
                      x1={getX(activeHoverIdx)}
                      y1={paddingTop}
                      x2={getX(activeHoverIdx)}
                      y2={paddingTop + plotHeight}
                      stroke="#d4d4d8"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      className="pointer-events-none"
                    />

                    {/* Highlight handles */}
                    <circle
                      cx={getX(activeHoverIdx)}
                      cy={getY(activeStandard.deposits)}
                      r="4"
                      fill="#ffffff"
                      stroke="#71717a"
                      strokeWidth="2"
                      className="pointer-events-none shadow"
                    />

                    {showTolerance && (
                      <>
                        <circle
                          cx={getX(activeHoverIdx)}
                          cy={getY(activeLow.balance)}
                          r="3.5"
                          fill="#ffffff"
                          stroke="#d97706"
                          strokeWidth="2"
                          className="pointer-events-none"
                        />
                        <circle
                          cx={getX(activeHoverIdx)}
                          cy={getY(activeHigh.balance)}
                          r="3.5"
                          fill="#ffffff"
                          stroke="#4f46e5"
                          strokeWidth="2"
                          className="pointer-events-none"
                        />
                      </>
                    )}

                    <circle
                      cx={getX(activeHoverIdx)}
                      cy={getY(activeStandard.balance)}
                      r="5.5"
                      fill="#10b981"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      className="pointer-events-none shadow-md"
                    />
                  </svg>
                </div>

                {/* Legend Guide */}
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[9px] font-black text-zinc-500 pt-1.5 border-t border-zinc-100 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-0.5 bg-[#10b981] rounded-full" />
                    <span>Projected Yield ({returnRate}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-0.5 bg-zinc-500 rounded-full" />
                    <span>Invested Capital</span>
                  </div>
                  {showTolerance && (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-0.5 bg-[#4f46e5] border-t border-dashed" />
                        <span>High Proj (+1%)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-0.5 bg-[#d97706] border-t border-dashed" />
                        <span>Low Proj (-1%)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-2 bg-[#6366f1]/10 border border-[#6366f1]/20 rounded-xs" />
                        <span>Tolerance Spread</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Savings Target Goals Section */}
          <div className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-sm space-y-4" id="savings-budget-goals">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-zinc-100">
              <h4 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                Savings Target Goals
              </h4>
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
                Interactive Compounding Planner
              </span>
            </div>

            <div className="space-y-4">
              {goals.map(goal => {
                const linkedAcc = accounts.find(a => a.id === goal.linkedAccountId);
                let timeToGoalElement: React.ReactNode = null;

                if (linkedAcc) {
                  const advice = calculateTimeToReachGoal(linkedAcc, goal.targetAmount);
                  if (advice.reached) {
                    timeToGoalElement = (
                      <span className="text-[10px] font-black text-emerald-650 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Reached! 🎉
                      </span>
                    );
                  } else if (advice.impossible) {
                    timeToGoalElement = (
                      <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                        Requires Deposits
                      </span>
                    );
                  } else {
                    timeToGoalElement = (
                      <span className="text-[10px] font-black text-zinc-800 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded font-mono">
                        ⏱️ {advice.years}y {advice.months}m left
                      </span>
                    );
                  }
                }

                // Balance of linked account at selected target year (use activeHoverIdx if hovered, else standard years)
                const activeHoverIdx = hoveredYear !== null ? hoveredYear : (linkedAcc?.years || 15);
                
                // Compounding calculation specifically for this linked account at this specific year
                let currentLinkedBalance = 0;
                if (linkedAcc) {
                  const pv = parseFloat(linkedAcc.initialCapital) || 0;
                  const r = (parseFloat(linkedAcc.returnRate) || 0) / 100;
                  const k = parseInt(linkedAcc.compoundingPeriods, 10) || 12;
                  const ratePerPeriod = r / k;
                  
                  let deposit = 0;
                  if (linkedAcc.depositSource === 'allocated') {
                    deposit = allocatedSavings;
                  } else if (linkedAcc.depositSource === 'surplus') {
                    deposit = monthlySurplus;
                  } else {
                    deposit = parseFloat(linkedAcc.customMonthly) || 0;
                  }

                  let val = pv;
                  const depositPerPeriod = deposit * (12 / k);
                  const totalPeriods = k * activeHoverIdx;
                  for (let p = 1; p <= totalPeriods; p++) {
                    val += val * ratePerPeriod + depositPerPeriod;
                  }
                  currentLinkedBalance = val;
                }

                const progressPct = Math.min(100, Math.round((currentLinkedBalance / goal.targetAmount) * 100));

                return (
                  <div key={goal.id} className="p-3.5 bg-zinc-50 border border-zinc-150 rounded-xl space-y-3 transition-all relative">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-black text-zinc-900">{goal.name}</span>
                          <span className="text-[9px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                            Target: {formatGBP(goal.targetAmount)}
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-500 block leading-tight mt-1">
                          Funding Account: <strong className="text-zinc-700">{linkedAcc?.name || "None (Unassigned)"}</strong>
                        </span>
                      </div>
                      <div className="text-right">
                        {timeToGoalElement}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-bold text-zinc-500">
                        <span>Balance at Year {activeHoverIdx}: {formatGBP(currentLinkedBalance)}</span>
                        <span>{progressPct}%</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden shadow-inner flex">
                        <div
                          className={`h-full transition-all duration-300 ${progressPct >= 100 ? 'bg-emerald-500' : 'bg-emerald-400/70'}`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Goal controls inline */}
                    <div className="flex flex-wrap items-center justify-between pt-2 border-t border-zinc-250/60 gap-1 text-[9px] text-zinc-500">
                      <div className="flex items-center gap-1">
                        <span className="font-bold">Edit Target:</span>
                        <input
                          type="number"
                          value={goal.targetAmount}
                          onChange={e => {
                            const val = parseFloat(e.target.value);
                            setGoals(prev => prev.map(g => g.id === goal.id ? { ...g, targetAmount: isNaN(val) || val < 0 ? 0 : val } : g));
                          }}
                          className="w-16 px-1.5 py-0.5 border border-zinc-200 rounded bg-white font-bold text-zinc-800 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">Link Account:</span>
                        <select
                          value={goal.linkedAccountId}
                          onChange={e => {
                            const accId = e.target.value;
                            setGoals(prev => prev.map(g => g.id === goal.id ? { ...g, linkedAccountId: accId } : g));
                          }}
                          className="px-1.5 py-0.5 border border-zinc-200 rounded bg-white text-[9px] font-bold text-zinc-855"
                        >
                          {accounts.map(acc => (
                            <option key={acc.id} value={acc.id}>{acc.name}</option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() => {
                            setGoals(prev => prev.filter(g => g.id !== goal.id));
                          }}
                          className="text-red-500 hover:text-red-700 font-bold ml-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add Goal Section */}
              <div className="pt-2.5 border-t border-zinc-150 space-y-2">
                <span className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest block">Configure New Goal</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      placeholder="e.g. Wedding, Property Deposit"
                      value={newGoalName}
                      onChange={e => setNewGoalName(e.target.value)}
                      className="w-full text-xs px-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-400 font-bold"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">£</span>
                      <input
                        type="number"
                        placeholder="Target sum"
                        value={newGoalTarget}
                        onChange={e => setNewGoalTarget(e.target.value)}
                        className="w-full text-xs pl-5 pr-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-zinc-400 font-bold"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <select
                      value={newGoalAccountId}
                      onChange={e => setNewGoalAccountId(e.target.value)}
                      className="w-full text-xs px-1 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-400 font-bold"
                    >
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>{acc.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={() => {
                        const nameTrim = newGoalName.trim();
                        const tgtAmt = parseFloat(newGoalTarget);
                        if (!nameTrim || isNaN(tgtAmt) || tgtAmt <= 0) return;
                        
                        const newId = `goal-${Date.now()}`;
                        setGoals(prev => [...prev, {
                          id: newId,
                          name: nameTrim,
                          targetAmount: tgtAmt,
                          linkedAccountId: newGoalAccountId
                        }]);
                        setNewGoalName('');
                        setNewGoalTarget('');
                      }}
                      className="cursor-pointer w-full bg-zinc-900 text-white text-[10px] font-black h-[28px] rounded-lg hover:bg-zinc-800 transition-colors uppercase"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benchmark Compare */}
          <div className="bg-white border border-zinc-250 p-5 rounded-2xl shadow-sm space-y-4">
            <h4 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">Alternative Horizon Benchmarks</h4>
            
            <div className="space-y-2.5">
              {benchmarks.map(bm => {
                const terminal = calculateTerminalBalanceForBenchmark(bm.rate);
                return (
                  <div key={bm.name} className="flex justify-between items-center p-3.5 bg-zinc-50 border border-zinc-150 rounded-xl hover:bg-zinc-100/50 transition-all">
                    <div>
                      <span className="text-xs font-bold text-zinc-800 block leading-none">{bm.name}</span>
                      <span className="text-[10px] text-zinc-400 mt-1 block">Yield rate of {bm.rate}% • {bm.desc}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-zinc-950">{formatGBP(terminal)}</div>
                      <div className="text-[10px] text-zinc-405 font-bold">Interest: {formatGBP(Math.max(0, terminal - projections.totalDeposits))}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips Info Panel */}
          <div className="bg-zinc-50 border border-zinc-200 p-4.5 rounded-2xl flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-zinc-900 block">The Magic of Compounding</span>
              <p className="text-xs text-zinc-650 leading-relaxed">
                By investing your budget surplus of <strong>{formatGBP(monthlyDeposit)}</strong> monthly at an estimated rate of <strong>{returnRate}%</strong>, your deposits snowball over {years} years, earning you <strong>{formatGBP(projections.totalInterest)}</strong> purely in free compounding returns. The longer your time horizon, the larger your interest snowball grows!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
