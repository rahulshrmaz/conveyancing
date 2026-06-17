import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.acasa.ae';

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',                              priority: 1.0, changeFrequency: 'daily'   },
  { path: '/properties-for-sale-dubai',    priority: 0.9, changeFrequency: 'daily'   },
  { path: '/properties-for-rent-dubai',    priority: 0.9, changeFrequency: 'daily'   },
  { path: '/new-projects-in-dubai',        priority: 0.9, changeFrequency: 'daily'   },
  { path: '/sell-your-property-in-dubai',  priority: 0.8, changeFrequency: 'weekly'  },
  { path: '/off-plan-properties-in-dubai', priority: 0.8, changeFrequency: 'weekly'  },
  { path: '/global-properties-for-sale',   priority: 0.7, changeFrequency: 'weekly'  },
  { path: '/dubai-lifestyle-properties',   priority: 0.7, changeFrequency: 'weekly'  },
  { path: '/neighborhood-guide',           priority: 0.7, changeFrequency: 'weekly'  },
  { path: '/about-us',                     priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact-us',                   priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog',                         priority: 0.8, changeFrequency: 'daily'   },
  { path: '/careers',                      priority: 0.5, changeFrequency: 'monthly' },
  { path: '/developers',                   priority: 0.7, changeFrequency: 'weekly'  },
  { path: '/seller-guide',                 priority: 0.5, changeFrequency: 'monthly' },
];

async function fetchDynamicPages<T extends { property_slug?: string; project_slug?: string; id: string | number; updated_at?: string; created_at?: string }>(
  endpoint: string,
  pathPrefix: string,
  slugKey: 'property_slug' | 'project_slug',
): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    if (!data.success || !Array.isArray(data.data)) return [];

    return data.data.map((item: T) => ({
      url:             `${BASE_URL}${pathPrefix}/${item[slugKey] || item.id}`,
      lastModified:    new Date(item.updated_at || item.created_at || Date.now()),
      changeFrequency: 'weekly' as const,
      priority:        0.7,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url:             `${BASE_URL}${path}`,
    lastModified:    new Date(),
    changeFrequency,
    priority,
  }));

  const [propertyPages, projectPages] = await Promise.all([
    fetchDynamicPages('/api/public/properties?limit=1000', '/properties-for-sale-dubai', 'property_slug'),
    fetchDynamicPages('/api/projects?limit=1000', '/new-projects-in-dubai', 'project_slug'),
  ]);

  return [...staticPages, ...propertyPages, ...projectPages];
}