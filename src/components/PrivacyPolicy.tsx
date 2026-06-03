import React from 'react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export default function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-zinc-950">Privacy Policy</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-100 text-zinc-500">
            ✕
          </button>
        </div>
        <div className="space-y-4 text-sm text-zinc-700 leading-relaxed">
          <p>At NetPayFlow, your privacy is paramount. This application is designed to be a local-first financial tool.</p>
          
          <h3 className="font-bold text-zinc-900">1. Data Collection</h3>
          <p>We do not collect, store, or transmit any of your personal financial data to our servers. All calculations and budget planning occur entirely within your web browser. Your inputs, scenarios, and savings goals remain on your device.</p>
          
          <h3 className="font-bold text-zinc-900">2. Local Storage</h3>
          <p>To improve your experience and persist your settings between sessions, this application may use your browser's local storage to save your input choices. This data is only accessible by your browser and is not sent to any external service.</p>
          
          <h3 className="font-bold text-zinc-900">3. Third-Party Services</h3>
          <p>We use standard analytics tools to understand how the application is used to improve performance and usability. These tools may collect non-identifiable usage statistics, such as page views and interaction patterns.</p>
          
          <h3 className="font-bold text-zinc-900">4. Contact</h3>
          <p>If you have any questions regarding this privacy policy, please contact us via the support information provided on our main page.</p>
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
