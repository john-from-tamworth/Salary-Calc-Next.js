import React from 'react';

interface AboutUsProps {
  onClose: () => void;
}

export default function AboutUs({ onClose }: AboutUsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-zinc-950">About NetPayFlow</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-100 text-zinc-500">
            ✕
          </button>
        </div>
        <div className="space-y-4 text-sm text-zinc-700 leading-relaxed">
          <p>Hi, I'm John, the creator of NetPayFlow.</p>
          <p>I built this tool because I was personally exhausted—and frustrated—by the disjointed, multi-step process of managing personal finances in the digital age. I constantly found myself plugging data into a tax calculator, scribbling down the result, jumping over to a separate budget planner, transcribing more numbers, and then painfully cycling back and forth to project my savings targets. It was manual, error-prone, and disconnected.</p>
          
          <h3 className="font-bold text-zinc-900">The Idea of 'Flow'</h3>
          <p>That friction is exactly where the idea of "flow" came from. I set out to build an all-in-one, intuitive tool where the hard work is done once. With NetPayFlow, each page's outcome seamlessly powers the next stage of your financial journey. Your net income flows into your budget, which directly informs your compounding savings—all in one unified, integrated workspace.</p>
          
          <h3 className="font-bold text-zinc-900">Why NetPayFlow?</h3>
          <p>My goal was to create a local-first interface that eliminates manual toggling and lets you focus on your financial goals, not the spreadsheet work. I hope it helps you find the same clarity and efficiency in your personal finance journey that I was looking for.</p>
          
          <p className="pt-4 border-t border-zinc-100">For support, feedback, or inquiries, please reach out to us at <a href="mailto:hello@netpayflow.com" className="text-emerald-600 font-bold hover:underline">hello@netpayflow.com</a>.</p>
        </div>
        <div className="mt-8 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-zinc-800">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
