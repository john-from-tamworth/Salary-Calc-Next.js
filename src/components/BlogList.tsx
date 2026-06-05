
import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { blogs } from '../lib/blogs';

export default function BlogList() {
  return (
    <div className="space-y-8" id="blog-insights-container">
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
          {blogs.map(article => {
            return (
              <Link
                href={`/blog/${article.id}`}
                key={article.id}
                className="bg-white border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 border-zinc-200/80 cursor-pointer"
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
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
