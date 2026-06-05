'use client';
import React, { useState } from 'react';
import BudgetPlanner from './BudgetPlanner';
import { ExpenseItem } from '../types';

export default function BlogEmbeddableBudgetPlanner() {
  const [incomeSource, setIncomeSource] = useState<'A' | 'B' | 'custom'>('A');
  const [customIncomeInput, setCustomIncomeInput] = useState('3000');
  const [allocatedSavings, setAllocatedSavings] = useState(500);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: '1', name: 'Rent', amount: 1200, category: 'mortgage_rent' },
    { id: '2', name: 'Groceries', amount: 300, category: 'groceries' },
    { id: '3', name: 'Utilities', amount: 150, category: 'utilities' },
  ]);

  const monthlyTakeHomeA = 2800;
  const monthlyTakeHomeB = 3200;
  
  const formatGBP = (v: number) => `£${v.toLocaleString()}`;

  const selectedIncomeAmount = incomeSource === 'A' 
    ? monthlyTakeHomeA 
    : incomeSource === 'B' 
    ? monthlyTakeHomeB 
    : parseFloat(customIncomeInput) || 0;

  return (
    <div className="scale-90 origin-top">
      <BudgetPlanner
        monthlyTakeHomeA={monthlyTakeHomeA}
        monthlyTakeHomeB={monthlyTakeHomeB}
        incomeSource={incomeSource}
        setIncomeSource={setIncomeSource}
        customIncomeInput={customIncomeInput}
        setCustomIncomeInput={setCustomIncomeInput}
        selectedIncomeAmount={selectedIncomeAmount}
        allocatedSavings={allocatedSavings}
        setAllocatedSavings={setAllocatedSavings}
        expenses={expenses}
        setExpenses={setExpenses}
      />
    </div>
  );
}
