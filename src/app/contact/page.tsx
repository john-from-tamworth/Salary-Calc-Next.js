import React from 'react';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <PageHeader title="Contact Us" subtitle="Get in Touch" />
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            Have a question about a calculation, a suggestion for a new feature, or spotted a bug? We would love to hear from you.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
            NetPayFlow is independently built and maintained to help you navigate UK personal finance with precision. Whether you need help utilizing the tools or want to discuss a specific mathematical scenario, please reach out directly via email.
          </p>
          
          {/* Direct Email Display */}
          <div className="inline-block bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm mb-4">
            <span className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Direct Email
            </span>
            <a 
              href="mailto:netpayflow@gmail.com" 
              className="text-2xl md:text-3xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              netpayflow@gmail.com
            </a>
          </div>

          {/* Disclaimer Note */}
          <div className="mt-12 bg-gray-50 rounded-lg p-5 border border-gray-100 max-w-xl mx-auto text-left">
            <h3 className="font-semibold text-gray-800 mb-2">Quick Note</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Please remember that NetPayFlow provides mathematical simulations based on standard UK tax rules. I cannot provide regulated financial, legal, or tax advice. I aim to respond to all technical and tool-related inquiries as quickly as possible.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
