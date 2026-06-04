/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useMemo } from 'react';
import PrivacyPolicy from '../components/PrivacyPolicy';
import AboutUs from '../components/AboutUs';
import TermsOfService from '../components/TermsOfService';
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
  const [grossInputA, setGrossInputA] = useState<string>('33000');
  const [isHourlyA, setIsHourlyA] = useState<boolean>(false);
  const [hourlyRateA, setHourlyRateA] = useState<string>('0');
  const [hoursPerWeekA, setHoursPerWeekA] = useState<string>('37.5');
  const [weeksPerYearA, setWeeksPerYearA] = useState<string>('52');
  const [regionA, setRegionA] = useState<'UK' | 'Scotland'>('UK');
  const [pensionRateA, setPensionRateA] = useState<number>(0);
  const [pensionTypeA, setPensionTypeA] = useState<'salarySacrifice' | 'netPay' | 'reliefAtSource'>('salarySacrifice');
  const [pensionOnA, setPensionOnA] = useState<'total' | 'qualifying'>('total');
  const [studentLoanPlansA, setStudentLoanPlansA] = useState<string[]>([]);
  const [customTaxCodeA, setCustomTaxCodeA] = useState<boolean>(false);
  const [taxCodeA, setTaxCodeA] = useState<string>('1257L');
  const [blindAllowanceA, setBlindAllowanceA] = useState<boolean>(false);
  const [marriageAllowanceModeA, setMarriageAllowanceModeA] = useState<'receive' | 'transfer' | 'none'>('none');
  const [benefitsInKindA, setBenefitsInKindA] = useState<number>(0);
  const [bonusInputA, setBonusInputA] = useState<string>('0');
  const [overtimeInputA, setOvertimeInputA] = useState<string>('0');
  const [childcareInputA, setChildcareInputA] = useState<string>('0');
  const [childBenefitInputA, setChildBenefitInputA] = useState<string>('0');

  // Core Calculator Input States (Scenario B)
  const [grossInputB, setGrossInputB] = useState<string>('33000');
  const [isHourlyB, setIsHourlyB] = useState<boolean>(false);
  const [hourlyRateB, setHourlyRateB] = useState<string>('0');
  const [hoursPerWeekB, setHoursPerWeekB] = useState<string>('37.5');
  const [weeksPerYearB, setWeeksPerYearB] = useState<string>('52');
  const [regionB, setRegionB] = useState<'UK' | 'Scotland'>('UK');
  const [pensionRateB, setPensionRateB] = useState<number>(0);
  const [pensionTypeB, setPensionTypeB] = useState<'salarySacrifice' | 'netPay' | 'reliefAtSource'>('salarySacrifice');
  const [pensionOnB, setPensionOnB] = useState<'total' | 'qualifying'>('total');
  const [studentLoanPlansB, setStudentLoanPlansB] = useState<string[]>([]);
  const [customTaxCodeB, setCustomTaxCodeB] = useState<boolean>(false);
  const [taxCodeB, setTaxCodeB] = useState<string>('1257L');
  const [blindAllowanceB, setBlindAllowanceB] = useState<boolean>(false);
  const [marriageAllowanceModeB, setMarriageAllowanceModeB] = useState<'receive' | 'transfer' | 'none'>('none');
  const [benefitsInKindB, setBenefitsInKindB] = useState<number>(0);
  const [bonusInputB, setBonusInputB] = useState<string>('0');
  const [overtimeInputB, setOvertimeInputB] = useState<string>('0');
  const [childcareInputB, setChildcareInputB] = useState<string>('0');
  const [childBenefitInputB, setChildBenefitInputB] = useState<string>('0');

  // Comparison controls
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [activeScenarioFlow, setActiveScenarioFlow] = useState<'A' | 'B'>('A');
  const [editingScenario, setEditingScenario] = useState<'A' | 'B'>('A');

  // Pro-rata states
  const [isProRataA, setIsProRataA] = useState<boolean>(false);
  const [proRataDaysA, setProRataDaysA] = useState<number>(4);
  const [isProRataB, setIsProRataB] = useState<boolean>(false);
  const [proRataDaysB, setProRataDaysB] = useState<number>(4);

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
    if (isHourlyA) {
      const rate = parseFloat(hourlyRateA) || 0;
      const hours = parseFloat(hoursPerWeekA) || 0;
      const weeks = parseFloat(weeksPerYearA) || 0;
      const annual = rate * hours * weeks;
      return isProRataA ? annual * (proRataDaysA / 5) : annual;
    }
    const parsed = parseFloat(grossInputA);
    const base = isNaN(parsed) || parsed < 0 ? 0 : parsed;
    return isProRataA ? base * (proRataDaysA / 5) : base;
  }, [grossInputA, isHourlyA, hourlyRateA, hoursPerWeekA, weeksPerYearA, isProRataA, proRataDaysA]);

  const grossSalaryB = useMemo(() => {
    if (isHourlyB) {
      const rate = parseFloat(hourlyRateB) || 0;
      const hours = parseFloat(hoursPerWeekB) || 0;
      const weeks = parseFloat(weeksPerYearB) || 0;
      const annual = rate * hours * weeks;
      return isProRataB ? annual * (proRataDaysB / 5) : annual;
    }
    const parsed = parseFloat(grossInputB);
    const base = isNaN(parsed) || parsed < 0 ? 0 : parsed;
    return isProRataB ? base * (proRataDaysB / 5) : base;
  }, [grossInputB, isHourlyB, hourlyRateB, hoursPerWeekB, weeksPerYearB, isProRataB, proRataDaysB]);

  const bonusA = useMemo(() => {
    const parsed = parseFloat(bonusInputA);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [bonusInputA]);

  const overtimeA = useMemo(() => {
    const parsed = parseFloat(overtimeInputA);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [overtimeInputA]);

  const childcareA = useMemo(() => {
    const parsed = parseFloat(childcareInputA);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [childcareInputA]);

  const childBenefitA = useMemo(() => {
    const parsed = parseFloat(childBenefitInputA);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [childBenefitInputA]);

  const bonusB = useMemo(() => {
    const parsed = parseFloat(bonusInputB);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [bonusInputB]);

  const overtimeB = useMemo(() => {
    const parsed = parseFloat(overtimeInputB);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [overtimeInputB]);

  const childcareB = useMemo(() => {
    const parsed = parseFloat(childcareInputB);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [childcareInputB]);

  const childBenefitB = useMemo(() => {
    const parsed = parseFloat(childBenefitInputB);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [childBenefitInputB]);

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
  
  const bonusInput = editingScenario === 'A' ? bonusInputA : bonusInputB;
  const overtimeInput = editingScenario === 'A' ? overtimeInputA : overtimeInputB;
  const childcareInput = editingScenario === 'A' ? childcareInputA : childcareInputB;
  const childBenefitInput = editingScenario === 'A' ? childBenefitInputA : childBenefitInputB;

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
  const setBonusInput = (val: string) => {
    if (editingScenario === 'B') setBonusInputB(val);
    else setBonusInputA(val);
  };
  const setOvertimeInput = (val: string) => {
    if (editingScenario === 'B') setOvertimeInputB(val);
    else setOvertimeInputA(val);
  };
  const setChildcareInput = (val: string) => {
    if (editingScenario === 'B') setChildcareInputB(val);
    else setChildcareInputA(val);
  };
  const setChildBenefitInput = (val: string) => {
    if (editingScenario === 'B') setChildBenefitInputB(val);
    else setChildBenefitInputA(val);
  };
  const setBenefitsInKind = (val: number) => {
    if (editingScenario === 'B') setBenefitsInKindB(val);
    else setBenefitsInKindA(val);
  };

  // Group inputs cleanly for both
  const salaryInputsA: SalaryInputs = useMemo(() => {
    return {
      grossSalary: grossSalaryA,
      isHourly: isHourlyA,
      hourlyRate: parseFloat(hourlyRateA) || 0,
      hoursPerWeek: parseFloat(hoursPerWeekA) || 0,
      weeksPerYear: parseFloat(weeksPerYearA) || 0,
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
      bonus: bonusA,
      overtime: overtimeA,
      childcareVouchers: childcareA,
      childBenefit: childBenefitA,
    };
  }, [
    grossSalaryA, isHourlyA, hourlyRateA, hoursPerWeekA, weeksPerYearA, regionA, pensionRateA, pensionTypeA, pensionOnA,
    studentLoanPlansA, taxCodeA, customTaxCodeA, blindAllowanceA, marriageAllowanceModeA, benefitsInKindA,
    bonusA, overtimeA, childcareA, childBenefitA
  ]);

  const salaryInputsB: SalaryInputs = useMemo(() => {
    return {
      grossSalary: grossSalaryB,
      isHourly: isHourlyB,
      hourlyRate: parseFloat(hourlyRateB) || 0,
      hoursPerWeek: parseFloat(hoursPerWeekB) || 0,
      weeksPerYear: parseFloat(weeksPerYearB) || 0,
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
      bonus: bonusB,
      overtime: overtimeB,
      childcareVouchers: childcareB,
      childBenefit: childBenefitB,
    };
  }, [
    grossSalaryB, isHourlyB, hourlyRateB, hoursPerWeekB, weeksPerYearB, regionB, pensionRateB, pensionTypeB, pensionOnB,
    studentLoanPlansB, taxCodeB, customTaxCodeB, blindAllowanceB, marriageAllowanceModeB, benefitsInKindB,
    bonusB, overtimeB, childcareB, childBenefitB
  ]);

  // Read targets for currently edited scenario
  const isProRata = editingScenario === 'A' ? isProRataA : isProRataB;
  const proRataDays = editingScenario === 'A' ? proRataDaysA : proRataDaysB;

  // Setters routing dynamically
  const setIsProRata = (val: boolean) => {
    if (editingScenario === 'B') setIsProRataB(val);
    else setIsProRataA(val);
  };
  const setProRataDays = (val: number) => {
    if (editingScenario === 'B') setProRataDaysB(val);
    else setProRataDaysA(val);
  };

  const isHourly = editingScenario === 'A' ? isHourlyA : isHourlyB;
  const setIsHourly = (val: boolean) => {
    if (editingScenario === 'B') setIsHourlyB(val);
    else setIsHourlyA(val);
  };
  const hourlyRate = editingScenario === 'A' ? hourlyRateA : hourlyRateB;
  const setHourlyRate = (val: string) => {
    if (editingScenario === 'B') setHourlyRateB(val);
    else setHourlyRateA(val);
  };
  const hoursPerWeek = editingScenario === 'A' ? hoursPerWeekA : hoursPerWeekB;
  const setHoursPerWeek = (val: string) => {
    if (editingScenario === 'B') setHoursPerWeekB(val);
    else setHoursPerWeekA(val);
  };
  const weeksPerYear = editingScenario === 'A' ? weeksPerYearA : weeksPerYearB;
  const setWeeksPerYear = (val: string) => {
    if (editingScenario === 'B') setWeeksPerYearB(val);
    else setWeeksPerYearA(val);
  };

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

  const resetAll = () => {
    setGrossInputA('33000');
    setGrossInputB('33000');
    setIsHourlyA(false);
    setIsHourlyB(false);
    setHourlyRateA('0');
    setHourlyRateB('0');
    setHoursPerWeekA('37.5');
    setHoursPerWeekB('37.5');
    setWeeksPerYearA('52');
    setWeeksPerYearB('52');
    setRegionA('UK');
    setRegionB('UK');
    setPensionRateA(0);
    setPensionRateB(0);
    setPensionTypeA('salarySacrifice');
    setPensionTypeB('salarySacrifice');
    setPensionOnA('total');
    setPensionOnB('total');
    setStudentLoanPlansA([]);
    setStudentLoanPlansB([]);
    setCustomTaxCodeA(false);
    setCustomTaxCodeB(false);
    setTaxCodeA('1257L');
    setTaxCodeB('1257L');
    setBlindAllowanceA(false);
    setBlindAllowanceB(false);
    setMarriageAllowanceModeA('none');
    setMarriageAllowanceModeB('none');
    setBenefitsInKindA(0);
    setBenefitsInKindB(0);
    setBonusInputA('0');
    setBonusInputB('0');
    setOvertimeInputA('0');
    setOvertimeInputB('0');
    setChildcareInputA('0');
    setChildcareInputB('0');
    setChildBenefitInputA('0');
    setChildBenefitInputB('0');
    setCompareMode(false);
    setEditingScenario('A');
    setActiveScenarioFlow('A');
    setIsProRataA(false);
    setIsProRataB(false);
    setProRataDaysA(4);
    setProRataDaysB(4);
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
  const [isBenefitsOpen, setIsBenefitsOpen] = useState<boolean>(false);
  const [isTaxCodesOpen, setIsTaxCodesOpen] = useState<boolean>(false);
  const [isStudentLoansOpen, setIsStudentLoansOpen] = useState<boolean>(false);
  const [showPrivacy, setShowPrivacy] = useState<boolean>(false);
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showTerms, setShowTerms] = useState<boolean>(false);

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
          
          {compareMode && (
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
          )}
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
              isBenefitsOpen={isBenefitsOpen}
              setIsBenefitsOpen={setIsBenefitsOpen}
              isTaxCodesOpen={isTaxCodesOpen}
              setIsTaxCodesOpen={setIsTaxCodesOpen}
              isStudentLoansOpen={isStudentLoansOpen}
              setIsStudentLoansOpen={setIsStudentLoansOpen}
              isProRata={isProRata}
              setIsProRata={setIsProRata}
              proRataDays={proRataDays}
              setProRataDays={setProRataDays}
              
              isHourly={isHourly}
              setIsHourly={setIsHourly}
              hourlyRate={hourlyRate}
              setHourlyRate={setHourlyRate}
              hoursPerWeek={hoursPerWeek}
              setHoursPerWeek={setHoursPerWeek}
              weeksPerYear={weeksPerYear}
              setWeeksPerYear={setWeeksPerYear}
              
              benefitsInKind={benefitsInKind}
              setBenefitsInKind={setBenefitsInKind}
              bonusInput={bonusInput}
              setBonusInput={setBonusInput}
              overtimeInput={overtimeInput}
              setOvertimeInput={setOvertimeInput}
              childcareInput={childcareInput}
              setChildcareInput={setChildcareInput}
              childBenefitInput={childBenefitInput}
              setChildBenefitInput={setChildBenefitInput}
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
              resetAll={resetAll}
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
              setGrossInputA={setGrossInputA}
              setGrossInputB={setGrossInputB}
              setCompareMode={setCompareMode}
              setEditingScenario={setEditingScenario}
              setPensionRate={setPensionRate}
              setPensionType={setPensionType}
              toggleStudentLoan={toggleStudentLoan}
              setStudentLoanPlans={setStudentLoanPlans}
              setIsProRata={setIsProRata}
              setProRataDays={setProRataDays}
              setCurrentPage={setCurrentPage}
            />
          )}
        </main>

        {/* Global Compliance / HMRC Disclaimer */}
        <footer className="border-t border-zinc-200/80 bg-zinc-100/40 py-6 text-center text-[10px] text-zinc-400 font-medium px-4 mt-auto">
          <p>
            © 2026 NetPayFlow. All rights reserved. 
            <button onClick={() => setShowPrivacy(true)} className="hover:text-zinc-900 underline ml-1">Privacy Policy</button>
            <button onClick={() => setShowAbout(true)} className="hover:text-zinc-900 underline ml-3">About Us</button>
            <button onClick={() => setShowTerms(true)} className="hover:text-zinc-900 underline ml-3">Terms of Service</button>
          </p>
          <p className="mt-1 leading-relaxed">
            HMRC Calculations represent a high-fidelity estimation for the 2025/26 income tax bands, National Insurance thresholds, and student repayment models. Consistently test options to optimize tax-efficiency.
          </p>
        </footer>
        {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
        {showAbout && <AboutUs onClose={() => setShowAbout(false)} />}
        {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
      </div>
    </div>
  );
}
