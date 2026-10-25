import type { Metadata } from 'next';
import HeroSection from './_section/HeroSection';
import ProofLine from './_section/ProofLine';
import HowItWorks from './_section/HowItWorks';
import StudentView from './_section/StudentView';
import AdminView from './_section/AdminView';
import StaysAndChanges from './_section/StaysAndChanges';
import OfferSection from './_section/OfferSection';
import FaqSection from './_section/FaqSection';
import ContactSection from './_section/ContactSection';

const TITLE = 'Teacher, lab-slot and elective choice for engineering colleges | Exovance';
const DESCRIPTION =
    'Exovance generates a clash-free timetable and lets students choose their teacher, lab slot and electives, without changing your curriculum. Used by 10,000+ students at Rajalakshmi Engineering College.';

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: '/product/campus-suite' },
    openGraph: {
        type: 'website',
        url: '/product/campus-suite',
        title: TITLE,
        description: DESCRIPTION,
        siteName: 'Exovance',
        images: [{ url: '/og/campus-suite.png', width: 1200, height: 630, alt: 'Teacher, lab-slot and elective choice for engineering colleges' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: ['/og/campus-suite.png'],
    },
};

const CampusSuitePage = () => (
    <main className="relative px-4 sm:px-6 md:px-12 lg:px-28 pb-24 z-10">
        <HeroSection />
        <ProofLine />
        <div className="mt-20 md:mt-28 space-y-20 md:space-y-28">
            <HowItWorks />
            <StudentView />
            <AdminView />
            <StaysAndChanges />
            <OfferSection />
            <FaqSection />
            <ContactSection />
        </div>
    </main>
);

export default CampusSuitePage;
