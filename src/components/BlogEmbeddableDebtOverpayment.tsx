import React from 'react';
import DebtOverpayment from './DebtOverpayment';

export default function BlogEmbeddableDebtOverpayment() {
  const formatGBP = (v: number) => `£${v.toLocaleString()}`;
  
  return (
    <div className="scale-90 origin-top">
      <DebtOverpayment
        monthlySurplus={500}
        allocatedSavings={200}
        formatGBP={formatGBP}
      />
    </div>
  );
}
