import './globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'UK & Scotland Salary & Budget Calculator',
  description: 'An interactive, real-time UK and Scotland salary calculator with pension, student loan plans, tax codes, and custom budgeting & savings planner.',
  keywords: 'UK tax calculator, Scotland salary calculator, pension contribution, student loan repayment, tax code explanation, budgeting planner, savings goals',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4604731432144657" crossOrigin="anonymous"></script>
      </head>
      <body className="antialiased bg-zinc-50/50 text-zinc-900 min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
