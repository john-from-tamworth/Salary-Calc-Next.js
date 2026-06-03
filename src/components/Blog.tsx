import React from 'react';
import { BookOpen, ArrowRight, Zap, Target, Sliders, PlayCircle, Star, PiggyBank, CreditCard, Sparkles } from 'lucide-react';

interface BlogProps {
  // Callbacks to preset values in other pages
  setGrossInput: (val: string) => void;
  setPensionRate: (rate: number) => void;
  setPensionType: (type: 'salarySacrifice' | 'netPay' | 'reliefAtSource') => void;
  toggleStudentLoan: (plan: string) => void;
  setStudentLoanPlans: (plans: string[]) => void;
  setCurrentPage: (page: string) => void;
}

export default function Blog({
  setGrossInput,
  setPensionRate,
  setPensionType,
  setStudentLoanPlans,
  setCurrentPage
}: BlogProps) {

  const articles = [
    {
      id: 'tax-trap',
      title: 'Demystifying the UK 60% "Tax Trap" at £100,000 to £125,140',
      category: 'UK Income Tax',
      readTime: '4 min read',
      summary: 'Earned over £100k? For every £2 you make, you lose £1 of your Personal Allowance. This creates a hidden 60% marginal tax rate that catches thousands of professionals off guard.',
      difficulty: 'Intermediate',
      iconUrl: Star,
      bgGradient: 'from-amber-50 to-orange-50/20 border-amber-200/60',
      actionText: 'Simulate £100k - £125k Taper',
      onClickPreset: () => {
        setGrossInput('115000');
        setCurrentPage('salary-calculator');
      },
      bullets: [
        'HMRC withdraws your £12,570 Personal Allowance at £1 for every £2 of adjusted net income over £100,000.',
        'This creates a taxable income increase of £1.50 for every £1 earned, resulting in a marginal deduction rate of 60% (before National Insurance/Student Loans!).',
        'Solution: Contributing surplus income back into pension schemes (Salary Sacrifice) can lower your taxable net income back to £100,000.'
      ]
    },
    {
      id: 'salary-sacrifice',
      title: 'Pension Salary Sacrifice vs Net Pay: Which Saves More Cash?',
      category: 'Pension Efficiency',
      readTime: '3 min read',
      summary: 'With salary sacrifice schemes, your employer lowers your gross salary directly. You save not only income tax, but also substantial National Insurance contributions on your paycheck.',
      difficulty: 'Advanced',
      iconUrl: PiggyBank,
      bgGradient: 'from-emerald-50 to-teal-50/20 border-emerald-200/60',
      actionText: 'Preset 10% Salary Sacrifice',
      onClickPreset: () => {
        setPensionRate(10);
        setPensionType('salarySacrifice');
        setCurrentPage('salary-calculator');
      },
      bullets: [
        'Net Pay and Relief at Source schemes save you income tax, but you still pay National Insurance (currently 8%) on those pension amounts.',
        'Salary Sacrifice lowers your gross salary before calculation, saving you both Income Tax and NI contributions.',
        'Employers also save NI and many recycle those savings back into your pension pot as a bonus match!'
      ]
    },
    {
      id: 'overpayment-math',
      title: 'The Shocking Math of Mortgage and Debt Overpayments',
      category: 'Debt Paydown',
      readTime: '5 min read',
      summary: 'Paying just £150 a month extra on a £150,000 long-term UK mortgage can shave years off your term and save over £15,000 in interest. Learn how to optimize your monthly surplus.',
      difficulty: 'Beginner',
      iconUrl: CreditCard,
      bgGradient: 'from-rose-50 to-pink-50/20 border-rose-200/60',
      actionText: 'Launch Mortgage Simulator',
      onClickPreset: () => {
        setCurrentPage('debt-overpayment');
      },
      bullets: [
        'Mortgage interest compounds. Every pound paid off early reduces not only your outstanding balance but all future interest calculations.',
        'Overpayments go 100% on the loan prime balance, not the interest, compounding the acceleration.',
        'Utilize NetPayFlow where monthly savings automatically overpay card or home loans in real-time.'
      ]
    }
  ];

  return (
    <div className="space-y-8" id="blog-insights-container">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
        <div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full">
            Financial Insights Hub
          </span>
          <h2 className="text-xl font-black text-zinc-950 mt-1.5 flex items-center gap-2">
            NetPayFlow Knowledge Base
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Written guides detailing smart pension loops, student loans thresholds, ISA compounding, and overpayment traps.</p>
        </div>
      </div>

      {/* Featured articles grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3 bg-zinc-900 text-white rounded-2xl p-6.5 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center shadow-md">
          <div className="absolute top-0 right-0 p-12 bg-emerald-500/10 blur-3xl rounded-full" />
          
          <div className="space-y-3.5 md:w-3/5 relative">
            <span className="text-[9px] font-extrabold uppercase bg-emerald-500 text-zinc-950 px-2.5 py-1 rounded-lg">
              Must Read Overview
            </span>
            <h3 className="text-xl font-black tracking-tight leading-tight">Mastering Your Paycheck Flow Engine</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              True personal finance is not about isolated calculators; it is about a consistent, interactive flow of funds. In NetPayFlow, your Net Pay feeds your budget planner. Your budget planner uncovers a surplus, and your surplus accelerates your savings compounds or pays off your mortgage decades early.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setCurrentPage('salary-calculator')}
                className="cursor-pointer bg-white text-zinc-900 border border-zinc-200 px-4 py-2 rounded-xl text-xs font-bold hover:bg-zinc-100 transition-all flex items-center gap-1.5"
              >
                <span>Try Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="md:w-2/5 p-4 bg-zinc-800 rounded-xl border border-zinc-700 space-y-2.5 relative">
            <h4 className="text-xs font-bold text-emerald-400">NetPayFlow Core Loop:</h4>
            <div className="space-y-2 text-[11px] text-zinc-300 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] flex items-center justify-center font-bold">1</span>
                <span>Annual pay calculates dynamic paycheck.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] flex items-center justify-center font-bold">2</span>
                <span>Expenses tracker uncovers monthly surplus savings.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] flex items-center justify-center font-bold">3</span>
                <span>Compounding investments start snowball growth.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] flex items-center justify-center font-bold">4</span>
                <span>Surplus pays down mortgages & credit card loans.</span>
              </div>
            </div>
          </div>
        </div>

        {articles.map(article => {
          const IconComponent = article.iconUrl;
          return (
            <div
              key={article.id}
              className={`bg-white border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 border-zinc-200/80`}
            >
              <div className="space-y-3.5">
                {/* Header row */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">
                    {article.category}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-400">{article.readTime}</span>
                </div>

                <h3 className="text-base font-black text-zinc-950 tracking-tight leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-zinc-650 leading-relaxed font-normal">
                  {article.summary}
                </p>

                {/* Bullets Detail */}
                <div className="space-y-2 pt-2 border-t border-dashed border-zinc-200">
                  {article.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex gap-2 items-start text-[11px] text-zinc-600">
                      <Zap className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5 fill-zinc-200" />
                      <span className="font-normal">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action inject interactive preset is beautiful */}
              <button
                onClick={article.onClickPreset}
                className="cursor-pointer w-full py-2.5 px-4 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                id={`btn-preset-${article.id}`}
              >
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span>{article.actionText}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
