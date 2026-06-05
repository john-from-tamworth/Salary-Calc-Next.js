import React from 'react';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <PageHeader title="Privacy Policy" subtitle="Your Privacy & Data" />
      <article className="max-w-3xl mx-auto px-4 py-8 text-gray-800 leading-relaxed">
        <header className="mb-8">
          <h1 className="text-4xl text-gray-900 font-bold tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500">Last updated: June 2026</p>
        </header>

        <section className="mb-6">
          <p className="mb-4">
            At NetPayFlow, your privacy is paramount. This application is designed from the ground up to be a privacy-first, local-only financial tool. We believe your financial details are your business alone.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl text-gray-900 font-bold tracking-tight mb-3">
            1. Data Collection and Processing
          </h2>
          <p className="mb-4">
            We do not collect, store, or transmit any of your personal financial data to our servers. All tax calculations, budget planning, and savings simulations occur entirely within your web browser. Your inputs, scenarios, salaries, and financial goals remain exclusively on your device.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl text-gray-900 font-bold tracking-tight mb-3">
            2. Local Storage
          </h2>
          <p className="mb-4">
            To provide a seamless experience and persist your data between sessions, NetPayFlow utilizes your browser&apos;s <code>localStorage</code>. This saves your input choices so you do not lose your place if you refresh the page. This data is only accessible by your own browser, stays on your physical device, and is never sent to any external service. You can clear this data at any time by clearing your browser cache.
          </p>
        </section>

        <section className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 my-6 text-gray-700">
          <h2 className="text-xl text-gray-900 font-bold mb-2">
            3. Google AdSense and Third-Party Advertising
          </h2>
          <p className="text-sm mb-3">
            We use Google AdSense to serve advertisements on NetPayFlow to support the platform. Google, as a third-party vendor, uses cookies to serve ads on this site.
          </p>
          <p className="text-sm mb-3">
            Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to NetPayFlow and/or other sites on the Internet. 
          </p>
          <p className="text-sm">
            Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings</a>, or by using the cookie consent banner presented upon visiting this application.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl text-gray-900 font-bold tracking-tight mb-3">
            4. Analytics and Performance Cookies
          </h2>
          <p className="mb-4">
            We use standard analytics tools to securely understand how the application is used to improve overall performance and usability. These tools may collect non-identifiable usage statistics, such as anonymous page views, device types, and generalized interaction patterns.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl text-gray-900 font-bold tracking-tight mb-3">
            5. Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions regarding this privacy policy, the local storage data handling, or the practices of this application, please feel free to reach out directly via email:
          </p>
          <p className="font-semibold text-blue-600">
            netpayflow@gmail.com
          </p>
        </section>
      </article>
      <Footer />
    </div>
  );
}
