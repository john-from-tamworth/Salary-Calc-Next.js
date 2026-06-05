
import { blogs } from '../../../lib/blogs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.id === slug);

  if (!blog) {
    notFound();
  }

  const BlogComponent = blog.component;

  return (
    <div className="min-h-screen bg-zinc-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/blog" className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors mb-6">
            <ChevronLeft className="w-4 h-4" />
            Back to Blog
        </Link>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
             <BlogComponent />
        </div>
      </div>
    </div>
  );
}
