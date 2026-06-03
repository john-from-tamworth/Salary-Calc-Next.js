import React, { useState, useMemo, FormEvent } from 'react';
import { Sparkles, TrendingUp, Plus, Trash2, Landmark, Info, PieChart, ChevronDown, ChevronUp, CheckCircle, ShieldAlert, Heart, Coins } from 'lucide-react';
import { ExpenseItem } from '../types';

interface BudgetPlannerProps {
  monthlyTakeHomeA: number;
  monthlyTakeHomeB: number;
  incomeSource: 'A' | 'B' | 'custom';
  setIncomeSource: React.Dispatch<React.SetStateAction<'A' | 'B' | 'custom'>>;
  customIncomeInput: string;
  setCustomIncomeInput: React.Dispatch<React.SetStateAction<string>>;
  selectedIncomeAmount: number;
  allocatedSavings: number;
  setAllocatedSavings: React.Dispatch<React.SetStateAction<number>>;
  expenses: ExpenseItem[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseItem[]>>;
  formatGBP: (v: number) => string;
}

// Custom Category Definitions & Icons / Colors
export const CATEGORY_META = {
  mortgage_rent: {
    label: 'Mortgage / Rent',
    colorHex: '#6366f1', // Indigo
    dotClass: 'bg-indigo-500',
    textClass: 'text-indigo-600',
    pillClass: 'bg-indigo-50 border-indigo-100 text-indigo-700',
    desc: 'Home & Rent payments'
  },
  utilities: {
    label: 'Utilities',
    colorHex: '#0ea5e9', // Sky Blue
    dotClass: 'bg-sky-500',
    textClass: 'text-sky-600',
    pillClass: 'bg-sky-50 border-sky-100 text-sky-700',
    desc: 'Power, water, phones & internet'
  },
  transport: {
    label: 'Transport',
    colorHex: '#f59e0b', // Amber
    dotClass: 'bg-amber-500',
    textClass: 'text-amber-600',
    pillClass: 'bg-amber-50 border-amber-100 text-amber-700',
    desc: 'Petrol, car insurance, commutes'
  },
  debts: {
    label: 'Debts & Loans',
    colorHex: '#f43f5e', // Rose
    dotClass: 'bg-rose-500',
    textClass: 'text-rose-600',
    pillClass: 'bg-rose-50 border-rose-100 text-rose-700',
    desc: 'Credit cards & personal loans'
  },
  groceries: {
    label: 'Groceries',
    colorHex: '#10b981', // Emerald
    dotClass: 'bg-emerald-500',
    textClass: 'text-emerald-600',
    pillClass: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    desc: 'Weekly supermarkets & essentials'
  },
  leisure: {
    label: 'Leisure & Dining',
    colorHex: '#ec4899', // Pink
    dotClass: 'bg-pink-500',
    textClass: 'text-pink-600',
    pillClass: 'bg-pink-50 border-pink-100 text-pink-700',
    desc: 'Cinema, drinks, shopping, food out'
  },
  subscriptions: {
    label: 'Subscriptions',
    colorHex: '#a855f7', // Purple
    dotClass: 'bg-purple-500',
    textClass: 'text-purple-600',
    pillClass: 'bg-purple-50 border-purple-100 text-purple-700',
    desc: 'Gym, Netflix, broadband'
  }
} as const;

export default function BudgetPlanner({
  monthlyTakeHomeA,
  monthlyTakeHomeB,
  incomeSource,
  setIncomeSource,
  customIncomeInput,
  setCustomIncomeInput,
  selectedIncomeAmount,
  allocatedSavings,
  setAllocatedSavings,
  expenses,
  setExpenses,
  formatGBP
}: BudgetPlannerProps) {
  // Toggle show/hide the legacy targets percentages
  const [showTargetsPanel, setShowTargetsPanel] = useState<boolean>(false);

  // States for adding legagers
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState<keyof typeof CATEGORY_META>('mortgage_rent');

  // Traditional Splits (hidden behind the toggle)
  const [paradigm, setParadigm] = useState<'50-30-20' | '70-20-10' | 'custom'>('50-30-20');
  const [needsPct, setNeedsPct] = useState(50);
  const [wantsPct, setWantsPct] = useState(30);
  const [savingsPct, setSavingsPct] = useState(20);

  const handleParadigmChange = (mode: '50-30-20' | '70-20-10' | 'custom') => {
    setParadigm(mode);
    if (mode === '50-30-20') {
      setNeedsPct(50);
      setWantsPct(30);
      setSavingsPct(20);
    } else if (mode === '70-20-10') {
      setNeedsPct(70);
      setWantsPct(10);
      setSavingsPct(20);
    }
  };

  const handleSliderChange = (category: 'needs' | 'wants' | 'savings', val: number) => {
    if (paradigm !== 'custom') {
      setParadigm('custom');
    }
    const currentVal = category === 'needs' ? needsPct : category === 'wants' ? wantsPct : savingsPct;
    const delta = val - currentVal;
    const otherCats = (['needs', 'wants', 'savings'] as const).filter(c => c !== category);
    let other1Val = otherCats[0] === 'needs' ? needsPct : otherCats[0] === 'wants' ? wantsPct : savingsPct;
    let other2Val = otherCats[1] === 'needs' ? needsPct : otherCats[1] === 'wants' ? wantsPct : savingsPct;

    const share1 = delta / 2;
    const share2 = delta / 2;

    let nextOther1 = Math.max(0, Math.min(100, other1Val - share1));
    let nextOther2 = Math.max(0, Math.min(100, other2Val - share2));

    const currentSum = val + nextOther1 + nextOther2;
    if (currentSum !== 100) {
      const remaining = 100 - val;
      const totalOthers = nextOther1 + nextOther2;
      if (totalOthers > 0) {
        nextOther1 = (nextOther1 / totalOthers) * remaining;
        nextOther2 = (nextOther2 / totalOthers) * remaining;
      } else {
        nextOther1 = remaining / 2;
        nextOther2 = remaining / 2;
      }
    }

    setNeedsPct(category === 'needs' ? val : (otherCats[0] === 'needs' ? Math.round(nextOther1) : Math.round(nextOther2)));
    setWantsPct(category === 'wants' ? val : (otherCats[0] === 'wants' ? Math.round(nextOther1) : Math.round(nextOther2)));
    setSavingsPct(category === 'savings' ? val : (otherCats[0] === 'savings' ? Math.round(nextOther1) : Math.round(nextOther2)));
  };

  // Add a new expense
  const handleAddExpense = (e: FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(newExpenseAmount);
    if (!newExpenseName.trim() || isNaN(amt) || amt <= 0) return;

    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      name: newExpenseName.trim(),
      amount: amt,
      category: newExpenseCategory,
    };

    setExpenses([...expenses, newItem]);
    setNewExpenseName('');
    setNewExpenseAmount('');
  };

  // Remove an expense
  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  const downloadBudgetCSV = () => {
    const data = [
      ['Expense', 'Amount', 'Category'],
      ...expenses.map(e => [e.name, e.amount, CATEGORY_META[e.category]?.label || e.category]),
      ['Total', totalExpensesAmt, ''],
    ];
    const csvContent = data.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'monthly_expenses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Calculations for total expense ledger
  const totalExpensesAmt = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  // Months leftover calculation
  const monthlyLeftoverAmt = useMemo(() => {
    return Math.max(0, selectedIncomeAmount - totalExpensesAmt);
  }, [selectedIncomeAmount, totalExpensesAmt]);

  // Adjust allocated savings slider to fit within leftover limit
  const activeAllocatedSavings = useMemo(() => {
    return Math.min(allocatedSavings, monthlyLeftoverAmt);
  }, [allocatedSavings, monthlyLeftoverAmt]);

  // Percentage slider helper
  const savingsPercentageOfLeftover = useMemo(() => {
    if (monthlyLeftoverAmt <= 0) return 0;
    return Math.round((activeAllocatedSavings / monthlyLeftoverAmt) * 100);
  }, [activeAllocatedSavings, monthlyLeftoverAmt]);

  // Inflow / Outflow category sums for ploting the chart
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    Object.keys(CATEGORY_META).forEach(cat => {
      totals[cat] = 0;
    });
    expenses.forEach(e => {
      if (totals[e.category] !== undefined) {
        totals[e.category] += e.amount;
      }
    });
    return totals;
  }, [expenses]);

  const chartData = useMemo(() => {
    return Object.entries(categoryTotals)
      .map(([cat, total]) => ({
        categoryKey: cat,
        total,
        meta: CATEGORY_META[cat as keyof typeof CATEGORY_META]
      }))
      .filter(item => item.total > 0);
  }, [categoryTotals]);

  // Circumference definitions for elegant SVG ring charting
  const doughnutSegments = useMemo(() => {
    let accumulatedLength = 0;
    const radius = 50;
    const circumference = 2 * Math.PI * radius; // ~314.16

    if (totalExpensesAmt <= 0) return [];

    const totalSegs = chartData.length;
    // Introduce a clean, small visual gap (in pixels) between segment slices if multiple exist
    const gapSize = totalSegs > 1 ? 4 : 0;
    const totalGapLength = gapSize * totalSegs;
    const activeCircumference = circumference - totalGapLength;

    return chartData.map(item => {
      const pct = (item.total / totalExpensesAmt) * 100;
      const length = (item.total / totalExpensesAmt) * activeCircumference;
      const strokeDasharray = `${length} ${circumference - length}`;
      const strokeDashoffset = -accumulatedLength;
      
      // Shift start for next segment, accounting for the gap
      accumulatedLength += length + gapSize;

      return {
        ...item,
        percentage: pct,
        strokeDasharray,
        strokeDashoffset
      };
    });
  }, [chartData, totalExpensesAmt]);

  return (
    <div className="space-y-8" id="budget-planner-container">
      {/* Intro Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-150 pb-5">
        <div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            Real-Time Allocation
          </span>
          <h2 className="text-xl font-black text-zinc-950 mt-1.5 flex items-center gap-2">
            Budget Planner & Ledger
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Map your monthly paycheck from Salary A/B to detailed outgoings, compute your discretionary surplus, and allocate your savings.
          </p>
        </div>

        {/* Legacy preset splits toggle */}
        <button
          onClick={() => setShowTargetsPanel(!showTargetsPanel)}
          className="cursor-pointer text-xs font-bold px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 rounded-xl transition-all flex items-center gap-1.5 self-start md:self-center"
        >
          {showTargetsPanel ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {showTargetsPanel ? 'Hide Targets & Sliders' : 'Show Targets Sliders'}
        </button>
      </div>

      {/* Target Percentage Splits Panel (Behind the user-requested toggle) */}
      {showTargetsPanel && (
        <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-6 animate-in slide-in-from-top-1 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">Traditional Allocation Parameters</h4>
              <p className="text-[10px] text-zinc-400 mt-0.5">Toggle rules like 50/30/20 to check theoretical spending boundaries.</p>
            </div>
            
            <div className="inline-flex rounded-lg bg-zinc-250 p-0.5 border border-zinc-300">
              <button
                onClick={() => handleParadigmChange('50-30-20')}
                className={`cursor-pointer px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                  paradigm === '50-30-20' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                50/30/20 Rule
              </button>
              <button
                onClick={() => handleParadigmChange('70-20-10')}
                className={`cursor-pointer px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                  paradigm === '70-20-10' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                70/20/10 Rule
              </button>
              <button
                onClick={() => handleParadigmChange('custom')}
                className={`cursor-pointer px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                  paradigm === 'custom' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Custom
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Needs */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-zinc-650">Needs Target ({needsPct}%)</span>
                <span className="text-zinc-950">{formatGBP(selectedIncomeAmount * (needsPct / 100))}</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={needsPct}
                onChange={e => handleSliderChange('needs', parseInt(e.target.value))}
                className="w-full accent-zinc-900 h-1.5 rounded-lg bg-zinc-200 cursor-pointer"
              />
            </div>

            {/* Wants */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-zinc-650">Wants Target ({wantsPct}%)</span>
                <span className="text-zinc-950">{formatGBP(selectedIncomeAmount * (wantsPct / 100))}</span>
              </div>
              <input
                type="range"
                min="0"
                max="75"
                value={wantsPct}
                onChange={e => handleSliderChange('wants', parseInt(e.target.value))}
                className="w-full accent-zinc-900 h-1.5 rounded-lg bg-zinc-200 cursor-pointer"
              />
            </div>

            {/* Savings */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-zinc-650">Savings Target ({savingsPct}%)</span>
                <span className="text-zinc-950">{formatGBP(selectedIncomeAmount * (savingsPct / 100))}</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={savingsPct}
                onChange={e => handleSliderChange('savings', parseInt(e.target.value))}
                className="w-full accent-zinc-900 h-1.5 rounded-lg bg-zinc-200 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {selectedIncomeAmount <= 0 ? (
        <div className="bg-zinc-50 border border-dashed border-zinc-250 rounded-2xl py-14 px-6 text-center text-zinc-500 space-y-3">
          <ShieldAlert className="w-10 h-10 mx-auto text-zinc-300 animate-bounce" />
          <h3 className="text-sm font-bold text-zinc-700">Salary input is empty</h3>
          <p className="text-xs max-w-sm mx-auto text-zinc-500">
            Please navigate to the <strong>Salary Calculator</strong> and enter your gross income, or opt to input a custom manually selected limit below.
          </p>
          <div className="pt-2">
            <button
              onClick={() => { setIncomeSource('custom'); setCustomIncomeInput('2500'); }}
              className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-extrabold hover:bg-zinc-800 transition-all cursor-pointer shadow-sm"
            >
              Use Custom £2,500/mo Limit
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: income streams & detail expenses list */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. SELECT INCOME STREAM */}
            <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center pb-1">
                <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-emerald-500" />
                  1. Select Income Stream
                </h3>
                <span className="text-[10px] font-bold text-zinc-500 uppercase px-2.5 py-0.5 rounded-lg bg-zinc-100 border border-zinc-200 font-mono">
                  Active Pool: {formatGBP(selectedIncomeAmount)}/mo
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Scenario A */}
                <button
                  type="button"
                  onClick={() => setIncomeSource('A')}
                  className={`cursor-pointer border text-left p-3.5 rounded-xl transition-all relative ${
                    incomeSource === 'A'
                      ? 'border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-500/30'
                      : 'border-zinc-200 hover:border-zinc-350 bg-white'
                  }`}
                >
                  <span className={`text-[9px] font-extrabold uppercase block ${
                    incomeSource === 'A' ? 'text-emerald-700' : 'text-zinc-400'
                  }`}>
                    Scenario A
                  </span>
                  <span className="text-lg font-black text-zinc-900 block mt-1">
                    {formatGBP(monthlyTakeHomeA)}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-500 block mt-0.5">
                    Current Base (Salary A)
                  </span>
                  {incomeSource === 'A' && (
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </button>

                {/* Scenario B */}
                <button
                  type="button"
                  onClick={() => setIncomeSource('B')}
                  className={`cursor-pointer border text-left p-3.5 rounded-xl transition-all relative ${
                    incomeSource === 'B'
                      ? 'border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-500/30'
                      : 'border-zinc-200 hover:border-zinc-350 bg-white'
                  }`}
                >
                  <span className={`text-[9px] font-extrabold uppercase block ${
                    incomeSource === 'B' ? 'text-emerald-700' : 'text-zinc-400'
                  }`}>
                    Scenario B
                  </span>
                  <span className="text-lg font-black text-zinc-900 block mt-1">
                    {formatGBP(monthlyTakeHomeB)}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-500 block mt-0.5">
                    Compare Pay (Salary B)
                  </span>
                  {incomeSource === 'B' && (
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </button>

                {/* Custom limit */}
                <div
                  onClick={() => setIncomeSource('custom')}
                  className={`p-3.5 rounded-xl border transition-all text-left relative cursor-pointer ${
                    incomeSource === 'custom'
                      ? 'border-emerald-500 bg-emerald-50/10 ring-1 ring-emerald-500/30'
                      : 'border-zinc-200 hover:border-zinc-350 bg-white'
                  }`}
                >
                  <span className={`text-[9px] font-extrabold uppercase block ${
                    incomeSource === 'custom' ? 'text-emerald-700' : 'text-zinc-400'
                  }`}>
                    Custom Limit
                  </span>
                  <div className="flex items-center gap-1 mt-1 text-zinc-900">
                    <span className="text-lg font-black leading-none">£</span>
                    <input
                      type="number"
                      value={customIncomeInput}
                      onChange={e => {
                        setCustomIncomeInput(e.target.value);
                        setIncomeSource('custom');
                      }}
                      onFocus={() => setIncomeSource('custom')}
                      placeholder="Amount..."
                      className="text-lg font-black bg-transparent w-full border-none outline-none focus:ring-0 p-0 leading-none h-6"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-500 block mt-0.5">
                    Input limit manually
                  </span>
                  {incomeSource === 'custom' && (
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                </div>
              </div>
            </div>

            {/* 2. DETAIL EXPENSE LEDGER */}
            <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest">
                    2. Monthly Expenses
                  </h3>
                  <p className="text-[10px] text-zinc-405 mt-0.5">Change item cost directly in the box to update instantaneously</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadBudgetCSV}
                    className="text-[10px] font-bold text-white bg-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-700"
                  >
                    Download CSV
                  </button>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-rose-700 font-mono">
                    Total Out: {formatGBP(totalExpensesAmt)}/mo
                  </span>
                </div>
              </div>

              {/* Add form */}
              <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-12 gap-2 border-b border-zinc-100 pb-4">
                <div className="sm:col-span-5">
                  <label className="text-[9px] font-black uppercase text-zinc-400 block mb-1">Item Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Electric & Gas, Gym, Rent"
                    value={newExpenseName}
                    onChange={e => setNewExpenseName(e.target.value)}
                    className="w-full text-xs p-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:border-zinc-500 focus:outline-none font-medium h-9"
                  />
                </div>
                
                <div className="sm:col-span-3">
                  <label className="text-[9px] font-black uppercase text-zinc-400 block mb-1">Monthly Cost (£)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 150"
                    value={newExpenseAmount}
                    onChange={e => setNewExpenseAmount(e.target.value)}
                    className="w-full text-xs p-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:border-zinc-500 focus:outline-none font-bold h-9"
                  />
                </div>

                <div className="sm:col-span-4 flex items-end gap-1.5">
                  <div className="w-full">
                    <label className="text-[9px] font-black uppercase text-zinc-400 block mb-1">Category</label>
                    <select
                      value={newExpenseCategory}
                      onChange={e => setNewExpenseCategory(e.target.value as any)}
                      className="w-full text-xs p-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:border-zinc-500 font-bold cursor-pointer h-9"
                    >
                      {Object.entries(CATEGORY_META).map(([key, meta]) => (
                        <option key={key} value={key}>
                          {meta.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="h-9 w-9 bg-zinc-950 text-white rounded-xl hover:bg-zinc-805 flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:scale-103 transition-transform"
                    title="Add record"
                  >
                    <Plus className="w-4.5 h-4.5" />
                  </button>
                </div>
              </form>

              {/* Items tracker List */}
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {expenses.length === 0 ? (
                  <div className="text-center py-12 space-y-1 text-zinc-400">
                    <p className="text-xs font-bold text-zinc-505">No expenses logged yet.</p>
                    <p className="text-[10px]">Use the panel above to add mortgage, utilities, or leisure bills!</p>
                  </div>
                ) : (
                  expenses.map(expense => {
                    const meta = CATEGORY_META[expense.category] || CATEGORY_META.mortgage_rent;
                    return (
                      <div
                        key={expense.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-zinc-50 hover:bg-zinc-100/50 rounded-xl border border-zinc-150 transition-all gap-2"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-3 h-3 rounded-full shrink-0 ${meta.dotClass}`} />
                          <div>
                            <span className="text-xs font-bold text-zinc-850 block leading-none">{expense.name}</span>
                            <span className="text-[9px] font-extrabold text-zinc-450 uppercase tracking-tight mt-1.5 block">
                              {meta.label}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto">
                          {/* Inline Amount Box - Instant Edit */}
                          <div className="flex items-center gap-1.5 bg-white border border-zinc-200 px-2.5 py-1 rounded-lg w-28 shrink-0 focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-400/20">
                            <span className="text-[10px] font-bold text-zinc-400">£</span>
                            <input
                              type="number"
                              min="0"
                              value={expense.amount === 0 ? '' : expense.amount}
                              onChange={e => {
                                const parsedVal = parseFloat(e.target.value);
                                const nextVal = isNaN(parsedVal) ? 0 : parsedVal;
                                setExpenses(
                                  expenses.map(item =>
                                    item.id === expense.id ? { ...item, amount: nextVal } : item
                                  )
                                );
                              }}
                              placeholder="0"
                              className="w-full text-xs font-black text-zinc-900 bg-transparent border-none outline-none focus:ring-0 p-0 text-right"
                            />
                          </div>

                          <button
                            onClick={() => removeExpense(expense.id)}
                            className="text-zinc-400 hover:text-rose-600 transition-colors p-1.5 rounded-lg hover:bg-zinc-200/50 cursor-pointer"
                            title="Delete Expense"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: spare cash slider & inflow chart */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 3. SPARE CASH & SAVINGS TARGET */}
            <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-5 space-y-5">
              <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                3. Spare Cash & Savings Target
              </h3>

              {/* REMAINDER LEFTOVER BOX */}
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4.5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-black text-emerald-800 uppercase tracking-wider block">
                    Month Remainder Leftover
                  </span>
                  <div className="text-2xl font-black text-emerald-700 mt-1">
                    {formatGBP(monthlyLeftoverAmt)}
                  </div>
                </div>
                <div className="bg-emerald-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                  Spare Safe
                </div>
              </div>

              {/* MONTHLY SAVINGS BUDGET SLIDER */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-zinc-700">Monthly Savings Budget</span>
                  <span className="font-mono font-black text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {formatGBP(activeAllocatedSavings)}/mo{' '}
                    <span className="text-[10px] font-bold text-zinc-500">
                      ({savingsPercentageOfLeftover}%)
                    </span>
                  </span>
                </div>

                <div className="pt-2">
                  <input
                    type="range"
                    min="0"
                    max={monthlyLeftoverAmt}
                    value={activeAllocatedSavings}
                    onChange={e => setAllocatedSavings(parseInt(e.target.value))}
                    disabled={monthlyLeftoverAmt <= 0}
                    className="w-full h-2 accent-indigo-600 bg-zinc-150 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-bold block pt-1.5">
                    <span>£0</span>
                    <span className="text-zinc-650 uppercase">Allocate to investments</span>
                    <span>{formatGBP(monthlyLeftoverAmt)} Limit</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Callout panel */}
              <div className="bg-indigo-50/40 border border-indigo-100 rounded-xl p-3.5 flex gap-3 items-start">
                <TrendingUp className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed text-indigo-950">
                  <strong className="font-black">Compounding Potential Attached:</strong> By directing your allocated{' '}
                  <strong className="text-indigo-600">{formatGBP(activeAllocatedSavings)}/month</strong> into index portfolios or High-Yield Savings (HYSAs), you instantly fuel compounding options (see the next page in Sidebar!).
                </div>
              </div>
            </div>

            {/* MONTHLY INFLOW BREAKDOWN (DOUGHNUT CHART) */}
            <div className="bg-white border border-zinc-200 shadow-sm rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest">
                Monthly Inflow Breakdown
              </h3>

              {totalExpensesAmt <= 0 ? (
                <div className="py-12 text-center text-[11px] text-zinc-400 border border-dashed border-zinc-150 rounded-xl font-medium">
                  Add costs in Ledger to construct automatic visual segment breakdown.
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Doughnut SVG Container */}
                  <div className="relative w-72 h-72 mx-auto">
                    <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
                      {/* Gray placeholder base circle */}
                      <circle
                        cx="80"
                        cy="80"
                        r="50"
                        fill="none"
                        stroke="#f4f4f5"
                        strokeWidth="14"
                      />
                      {/* Segment slices with spacing gap */}
                      {doughnutSegments.map((seg, idx) => (
                        <circle
                          key={idx}
                          cx="80"
                          cy="80"
                          r="50"
                          fill="none"
                          stroke={seg.meta.colorHex}
                          strokeWidth="14"
                          strokeDasharray={seg.strokeDasharray}
                          strokeDashoffset={seg.strokeDashoffset}
                          strokeLinecap="butt"
                          className="transition-all duration-300 hover:stroke-[16px] cursor-pointer"
                        />
                      ))}
                    </svg>

                    {/* Centered overall content - made black, styled to prevent touching the doughnut */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-6">
                      <span className="text-[9px] uppercase tracking-widest font-black text-zinc-500">Total Spent</span>
                      <span className="text-lg font-black text-black leading-none my-1">{formatGBP(totalExpensesAmt)}</span>
                      <span className="text-[9px] text-zinc-500 block font-bold leading-none">/mo</span>
                    </div>
                  </div>

                  {/* Legends list */}
                  <div className="grid grid-cols-1 gap-2 border-t border-zinc-100 pt-4" id="doughnut-legend">
                    {chartData.map((item, idx) => {
                      const share = totalExpensesAmt > 0 ? ((item.total / totalExpensesAmt) * 100).toFixed(0) : '0';
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs font-medium p-1 rounded-md hover:bg-zinc-50"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${item.meta.dotClass}`} />
                            <span className="text-zinc-650 font-semibold">{item.meta.label}</span>
                          </div>
                          <div className="text-right font-black text-zinc-900">
                            {formatGBP(item.total)}/mo <span className="text-[10px] text-zinc-400 font-bold">({share}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
