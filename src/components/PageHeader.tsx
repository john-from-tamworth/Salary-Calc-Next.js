
import { Coins, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-sky-50 border-b border-zinc-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs sticky top-0 z-40 transition-all duration-300">
      <div className="flex items-center gap-3">
        <Link href="/" className="p-2 bg-white text-zinc-600 rounded-lg border border-zinc-200 hover:border-emerald-300 hover:text-emerald-700 transition">
            <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
            <Coins className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-extrabold text-zinc-950 block">{title}</h2>
          <p className="text-[11px] text-zinc-500 font-medium block mt-0.5">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
