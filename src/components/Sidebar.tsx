'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Calculator,
  PiggyBank,
  TrendingUp,
  Coins,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  CreditCard
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({
  currentPage,
  setCurrentPage,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}: SidebarProps) {
  const router = useRouter();
  
  const menuItems = [
    { id: 'salary-calculator', label: 'Salary Calculator', icon: Calculator, desc: 'Calculate HMRC taxes' },
    { id: 'budget-planner', label: 'Budget Planner', icon: PiggyBank, desc: 'Expense tracker' },
    { id: 'savings-compounder', label: 'Savings Compounder', icon: TrendingUp, desc: 'Compound growth' },
    { id: 'debt-overpayment', label: 'Debt Overpayment', icon: CreditCard, desc: 'Save interest & time' },
    { id: 'blog', label: 'Blog & Financial Insights', icon: BookOpen, desc: 'UK tax tips & guides' },
  ];

  const handleNav = (item: { id: string, label: string, icon: any, desc: string }) => {
    console.log("Sidebar handleNav received ID:", item.id);
    if (item.id === 'blog') {
      router.push('/blog');
      return;
    }
    setCurrentPage(item.id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-300 select-none pb-4 font-sans border-r border-zinc-800">
      {/* Brand Header */}
      <div className={`hidden md:flex p-3 items-center justify-between border-b border-zinc-900 ${collapsed ? 'justify-center' : ''}`}>
        {!collapsed && (
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 flex items-center justify-center font-black text-[10px] shadow-md shadow-emerald-900/40">
              <Coins className="w-3 h-3" />
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-xs leading-none block">NetPayFlow</span>
              <span className="text-[8px] text-zinc-500 font-mono mt-0.5 block">HMRC 2026/27</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 flex items-center justify-center font-black text-[10px] cursor-pointer" onClick={() => router.push('/')}>
            N
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Navigation Space */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {menuItems.map(item => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item)}
              className={`cursor-pointer w-full rounded-xl flex items-center gap-3.5 px-3 py-3 transition-all text-left ${
                isActive
                  ? 'bg-zinc-900 text-white font-semibold border-l-2 border-emerald-500'
                  : 'hover:bg-zinc-900/55 hover:text-white text-zinc-400'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
              {!collapsed && (
                <div className="flex-grow min-w-0">
                  <span className="text-xs leading-none block">{item.label}</span>
                  <span className={`text-[9px] font-medium leading-none block mt-1 transition-colors ${isActive ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    {item.desc}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Static Info Indicator */}
      {!collapsed && (
        <div className="px-5 py-3.5 mx-3 bg-zinc-900/40 border border-zinc-900 rounded-xl space-y-1">
          <div className="text-[9px] font-bold uppercase text-zinc-500 tracking-wider">Flow Engine Status</div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Real-time Link
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Header / Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-zinc-950 border-b border-zinc-900 h-14 px-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 flex items-center justify-center font-black text-xs shadow-md">
            <Coins className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-black text-white tracking-tight">NetPayFlow</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Sidebar Container */}
      <aside className={`hidden md:block select-none h-screen sticky top-0 shrink-0 transition-all duration-300 z-30 ${collapsed ? 'w-18' : 'w-64'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          {/* Drawer body */}
          <div className="relative flex flex-col w-64 max-w-sm bg-zinc-950 shadow-xl z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
