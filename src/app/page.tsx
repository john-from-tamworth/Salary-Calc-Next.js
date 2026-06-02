/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import SalaryCalculator from '../components/SalaryCalculator';
import BudgetPlanner from '../components/BudgetPlanner';
import SavingsCompounder from '../components/SavingsCompounder';
import DebtOverpayment from '../components/DebtOverpayment';
import Blog from '../components/Blog';
import { calculateSalaryDetails, getMarginalTaxRate, parseTaxCode } from '../calculator';
import { SalaryInputs, ExpenseItem } from '../types';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<string>('salary-calculator');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Core Calculator Input States (Scenario A)
  const [grossInputA, setGrossInputA] = useState<string>('50000');
  const [regionA, setRegionA] = useState<'UK' | 'Scotland'>('UK');
  const [pensionRateA, setPensionRateA] = useState<number>(5);
  const [pensionTypeA, setPensionTypeA] = useState<'salarySacrifice' | 'netPay' | 'reliefAtSource'>('salarySacrifice');
  const [pensionOnA, setPensionOnA] = useState<'total' | 'qualifying'>('total');
  const [studentLoanPlansA, setStudentLoanPlansA] = useState<string[]>([]);
  const [customTaxCodeA, setCustomTaxCodeA] = useState<boolean>(false);
  const [taxCodeA, setTaxCodeA] = useState<string>('1257L');
  const [blindAllowanceA, setBlindAllowanceA] = useState<boolean>(false);
  const [marriageAllowanceModeA, setMarriageAllowanceModeA] = useState<'receive' | 'transfer' | 'none'>('none');
  const [benefitsInKindA, setBenefitsInKindA] = useState<number>(0);

  // Core Calculator Input States (Scenario B)
  const [grossInputB, setGrossInputB] = useState<string>('60000');
  const [regionB, setRegionB] = useState<'UK' | 'Scotland'>('UK');
  const [pensionRateB, setPensionRateB] = useState<number>(5);
  const [pensionTypeB, setPensionTypeB] = useState<'salarySacrifice' | 'netPay' | 'reliefAtSource'>('salarySacrifice');
  const [pensionOnB, setPensionOnB] = useState<'total' | 'qualifying'>('total');
  const [studentLoanPlansB, setStudentLoanPlansB] = useState<string[]>([]);
  const [customTaxCodeB, setCustomTaxCodeB] = useState<boolean>(false);
  const [taxCodeB, setTaxCodeB] = useState<string>('1257L');
  const [blindAllowanceB, setBlindAllowanceB] = useState<boolean>(false);
  const [marriageAllowanceModeB, setMarriageAllowanceModeB] = useState<'receive' | 'transfer' | 'none'>('none');
  const [benefitsInKindB, setBenefitsInKindB] = useState<number>(0);

  // Comparison controls
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [activeScenarioFlow, setActiveScenarioFlow] = useState<'A' | 'B'>('A');
  const [editingScenario, setEditingScenario] = useState<'A' | 'B'>('A');

  // Shared Budget & Expenses Log State with Custom Categories
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: '1', name: 'Rent or Mortgage', amount: 800, category: 'mortgage_rent' },
    { id: '2', name: 'Utilities & Bills', amount: 150, category: 'utilities' },
    { id: '3', name: 'Weekly Groceries', amount: 300, category: 'groceries' },
    { id: '4', name: 'Phone & Internet', amount: 40, category: 'utilities' },
    { id: '5', name: 'Leisure & Drinks', amount: 120, category: 'leisure' },
    { id: '6', name: 'Netflix & Spotify', amount: 20, category: 'subscriptions' },
    { id: '7', name: 'Commuting Petrol', amount: 100, category: 'transport' },
    { id: '8', name: 'Credit card minimum', amount: 50, category: 'debts' },
  ]);

  // Derived numeric salary inputs
  const grossSalaryA = useMemo(() => {
    const parsed = parseFloat(grossInputA);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [grossInputA]);

  const grossSalaryB = useMemo(() => {
    const parsed = parseFloat(grossInputB);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [grossInputB]);

  // Read targets for currently edited scenario
  const grossInput = editingScenario === 'A' ? grossInputA : grossInputB;
  const region = editingScenario === 'A' ? regionA : regionB;
  const pensionRate = editingScenario === 'A' ? pensionRateA : pensionRateB;
  const pensionType = editingScenario === 'A' ? pensionTypeA : pensionTypeB;
  const pensionOn = editingScenario === 'A' ? pensionOnA : pensionOnB;
  const studentLoanPlans = editingScenario === 'A' ? studentLoanPlansA : studentLoanPlansB;
  const customTaxCode = editingScenario === 'A' ? customTaxCodeA : customTaxCodeB;
  const taxCode = editingScenario === 'A' ? taxCodeA : taxCodeB;
  const blindAllowance = editingScenario === 'A' ? blindAllowanceA : blindAllowanceB;
  const marriageAllowanceMode = editingScenario === 'A' ? marriageAllowanceModeA : marriageAllowanceModeB;
  const benefitsInKind = editingScenario === 'A' ? benefitsInKindA : benefitsInKindB;

  const grossSalary = editingScenario === 'A' ? grossSalaryA : grossSalaryB;

  // Setters routing dynamically
  const setGrossInput = (val: string) => {
    if (editingScenario === 'B') setGrossInputB(val);
    else setGrossInputA(val);
  };
  const setRegion = (val: 'UK' | 'Scotland') => {
    if (editingScenario === 'B') setRegionB(val);
    else setRegionA(val);
  };
  const setPensionRate = (val: number) => {
    if (editingScenario === 'B') setPensionRateB(val);
    else setPensionRateA(val);
  };
  const setPensionType = (val: 'salarySacrifice' | 'netPay' | 'reliefAtSource') => {
    if (editingScenario === 'B') setPensionTypeB(val);
    else setPensionTypeA(val);
  };
  const setPensionOn = (val: 'total' | 'qualifying') => {
    if (editingScenario === 'B') setPensionOnB(val);
    else setPensionOnA(val);
  };
  const setStudentLoanPlans = (val: string[]) => {
    if (editingScenario === 'B') setStudentLoanPlansB(val);
    else setStudentLoanPlansA(val);
  };
  const setCustomTaxCode = (val: boolean) => {
    if (editingScenario === 'B') setCustomTaxCodeB(val);
    else setCustomTaxCodeA(val);
  };
  const setTaxCode = (val: string) => {
    if (editingScenario === 'B') setTaxCodeB(val);
    else setTaxCodeA(val);
  };
  const setBlindAllowance = (val: boolean) => {
    if (editingScenario === 'B') setBlindAllowanceB(val);
    else setBlindAllowanceA(val);
  };
  const setMarriageAllowanceMode = (val: 'none' | 'receive' | 'transfer') => {
    if (editingScenario === 'B') setMarriageAllowanceModeB(val);
    else setMarriageAllowanceModeA(val);
  };
  const setBenefitsInKind = (val: number) => {
    if (editingScenario === 'B') setBenefitsInKindB(val);
    else setBenefitsInKindA(val);
  };

  // Group inputs cleanly for both
  const salaryInputsA: SalaryInputs = useMemo(() => {
    return {
      grossSalary: grossSalaryA,
      region: regionA,
      pensionRate: pensionRateA,
      pensionType: pensionTypeA,
      pensionOn: pensionOnA,
      studentLoanPlans: studentLoanPlansA,
      taxCode: taxCodeA,
      customTaxCode: customTaxCodeA,
      blindAllowance: blindAllowanceA,
      marriageAllowanceMode: marriageAllowanceModeA,
      benefitsInKind: benefitsInKindA,
    };
  }, [
    grossSalaryA, regionA, pensionRateA, pensionTypeA, pensionOnA,
    studentLoanPlansA, taxCodeA, customTaxCodeA, blindAllowanceA, marriageAllowanceModeA, benefitsInKindA
  ]);

  const salaryInputsB: SalaryInputs = useMemo(() => {
    return {
      grossSalary: grossSalaryB,
      region: regionB,
      pensionRate: pensionRateB,
      pensionType: pensionTypeB,
      pensionOn: pensionOnB,
      studentLoanPlans: studentLoanPlansB,
      taxCode: taxCodeB,
      customTaxCode: customTaxCodeB,
      blindAllowance: blindAllowanceB,
      marriageAllowanceMode: marriageAllowanceModeB,
      benefitsInKind: benefitsInKindB,
    };
  }, [
    grossSalaryB, regionB, pensionRateB, pensionTypeB, pensionOnB,
    studentLoanPlansB, taxCodeB, customTaxCodeB, blindAllowanceB, marriageAllowanceModeB, benefitsInKindB
  ]);

  // Execute tax calculations dynamically
  const breakdownA = useMemo(() => calculateSalaryDetails(salaryInputsA), [salaryInputsA]);
  const breakdownB = useMemo(() => calculateSalaryDetails(salaryInputsB), [salaryInputsB]);

  const marginalTaxRateA = useMemo(() => getMarginalTaxRate(salaryInputsA), [salaryInputsA]);
  const marginalTaxRateB = useMemo(() => getMarginalTaxRate(salaryInputsB), [salaryInputsB]);

  const breakdown = useMemo(() => {
    if (activeScenarioFlow === 'B') return breakdownB;
    return breakdownA;
  }, [activeScenarioFlow, breakdownA, breakdownB]);

  const salaryInputs = useMemo(() => {
    if (activeScenarioFlow === 'B') return salaryInputsB;
    return salaryInputsA;
  }, [activeScenarioFlow, salaryInputsA, salaryInputsB]);

  const marginalTaxRate = useMemo(() => {
    if (activeScenarioFlow === 'B') return marginalTaxRateB;
    return marginalTaxRateA;
  }, [activeScenarioFlow, marginalTaxRateA, marginalTaxRateB]);

  const toggleCompareMode = () => {
    const nextVal = !compareMode;
    setCompareMode(nextVal);
    if (nextVal) {
      setEditingScenario('B');
    } else {
      setEditingScenario('A');
    }
  };

  // Synchronise active region standard code
  const handleRegionChange = (newRegion: 'UK' | 'Scotland') => {
    setRegion(newRegion);
    const activeTaxCode = editingScenario === 'A' ? taxCodeA : taxCodeB;
    const setterTaxCode = editingScenario === 'A' ? setTaxCodeA : setTaxCodeB;

    if (newRegion === 'Scotland') {
      if (!activeTaxCode.startsWith('S')) {
        setterTaxCode('S' + activeTaxCode);
      }
    } else {
      if (activeTaxCode.startsWith('S')) {
        setterTaxCode(activeTaxCode.slice(1));
      }
    }
  };

  const toggleStudentLoan = (plan: string) => {
    const currentList = editingScenario === 'A' ? studentLoanPlansA : studentLoanPlansB;
    const setterList = editingScenario === 'A' ? setStudentLoanPlansA : setStudentLoanPlansB;

    if (currentList.includes(plan)) {
      setterList(currentList.filter(p => p !== plan));
    } else {
      setterList([...currentList, plan]);
    }
  };

  const handleSalaryPreset = (preset: number) => {
    setGrossInput(preset.toString());
  };

  // Helper formatting function
  const formatGBP = (v: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(v);

  const parsedTaxCodeResult = useMemo(() => {
    if (!customTaxCode) return { allowance: 12570, isKCode: false, kAddition: 0 };
    return parseTaxCode(taxCode, region);
  }, [customTaxCode, taxCode, region]);

  // Dynamic Flow: Selected income stream for budget & allocation
  const [incomeSource, setIncomeSource] = useState<'A' | 'B' | 'custom'>('A');
  const [customIncomeInput, setCustomIncomeInput] = useState<string>('2500');
  const [allocatedSavings, setAllocatedSavings] = useState<number>(400);

  const selectedIncomeAmount = useMemo(() => {
    if (incomeSource === 'A') return Math.round(breakdownA.takeHome / 12);
    if (incomeSource === 'B') return Math.round(breakdownB.takeHome / 12);
    const parsed = parseFloat(customIncomeInput);
    return isNaN(parsed) || parsed < 0 ? 0 : Math.round(parsed);
  }, [incomeSource, breakdownA.takeHome, breakdownB.takeHome, customIncomeInput]);

  const totalSpent = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const monthlySurplus = useMemo(() => {
    return Math.max(0, selectedIncomeAmount - totalSpent);
  }, [selectedIncomeAmount, totalSpent]);

  // Let's keep active monthly net pay for other indicators
  const monthlyTakeHome = useMemo(() => {
    return breakdown.takeHome / 12;
  }, [breakdown.takeHome]);

  // Navigation togglers
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-50" id="netpayflow-root">
      {/* Sidebar navigation */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0" id="netpayflow-content-area">
        <div className="bg-gradient-to-r from-emerald-50 to-sky-50 border-b border-zinc-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs sticky top-0 z-40 transition-all duration-300">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <span className="text-xs font-black text-emerald-950 block">
                Active Page Flow: {activeScenarioFlow === 'A' ? 'Salary A' : 'Salary B'}
              </span>
              <span className="text-[10px] text-zinc-500 font-medium block mt-0.5">
                Salary A ({formatGBP(grossSalaryA)}) {compareMode ? `vs Salary B (${formatGBP(grossSalaryB)})` : `(Saved Offer: Salary B @ ${formatGBP(grossSalaryB)})`}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 self-start sm:self-center">
            <span className="text-3xs uppercase font-extrabold text-zinc-450 tracking-wider">Apply Flow scenario:</span>
            <div className="inline-flex bg-white rounded-xl p-0.5 border border-zinc-200/80 shadow-2xs">
              <button
                onClick={() => setActiveScenarioFlow('A')}
                className={`cursor-pointer px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-150 ${
                  activeScenarioFlow === 'A'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-650 hover:bg-zinc-50 hover:text-zinc-950'
                }`}
              >
                Salary A
              </button>
              <button
                onClick={() => setActiveScenarioFlow('B')}
                className={`cursor-pointer px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-150 ${
                  activeScenarioFlow === 'B'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-650 hover:bg-zinc-50 hover:text-zinc-950'
                }`}
              >
                Salary B
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {currentPage === 'salary-calculator' && (
            <SalaryCalculator
              grossInput={grossInput}
              setGrossInput={setGrossInput}
              region={region}
              setRegion={setRegion}
              pensionRate={pensionRate}
              setPensionRate={setPensionRate}
              pensionType={pensionType}
              setPensionType={setPensionType}
              pensionOn={pensionOn}
              setPensionOn={setPensionOn}
              studentLoanPlans={studentLoanPlans}
              setStudentLoanPlans={setStudentLoanPlans}
              customTaxCode={customTaxCode}
              setCustomTaxCode={setCustomTaxCode}
              taxCode={taxCode}
              setTaxCode={setTaxCode}
              blindAllowance={blindAllowance}
              setBlindAllowance={setBlindAllowance}
              marriageAllowanceMode={marriageAllowanceMode}
              setMarriageAllowanceMode={setMarriageAllowanceMode}
              grossSalary={grossSalary}
              salaryInputs={salaryInputs}
              breakdown={breakdown}
              marginalTaxRate={marginalTaxRate}
              parsedTaxCodeResult={parsedTaxCodeResult}
              handleRegionChange={handleRegionChange}
              toggleStudentLoan={toggleStudentLoan}
              handleSalaryPreset={handleSalaryPreset}
              formatGBP={formatGBP}
              showInfo={showInfo}
              setShowInfo={setShowInfo}
              isAdvancedOpen={isAdvancedOpen}
              setIsAdvancedOpen={setIsAdvancedOpen}
              
              benefitsInKind={benefitsInKind}
              setBenefitsInKind={setBenefitsInKind}
              compareMode={compareMode}
              toggleCompareMode={toggleCompareMode}
              editingScenario={editingScenario}
              setEditingScenario={setEditingScenario}
              activeScenarioFlow={activeScenarioFlow}
              setActiveScenarioFlow={setActiveScenarioFlow}
              breakdownA={breakdownA}
              breakdownB={breakdownB}
              marginalTaxRateA={marginalTaxRateA}
              marginalTaxRateB={marginalTaxRateB}
              grossSalaryA={grossSalaryA}
              grossSalaryB={grossSalaryB}
              pensionRateA={pensionRateA}
              pensionRateB={pensionRateB}
              setPensionRateA={setPensionRateA}
              setPensionRateB={setPensionRateB}
            />
          )}

          {currentPage === 'budget-planner' && (
            <BudgetPlanner
              monthlyTakeHomeA={breakdownA.takeHome / 12}
              monthlyTakeHomeB={breakdownB.takeHome / 12}
              incomeSource={incomeSource}
              setIncomeSource={setIncomeSource}
              customIncomeInput={customIncomeInput}
              setCustomIncomeInput={setCustomIncomeInput}
              selectedIncomeAmount={selectedIncomeAmount}
              allocatedSavings={allocatedSavings}
              setAllocatedSavings={setAllocatedSavings}
              expenses={expenses}
              setExpenses={setExpenses}
              formatGBP={formatGBP}
            />
          )}

          {currentPage === 'savings-compounder' && (
            <SavingsCompounder
              monthlySurplus={monthlySurplus}
              allocatedSavings={allocatedSavings}
              formatGBP={formatGBP}
            />
          )}

          {currentPage === 'debt-overpayment' && (
            <DebtOverpayment
              monthlySurplus={monthlySurplus}
              allocatedSavings={allocatedSavings}
              formatGBP={formatGBP}
            />
          )}

          {currentPage === 'blog' && (
            <Blog
              setGrossInput={setGrossInput}
              setPensionRate={setPensionRate}
              setPensionType={setPensionType}
              toggleStudentLoan={toggleStudentLoan}
              setStudentLoanPlans={setStudentLoanPlans}
              setCurrentPage={setCurrentPage}
            />
          )}
        </main>

        {/* Global Compliance / HMRC Disclaimer */}
        <footer className="border-t border-zinc-200/80 bg-zinc-100/40 py-6 text-center text-[10px] text-zinc-400 font-medium px-4 mt-auto">
          <p>© 2026 NetPayFlow. All rights reserved.</p>
          <p className="mt-1 leading-relaxed">
            HMRC Calculations represent a high-fidelity estimation for the 2025/26 income tax bands, National Insurance thresholds, and student repayment models. Consistently test options to optimize tax-efficiency.
          </p>
        </footer>
      </div>
    </div>
  );
}
