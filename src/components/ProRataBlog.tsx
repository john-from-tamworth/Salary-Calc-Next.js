import React from 'react';
import Link from 'next/link';
import BlogEmbeddableProRataSlider from './BlogEmbeddableProRataSlider';

export default function ProRataBlog() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 text-gray-800 leading-relaxed">
      {/* Header Section */}
      <header className="mb-8 border-b border-gray-100 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Pro-Rata Salary Explained: How Going Part-Time Affects Your Pay
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded font-medium">Career Finance</span>
          <span>•</span>
          <span>10 min read</span>
          <span>•</span>
          <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded font-medium">Beginner Level</span>
        </div>
      </header>

      {/* Intro */}
      <p className="text-lg text-gray-600 mb-6 font-medium">
        Whether you are stepping back to care for a growing family, dedicating days to a new side hustle, or simply reclaiming your Fridays to improve your mental health, dropping to a part-time schedule is a massive, often life-changing decision.
      </p>
      
      <p className="mb-6">
        However, the biggest question holding people back from buying out their time is almost always the same: <em className="text-gray-900 font-medium">"Can I actually afford to live on a pro-rata salary?"</em>
      </p>
      
      <p className="mb-8">
        When calculating part-time wage adjustments in the UK, many people make the anxiety-inducing mistake of simply chopping their net take-home pay in half. Fortunately, owing to the way the UK tax system is structured, the math works heavily in your favor.
      </p>

      <hr className="my-8 border-gray-100" />

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          Understanding Pro-Rata Math
        </h2>
        <p className="mb-4">
          "Pro-rata" is a Latin term that translates to "in proportion." In the context of employment, a pro-rata salary means that your pay is calculated as a direct proportion of a full-time equivalent (FTE) wage based on the exact hours or days you work.
        </p>
        <p className="mb-4">
          If a job is advertised with a full-time salary of <strong className="font-semibold text-gray-900">£40,000</strong> for a standard 5-day week, each working day is effectively worth £8,000 of gross income per year.
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li><strong className="font-medium text-gray-900">Working 4 days a week (80%):</strong> Your pro-rata gross salary is £32,000.</li>
          <li><strong className="font-medium text-gray-900">Working 3 days a week (60%):</strong> Your pro-rata gross salary is £24,000.</li>
        </ul>
        <p className="mb-4">
          While your <em className="text-gray-900">gross</em> salary scales down perfectly linearly, your <em className="text-gray-900">net take-home pay</em> does not. Because of how tax brackets function, dropping your working hours hurts your take-home pay far less than most people expect.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          The Hidden Pro-Rata Tax Advantage
        </h2>
        <p className="mb-4">
          The secret to part-time tax efficiency lies entirely within your UK tax allowances. For the 2026/27 tax year, the standard Personal Allowance remains frozen at £12,570. This is the exact amount of money you are legally allowed to earn before you pay a single penny of Income Tax.
        </p>
        
        <blockquote className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r my-6">
          <p className="font-medium text-emerald-900">
            Crucially, your £12,570 tax-free Personal Allowance remains exactly the same whether you work two days a week or five. HMRC does not pro-rata your tax-free allowance.
          </p>
        </blockquote>

        <p className="mb-4">
          When you reduce your hours, the money you give up comes directly off the <em className="text-gray-900 font-medium">top</em> of your earnings. This is the portion of your income that is heavily taxed. For a standard basic-rate taxpayer, every pound earned above the allowance is subject to a 20% basic rate of Income Tax and an 8% primary employee National Insurance contribution. 
        </p>
        <p className="mb-4">
          By dropping a day of work, you are effectively shedding income that would have been taxed at 28%. Meanwhile, the un-taxed foundation of your income (the £12,570) remains completely untouched and makes up a much larger overall percentage of your new part-time pay.
        </p>
        <p className="mb-6">
          Because of this buffer, dropping your hours by 20% (going from 5 days to 4) rarely results in a 20% drop in cash. In most typical salary ranges, it results in a net take-home pay drop of only <strong className="font-semibold text-gray-900">12% to 15%</strong>.
        </p>
      </section>

      {/* Section 3: Student Loans (NEW) */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          The Student Loan Factor: A Massive Part-Time Bonus
        </h2>
        <p className="mb-4">
          If you are one of the millions of UK workers carrying a student loan, dropping your hours can trigger an incredibly lucrative secondary benefit. Just like your Personal Allowance, the repayment thresholds for UK student loans are fixed figures that are not pro-rated based on your working hours.
        </p>
        <p className="mb-4">
          You only pay 9% on earnings that exceed these specific limits:
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2 text-sm md:text-base">
          <li><strong className="font-medium text-gray-900">Plan 2:</strong> Threshold is £27,295.</li>
          <li><strong className="font-medium text-gray-900">Plan 5:</strong> Threshold is £25,000.</li>
          <li><strong className="font-medium text-gray-900">Postgraduate:</strong> Threshold is £21,000 (at 6%).</li>
        </ul>
        <p className="mb-4">
          Imagine a professional earning £35,000 full-time with a Plan 2 loan. They currently pay roughly £693 a year toward their student debt. If they drop to a 4-day week, their pro-rata gross salary falls to £28,000. Because £28,000 is barely above the £27,295 threshold, their annual student loan repayment collapses to just £63. 
        </p>
        <p className="mb-6">
          If they drop to a 3-day week, their pro-rata salary hits £21,000. This falls entirely below the threshold, meaning their 9% student loan deduction is wiped out entirely, boosting the efficiency of their new take-home pay even further.
        </p>
      </section>

      {/* Section 4: Interactive Component placeholder */}
      <section className="mb-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
          Interactive Scenario: Test Your Hours
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Adjust the slider below to see exactly how your gross and net pay shifts as you adjust your working days from a standard 5-day week to part-time. Notice how the tax and student loan burdens shrink disproportionately compared to the gross reduction, providing a clearer picture of your actual take-home pay.
        </p>
        
        <div className="my-6">
          <BlogEmbeddableProRataSlider />
        </div>
      </section>

      {/* Section 5: Pensions (NEW) */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          Protecting Your Auto-Enrolment Pension
        </h2>
        <p className="mb-4">
          While the tax advantages of going part-time are fantastic for your current cash flow, there is a hidden long-term trap you must proactively manage: your retirement timeline. 
        </p>
        <p className="mb-4">
          Under UK auto-enrolment rules, your minimum employee pension contribution is generally calculated as a percentage (often 5%) of your qualifying earnings. If your gross salary drops by 20%, your monthly pension contributions will also drop by at least 20%, and your employer's matching contributions will similarly shrink. 
        </p>
        <p className="mb-6">
          To prevent a part-time schedule from secretly delaying your retirement, many people use the tax efficiency of their new pro-rata salary to afford a manual increase in their pension contribution percentage. Bumping a 5% contribution up to 7% or 8% can often bridge the gap, ensuring your investment compound growth remains perfectly on track despite working fewer days.
        </p>
      </section>

      {/* Section 6: Holiday (NEW) */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          What Happens to Your Paid Holiday?
        </h2>
        <p className="mb-4">
          A major concern when switching to a pro-rata contract is the loss of paid time off. By UK law, a full-time worker is entitled to a minimum of 28 days of paid statutory leave per year (which can include bank holidays). 
        </p>
        <p className="mb-4">
          When you move to part-time, this entitlement is strictly pro-rated. The calculation is simple: multiply your new working days per week by 5.6.
        </p>
        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li><strong className="font-medium text-gray-900">4 days a week:</strong> 4 × 5.6 = 22.4 days of paid leave.</li>
          <li><strong className="font-medium text-gray-900">3 days a week:</strong> 3 × 5.6 = 16.8 days of paid leave.</li>
        </ul>
        <p className="mb-6">
          While the total number of days drops, the proportion of your working year spent on holiday remains exactly the same. Keep in mind that if your normal working days fall on a Bank Holiday, your employer will likely require you to use some of your pro-rated allowance to cover it, unless specified otherwise in your contract.
        </p>
      </section>

      {/* Section 7: Pro Rata Bonus */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          Calculating Pro-Rata Bonuses
        </h2>
        <p className="mb-4">
          Bonuses can be a significant part of your remuneration, and it's essential to understand how they are handled when you move to part-time hours. Just like your annual salary, your annual bonus entitlement is typically pro-rated based on your contractual working hours.
        </p>
        <p className="mb-4">
          If your bonus is calculated as a percentage of your salary (e.g., 10% of gross), it will automatically be calculated on your lower pro-rata salary. However, if your contract specifies a fixed bonus amount, it may need to be adjusted proportionately.
        </p>
        <p className="mb-4">
          NetPayFlow’s salary calculator makes this simple. By setting your working hours, the tool automatically adjusts your gross figure, meaning any percentage-based bonus calculations are immediately projected based on your new, part-time salary—letting you see the net impact on your true take-home pay instantly.
        </p>
        
        <div className="my-6">
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Pro-Rata Bonus Calculator</h3>
            <p className="text-xs text-gray-500 mb-4">Adjust your working hours in the salary calculator to see your pro-rata bonus projection.</p>
            <Link href="/?page=salary-calculator" className="text-xs font-semibold bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
              Open Salary Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: Broader savings */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          The Hidden Savings of Buying Back Your Time
        </h2>
        <p className="mb-4">
          The financial benefits of moving to a pro-rata salary extend far beyond a more efficient tax profile. When mapping out your new budget, you must factor in the "costs of working" that you will immediately recover:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-3">
          <li>
            <strong className="font-medium text-gray-900">Commuting Costs:</strong> Dropping one day a week instantly reduces your weekly fuel bill, train fare, and parking costs by 20%. Over a year, this retained cash can easily offset a portion of your lost net pay.
          </li>
          <li>
            <strong className="font-medium text-gray-900">Childcare Fees:</strong> For working parents, nursery fees are often the largest monthly outgoing. Removing one or two days of paid childcare from your budget often entirely neutralizes the financial impact of taking a pay cut.
          </li>
          <li>
            <strong className="font-medium text-gray-900">Threshold Protections:</strong> If your full-time salary is pushing you near the £50,270 higher-rate tax bracket or exposing you to the High Income Child Benefit Charge, dropping your hours can pull your Adjusted Net Income safely back into the basic rate, protecting your family's broader financial benefits.
          </li>
        </ul>
      </section>

      {/* Section 8 / Footer Call to action */}
      <section className="mb-8 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2 tracking-tight">
            Map Your Part-Time Transition with NetPayFlow
          </h2>
          <p className="text-blue-100 text-sm md:text-base">
            You do not need a complicated spreadsheet to figure out if you can afford to drop a working day. NetPayFlow maps the exact financial pipeline of your new lifestyle, from your adjusted gross salary all the way down to your daily savings goals.
          </p>
        </div>
        
        <div className="p-6">
          <p className="font-medium text-gray-900 mb-5 text-lg">Here is how to test-drive your new part-time life:</p>
          
          <div className="space-y-6 mb-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-gray-900 mb-1">1. Slide into Your New Hours</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Start at the Salary Calculator. Input your full-time Equivalent (FTE) gross salary, hit the Pro-Rata Toggle, and move the slider to your desired working days (e.g., 3 or 4 days). Watch your exact Income Tax, National Insurance, and Student Loan deductions recalculate instantly.</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-gray-900 mb-1">2. Stress-Test Your Budget</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Let your new pro-rata take-home pay flow automatically into the Budget Planner. Input your rent, mortgage, and core bills to definitively see if your new adjusted income comfortably covers your lifestyle.</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-gray-900 mb-1">3. Find Your New Surplus</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Even on part-time hours, highly efficient tax routing means you might still have cash left over. Look at your new Surplus Cash figure and use the Target slider to allocate a safe, realistic amount you can still afford to save.</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-gray-900 mb-1">4. Adjust Your Trajectory</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Flow that new Target amount into the Savings Compound or Debt Overpayment calculators. You can instantly see how your new schedule shifts the timeline for paying off your mortgage or maxing out your ISA.</p>
            </div>
          </div>
          
          <p className="text-center font-medium text-gray-900 bg-blue-50 p-4 rounded-lg border border-blue-100">
            Time is the most valuable asset you have. By mapping your pro-rata salary through the NetPayFlow pipeline, you can confidently buy back your time without breaking your budget. 
          </p>
        </div>
      </section>
    </article>
  );
}
