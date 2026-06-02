import { CheckCircle, Info, Landmark, HelpCircle, ShieldAlert } from 'lucide-react';

export default function InfoSection() {
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
        {/* Left Column: Tax Bands */}
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Landmark className="w-4 h-4 text-zinc-600 mt-0.5" />
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Income Tax Bandwidths</h4>
          </div>

          <div className="space-y-3.5">
            <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-100 space-y-3">
              <h5 className="text-xs font-bold text-zinc-800">Rest of United Kingdom (2025/26)</h5>
              <p className="text-[11px] text-zinc-500">Applied to workers in England, Northern Ireland, and Wales. Standard Personal Allowance: £12,570.</p>
              <ul className="text-[10px] space-y-1 text-zinc-600 font-medium">
                <li>• Personal Allowance: £0 to £12,570 (0%)</li>
                <li>• Basic Rate Band: £12,571 to £50,270 (20%)</li>
                <li>• Higher Rate Band: £50,271 to £125,140 (40%)</li>
                <li>• Additional Rate Band: Over £125,140 (45%)</li>
              </ul>
            </div>

            <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-100 space-y-3">
              <h5 className="text-xs font-bold text-zinc-800">Scottish Income Tax (2025/26)</h5>
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
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Insurance & Adjustments</h4>
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
      </div>
    </div>
  );
}
