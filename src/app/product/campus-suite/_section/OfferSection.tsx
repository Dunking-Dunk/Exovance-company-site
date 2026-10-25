import ScrollLink from '@/components/global/ScrollLink';
import { PRIMARY_BTN } from './HeroSection';

const OfferSection = () => (
    <section aria-labelledby="offer-title" className="max-w-7xl mx-auto rounded-2xl border border-violet-300/40 bg-violet-400/[0.07] p-6 md:p-10">
        <h2 id="offer-title" className="font-display font-bold text-customGrayLight text-3xl md:text-4xl tracking-tight mb-6">Try it for one semester, as a service.</h2>
        <ul className="space-y-3 text-lg text-customGray mb-8 max-w-2xl">
            <li>No software to adopt.</li>
            <li>No commitment beyond the semester.</li>
            <li>A few small adjustments to your current process may be needed. We agree them with you first.</li>
        </ul>
        <ScrollLink to="contact" className={PRIMARY_BTN}>Get in touch</ScrollLink>
    </section>
);

export default OfferSection;
