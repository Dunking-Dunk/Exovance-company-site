import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AIVA',
    description: 'AIVA, the voice agent from Exovance.',
    alternates: { canonical: '/product/aiva' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
