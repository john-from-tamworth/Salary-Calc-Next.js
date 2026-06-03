import './globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'UK & Scotland Salary & Budget Calculator',
  description: 'An interactive, real-time UK and Scotland salary calculator with pension, student loan plans, tax codes, and custom budgeting & savings planner.',
  keywords: 'UK tax calculator, Scotland salary calculator, pension contribution, student loan repayment, tax code explanation, budgeting planner, savings goals',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-50/50 text-zinc-900 min-h-screen">
        {children}
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4604731432144657" 
          crossOrigin="anonymous" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
