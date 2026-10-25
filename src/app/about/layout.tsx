import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'The story behind Exovance: why we built timetabling software that lets students choose their teachers and electives.',
    alternates: { canonical: '/about' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
