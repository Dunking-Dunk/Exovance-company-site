import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch with Exovance to book a 20-minute call about Campus Suite for your college.',
    alternates: { canonical: '/contact' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
