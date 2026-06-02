export interface SalaryInputs {
  grossSalary: number;
  region: 'UK' | 'Scotland';
  pensionRate: number;
  pensionType: 'salarySacrifice' | 'netPay' | 'reliefAtSource';
  pensionOn: 'total' | 'qualifying';
  studentLoanPlans: string[]; // 'plan1', 'plan2', 'plan4', 'plan5', 'postgrad'
  taxCode: string;
  customTaxCode: boolean;
  blindAllowance: boolean;
  marriageAllowanceMode: 'receive' | 'transfer' | 'none';
  benefitsInKind?: number;
}

export interface TaxBand {
  name: string;
  rate: number;
  width: number;
}

export interface SalaryBreakdown {
  gross: number;
  pensionContribution: number;
  personalAllowance: number;
  adjustedAllowance: number;
  taxableIncome: number;
  taxDue: number;
  niDue: number;
  studentLoanRepayment: number;
  takeHome: number;
  effectiveTaxRate: number;
}

export interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  category: 'mortgage_rent' | 'utilities' | 'transport' | 'debts' | 'groceries' | 'leisure' | 'subscriptions';
}

export interface BudgetConfig {
  needsPercent: number;
  wantsPercent: number;
  savingsPercent: number;
}
