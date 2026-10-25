import type { MetadataRoute } from 'next';

const BASE = 'https://www.exovance.in';
const PATHS = ['/', '/about', '/products', '/product/campus-suite', '/product/aiva', '/team', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
    return PATHS.map((path) => ({
        url: `${BASE}${path === '/' ? '' : path}`,
        lastModified: new Date(),
        priority: path === '/product/campus-suite' ? 0.9 : path === '/' ? 1 : 0.6,
    }));
}
