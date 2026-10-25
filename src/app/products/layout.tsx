import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Products',
    description: 'Campus Suite for engineering colleges, and AIVA voice agents, from Exovance.',
    alternates: { canonical: '/products' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
