import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-100/40 py-6 text-center text-[10px] text-zinc-400 font-medium px-4 mt-auto">
      <p>
        © 2026 NetPayFlow. All rights reserved. 
        <Link href="/privacy" className="hover:text-zinc-900 underline ml-1">Privacy Policy</Link>
        <Link href="/about" className="hover:text-zinc-900 underline ml-3">About Us</Link>
        <Link href="/terms" className="hover:text-zinc-900 underline ml-3">Terms of Service</Link>
        <Link href="/contact" className="hover:text-zinc-900 underline ml-3">Contact Us</Link>
      </p>
      <p className="mt-1 leading-relaxed">
        HMRC Calculations represent a high-fidelity estimation for the 2026/27 income tax bands, National Insurance thresholds, and student repayment models. Consistently test options to optimize tax-efficiency.
      </p>
    </footer>
  );
}
