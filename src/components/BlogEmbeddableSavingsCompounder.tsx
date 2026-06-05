import React from 'react';
import SavingsCompounder from './SavingsCompounder';

export default function BlogEmbeddableSavingsCompounder() {
  const formatGBP = (v: number) => `£${v.toLocaleString()}`;
  
  return (
    <div className="scale-90 origin-top">
      <SavingsCompounder
        monthlySurplus={500}
        allocatedSavings={200}
      />
    </div>
  );
}
