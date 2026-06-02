import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-zinc-900 p-4 font-sans text-center">
      <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Page Not Found</h1>
      <p className="text-zinc-500 mb-6 max-w-sm text-sm">
        The page you are looking for doesn't exist or has been relocated.
      </p>
      <Link href="/" className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all shadow-sm">
        Go Home
      </Link>
    </div>
  );
}
