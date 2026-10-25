import EnquiryForm from '@/components/enquiry/EnquiryForm';

const ContactSection = () => (
    <section id="contact" tabIndex={-1} aria-labelledby="contact-title" className="max-w-7xl mx-auto w-full grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16 scroll-mt-6 focus:outline-none">
        <div>
            <h2 id="contact-title" className="font-display font-bold text-customGrayLight text-3xl md:text-4xl tracking-tight mb-4">Ask for a 20-minute call</h2>
            <p className="text-lg text-customGray">Tell us who you are and which college you lead. We will get in touch to arrange the call.</p>
        </div>
        <div className="w-full">
            <EnquiryForm />
        </div>
    </section>
);

export default ContactSection;
