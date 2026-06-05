'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import BlogList from '../../components/BlogList';
import PageHeader from '../../components/PageHeader';

export default function BlogPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-50">
      <Sidebar
        currentPage="blog"
        setCurrentPage={(page) => router.push(`/?page=${page}`)}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <PageHeader title="Blog & Financial Insights" subtitle="UK tax tips, guides, and financial planning advice." />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            <BlogList />
        </main>
      </div>
    </div>
  );
}
