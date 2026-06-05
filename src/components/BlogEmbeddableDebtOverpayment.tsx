import React from 'react';
import DebtOverpayment from './DebtOverpayment';

export default function BlogEmbeddableDebtOverpayment() {
  
  return (
    <div className="scale-90 origin-top">
      <DebtOverpayment
        monthlySurplus={500}
        allocatedSavings={200}
      />
    </div>
  );
}
