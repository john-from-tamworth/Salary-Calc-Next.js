import { PiggyBank, Receipt, Settings, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onShowInfo: () => void;
  showInfo: boolean;
}

export default function Header({ onShowInfo, showInfo }: HeaderProps) {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-40" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-zinc-900 text-white rounded-xl shadow-sm flex items-center justify-center">
            <PiggyBank className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-zinc-950 tracking-tight leading-none">UK & Scotland Salary Calculator</h1>
            <p className="text-xs text-zinc-500 font-medium mt-1">Real-time tax, NI, pension & savings planner</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Tax Year 2025/26 Ready
          </span>
          <button
            onClick={onShowInfo}
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
              showInfo
                ? 'bg-zinc-100 border-zinc-300 text-zinc-900'
                : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
            }`}
            title="How calculations work"
            id="btn-info-toggle"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden md:inline">How It Works</span>
          </button>
        </div>
      </div>
    </header>
  );
}
