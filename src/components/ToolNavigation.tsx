import React from 'react';
import { ArrowLeft, ArrowRight, LucideIcon } from 'lucide-react';

interface ToolNavigationProps {
    previousPage?: { path: string; label: string; icon?: LucideIcon };
    nextPage?: { path: string; label: string; icon?: LucideIcon };
    setCurrentPage: (page: string) => void;
}

export default function ToolNavigation({ previousPage, nextPage, setCurrentPage }: ToolNavigationProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-8 border-t border-zinc-200">
            {previousPage ? (
                <button
                    onClick={() => {
                        setCurrentPage(previousPage.path);
                        window.scrollTo(0, 0);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition text-sm font-semibold text-zinc-700 w-full sm:w-auto"
                >
                    {previousPage.icon && <previousPage.icon className="w-4 h-4" />}
                    <ArrowLeft className="w-4 h-4" />
                    Back to {previousPage.label}
                </button>
            ) : <div />}
            
            {nextPage && (
                <button
                    onClick={() => {
                        setCurrentPage(nextPage.path);
                        window.scrollTo(0, 0);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition text-sm font-semibold text-white w-full sm:w-auto"
                >
                    {nextPage.label}
                    {nextPage.icon && <nextPage.icon className="w-4 h-4" />}
                    <ArrowRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
