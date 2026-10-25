const faqs = [
    { q: 'Do we need to change our curriculum?', a: 'No.' },
    { q: 'Does it replace our ERP?', a: 'No, it works alongside it.' },
    { q: 'Who owns our data?', a: 'You do.' },
    { q: 'What do you need from us?', a: 'Your course structure and constraints.' },
];

const FaqSection = () => (
    <section aria-labelledby="faq-title" className="max-w-7xl mx-auto w-full grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <h2 id="faq-title" className="font-display font-bold text-customGrayLight text-3xl md:text-4xl tracking-tight">Questions</h2>
        <dl className="divide-y divide-customGrayDark/30 border-y border-customGrayDark/30">
            {faqs.map(({ q, a }) => (
                <div key={q} className="py-5">
                    <dt className="text-lg font-semibold text-customGrayLight mb-1">{q}</dt>
                    <dd className="text-lg text-customGray">{a}</dd>
                </div>
            ))}
        </dl>
    </section>
);

export default FaqSection;
