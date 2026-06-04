import React, { useState } from 'react';
import { BookOpen, ArrowRight, Zap, Target, Sliders, PlayCircle, Star, PiggyBank, CreditCard, Sparkles, ChevronLeft, Clock, Briefcase } from 'lucide-react';
import BlogEmbeddableBreakdown from './BlogEmbeddableBreakdown';
import BlogEmbeddableInputs from './BlogEmbeddableInputs';
import BlogEmbeddableComparator from './BlogEmbeddableComparator';
import BlogEmbeddableBudgetPlanner from './BlogEmbeddableBudgetPlanner';
import BlogEmbeddableSavingsCompounder from './BlogEmbeddableSavingsCompounder';
import BlogEmbeddableDebtOverpayment from './BlogEmbeddableDebtOverpayment';
import BlogEmbeddableProRataSlider from './BlogEmbeddableProRataSlider';

interface BlogProps {
  // Callbacks to preset values in other pages
  setGrossInputA: (val: string) => void;
  setGrossInputB: (val: string) => void;
  setCompareMode: (val: boolean) => void;
  setEditingScenario: (val: 'A' | 'B') => void;
  setPensionRate: (rate: number) => void;
  setPensionType: (type: 'salarySacrifice' | 'netPay' | 'reliefAtSource') => void;
  toggleStudentLoan: (plan: string) => void;
  setStudentLoanPlans: (plans: string[]) => void;
  setIsProRata: (val: boolean) => void;
  setProRataDays: (val: number) => void;
  setCurrentPage: (page: string) => void;
  viewingArticleId: string | null;
  setViewingArticleId: (id: string | null) => void;
}

export default function Blog({
  setGrossInputA,
  setGrossInputB,
  setCompareMode,
  setEditingScenario,
  setPensionRate,
  setPensionType,
  setStudentLoanPlans,
  setIsProRata,
  setProRataDays,
  setCurrentPage,
  viewingArticleId,
  setViewingArticleId
}: BlogProps) {

  const articles = [
    {
      id: 'how-to-use-netpayflow',
      title: 'Master Your Money: The Step-by-Step Guide to Using NetPayFlow',
      category: 'Guides',
      readTime: '6 min read',
      summary: 'Ready to take complete control of your finances? Discover how NetPayFlow connects your salary, budget, savings, and debt into a single, seamless financial pipeline.',
      difficulty: 'Beginner',
      iconUrl: BookOpen,
      bgGradient: 'from-violet-50 to-purple-50/20 border-violet-200/60',
      actionText: 'Start Your Financial Flow',
      onClickPreset: () => {
        setGrossInputA('40000');
        setCurrentPage('salary-calculator');
      },
      bullets: [
        'Most financial tools force you to copy and paste data across different spreadsheets. NetPayFlow connects everything into a single, automated pipeline.',
        'Watch your calculations flow seamlessly from your gross salary down to your monthly living costs, and straight into your long-term wealth building engines.',
        'Easily model complex scenarios like part-time pro rata schedules, hourly wage tracking, and side-by-side A/B salary comparisons.'
      ],
      fullContent: (
        <div className="space-y-6 text-zinc-700 leading-relaxed text-sm">
          <p>
            Managing your money shouldn’t feel like doing homework. Traditional budgeting tools usually force you to calculate your tax on one website, map your expenses on another, and figure out your savings compound interest on a third. 
          </p>
          <p>
            We built <strong>NetPayFlow</strong> because money doesn't live in isolated compartments—it flows. When your income changes, your budget changes, and your financial goals shift. Our platform maps your entire financial pipeline in real time. Here is the step-by-step breakdown of how to unleash the full power of the app.
          </p>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">Step 1: Map Your Inflow (The Salary Calculator)</h3>
          
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="md:w-1/2 space-y-4">
              <p>
                Your journey begins at the source. The Salary Calculator strips away the guesswork of UK and Scottish tax logic to establish your absolute baseline spending power.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Input Your Base:</strong> Enter your gross annual salary or switch modes to calculate by <strong>hourly pay</strong> rates.</li>
                <li><strong>Layer on Extras:</strong> Add your bonuses (using our smart £ flat-rate or % percentage toggles), and input non-taxable income like Child Benefit. Taxable items alter your tax brackets, while non-taxable items safely bypass the tax engine.</li>
                <li><strong>Navigate Adjustments:</strong> Test a part-time transition using our <strong>Pro Rata slider</strong> to see how dropping a working day actually impacts your take-home pay. </li>
                <li><strong>Beat the Thresholds:</strong> If you approach high-tax bottlenecks (like the infamous £100k tax trap), look out for our dynamic on-screen warnings. Hit the "Safe Pension Contribution" button to instantly apply a tax-saving salary sacrifice.</li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <BlogEmbeddableInputs />
            </div>
          </div>
          
          <div className="mt-6">
            <BlogEmbeddableBreakdown grossSalary={40000} />
          </div>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">Step 2: Compare Realities (The Scenario A/B Toggle)</h3>
          <p>
            Weighing up a new job offer or preparing for an internal review? Flip the <strong>Compare Salary</strong> switch to open up two independent tracks: Scenario A and Scenario B. You can customize different salaries, distinct bonus structures, or varied pension matches side-by-side. Once you find your strongest financial reality, hit the "Flow Scenario" button to stream that specific Net Pay forward into the rest of the app.
          </p>

          <div className="my-6">
            <BlogEmbeddableComparator grossSalaryA={50000} grossSalaryB={60000} />
          </div>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">Step 3: Direct the Stream (The Budget Planner)</h3>
          <p>
            Once your optimized Net Pay is locked in, it automatically <em>flows</em> straight down into your Budget Planner. No manual copying required. 
          </p>
          <p>
            As you log your rent, mortgage, utilities, and lifestyle expenses, the app subtracts them from your streaming income to reveal the holy grail of personal finance: your <strong>Surplus Cash</strong>. To keep you flexible, use the budget target slider to lock in a comfortable "Target" savings amount while keeping the rest safely liquid for day-to-day life.
          </p>

          <div className="my-6">
            <BlogEmbeddableBudgetPlanner />
          </div>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">Step 4: Supercharge Your Future (Savings & Debt Overpayment)</h3>
          <p>
            Now watch your money work for you. Your surplus and target figures flow directly into our two financial engines:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>The Savings Compound:</strong> Route your surplus into a simulation of high-interest savings accounts, ISAs, or global index funds. Set your interest rates and goals to see exactly how fast your money grows over time.</li>
            <li><strong>Debt Overpayment:</strong> Alternatively, stream that surplus toward credit cards or your mortgage. You will see instantly how making consistent extra payments can crush your liabilities and save you thousands in interest, clearing your debts decades early.</li>
          </ul>

          <div className="my-10 space-y-10">
            <BlogEmbeddableSavingsCompounder />
            <BlogEmbeddableDebtOverpayment />
          </div>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">The Closed-Loop Advantage</h3>
          <p>
            The real magic of NetPayFlow is that it is a closed loop. If you want to see how a £200 monthly pension increase affects your mortgage payoff date ten years from now, you don't need to rebuild a spreadsheet. Simply scroll back up to Step 1, tweak the slider, and watch the ripple effect stream instantly through your entire budget, surplus, and savings goals. 
          </p>
          <p>
            Ready to see it in action? Hit the simulation button above to jump right into the calculator and start guiding your financial flow!
          </p>
        </div>
      )
    },
    {
      id: 'tax-trap',
      title: 'Demystifying the UK £100k "Tax Trap": How to Beat the 60% Marginal Rate',
      category: 'UK Income Tax',
      readTime: '5 min read',
      summary: 'Earning over £100,000? You might be caught in the hidden 60% tax trap. Discover how HMRC withdraws your Personal Allowance and how to use smart pension planning to keep more of your hard-earned money.',
      difficulty: 'Intermediate',
      iconUrl: Star,
      bgGradient: 'from-amber-50 to-orange-50/20 border-amber-200/60',
      actionText: 'Simulate the £115k Tax Trap',
      onClickPreset: () => {
        setGrossInputA('115000');
        setCurrentPage('salary-calculator');
      },
      bullets: [
        'HMRC reduces your £12,570 tax-free Personal Allowance by £1 for every £2 you earn above £100,000.',
        'This creates a "hidden" 60% marginal income tax rate between £100,000 and £125,140—even before National Insurance is factored in.',
        'You can dodge this trap entirely by using Salary Sacrifice to boost your pension, bringing your taxable income back to safety.'
      ],
      fullContent: (
        <div className="space-y-6 text-zinc-700 leading-relaxed text-sm">
          <p>
            Hitting a six-figure salary is a massive milestone, but in the UK, it comes with a frustrating catch. Welcome to the infamous <strong>£100k Tax Trap</strong>. If your adjusted net income lands anywhere between £100,000 and £125,140, you are effectively paying a massive 60% marginal tax rate on that slice of your earnings. 
          </p>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">How the 60% Tax Trap Actually Works</h3>
          <BlogEmbeddableBreakdown grossSalary={115000} />
          <p>
            Let’s break down exactly what is happening behind the scenes. Everyone in the UK generally gets a Personal Allowance—the first £12,570 you earn completely tax-free. However, the moment your income crosses the £100,000 threshold, HMRC starts taking that allowance back.
          </p>
          <p>
            For every <strong>£2</strong> you earn over £100k, you lose <strong>£1</strong> of your tax-free allowance. 
          </p>
          <p>
            Because you are now paying standard 40% higher-rate tax on the new money you earned, <em>plus</em> paying 40% on the portion of your allowance you just lost, it creates an effective 60% marginal tax rate. Earn a £1,000 bonus? You might only see £400 of it in your bank account.
          </p>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">The Solution: Beat the Trap with NetPayFlow</h3>
          <p>
            The math sounds brutal, but there is a fully legal, highly effective way to bypass it: <strong>Salary Sacrifice pension contributions</strong>. By moving that heavily-taxed money directly into your pension, you lower your official "adjusted net income" back to £100,000, instantly reclaiming your lost tax-free allowance.
          </p>
          
          <p>
            Here is how you can use <strong>NetPayFlow</strong> to fix this right now:
          </p>

          <ul className="list-disc pl-5 space-y-3 mt-2">
            <li>
              <strong>1. Spot the Trap in the Salary Calculator:</strong> Hit the simulation button on this article to load £115,000 into the Salary Calculator. Keep an eye out for our dynamic threshold warning—it will instantly flag that your Personal Allowance is draining. Simply click our one-button "Safe Pension Contribution" fix to automatically calculate the exact sacrifice needed to drop your tax bill.
            </li>
            <li>
              <strong>2. Flow into the Budget Planner:</strong> Once you have optimized your take-home pay, let that new, tax-efficient number <em>flow</em> straight into your Budget Planner. Map out your monthly living costs to reveal your true <strong>Surplus Cash</strong>.
            </li>
            <li>
              <strong>3. Target Your Wealth:</strong> You don't have to lock all your extra money away. Use the slider in the Budget Planner to choose a comfortable "Target" amount.
            </li>
            <li>
              <strong>4. Compound and Conquer:</strong> Let your targeted surplus flow directly into the Savings Compound or Debt Overpayment calculators. See exactly how your tax savings can crush your mortgage years early or compound into a massive ISA portfolio over the next decade.
            </li>
          </ul>

          <p className="mt-6">
            Don't let HMRC keep 60% of your hard-earned pay rise. Start at the Salary Calculator, apply your pension fix, and watch your money flow efficiently toward your actual financial goals.
          </p>
        </div>
      )
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
      ],
      fullContent: (
        <div className="space-y-6 text-zinc-700 leading-relaxed text-sm">
          <p>Choosing the right pension scheme can significantly impact your long-term wealth and monthly take-home pay. While "Relief at Source" and "Net Pay" are common, <strong>Salary Sacrifice</strong> is often the most mathematically efficient method for most UK employees.</p>
          <p>In a Salary Sacrifice arrangement, you reduce your contractual gross salary in exchange for the employer paying that amount directly into your pension. Because your salary is lower, you pay less Income Tax <em>and</em> less National Insurance (NI) on your remaining cash income.</p>
          <p>Use our <strong>Salary Calculator</strong> to model this. Select 'Salary Sacrifice' in the pension settings and input your contribution rate. Compare this against 'Net Pay' or 'Relief at Source' to immediately see the difference in your net monthly income and total long-term savings. You'll quickly see why Salary Sacrifice yields higher immediate savings for the vast majority of employees.</p>
        </div>
      )
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
      ],
      fullContent: (
        <div className="space-y-6 text-zinc-700 leading-relaxed text-sm">
          <p>
            Debt overpayment math is remarkably powerful. Because mortgage interest compounds daily on your remaining balance, reducing that balance early has a disproportionately positive effect on the lifetime cost of your debt. By making small, consistent overpayments—even just £100 or £200 a month—you aren't just shortening your mortgage term; you are effectively investing in a guaranteed, tax-free 'return' equal to your mortgage interest rate, which is often far superior to what you might earn in a standard savings account.
          </p>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">Strategy: Avalanche vs. Snowball</h3>
          <p>
            When tackling multiple debts, you have two primary approaches:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Debt Avalanche:</strong> Target your highest-interest debt first. This is the mathematically optimal path to save the most total interest.</li>
            <li><strong>Debt Snowball:</strong> Target your smallest balances first. This delivers quick wins, boosting your psychological momentum to keep going.</li>
          </ul>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">Visualize Your Debt Freedom</h3>
          <p>
            Stop guessing the impact of your overpayments. Our Debt Overpayment simulator lets you input your actual balances, rates, and terms, then model the magic of extra monthly contributions. 
          </p>

          <div className="my-6">
            <BlogEmbeddableDebtOverpayment />
          </div>

          <p className="mt-6">
            Use the tool above to add your extra monthly contribution. Watch the graph and the summary boxes update in real-time to show exactly how many years you can knock off your mortgage or loan, and the thousands of pounds in interest you'll save just by staying the course.
          </p>
        </div>
      )
    },
    {
      id: 'pro-rata-salary',
      title: 'Pro-Rata Salary Explained: How Going Part-Time Affects Your Pay',
      category: 'Career Finance',
      readTime: '3 min read',
      summary: 'Thinking about dropping a day at work? Discover how to accurately calculate your pro rata take-home pay, and why working 20% fewer hours usually means losing much less than 20% of your net income.',
      difficulty: 'Beginner',
      iconUrl: Clock,
      bgGradient: 'from-blue-50 to-sky-50/20 border-blue-200/60',
      actionText: 'Simulate a 3-Day Work Week',
      onClickPreset: () => {
        setGrossInputA('45000');
        setIsProRata(true);
        setProRataDays(3);
        setCurrentPage('salary-calculator');
      },
      bullets: [
        '"Pro rata" simply means "in proportion." If you work 3 days out of a standard 5-day week, your gross salary is prorated to 60%.',
        'Dropping your hours by 20% does NOT mean your take-home pay drops by 20%. Because of the UK\'s £12,570 tax-free Personal Allowance, part-time work is incredibly tax-efficient.',
        'Use our interactive slider to instantly visualize how changing your working days impacts your National Insurance, Income Tax, and final monthly budget.'
      ],
      fullContent: (
        <div className="space-y-6 text-zinc-700 leading-relaxed text-sm">
          <p>
            Whether you are stepping back to care for family, starting a side hustle, or simply reclaiming your Fridays, dropping to a part-time schedule is a massive life decision. But the biggest question holding people back is always the same: <em>"Can I actually afford to live on a pro rata salary?"</em>
          </p>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">The Pro Rata Tax Advantage</h3>
          <p>
            When calculating part-time wage adjustments in the UK, many people make the mistake of simply chopping their net pay in half. Fortunately, the math works heavily in your favor. 
          </p>
          <p>
            Because your <strong>£12,570 tax-free Personal Allowance</strong> remains exactly the same whether you work two days or five, a much larger percentage of your pro rata salary falls into the 0% tax bracket. This means dropping your hours by 20% (going from 5 days to 4) usually results in a take-home pay drop of only 12% to 15%.
          </p>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">Map Your Part-Time Transition with NetPayFlow</h3>
          <p>
            You do not need a spreadsheet to figure out if you can afford to drop a working day. <strong>NetPayFlow</strong> maps the exact financial pipeline of your new lifestyle from gross salary all the way down to your savings goals. 
          </p>
          
          <p>
            Here is how to test-drive your new part-time life:
          </p>

          <ul className="list-disc pl-5 space-y-3 mt-2">
            <li>
              <strong>1. Slide into Your New Hours:</strong> Start at the Salary Calculator. Input your full-time Equivalent (FTE) gross salary, hit the <strong>Pro Rata Toggle</strong>, and move the slider to your desired working days (e.g., 3 or 4 days). Watch your exact Income Tax and National Insurance deductions recalculate instantly.
              <div className="mt-4">
                <BlogEmbeddableProRataSlider />
              </div>
            </li>
            <li>
              <strong>2. Stress-Test Your Budget:</strong> Let your new pro rata take-home pay <em>flow</em> automatically into the Budget Planner. Input your rent, mortgage, and core bills to see if your new income comfortably covers your lifestyle. 
            </li>
            <li>
              <strong>3. Find Your New Surplus:</strong> Even on part-time hours, you might have cash left over. Look at your new <strong>Surplus Cash</strong> figure and use the Target slider to allocate a safe, realistic amount you can still afford to save.
            </li>
            <li>
              <strong>4. Adjust Your Goals:</strong> Flow that new Target amount into the Savings Compound or Debt Overpayment calculators. You can instantly see how your new part-time schedule shifts the timeline for paying off your mortgage or maxing out your ISA.
            </li>
          </ul>

          <p className="mt-6">
            Time is the most valuable asset you have. By mapping your pro rata salary through the NetPayFlow pipeline, you can confidently buy back your time without breaking your budget. Hit the simulation button above to test a 3-day week right now!
          </p>
        </div>
      )
    },
    {
      id: 'scottish-tax',
      title: 'Scottish Salary Calculator: How Scottish Tax Differs',
      category: 'Career Finance',
      readTime: '3 min read',
      summary: 'Living in Scotland? Tax bands and rates differ from the rest of the UK. Learn how these differences affect your net income and use our tool to break down your pay.',
      difficulty: 'Intermediate',
      iconUrl: Target,
      bgGradient: 'from-amber-50 to-orange-50/20 border-amber-200/60',
      actionText: 'Use UK Salary Calculator',
      onClickPreset: () => {
        setCurrentPage('salary-calculator');
      },
      bullets: [
        'Scottish tax rates and bands are distinct from those in the rest of the UK, meaning your take-home pay might differ significantly.',
        'Understanding how Scottish Income Tax impacts your monthly net salary is crucial for accurate financial planning.',
        'Use our salary calculator to generate a breakdown of your earnings and understand your tax liability.'
      ],
      fullContent: (
        <div className="space-y-6 text-zinc-700 leading-relaxed text-sm">
            <p>If you live and work in Scotland, your income tax is calculated differently than for taxpayers in the rest of the UK. The Scottish Parliament sets its own income tax bands and rates, which often leads to different net pay results for the same gross salary.</p>
            <p>Because these rates can change and are often applied differently to earnings over certain thresholds, it is essential to stay informed about how your gross salary translates to your actual take-home pay.</p>
            <p>Our <strong>Salary Calculator</strong> is designed to provide you with a clear, reliable breakdown of your UK salary. By inputting your gross earnings, you can see exactly how tax—whether UK or Scottish-based—affects your monthly income, helping you plan your expenses and savings with confidence.</p>
        </div>
      )
    },
    {
      id: 'compare-job-offers',
      title: 'Pay Rise or New Job? How to Compare Salary Offers Like a Pro',
      category: 'Career & Salary',
      readTime: '5 min read',
      summary: 'Got a new job offer? Don\'t just look at the gross salary. Discover how to use our Scenario A vs. B toggle to instantly compare taxes, pension perks, and true monthly take-home pay.',
      difficulty: 'Beginner',
      iconUrl: Briefcase,
      bgGradient: 'from-emerald-50 to-teal-50/20 border-emerald-200/60',
      actionText: 'Compare Two Job Offers',
      onClickPreset: () => {
        setGrossInputA('50000');
        setGrossInputB('60000');
        setCompareMode(true);
        setEditingScenario('A');
        setCurrentPage('salary-calculator');
      },
      bullets: [
        'A £10,000 pay rise looks great on paper, but after Income Tax, National Insurance, and Student Loans, your actual monthly boost might be smaller than you think.',
        'Not all offers are equal: A lower salary with a generous employer pension match can often leave you with more disposable income than a higher salary with poor benefits.',
        'Use our Compare Scenario toggle to build "Offer A" and "Offer B", flicking between them instantly to see the true impact on your Take-Home Pay and Budget.'
      ],
      fullContent: (
        <div className="space-y-6 text-zinc-700 leading-relaxed text-sm">
          <p>
            Whether you are negotiating an internal pay rise, weighing up a competitor's offer, or bouncing back into a new role, seeing a higher gross salary on a contract is a fantastic feeling. But making career decisions based purely on that top-line number is a dangerous game.
          </p>

          <p>
            When calculating the value of a new job offer in the UK, many professionals simply subtract their old salary from their new one. But HMRC doesn't work like that. Depending on your tax bracket, a massive chunk of that new pay rise will be immediately swallowed by 40% higher-rate tax, National Insurance, and the 9% Student Loan deduction. 
          </p>
          <p>
            Furthermore, pension schemes drastically alter the math. If your new employer offers a highly generous pension match, you might be able to safely lower your own contributions while keeping your retirement on track—putting hundreds of extra pounds back into your pocket each month. 
          </p>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">Decide with Confidence using NetPayFlow's A/B Toggle</h3>
          <p>
            You don't need to guess which job offer is actually better for your bank account. <strong>NetPayFlow</strong> features a built-in <strong>Compare Salary</strong> tool that lets you build two completely separate financial realities and toggle between them at the click of a button.
          </p>
          
          <p>
            Here is how to stress-test your new job offer before you sign the contract:
          </p>

          <ul className="list-disc pl-5 space-y-3 mt-2">
            <li>
              <strong>1. Build Scenario A (Your Baseline):</strong> Start in the Salary Calculator and input your current setup. Enter your gross pay, standard deductions, and current pension contribution. 
            </li>
            <li>
              <strong>2. Craft Scenario B (The New Offer):</strong> Hit the Compare toggle to create Scenario B. Enter the new salary offer. Here is where the magic happens: tweak the new pension contributions to match the new employer's scheme and see exactly how the differing tax implications alter your final Net Take-Home Pay.
            </li>
            <li>
              <strong>3. Flick the Switch:</strong> Instantly toggle between A and B. Watch the true monthly difference appear before your eyes, entirely stripped of tax-bracket illusions.
            </li>
            <li>
              <strong>4. Flow into the Future:</strong> The comparison doesn't stop at the calculator. Let both scenarios <em>flow</em> down into your Budget Planner. Toggle between A and B to see how the new offer expands your <strong>Surplus Cash</strong>. Finally, push that new surplus into the Savings Compound or Debt calculators to see exactly how many years this new job will shave off your mortgage or accelerate your financial freedom.
            </li>
          </ul>

          <div className="my-6">
            <BlogEmbeddableComparator grossSalaryA={50000} grossSalaryB={60000} />
          </div>

          <p className="mt-6">
            A career move is a life-changing decision. Let the data guide you. Hit the simulation button above to set up a £50k vs £60k comparison right now, and see exactly what that pay rise actually looks like in your wallet!
          </p>
        </div>
      )
    },
    {
      id: 'savings-compounder',
      title: 'Compound Interest: How Small Savings Become a Fortune',
      category: 'Investing',
      readTime: '4 min read',
      summary: 'Is compound interest truly the eighth wonder of the world? Discover how consistent, small contributions to your savings can grow into a significant nest egg over time.',
      difficulty: 'Beginner',
      iconUrl: Star,
      bgGradient: 'from-blue-50 to-indigo-50/20 border-blue-200/60',
      actionText: 'Use Savings Compounder',
      onClickPreset: () => {
        setCurrentPage('compounder');
      },
      bullets: [
        'Compound interest allows your initial investment, plus the interest earned, to generate further interest over time.',
        'Starting early is more important than the size of the initial investment; time is your greatest asset.',
        'Use our savings compounder tool to model how different contribution amounts and timeframes change your long-term wealth.'
      ],
      fullContent: (
        <div className="space-y-6 text-zinc-700 leading-relaxed text-sm">
            <p>Albert Einstein is famously credited with calling compound interest the "eighth wonder of the world," and once you see the numbers, it's easy to understand why. Compound interest is simply interest calculated on both the initial principal and the accumulated interest from previous periods. Over time, this creates a snowball effect that can turn modest, consistent savings into a significant nest egg.</p>
            <p>The key to maximizing compound interest is not necessarily having a large lump sum to start with, but rather <strong>time</strong> and <strong>consistency</strong>. Even small, regular contributions can yield dramatic results over decades. It's often the difference between a comfortable retirement and financial independence.</p>
            <p>Want to see the potential for yourself? Test it in our <strong>Savings Compounder</strong> tool. Input your initial amount, your monthly contribution, and your expected yield—then, experiment by changing the years. Watching the growth curve change as you add just a few more years or a slightly higher monthly contribution is the best way to understand how your long-term financial future is built.</p>
        </div>
      )
    },
    {
      id: 'debt-avalanche',
      title: 'Debt Avalanche vs. Snowball: How to Pay Off Loans Faster',
      category: 'Debt Paydown',
      readTime: '4 min read',
      summary: 'Struggling with credit card debt or loans? Discover the two most effective strategies for becoming debt-free quicker and saving thousands in interest charges.',
      difficulty: 'Beginner',
      iconUrl: CreditCard,
      bgGradient: 'from-rose-50 to-pink-50/20 border-rose-200/60',
      actionText: 'Use Debt Overpayment Planner',
      onClickPreset: () => {
        setCurrentPage('debt-overpayment');
      },
      bullets: [
        'The "Debt Avalanche" focuses on paying off high-interest debt first to minimize total interest paid.',
        'The "Debt Snowball" focuses on paying off the smallest balances first to build psychological momentum.',
        'Use our debt overpayment tracker to see clearly how adding just £50 extra a month reduces your total debt term.'
      ],
      fullContent: (
        <div className="space-y-6 text-zinc-700 leading-relaxed text-sm">
          <p>
            Debt overpayment math is remarkably powerful. Because mortgage interest compounds daily on your remaining balance, reducing that balance early has a disproportionately positive effect on the lifetime cost of your debt. By making small, consistent overpayments—even just £100 or £200 a month—you aren't just shortening your mortgage term; you are effectively investing in a guaranteed, tax-free 'return' equal to your mortgage interest rate, which is often far superior to what you might earn in a standard savings account.
          </p>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">Strategy: Avalanche vs. Snowball</h3>
          <p>
            When tackling multiple debts, you have two primary approaches:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Debt Avalanche:</strong> Target your highest-interest debt first. This is the mathematically optimal path to save the most total interest.</li>
            <li><strong>Debt Snowball:</strong> Target your smallest balances first. This delivers quick wins, boosting your psychological momentum to keep going.</li>
          </ul>

          <h3 className="text-lg font-semibold text-zinc-900 mt-6">Visualize Your Debt Freedom</h3>
          <p>
            Stop guessing the impact of your overpayments. Our Debt Overpayment simulator lets you input your actual balances, rates, and terms, then model the magic of extra monthly contributions. 
          </p>

          <div className="my-6">
            <BlogEmbeddableDebtOverpayment />
          </div>

          <p className="mt-6">
            Use the tool above to add your extra monthly contribution. Watch the graph and the summary boxes update in real-time to show exactly how many years you can knock off your mortgage or loan, and the thousands of pounds in interest you'll save just by staying the course.
          </p>
        </div>
      )
    },
    {
      id: 'hourly-vs-salary',
      title: 'Hourly vs. Salary: Understanding Your True Pay Rate',
      category: 'Career Finance',
      readTime: '3 min read',
      summary: 'Making sense of your earnings is complex when comparing hourly and salaried roles. We break down the differences and show you how to accurately calculate your true take-home pay.',
      difficulty: 'Beginner',
      iconUrl: Zap,
      bgGradient: 'from-blue-50 to-indigo-50/20 border-blue-200/60',
      actionText: 'Compare Rates in Calculator',
      onClickPreset: () => {
        setCurrentPage('salary-calculator');
      },
      bullets: [
        'Hourly rates often change based on overtime hours, while salaries are typically fixed based on a contract.',
        'Understanding how tax affects your paycheck regardless of the pay structure is essential.',
        'Use our salary calculator to switch between modes and instantly compare your net income across both structures.'
      ],
      fullContent: (
        <div className="space-y-6 text-zinc-700 leading-relaxed text-sm">
            <p>One of the most foundational questions for anyone reviewing a job offer is: "How does this pay rate actually impact my life?" The difference between an hourly wage and a fixed annual salary can be more than just a number on a contract—it fundamentally changes how you think about your income, your time, and your planning.</p>
            <p>An hourly rate offers flexibility; if you work more, you are paid more, though it can make consistent financial planning trickier if your hours fluctuate. A salary offers stability; you know a fixed amount will hit your account each month, but it often brings the expectation of flexibility in hours without automatic extra pay.</p>
            <p>Regardless of the structure, the tax man views them similarly—and that’s where our <strong>Salary Calculator</strong> becomes invaluable. Whether you're entering an hourly rate or an annual salary, our tool cuts through the noise. It calculates your tax, National Insurance, and pension deductions instantly, showing you your real, monthly take-home pay in both scenarios. If you're weighing an offer, plug both numbers in to see which one truly puts more money in your pocket at the end of the month.</p>
        </div>
      )
    }
  ];

  const currentArticle = articles.find(a => a.id === viewingArticleId);

  return (
    <div className="space-y-8" id="blog-insights-container">
      {/* Article Full View */}
      {viewingArticleId && currentArticle ? (
        <div className="space-y-6 animate-in fade-in duration-300">
           <button 
             onClick={() => setViewingArticleId(null)}
             className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors mb-4"
           >
             <ChevronLeft className="w-4 h-4" />
             Back to Insights Hub
           </button>
           
           <h2 className="text-3xl font-black text-zinc-950 tracking-tight">{currentArticle.title}</h2>
           
           <div className="flex gap-4 items-center text-xs text-zinc-500">
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{currentArticle.category}</span>
              <span>{currentArticle.readTime}</span>
              <span>{currentArticle.difficulty} Level</span>
           </div>

           {currentArticle.fullContent}

           <div className="border-t border-zinc-100 pt-6 mt-6">
             <button
                onClick={currentArticle.onClickPreset}
                className="cursor-pointer py-3 px-6 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2"
              >
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>{currentArticle.actionText}</span>
              </button>
           </div>
        </div>
      ) : (
        /* Blog List View */
        <div className="space-y-8">
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
              </div>

              {articles.map(article => {
                const IconComponent = article.iconUrl;
                return (
                  <div
                    key={article.id}
                    className="bg-white border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 border-zinc-200/80 cursor-pointer"
                    onClick={() => setViewingArticleId(article.id)}
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
                    </div>

                    <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 pt-2 border-t border-zinc-100">
                        Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
      )}
    </div>
  );
}
