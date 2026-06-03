import React from 'react';

interface TermsProps {
  onClose: () => void;
}

export default function TermsOfService({ onClose }: TermsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-zinc-950">Terms of Service</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-100 text-zinc-500">
            ✕
          </button>
        </div>
        <div className="space-y-4 text-sm text-zinc-700 leading-relaxed">
          <p>By using NetPayFlow, you agree to these terms.</p>
          
          <h3 className="font-bold text-zinc-900">1. Financial Estimation Only</h3>
          <p>NetPayFlow is provided purely for informational and educational estimation purposes. The calculations produced by this tool are based on standard tax bands and financial models and do not constitute professional financial, tax, or legal advice.</p>
          
          <h3 className="font-bold text-zinc-900">2. No Liability</h3>
          <p>We are not responsible for any financial decisions made based on the estimations provided by this application. Always consult with a qualified financial advisor or tax professional before making significant financial decisions.</p>
          
          <h3 className="font-bold text-zinc-900">3. Local-First Design</h3>
          <p>While we strive for accuracy, NetPayFlow is a local browser-based tool. We cannot guarantee that the mathematical models will remain accurate if underlying government regulations, tax rates, or financial laws change.</p>
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
