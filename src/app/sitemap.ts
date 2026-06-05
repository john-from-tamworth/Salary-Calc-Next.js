import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.netpayflow.co.uk';

  // Core pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
  ];

  // Dynamic blog routes
  const blogSlugs = [
    'how-to-use-netpayflow',
    'tax-trap',
    'pro-rata-salary',
    'salary-sacrifice',
    'overpayment-math',
    'scottish-tax',
    'compare-job-offers',
    'savings-compounder',
    'debt-avalanche',
    'hourly-vs-salary',
  ];
  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogRoutes];
}
