import React from 'react';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <PageHeader title="About NetPayFlow" subtitle="Our Mission" />
      <div className="max-w-2xl mx-auto p-6 md:p-8 space-y-4 text-sm text-zinc-700 leading-relaxed">
          <p>Hi, I'm John, the creator of NetPayFlow.</p>
          <p>I built this tool because I was personally exhausted—and frustrated—by the disjointed, multi-step process of managing personal finances in the digital age. I constantly found myself plugging data into a tax calculator, scribbling down the result, jumping over to a separate budget planner, transcribing more numbers, and then painfully cycling back and forth to project my savings targets. It was manual, error-prone, and disconnected.</p>
          
          <h3 className="font-bold text-zinc-900">The Idea of 'Flow'</h3>
          <p>That friction is exactly where the idea of "flow" came from. I set out to build an all-in-one, intuitive tool where the hard work is done once. With NetPayFlow, each page's outcome seamlessly powers the next stage of your financial journey. Your net income flows into your budget, which directly informs your compounding savings—all in one unified, integrated workspace.</p>
          
          <h3 className="font-bold text-zinc-900">Why NetPayFlow?</h3>
          <p>My goal was to create a local-first interface that eliminates manual toggling and lets you focus on your financial goals, not the spreadsheet work. I hope it helps you find the same clarity and efficiency in your personal finance journey that I was looking for.</p>
      </div>
      <Footer />
    </div>
  );
}
