'use client';
import { useState } from 'react';
import { CheckCircle, Info, Landmark, HelpCircle, ShieldAlert, ChevronDown } from 'lucide-react';

export default function InfoSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the 60% tax trap?",
      answer: "When your income exceeds £100,000, HMRC reduces your £12,570 personal allowance by £1 for every £2 earned. This effective withdrawal creates a 60% marginal tax rate on income between £100,000 and £125,140."
    },
    {
      question: "How does pro-rata pay work?",
      answer: "Pro-rata calculates pay based on a proportion of a full-time salary. Our tool automatically adjusts your gross annual salary based on your weekly hours, ensuring tax and NI estimates align with your actual working pattern."
    },
    {
      question: "What is salary sacrifice?",
      answer: "Salary sacrifice is an arrangement where you agree to reduce your gross salary in exchange for your employer paying that amount directly into your pension. This reduces both your taxable income and National Insurance contributions, boosting take-home efficiency."
    },
    {
      question: "How are Scottish tax bands different?",
      answer: "Scottish tax bands are set by the Scottish Parliament, often featuring different tax rates and threshold levels compared to the rest of the UK. This creates a distinct tax profile for residents based on their specific income levels."
    },
    {
      question: "What is the personal allowance?",
      answer: "The Personal Allowance is the amount of income you can earn in a tax year without paying any income tax. For most UK residents, this is currently £12,570, but it gradually reduces for incomes over £100,000."
    }
  ];

  return (
    <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-sm space-y-6" id="info-section">
      <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-4">
        <div className="p-1.5 bg-zinc-150 text-zinc-800 rounded-lg">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">HMRC Tax Guide & Calculation Rules</h3>
          <p className="text-xs text-zinc-500 mt-0.5">Understand how tax bands, NI, and pension sacrifice alter your net take-home</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-100 space-y-2">
          <h5 className="text-xs font-bold text-zinc-800">Methodology & Data Sources</h5>
          <p className="text-[10px] text-zinc-600 leading-relaxed font-medium">
            We use the latest HMRC tax tables for 2026/27 to ensure calculations are accurate. Data is updated frequently to reflect policy changes, ensuring you can plan with confidence.
          </p>
        </div>

        {/* Left Column: Tax Bands */}
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Landmark className="w-4 h-4 text-zinc-600 mt-0.5" />
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Income Tax Bandwidths</h4>
          </div>

          <div className="space-y-3.5">
            <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-100 space-y-3">
              <h5 className="text-xs font-bold text-zinc-800">Rest of United Kingdom (2026/27)</h5>
              <p className="text-[11px] text-zinc-500">Applied to workers in England, Northern Ireland, and Wales. Standard Personal Allowance: £12,570.</p>
              <ul className="text-[10px] space-y-1 text-zinc-600 font-medium">
                <li>• Personal Allowance: £0 to £12,570 (0%)</li>
                <li>• Basic Rate Band: £12,571 to £50,270 (20%)</li>
                <li>• Higher Rate Band: £50,271 to £125,140 (40%)</li>
                <li>• Additional Rate Band: Over £125,140 (45%)</li>
              </ul>
            </div>

            <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-100 space-y-3">
              <h5 className="text-xs font-bold text-zinc-800">Scottish Income Tax (2026/27)</h5>
              <p className="text-[11px] text-zinc-500">Scottish bands are decided by the Scottish Parliament, applying different rates and more granular thresholds.</p>
              <ul className="text-[10px] space-y-1 text-zinc-650 font-medium font-mono">
                <li>• Starter Rate: £12,571 to £14,876 (19%)</li>
                <li>• Basic Rate: £14,877 to £26,561 (20%)</li>
                <li>• Intermediate Rate: £26,562 to £43,662 (21%)</li>
                <li>• Higher Rate: £43,663 to £75,000 (42%)</li>
                <li>• Advanced Rate: £75,001 to £125,140 (45%)</li>
                <li>• Top Rate: Over £125,140 (48%)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: NI, Pension, Student Loans */}
        <div className="space-y-5">
          {/* NI and Tapering */}
          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-zinc-600 mt-0.5" />
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">National Insurance & Adjustments</h4>
            </div>

            <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-100 space-y-2">
              <h5 className="text-xs font-bold text-zinc-800">National Insurance (NI Class 1)</h5>
              <p className="text-[10px] text-zinc-600 leading-relaxed font-medium">
                National Insurance is paid by employees to qualify for state pensions and benefits:
                <br />
                • Primary Threshold (PT): 8% is applied on weekly pay between <strong>£242</strong> and <strong>£967</strong> (equivalent to £12,570 - £50,270 annually).
                <br />
                • Upper Earnings Limit (UEL): 2% is applied on pay exceeding <strong>£967</strong> weekly (£50,270 annually).
              </p>
            </div>

            <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-100 space-y-2">
              <h5 className="text-xs font-bold text-zinc-800">Personal Allowance Tapering</h5>
              <p className="text-[10px] text-zinc-600 leading-relaxed font-medium font-sans">
                For earnings over <strong>£100,000</strong>, your personal allowance is reduced by £1 for every £2 of income. The allowance hits zero exactly at <strong>£125,140</strong>. This creates an effective <strong>60% marginal tax rate</strong> in that bracket!
              </p>
            </div>
          </div>

          {/* Student Loans */}
          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-zinc-600 mt-0.5" />
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Student Loans & Pensions</h4>
            </div>

            <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-100 text-[10px] text-zinc-600 leading-relaxed font-medium space-y-2.5">
              <div>
                <span className="font-bold text-zinc-800 text-xs">Pensions Compared:</span>
                <ul className="list-disc pl-3.5 space-y-1 mt-1">
                  <li><strong>Salary Sacrifice:</strong> Deducted from your gross salary before calculation of Tax, NI, and Student Loans. This is the absolute most cost-effective arrangement.</li>
                  <li><strong>Net Pay:</strong> Deducted before Income tax, but NI and Student Loans are calculated on your standard gross.</li>
                  <li><strong>Relief at Source:</strong> Dues are paid from net cash; HMRC refunds standard tax (20%) directly into the pension fund.</li>
                </ul>
              </div>
              <div className="border-t border-zinc-200/60 pt-2">
                <span className="font-bold text-zinc-800 text-xs">Student Loans:</span>
                <ul className="list-disc pl-3.5 space-y-1 mt-1">
                  <li>Plan 1: 9% repayment above £24,990</li>
                  <li>Plan 2: 9% repayment above £27,295</li>
                  <li>Plan 4 (Scotland): 9% repayment above £31,395</li>
                  <li>Plan 5: 9% repayment above £25,000</li>
                  <li>Postgrad: 6% repayment above £21,000</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* How We Calculate */}
        <div className="border-t border-zinc-100 pt-6 mt-6 col-span-1 md:col-span-2">
          <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4">How We Calculate Your UK Net Pay</h4>
          <div className="space-y-4 text-zinc-600 text-[11px] leading-relaxed">
            <div>
              <p className="font-bold text-zinc-900 mb-1">Tax Bands and Deductions</p>
              <p>NetPayFlow maps your income against the most recent UK tax bands and National Insurance limits. The tool dynamically separates standard UK PAYE thresholds from Scottish tax bands, ensuring your take-home pay is accurate based on your location. It calculates personal allowance reductions automatically if your earnings push into higher brackets.</p>
            </div>
            <div>
              <p className="font-bold text-zinc-900 mb-1">Pension Routing: Salary Sacrifice vs. Auto-Enrolment</p>
              <p>Pension contributions fundamentally change your taxable income. Our calculator allows you to toggle between standard auto-enrolment schemes (where contributions are taken after some taxes) and Salary Sacrifice arrangements (where your gross pay is reduced before tax and National Insurance are applied, maximizing your take-home efficiency).</p>
            </div>
            <div>
              <p className="font-bold text-zinc-900 mb-1">Dynamic Pro-Rata and Hourly Conversions</p>
              <p>For part-time workers or contractors, the comparison tool converts hourly rates and weekly hours into a full-time equivalent salary. This allows for an accurate pro-rata calculation of your tax liabilities without manual conversions.</p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="border-t border-zinc-100 pt-6 mt-6 col-span-1 md:col-span-2">
          <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest mb-4">Frequently Asked Questions</h4>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-zinc-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-zinc-50 text-left text-xs font-semibold text-zinc-900 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  {faq.question}
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-zinc-50 text-[11px] text-zinc-600 leading-relaxed border-t border-zinc-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
