import { SalaryInputs, SalaryBreakdown } from './types';

export function parseTaxCode(codeStr: string, activeRegion: 'UK' | 'Scotland'): {
  allowance: number;
  regionHint: 'UK' | 'Scotland';
  isKCode: boolean;
  kAddition: number;
} {
  const cleanCode = codeStr.trim().toUpperCase();
  const startsWithS = cleanCode.startsWith('S');
  const regionHint: 'UK' | 'Scotland' = startsWithS ? 'Scotland' : 'UK';
  const rawCode = startsWithS ? cleanCode.slice(1) : cleanCode;

  if (rawCode.startsWith('K')) {
    const numPart = rawCode.slice(1).replace(/[^0-9]/g, '');
    const num = parseInt(numPart, 10);
    if (!isNaN(num)) {
      return {
        allowance: 0,
        regionHint,
        isKCode: true,
        kAddition: num * 10,
      };
    }
  }

  const numMatch = rawCode.match(/\d+/);
  if (numMatch) {
    const num = parseInt(numMatch[0], 10);
    return {
      allowance: num * 10,
      regionHint,
      isKCode: false,
      kAddition: 0,
    };
  }

  // Fallback to default
  return {
    allowance: 12570,
    regionHint: activeRegion,
    isKCode: false,
    kAddition: 0,
  };
}

export function calculateSalaryDetails(inputs: SalaryInputs): SalaryBreakdown {
  const {
    grossSalary,
    region,
    pensionRate,
    pensionType,
    pensionOn,
    studentLoanPlans,
    taxCode,
    customTaxCode,
    blindAllowance,
    marriageAllowanceMode,
    bonus = 0,
    overtime = 0,
    childcareVouchers = 0,
    otherNonTaxedIncome = 0,
  } = inputs;

  const benefitsInKind = inputs.benefitsInKind || 0;

  // 1. Parse Tax Code / Allowance
  let baseAllowance = 12570;
  let isKCode = false;
  let kAddition = 0;

  if (customTaxCode && taxCode.trim()) {
    const parsed = parseTaxCode(taxCode, region);
    baseAllowance = parsed.allowance;
    isKCode = parsed.isKCode;
    kAddition = parsed.kAddition;
  }

  // Apply Blind Allowance (+£3,070)
  if (blindAllowance) {
    if (!isKCode) {
      baseAllowance += 3070;
    } else {
      // In K-codes, blind allowance reduces the K addition
      kAddition = Math.max(0, kAddition - 3070);
    }
  }

  // Apply Marriage Allowance Mode
  if (marriageAllowanceMode === 'receive' && !isKCode) {
    baseAllowance += 1260;
  } else if (marriageAllowanceMode === 'transfer' && !isKCode) {
    baseAllowance = Math.max(0, baseAllowance - 1260);
  } else if (marriageAllowanceMode === 'receive' && isKCode) {
    kAddition = Math.max(0, kAddition - 1260);
  } else if (marriageAllowanceMode === 'transfer' && isKCode) {
    kAddition += 1260;
  }

  // 2. Pension Calculations
  let pensionContribution = 0;
  let pensionableSalary = grossSalary;

  if (pensionOn === 'qualifying') {
    // Qualifying earnings limit (£6,240 to £50,270)
    pensionableSalary = Math.max(0, Math.min(50270, grossSalary + bonus + overtime) - 6240);
  }

  pensionContribution = pensionableSalary * (pensionRate / 100);

  // 3. Determine adjustments for taxable income, NI, and student loans
  const totalGross = grossSalary + bonus + overtime;
  const basicGrossForTaxAndNI = Math.max(0, totalGross - childcareVouchers);

  let grossSalaryForTax = basicGrossForTaxAndNI;
  let salaryForNI = basicGrossForTaxAndNI;
  let salaryForStudentLoan = basicGrossForTaxAndNI;

  if (pensionType === 'salarySacrifice') {
    grossSalaryForTax = Math.max(0, grossSalaryForTax - pensionContribution);
    salaryForNI = Math.max(0, salaryForNI - pensionContribution);
    salaryForStudentLoan = Math.max(0, salaryForStudentLoan - pensionContribution);
  } else if (pensionType === 'netPay') {
    grossSalaryForTax = Math.max(0, grossSalaryForTax - pensionContribution);
    // NI and student loans are calculated on gross pay before net pay pension
  } else if (pensionType === 'reliefAtSource') {
    // Income tax: standard rate relief given on payment, higher rates claimed via self-assessment.
    // Adjusted net income for personal allowance tapering is reduced.
    grossSalaryForTax = Math.max(0, grossSalaryForTax - pensionContribution); 
  }

  // 4. Personal Allowance Tapering (Adjusted Net Income)
  // Standard taper applies for income > £100,000 (reduces personal allowance by £1 for every £2 over £100,000)
  const adjustedNetIncome = grossSalaryForTax + benefitsInKind;
  let adjustedAllowance = baseAllowance;
  if (!isKCode && adjustedNetIncome > 100000) {
    const overThreshold = adjustedNetIncome - 100000;
    const reduction = Math.floor(overThreshold / 2);
    adjustedAllowance = Math.max(0, baseAllowance - reduction);
  }

  // 5. Taxable Income
  let taxableIncome = 0;
  if (isKCode) {
    taxableIncome = grossSalaryForTax + benefitsInKind + kAddition;
  } else {
    taxableIncome = Math.max(0, (grossSalaryForTax + benefitsInKind) - adjustedAllowance);
  }

  // 6. Income Tax Calculation
  let taxDue = 0;
  if (region === 'Scotland') {
    // Scotland tax bands based on widths
    const scotlandBands = [
      { name: 'Starter Rate (19%)', rate: 0.19, width: 2306 },
      { name: 'Basic Rate (20%)', rate: 0.20, width: 11685 },
      { name: 'Intermediate Rate (21%)', rate: 0.21, width: 17101 },
      { name: 'Higher Rate (42%)', rate: 0.42, width: 31338 },
      { name: 'Advanced Rate (45%)', rate: 0.45, width: 50140 },
      { name: 'Top Rate (48%)', rate: 0.48, width: Infinity },
    ];

    let remainingTaxable = taxableIncome;
    for (const band of scotlandBands) {
      if (remainingTaxable <= 0) break;
      const incomeInBand = Math.min(remainingTaxable, band.width);
      taxDue += incomeInBand * band.rate;
      remainingTaxable -= incomeInBand;
    }
  } else {
    // Rest of UK tax bands based on widths
    const ukBands = [
      { name: 'Basic Rate (20%)', rate: 0.20, width: 37700 },
      { name: 'Higher Rate (40%)', rate: 0.40, width: 74870 },
      { name: 'Additional Rate (45%)', rate: 0.45, width: Infinity },
    ];

    let remainingTaxable = taxableIncome;
    for (const band of ukBands) {
      if (remainingTaxable <= 0) break;
      const incomeInBand = Math.min(remainingTaxable, band.width);
      taxDue += incomeInBand * band.rate;
      remainingTaxable -= incomeInBand;
    }
  }

  // 7. National Insurance (NI) Calculation
  // Primary Threshold (PT): £12,570
  // Upper Earnings Limit (UEL): £50,270
  // Rate between PT & UEL: 8%
  // Rate above UEL: 2%
  let niDue = 0;
  const niPT = 12570;
  const niUEL = 50270;

  if (salaryForNI > niPT) {
    const mainNiIncome = Math.min(salaryForNI, niUEL) - niPT;
    niDue += mainNiIncome * 0.08;
  }
  if (salaryForNI > niUEL) {
    const higherNiIncome = salaryForNI - niUEL;
    niDue += higherNiIncome * 0.02;
  }

  // 8. Student Loan Repayment Calculation
  let studentLoanRepayment = 0;
  const undergradThresholds: number[] = [];
  if (studentLoanPlans.includes('plan1')) undergradThresholds.push(24990);
  if (studentLoanPlans.includes('plan2')) undergradThresholds.push(27295);
  if (studentLoanPlans.includes('plan4')) undergradThresholds.push(31395);
  if (studentLoanPlans.includes('plan5')) undergradThresholds.push(25000);

  if (undergradThresholds.length > 0) {
    const minThreshold = Math.min(...undergradThresholds);
    if (salaryForStudentLoan > minThreshold) {
      studentLoanRepayment += (salaryForStudentLoan - minThreshold) * 0.09;
    }
  }

  if (studentLoanPlans.includes('postgrad') && salaryForStudentLoan > 21000) {
    studentLoanRepayment += (salaryForStudentLoan - 21000) * 0.06;
  }

  // 9. Take Home Pay
  // pension deduction is from gross/net depending on setup:
  // Salary sacrifice: already deducted from gross, so we don't subtract it again.
  // Net pay / Relief at Source: needs physically subtracting here from final net.
  let netFromGross = totalGross - taxDue - niDue - studentLoanRepayment;
  if (pensionType !== 'salarySacrifice') {
    netFromGross -= pensionContribution;
  } else {
    netFromGross -= pensionContribution;
  }

  // Childcare vouchers reduce cash take home because they are sacrificed for vouchers
  netFromGross -= childcareVouchers;

  // Other Non-Taxed Income (Monthly input * 12)
  const annualOtherNonTaxedIncome = otherNonTaxedIncome * 12;
  const hicbcCharge = 0;

  const takeHome = Math.max(0, netFromGross + annualOtherNonTaxedIncome - hicbcCharge);
  const grossBasisForRate = totalGross + annualOtherNonTaxedIncome;
  const effectiveTaxRate = grossBasisForRate > 0 ? ((grossBasisForRate - takeHome) / grossBasisForRate) * 100 : 0;

  return {
    gross: totalGross,
    pensionContribution,
    personalAllowance: baseAllowance,
    adjustedAllowance,
    taxableIncome,
    taxDue,
    niDue,
    studentLoanRepayment,
    takeHome,
    effectiveTaxRate,
    bonus,
    overtime,
    childcareVouchersDeduction: childcareVouchers,
    otherNonTaxedIncome: annualOtherNonTaxedIncome,
    hicbcCharge,
  };
}

export function getMarginalTaxRate(inputs: SalaryInputs): number {
  if (inputs.grossSalary === 0) return 0;
  const baseline = calculateSalaryDetails(inputs);
  const incrementalAmount = 100;
  const incrementalInputs = {
    ...inputs,
    grossSalary: inputs.grossSalary + incrementalAmount,
  };
  const withInflow = calculateSalaryDetails(incrementalInputs);

  const directGrossDeduction = (inputs.grossSalary - baseline.takeHome);
  const newGrossDeduction = ((inputs.grossSalary + incrementalAmount) - withInflow.takeHome);

  const marginalDeduction = newGrossDeduction - directGrossDeduction;
  return (marginalDeduction / incrementalAmount) * 100;
}
