import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ais-dev-q5wcnvsqa3wjjn3jbsahl4-510335315071.europe-west1.run.app';

  // Core pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];

  // Dynamic blog routes
  const blogSlugs = [
    'how-to-use-netpayflow',
    'tax-trap',
    'salary-sacrifice',
    'overpayment-math',
    'pro-rata-salary',
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
