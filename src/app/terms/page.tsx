import React from 'react';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <PageHeader title="Terms of Service" subtitle="Usage Terms" />
      <article className="max-w-3xl mx-auto px-4 py-8 text-gray-800 leading-relaxed">
        <header className="mb-8">
          <h1 className="text-4xl text-gray-900 font-bold tracking-tight mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500">Last updated: June 2026</p>
        </header>

        <section className="mb-6">
          <p className="mb-4">
            Welcome to NetPayFlow. By accessing or using this web application, you explicitly agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must immediately cease using the application.
          </p>
        </section>

        <section className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 my-6 text-gray-700">
          <h2 className="text-xl text-gray-900 font-bold mb-2">
            1. Financial Estimation and Disclaimer
          </h2>
          <p className="text-sm mb-3">
            NetPayFlow is provided purely for informational and educational estimation purposes. The calculations, simulations, and data streams produced by this tool are based on generalized UK and Scottish tax bands, mathematical amortization models, and historical financial algorithms. 
          </p>
          <p className="text-sm">
            <strong>They do not constitute professional financial, tax, career, or legal advice.</strong> Tax laws are highly dependent on individual circumstances, which an automated tool cannot fully assess.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl text-gray-900 font-bold tracking-tight mb-3">
            2. Limitation of Liability
          </h2>
          <p className="mb-4">
            Under no circumstances shall NetPayFlow or its creator be held liable for any financial decisions, losses, penalties, or damages arising out of your use of the calculations provided by this application. You acknowledge that you use this software entirely at your own risk. Always consult with a qualified, regulated financial advisor or certified tax professional before making permanent contractual or financial choices.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl text-gray-900 font-bold tracking-tight mb-3">
            3. Local-First Design and Accuracy Guarantee
          </h2>
          <p className="mb-4">
            NetPayFlow operates as a local, browser-based application where computations are executed purely on your local device. While we strive for absolute technical precision, we cannot guarantee that the mathematical models will perfectly reflect your specific scenario, or remain inherently accurate if underlying government regulations, localized tax structures, or financial codes shift unpredictably. 
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl text-gray-900 font-bold tracking-tight mb-3">
            4. Intellectual Property
          </h2>
          <p className="mb-4">
            The structural layout, branding, logos, design mechanics, custom pipeline components, and written content (including all articles hosted under the blog directory) are the exclusive intellectual property of NetPayFlow and its creator. You may not copy, scrape, replicate, modify, or commercially exploit any code or content without explicit written consent.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl text-gray-900 font-bold tracking-tight mb-3">
            5. Acceptable Use
          </h2>
          <p className="mb-4">
            You agree to use NetPayFlow only for lawful personal purposes. You are strictly prohibited from attempting to bypass the application&apos;s client-side state management, overloading our hosting infrastructure, injecting malicious scripts, or using automated bots to extract system calculations.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl text-gray-900 font-bold tracking-tight mb-3">
            6. Modifications to the Application and Terms
          </h2>
          <p className="mb-4">
            We reserve the right to modify, update, or temporarily suspend portions of this application or adjust these Terms of Service at any time without prior notice to ensure compliance with updated regulatory thresholds or system features. Continued use of the platform following modifications implies total acceptance of the revised terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl text-gray-900 font-bold tracking-tight mb-3">
            7. Contact
          </h2>
          <p className="mb-4">
            For any formal inquiries regarding these terms, please contact us via the official email address provided in our Privacy Policy.
          </p>
        </section>
      </article>
      <Footer />
    </div>
  );
}
