import React, { useMemo } from 'react';
import { calculateSalaryDetails } from '../calculator';
import BreakdownTable from './BreakdownTable';

interface BlogEmbeddableBreakdownProps {
  grossSalary: number;
  region?: 'UK' | 'Scotland';
  pensionRate?: number;
  pensionType?: 'salarySacrifice' | 'netPay' | 'reliefAtSource';
}

export default function BlogEmbeddableBreakdown({
  grossSalary,
  region = 'UK',
  pensionRate = 5,
  pensionType = 'salarySacrifice',
}: BlogEmbeddableBreakdownProps) {
  const breakdown = useMemo(() => {
    return calculateSalaryDetails({
      grossSalary,
      isHourly: false,
      hourlyRate: 0,
      hoursPerWeek: 37.5,
      weeksPerYear: 52,
      region,
      pensionRate,
      pensionType,
      pensionOn: 'total',
      studentLoanPlans: [],
      taxCode: '1257L',
      customTaxCode: false,
      blindAllowance: false,
      marriageAllowanceMode: 'none',
      bonus: 0,
      overtime: 0,
      childcareVouchers: 0,
      otherNonTaxedIncome: 0,
    });
  }, [grossSalary, region, pensionRate, pensionType]);

  return <BreakdownTable breakdown={breakdown} />;
}
