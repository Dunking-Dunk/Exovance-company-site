import ScrollLink from '@/components/global/ScrollLink';
import AdminDashboardHero from '../_component/AdminDashboardHero';

export const PRIMARY_BTN = "inline-flex items-center justify-center min-h-[48px] px-7 rounded-full bg-violet-500 hover:bg-violet-400 text-white font-semibold text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200 focus-visible:ring-offset-2 focus-visible:ring-offset-customBlack";
export const SECONDARY_BTN = "inline-flex items-center justify-center min-h-[48px] px-7 rounded-full border border-customGrayDark/60 hover:border-violet-300 text-customGrayLight font-semibold text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200 focus-visible:ring-offset-2 focus-visible:ring-offset-customBlack";

const HeroSection = () => (
    <section className="max-w-7xl mx-auto pt-28 md:pt-36 pb-16 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 items-center">
        <div>
            <p className="text-sm text-violet-300 mb-5">Campus Suite by Exovance</p>
            <h1 className="font-display font-bold text-customGrayLight text-[clamp(1.75rem,4.6vw,2.75rem)] leading-[1.15] tracking-tight mb-6">
                Let students choose their teacher, lab slot and electives. Without changing your curriculum.
            </h1>
            <p className="text-lg text-customGray leading-relaxed max-w-xl mb-8">
                Exovance generates a clash-free timetable and runs student choice on top of it. Used by 10,000+ students at Rajalakshmi Engineering College.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
                <ScrollLink to="contact" className={PRIMARY_BTN}>Get in touch</ScrollLink>
                <ScrollLink to="how-it-works" className={SECONDARY_BTN}>See how it works</ScrollLink>
            </div>
        </div>
        <AdminDashboardHero />
    </section>
);

export default HeroSection;
