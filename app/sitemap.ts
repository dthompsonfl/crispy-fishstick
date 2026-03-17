import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vantus.systems'

  const routes = [
    '',
    '/services',
    '/pricing',
    '/audit',
    '/how-it-works',
    '/trust',
    '/bus-factor-protocol',
    '/resources',
    '/contact',
    '/about',
    '/faq',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
