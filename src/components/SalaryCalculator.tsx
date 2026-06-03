import React, { useMemo } from 'react';
import VisualSlice from './VisualSlice';
import BreakdownTable from './BreakdownTable';
import InfoSection from './InfoSection';
import { SalaryInputs, SalaryBreakdown } from '../types';
import {
  ChevronDown,
  ChevronUp,
  Settings,
  HelpCircle,
  PiggyBank,
  GraduationCap,
  MapPin,
  Check,
  Zap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  HeartCrack,
  Coins
} from 'lucide-react';

interface SalaryCalculatorProps {
  grossInput: string;
  setGrossInput: (val: string) => void;
  region: 'UK' | 'Scotland';
  setRegion: (region: 'UK' | 'Scotland') => void;
  pensionRate: number;
  setPensionRate: (rate: number) => void;
  pensionType: 'salarySacrifice' | 'netPay' | 'reliefAtSource';
  setPensionType: (type: 'salarySacrifice' | 'netPay' | 'reliefAtSource') => void;
  pensionOn: 'total' | 'qualifying';
  setPensionOn: (on: 'total' | 'qualifying') => void;
  studentLoanPlans: string[];
  setStudentLoanPlans: (plans: string[]) => void;
  customTaxCode: boolean;
  setCustomTaxCode: (custom: boolean) => void;
  taxCode: string;
  setTaxCode: (code: string) => void;
  blindAllowance: boolean;
  setBlindAllowance: (blind: boolean) => void;
  marriageAllowanceMode: 'none' | 'receive' | 'transfer';
  setMarriageAllowanceMode: (mode: 'none' | 'receive' | 'transfer') => void;

  grossSalary: number;
  salaryInputs: SalaryInputs;
  breakdown: SalaryBreakdown;
  marginalTaxRate: number;
  parsedTaxCodeResult: { allowance: number; isKCode: boolean; kAddition: number };

  handleRegionChange: (newRegion: 'UK' | 'Scotland') => void;
  toggleStudentLoan: (plan: string) => void;
  handleSalaryPreset: (preset: number) => void;
  formatGBP: (v: number) => string;

  showInfo: boolean;
  setShowInfo: (show: boolean) => void;
  isBenefitsOpen: boolean;
  setIsBenefitsOpen: (open: boolean) => void;
  isTaxCodesOpen: boolean;
  setIsTaxCodesOpen: (open: boolean) => void;
  isStudentLoansOpen: boolean;
  setIsStudentLoansOpen: (open: boolean) => void;

  // New comparison and benefits in kind props
  benefitsInKind?: number;
  setBenefitsInKind?: (val: number) => void;
  bonusInput?: string;
  setBonusInput?: (val: string) => void;
  overtimeInput?: string;
  setOvertimeInput?: (val: string) => void;
  childcareInput?: string;
  setChildcareInput?: (val: string) => void;
  childBenefitInput?: string;
  setChildBenefitInput?: (val: string) => void;
  compareMode?: boolean;
  toggleCompareMode?: () => void;
  editingScenario?: 'A' | 'B';
  setEditingScenario?: (val: 'A' | 'B') => void;
  activeScenarioFlow?: 'A' | 'B';
  setActiveScenarioFlow?: (val: 'A' | 'B') => void;
  breakdownA?: SalaryBreakdown;
  breakdownB?: SalaryBreakdown;
  marginalTaxRateA?: number;
  marginalTaxRateB?: number;
  grossSalaryA?: number;
  grossSalaryB?: number;
  pensionRateA?: number;
  pensionRateB?: number;
  setPensionRateA?: (val: number) => void;
  setPensionRateB?: (val: number) => void;
}

export default function SalaryCalculator({
  grossInput,
  setGrossInput,
  region,
  setRegion,
  pensionRate,
  setPensionRate,
  pensionType,
  setPensionType,
  pensionOn,
  setPensionOn,
  studentLoanPlans,
  setStudentLoanPlans,
  customTaxCode,
  setCustomTaxCode,
  taxCode,
  setTaxCode,
  blindAllowance,
  setBlindAllowance,
  marriageAllowanceMode,
  setMarriageAllowanceMode,

  grossSalary,
  salaryInputs,
  breakdown,
  marginalTaxRate,
  parsedTaxCodeResult,

  handleRegionChange,
  toggleStudentLoan,
  handleSalaryPreset,
  formatGBP,

  showInfo,
  setShowInfo,
  isBenefitsOpen,
  setIsBenefitsOpen,
  isTaxCodesOpen,
  setIsTaxCodesOpen,
  isStudentLoansOpen,
  setIsStudentLoansOpen,

  benefitsInKind = 0,
  setBenefitsInKind = () => {},
  bonusInput = '0',
  setBonusInput = () => {},
  overtimeInput = '0',
  setOvertimeInput = () => {},
  childcareInput = '0',
  setChildcareInput = () => {},
  childBenefitInput = '0',
  setChildBenefitInput = () => {},
  compareMode = false,
  toggleCompareMode = () => {},
  editingScenario = 'A',
  setEditingScenario = () => {},
  activeScenarioFlow = 'A',
  setActiveScenarioFlow = () => {},
  breakdownA,
  breakdownB,
  marginalTaxRateA = 0,
  marginalTaxRateB = 0,
  grossSalaryA = 50000,
  grossSalaryB = 60000,
  pensionRateA = 5,
  pensionRateB = 5,
  setPensionRateA = () => {},
  setPensionRateB = () => {}
}: SalaryCalculatorProps) {

  // Dynamic live advisor alerts calculations
  const adjustedIncome = useMemo(() => {
    return grossSalary + benefitsInKind - breakdown.pensionContribution;
  }, [grossSalary, benefitsInKind, breakdown.pensionContribution]);

  const unadjustedIncome = useMemo(() => {
    return grossSalary + benefitsInKind;
  }, [grossSalary, benefitsInKind]);

  const liveAlert = useMemo(() => {
    if (unadjustedIncome <= 0) return null;

    const pensionableBasis = pensionOn === 'qualifying' 
      ? Math.max(0, Math.min(50270, grossSalary) - 6240) 
      : grossSalary;

    const hrLimit = region === 'Scotland' ? 43662 : 50270;
    const approachingLimit = region === 'Scotland' ? 41505 : 48000;
    const taxRateLabel = region === 'Scotland' ? '42%' : '40%';

    // 1. £100k - £125,140 Personal Allowance Taper (60% Tax Trap)
    if (unadjustedIncome > 100000 && unadjustedIncome <= 125140) {
      if (adjustedIncome <= 100000) {
        return {
          type: 'trap-100k-success',
          colorTheme: 'emerald',
          title: '🎉 Tax Trap Avoided Successfully',
          message: `Congratulations! Your adjusted net income of ${formatGBP(adjustedIncome)} is now below £100,000. You have fully restored your standard Personal Allowance and bypassed the 60% marginal tax trap!`,
          tip: `Your pension allocation of ${formatGBP(breakdown.pensionContribution)} is shielding you from losing your personal tax-free allowance. Excellent planning!`,
          canOptimize: false,
        };
      }

      const requiredContribution = unadjustedIncome - 100000;
      let requiredRate = 0;
      if (pensionableBasis > 0) {
        const exactRate = (requiredContribution / pensionableBasis) * 100;
        requiredRate = Math.ceil((exactRate + 0.05) * 2) / 2;
      }

      const canOptimize = requiredRate > 0 && requiredRate <= 50;
      const potentialTaxSaving = requiredContribution * 0.40;

      return {
        type: 'trap-100k',
        colorTheme: 'amber',
        title: '🚨 Personal Allowance "60% Tax Trap"',
        message: `Your adjusted net income of ${formatGBP(unadjustedIncome)} falls within the £100k–£125k zone. For every £2 earned above £100,000, you lose £1 of your personal allowance, resulting in an effective 60% marginal tax rate on this portion.`,
        tip: `You can avoid this completely by making a larger pension contribution. Contributing ${formatGBP(requiredContribution)} more to your pension will reset your taxable adjusted income below £100,000, saving you approximately ${formatGBP(potentialTaxSaving)} in cash tax while securing your retirement.`,
        requiredRate,
        canOptimize,
        actionLabel: `Set Pension to ${requiredRate}%`
      };
    }

    // 2. Child Benefit High Income Charge Zone (£60,000 - £80,000)
    if (unadjustedIncome > 60000 && unadjustedIncome <= 80005) {
      if (adjustedIncome <= 60000) {
        return {
          type: 'child-benefit-success',
          colorTheme: 'emerald',
          title: '🎉 Child Benefit Preserved',
          message: `Congratulations! Your adjusted net income of ${formatGBP(adjustedIncome)} is £60,000 or below. You have completely bypassed the High Income Child Benefit Charge and retained 100% of your claim!`,
          tip: `Reducing your taxable adjusted income down to £60,000 protects your Child Benefit payments. Great job securing your family rights!`,
          canOptimize: false,
        };
      }

      const requiredContribution = unadjustedIncome - 60000;
      let requiredRate = 0;
      if (pensionableBasis > 0) {
        const exactRate = (requiredContribution / pensionableBasis) * 100;
        requiredRate = Math.ceil((exactRate + 0.05) * 2) / 2;
      }
      const canOptimize = requiredRate > 0 && requiredRate <= 50;

      return {
        type: 'child-benefit',
        colorTheme: 'amber',
        title: '👶 Child Benefit Taper Zone',
        message: `Your adjusted net income is ${formatGBP(unadjustedIncome)}. Between £60,000 and £80,000, the High Income Child Benefit Charge clawback applies, effectively adding a steep taper tax rate if you claim Child Benefit.`,
        tip: `Reducing your taxable adjusted income down to £60,000 via salary sacrifice or net pay pensions will keep 100% of your Child Benefit payments intact. Doing so requires a total pension rate of ${requiredRate}%.`,
        requiredRate,
        canOptimize,
        actionLabel: `Reduce to £60k (Set Pension to ${requiredRate}%)`
      };
    }

    // 3. Entering Higher Rate Bracket (£50,270 UK, £43,662 Scotland)
    if (unadjustedIncome > hrLimit && unadjustedIncome <= hrLimit + 12000) {
      if (adjustedIncome <= hrLimit) {
        return {
          type: 'higher-rate-success',
          colorTheme: 'emerald',
          title: `🎉 Below Higher Rate Threshold`,
          message: `Congratulations! Your adjusted net income of ${formatGBP(adjustedIncome)} has dropped below the higher-rate threshold of ${formatGBP(hrLimit)}. You have avoided the ${taxRateLabel} higher tax rate and kept your earnings inside the basic rate band!`,
          tip: `By utilizing your pension allocation, you save substantial tax upfront. You are paying 20% on all taxable amounts instead of ${taxRateLabel}!`,
          canOptimize: false,
        };
      }

      const requiredContribution = unadjustedIncome - hrLimit;
      let requiredRate = 0;
      if (pensionableBasis > 0) {
        const exactRate = (requiredContribution / pensionableBasis) * 100;
        requiredRate = Math.ceil((exactRate + 0.05) * 2) / 2;
      }
      const canOptimize = requiredRate > 0 && requiredRate <= 50;

      return {
        type: 'higher-rate',
        colorTheme: 'amber',
        title: `📈 Entered Higher Rate Zone (${taxRateLabel} Tax)`,
        message: `Your adjusted net income of ${formatGBP(unadjustedIncome)} placed you into the Higher Rate tax bracket. This means you qualify for ${taxRateLabel} tax relief on pension contributions!`,
        tip: `To drop your net taxable income exactly down to the basic rate threshold and save substantial tax immediately, you can increase your total pension contribution to ${requiredRate}%.`,
        requiredRate,
        canOptimize,
        actionLabel: `Optimize Pension (Set to ${requiredRate}%)`
      };
    }

    // 4. Approaching Higher Rate Bracket (£48,000 UK, £41,505 Scotland)
    if (unadjustedIncome >= approachingLimit && unadjustedIncome <= hrLimit) {
      if (adjustedIncome < approachingLimit) {
        return {
          type: 'approaching-success',
          colorTheme: 'emerald',
          title: '🎉 Comfortably Below Higher Rate',
          message: `Congratulations! Your adjusted net income is ${formatGBP(adjustedIncome)}, which is comfortably below the approaching and actual higher-rate threshold of ${formatGBP(hrLimit)}.`,
          tip: `Your pension allocation has kept your taxable income at a safe distance from the ${taxRateLabel} tax bracket. Great foresight!`,
          canOptimize: false,
        };
      } else {
        const headroom = hrLimit - adjustedIncome;
        return {
          type: 'approaching-hr',
          colorTheme: 'amber',
          title: '⚠️ Approaching Higher Rate Threshold',
          message: `Your adjusted net income is ${formatGBP(adjustedIncome)}. You are approaching the ${taxRateLabel} Higher Rate threshold of ${formatGBP(hrLimit)}. You have only ${formatGBP(headroom)} left before your next earnings start being taxed at ${taxRateLabel}.`,
          tip: `Consider using salary sacrifice or making pension contributions to absorb your upcoming earnings, keeping your taxable income completely inside the basic rate zone and avoiding the jump to ${taxRateLabel}!`,
          canOptimize: false,
        };
      }
    }

    return null;
  }, [unadjustedIncome, adjustedIncome, grossSalary, pensionOn, region, formatGBP, breakdown.pensionContribution]);

  const handleAutoOptimizePension = (targetRate: number) => {
    // Apply optimal rate to active scenario
    setPensionRate(targetRate);
  };

  return (
    <div className="space-y-8" id="salary-cal-container">
      {/* Intro Banner with Compare Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-150 pb-5">
        <div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            HMRC PAYROLL ENGINE 2025/26
          </span>
          <h2 className="text-xl font-black text-zinc-950 mt-1.5 flex items-center gap-2">
            NetPayFlow Salary Workspace
          </h2>
          <p className="text-sm text-zinc-600 mt-2 bg-zinc-100 p-3 rounded-lg">
            In NetPayFlow, your Net Pay feeds your budget planner. Your budget planner uncovers a surplus, and your surplus accelerates your savings compounds or pays off your mortgage decades early. 
            <br/><br/>
            Toggle <strong className='text-zinc-900'>Compare Salary A & B</strong> to analyze two different salary scenarios. Once activated, the "Flow scenario" allows you to choose which resulting Net Pay feeds your planner.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`px-3.5 py-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
              showInfo
                ? 'bg-zinc-100 border-zinc-300 text-zinc-900 shadow-sm'
                : 'bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50 hover:text-zinc-900'
            }`}
            id="btn-salary-info-toggle"
          >
            <HelpCircle className="w-4 h-4 text-emerald-500" />
            <span>Data Sources and Methodology</span>
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="transition-all duration-300">
          <InfoSection />
        </div>
      )}

      {/* Comparison Scenario Tabs */}
      {compareMode && (
        <div className="bg-white border border-zinc-200 p-2 rounded-2xl flex items-center justify-between gap-4 max-w-xl shadow-3xs">
          <div className="flex items-center gap-1.5 pl-2">
            <Settings className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-extrabold text-zinc-800 uppercase tracking-tight">Active Config:</span>
          </div>
          <div className="grid grid-cols-2 gap-1 px-1 flex-1 max-w-sm">
            <button
              onClick={() => setEditingScenario('A')}
              className={`cursor-pointer py-2 rounded-xl text-xs font-black transition-all ${
                editingScenario === 'A'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              Salary A
            </button>
            <button
              onClick={() => setEditingScenario('B')}
              className={`cursor-pointer py-2 rounded-xl text-xs font-black transition-all ${
                editingScenario === 'B'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600'
              }`}
            >
              Salary B
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CONTROLS & PARAMS */}
        <div className="lg:col-span-5 space-y-6 bg-white border border-zinc-250 p-5 sm:p-6 rounded-2xl shadow-sm" id="calculator-inputs-panel">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
              <Settings className="w-4 h-4 text-zinc-400" />
              Adjust {compareMode ? (editingScenario === 'A' ? 'Salary A' : 'Salary B') : 'Income Details'}
            </h2>
            {compareMode && (
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                editingScenario === 'A' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                  : 'bg-sky-50 text-sky-700 border-sky-100'
              }`}>
                Editing Salary {editingScenario}
              </span>
            )}
          </div>

          {/* 1. Annual Gross Salary Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-zinc-800 animate-pulse-subtle" htmlFor="salary-amount-input">
                Annual Gross Salary
              </label>
              
              {/* Compare Toggle Switch moved directly inside the Annual Salary box */}
              <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 shadow-3xs px-2.5 py-1 rounded-lg">
                <label className="text-[10px] font-extrabold text-zinc-600 cursor-pointer select-none" htmlFor="compare-toggle-input">
                  Compare Salary A & B
                </label>
                <button
                  id="compare-toggle-input"
                  type="button"
                  onClick={toggleCompareMode}
                  className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-205 ease-in-out focus:outline-none ${
                    compareMode ? 'bg-zinc-900' : 'bg-zinc-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition duration-205 ease-in-out ${
                      compareMode ? 'translate-x-3' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-bold">£</span>
              <input
                id="salary-amount-input"
                type="number"
                min="0"
                max="10000000"
                step="500"
                value={grossInput}
                onChange={e => setGrossInput(e.target.value)}
                className="w-full text-base pl-8 pr-12 py-3 bg-zinc-55 border border-zinc-200 rounded-xl font-bold focus:border-zinc-450 focus:bg-white focus:outline-none transition-all"
                placeholder="e.g. 50000"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">/ yr</span>
            </div>

            {/* Range Slider for Scrubbing - Replaced +- 1000 buttons */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold">
                <span>£10,000</span>
                <span>£250,000+</span>
              </div>
              <input
                type="range"
                min="10000"
                max="250000"
                step="1000"
                value={grossSalary || 10000}
                onChange={e => setGrossInput(e.target.value)}
                className="w-full h-1.5 accent-zinc-950 bg-zinc-150 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Dynamic Smart Tax Alert & Auto-Deductions optimization (Advisor Box) */}
          {liveAlert && (
            <div 
              className={`border p-4 rounded-xl space-y-3 transition-colors duration-300 ${
                liveAlert.colorTheme === 'emerald'
                  ? 'border-emerald-250 bg-emerald-50/45 text-emerald-950 shadow-sm'
                  : 'border-amber-200 bg-amber-50/40 text-amber-955 shadow-3xs'
              }`} 
              id="tax-advisor-alert-box"
            >
              <div className="flex items-start gap-2.5">
                {liveAlert.colorTheme === 'emerald' ? (
                  <Check className="w-4.5 h-4.5 text-emerald-600 bg-emerald-100/80 rounded-full p-0.5 shrink-0 mt-0.5" />
                ) : (
                  <Sparkles className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <h4 className={`text-[11px] font-extrabold uppercase tracking-wide leading-tight ${
                    liveAlert.colorTheme === 'emerald' ? 'text-emerald-900' : 'text-amber-900'
                  }`}>
                    {liveAlert.title}
                  </h4>
                  <p className={`text-3xs leading-relaxed font-semibold ${
                    liveAlert.colorTheme === 'emerald' ? 'text-emerald-800' : 'text-amber-850'
                  }`}>
                    {liveAlert.message}
                  </p>
                </div>
              </div>

              <div className={`border-t pt-3 space-y-2 ${
                liveAlert.colorTheme === 'emerald' ? 'border-emerald-200/50' : 'border-amber-200/55'
              }`}>
                <span className={`text-[10px] font-bold block px-2.5 py-1.5 rounded-md border ${
                  liveAlert.colorTheme === 'emerald' 
                    ? 'border-emerald-100 bg-white/70 text-emerald-850' 
                    : 'border-amber-100 bg-white text-zinc-600'
                }`}>
                  💡 {liveAlert.tip}
                </span>
                
                {liveAlert.canOptimize && (
                  <button
                    type="button"
                    onClick={() => handleAutoOptimizePension(liveAlert.requiredRate || 0)}
                    className="cursor-pointer w-full text-[10px] font-bold py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>{liveAlert.actionLabel}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 2. Employment Jurisdiction (Region) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-450" />
              Tax Jurisdiction
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleRegionChange('UK')}
                className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                  region === 'UK'
                    ? 'border-zinc-950 bg-zinc-950 text-white shadow-sm'
                    : 'border-zinc-200 bg-white text-zinc-650 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
                id="btn-region-uk"
              >
                <div className="text-left">
                  <div className="text-xs font-bold">Rest of UK</div>
                  <div className={`text-[9px] mt-0.5 ${region === 'UK' ? 'text-zinc-350' : 'text-zinc-400'}`}>
                    England, Wales, NI
                  </div>
                </div>
                <span className="text-lg">🇬🇧</span>
              </button>

              <button
                type="button"
                onClick={() => handleRegionChange('Scotland')}
                className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                  region === 'Scotland'
                    ? 'border-zinc-950 bg-zinc-950 text-white shadow-sm'
                    : 'border-zinc-200 bg-white text-zinc-650 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
                id="btn-region-scotland"
              >
                <div className="text-left">
                  <div className="text-xs font-bold">Scotland</div>
                  <div className={`text-[9px] mt-0.5 ${region === 'Scotland' ? 'text-zinc-350' : 'text-zinc-400'}`}>
                    Scottish tax bands
                  </div>
                </div>
                <span className="text-lg">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
              </button>
            </div>
          </div>

          {/* 3. Pension Configuration */}
          <div className="space-y-3 pt-4 border-t border-zinc-100">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                <PiggyBank className="w-4 h-4 text-zinc-550" />
                Pension Contribution
              </label>
              <div className="flex items-center gap-1 text-xs font-bold text-zinc-950 bg-zinc-100 px-2 py-0.5 rounded-lg font-mono">
                <span>{pensionRate}%</span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="50"
              step="0.5"
              value={pensionRate}
              onChange={e => setPensionRate(parseFloat(e.target.value))}
              className="w-full accent-zinc-900 h-1 rounded-lg bg-zinc-200 cursor-pointer"
            />

            {/* Pension options */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { value: 'salarySacrifice', label: 'Salary Sacrifice', detail: 'Saves tax & NI' },
                { value: 'netPay', label: 'Net Pay', detail: 'Saves tax only' },
                { value: 'reliefAtSource', label: 'Relief at Source', detail: 'Personal relief' }
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPensionType(opt.value as any)}
                  className={`cursor-pointer p-2 rounded-xl border text-center transition-all flex flex-col justify-between h-15 ${
                    pensionType === opt.value
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                      : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700'
                  }`}
                >
                  <span className="text-[10px] font-bold leading-tight block">{opt.label}</span>
                  <span className={`text-[8px] leading-none ${pensionType === opt.value ? 'text-zinc-300' : 'text-zinc-450'}`}>
                    {opt.detail}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center bg-zinc-50 p-2.5 rounded-xl border border-zinc-150">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Salary Basis</span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setPensionOn('total')}
                  className={`cursor-pointer px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase transition-all ${
                    pensionOn === 'total' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-250' : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  Total Salary
                </button>
                <button
                  type="button"
                  onClick={() => setPensionOn('qualifying')}
                  className={`cursor-pointer px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase transition-all ${
                    pensionOn === 'qualifying' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-250' : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  Qualifying Earnings
                </button>
              </div>
            </div>
          </div>

          {/* 4. Student Loan Selector */}
          <div className="space-y-2 pt-4 border-t border-zinc-100">
            <button
              type="button"
              onClick={() => setIsStudentLoansOpen(!isStudentLoansOpen)}
              className="cursor-pointer w-full flex items-center justify-between py-2 text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-zinc-550" />
                Student Loans Setup
              </label>
              {isStudentLoansOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isStudentLoansOpen && (
                <div className="flex flex-col gap-1.5">
                {[
                  { value: 'plan1', label: 'Plan 1', range: 'Above £24,990' },
                  { value: 'plan2', label: 'Plan 2', range: 'Above £27,295' },
                  { value: 'plan4', label: 'Plan 4', range: 'Above £31,395 (Scottish standard)' },
                  { value: 'plan5', label: 'Plan 5', range: 'Above £25,000' },
                  { value: 'postgrad', label: 'Postgraduate', range: 'Above £21,000 (6%)' }
                ].map(plan => {
                  const isActive = studentLoanPlans.includes(plan.value);
                  return (
                    <button
                      key={plan.value}
                      type="button"
                      onClick={() => toggleStudentLoan(plan.value)}
                      className={`cursor-pointer px-3.5 py-2 rounded-xl border flex items-center justify-between text-left transition-all ${
                        isActive
                          ? 'bg-zinc-900 border-zinc-900 text-white shadow-sm'
                          : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      <div>
                        <span className="text-[11px] font-bold block">{plan.label}</span>
                        <span className={`text-[9px] ${isActive ? 'text-zinc-300' : 'text-zinc-400'}`}>
                          {plan.range}
                        </span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-white text-zinc-900 border-white' : 'border-zinc-300'
                      }`}>
                        {isActive && <Check className="w-2.5 h-2.5 stroke-[4px]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Benefits Section */}
          <div className="border-t border-zinc-100 pt-3">
            <button
              type="button"
              onClick={() => setIsBenefitsOpen(!isBenefitsOpen)}
              className="cursor-pointer w-full flex items-center justify-between py-2 text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              <span className="text-xs font-extrabold uppercase tracking-wider">Benefits & Income Adjustments</span>
              {isBenefitsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isBenefitsOpen && (
              <div className="space-y-4 pt-3 transition-all duration-350">
                <div className="space-y-4 p-3.5 border border-zinc-150 rounded-xl bg-zinc-50 bg-opacity-40">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-zinc-800 flex justify-between items-center" htmlFor="bonus-input">
                       <span>Bonus</span>
                     </label>
                     <input id="bonus-input" type="number" value={bonusInput} onChange={e => setBonusInput(e.target.value)} className="w-full text-xs p-2 bg-white border border-zinc-200 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-zinc-800 flex justify-between items-center" htmlFor="overtime-input">
                       <span>Overtime</span>
                     </label>
                     <input id="overtime-input" type="number" value={overtimeInput} onChange={e => setOvertimeInput(e.target.value)} className="w-full text-xs p-2 bg-white border border-zinc-200 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-zinc-800 flex justify-between items-center" htmlFor="childcare-input">
                       <span>Childcare Vouchers</span>
                     </label>
                     <input id="childcare-input" type="number" value={childcareInput} onChange={e => setChildcareInput(e.target.value)} className="w-full text-xs p-2 bg-white border border-zinc-200 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-zinc-800 flex justify-between items-center" htmlFor="childbenefit-input">
                       <span>Child Benefit Received</span>
                     </label>
                     <input id="childbenefit-input" type="number" value={childBenefitInput} onChange={e => setChildBenefitInput(e.target.value)} className="w-full text-xs p-2 bg-white border border-zinc-200 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-800 flex justify-between items-center" htmlFor="benefits-in-kind-input">
                      <span>Benefits in Kind (P11D value)</span>
                      <span className="text-[9px] text-zinc-400 font-mono">Company car / Medical</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs font-bold">£</span>
                      <input
                        id="benefits-in-kind-input"
                        type="number"
                        min="0"
                        max="1000000"
                        step="100"
                        value={benefitsInKind || ''}
                        onChange={e => setBenefitsInKind(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full text-xs pl-7 pr-12 py-2 bg-white border border-zinc-200 rounded-xl font-bold focus:border-zinc-400 focus:outline-none"
                        placeholder="e.g. 1200"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-zinc-400">/ yr</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t border-zinc-100 pt-3">
            <button
              type="button"
              onClick={() => setIsTaxCodesOpen(!isTaxCodesOpen)}
              className="cursor-pointer w-full flex items-center justify-between py-2 text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              <span className="text-xs font-extrabold uppercase tracking-wider">Advanced Tax Codes</span>
              {isTaxCodesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isTaxCodesOpen && (
              <div className="space-y-4 pt-3 transition-all duration-350">
                {/* Custom Tax Code Toggle & Input */}
                <div className="space-y-2 p-3.5 border border-zinc-150 rounded-xl bg-zinc-50 bg-opacity-40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-800">Use Custom Tax Code</span>
                    <button
                      type="button"
                      onClick={() => setCustomTaxCode(!customTaxCode)}
                      className={`cursor-pointer w-9 h-5 rounded-full p-0.5 transition-colors duration-205 focus:outline-none ${
                        customTaxCode ? 'bg-zinc-900' : 'bg-zinc-200'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${customTaxCode ? 'translate-x-4' : ''}`} />
                    </button>
                  </div>

                  {customTaxCode && (
                    <div className="space-y-2.5 pt-2">
                      <input
                        type="text"
                        value={taxCode}
                        onChange={e => setTaxCode(e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-zinc-200 rounded-xl font-bold font-mono focus:border-zinc-400 focus:outline-none"
                        placeholder="e.g. 1257L or K100"
                      />
                      <div className="text-[10px] text-zinc-500 space-y-1 bg-white p-2.5 rounded-lg border border-zinc-100">
                        <div>
                          Parsed Allowance:{' '}
                          <strong className="text-zinc-800">
                            {parsedTaxCodeResult.isKCode
                              ? 'None (+K code adjustment applies)'
                              : formatGBP(parsedTaxCodeResult.allowance)}
                          </strong>
                        </div>
                        {parsedTaxCodeResult.isKCode && (
                          <div>
                            Adjudged Additional Income:{' '}
                            <strong className="text-zinc-805">{formatGBP(parsedTaxCodeResult.kAddition)}</strong>
                          </div>
                        )}
                        <div className="text-[9px] text-zinc-400 italic">
                          E.g. standard UK code 1257L offers £12,570. Prepending S handles Scotland.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Blind Allowance Option */}
                <button
                  type="button"
                  onClick={() => setBlindAllowance(!blindAllowance)}
                  className="cursor-pointer w-full flex items-center justify-between p-3.5 border border-zinc-205 rounded-xl bg-white hover:bg-zinc-50 text-left"
                >
                  <div>
                    <span className="text-xs font-bold block text-zinc-800">Blind Person's Allowance</span>
                    <span className="text-[9px] text-zinc-400 mt-0.5 block">Adds £3,070 tax-free allowance</span>
                  </div>
                  <div className={`flex items-center justify-center shrink-0 w-5 h-5 rounded-md border ${
                    blindAllowance ? 'bg-zinc-950 text-white border-zinc-950' : 'border-zinc-300'
                  }`}>
                    {blindAllowance && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                  </div>
                </button>

                {/* Marriage Allowance Option */}
                <div className="p-3.5 border border-zinc-205 rounded-xl bg-white space-y-3">
                  <div>
                    <span className="text-xs font-bold block text-zinc-800">Marriage Allowance Transfer</span>
                    <span className="text-[9px] text-zinc-400 mt-0.5 block">Transfer 10% (£1,260) of Personal Allowance</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 px-0.5">
                    {[
                      { value: 'none', label: 'None' },
                      { value: 'receive', label: 'Receive' },
                      { value: 'transfer', label: 'Transfer' }
                    ].map(mMode => (
                      <button
                        key={mMode.value}
                        type="button"
                        onClick={() => setMarriageAllowanceMode(mMode.value as any)}
                        className={`cursor-pointer py-1.5 rounded-lg text-[10px] font-extrabold uppercase transition-all ${
                          marriageAllowanceMode === mMode.value
                            ? 'bg-zinc-900 text-white shadow-sm'
                            : 'bg-zinc-100 text-zinc-650 hover:bg-zinc-205 hover:text-zinc-805'
                        }`}
                      >
                        {mMode.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ANALYTICS, CHARTS, BREAKDOWN */}
        <div className="lg:col-span-7 space-y-8" id="calculator-analytics-dashboard">
          
          {/* Top Quick Figures Highlight Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="metric-highlights-grid">
            <div className="bg-white border border-zinc-250 p-4 rounded-2xl shadow-sm space-y-1 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                {compareMode ? 'Your Active Takehome' : 'Monthly Take-Home'}
              </span>
              <div className="text-lg font-black text-emerald-600 transition-all">
                {formatGBP(breakdown.takeHome / 12)}
              </div>
              <span className="text-[9px] text-zinc-400 block font-semibold">Clear cash in hand</span>
            </div>

            <div className="bg-white border border-zinc-250 p-4 rounded-2xl shadow-sm space-y-1 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Deductions Rate
              </span>
              <div className="text-lg font-black text-zinc-805">
                {breakdown.effectiveTaxRate.toFixed(1)}%
              </div>
              <span className="text-[9px] text-zinc-400 block font-semibold">Average rate overall</span>
            </div>

            <div className="bg-white border border-zinc-250 p-4 rounded-2xl shadow-sm space-y-1 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Marginal Rate
              </span>
              <div className="text-lg font-black text-indigo-600">
                {marginalTaxRate.toFixed(0)}%
              </div>
              <span className="text-[9px] text-zinc-400 block font-semibold flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 text-indigo-500 fill-indigo-500" />
                On next £100 earned
              </span>
            </div>

            <div className="bg-white border border-zinc-250 p-4 rounded-2xl shadow-sm space-y-1 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                {compareMode ? `Tax Difference` : 'Total Annual Tax'}
              </span>
              <div className="text-lg font-black text-rose-500">
                {compareMode && breakdownB && breakdownA ? (
                  formatGBP(breakdownB.taxDue - breakdownA.taxDue)
                ) : (
                  formatGBP(breakdown.taxDue)
                )}
              </div>
              <span className="text-[9px] text-zinc-400 block font-semibold">
                {compareMode ? 'Gain in taxes paid' : 'Income tax portion'}
              </span>
            </div>
          </div>

          {/* Visual pay breakdown progress bar */}
          <VisualSlice 
            breakdown={breakdown} 
            breakdownB={compareMode ? breakdownB : undefined} 
            compareMode={compareMode}
          />

          {/* Detailed Comparison Periods Table */}
          <BreakdownTable 
            breakdown={breakdownA ?? breakdown} 
            breakdownB={compareMode ? breakdownB : undefined} 
            compareMode={compareMode} 
          />
        </div>
      </div>
    </div>
  );
}
