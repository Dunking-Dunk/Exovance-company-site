import ScrollLink from '@/components/global/ScrollLink';

const steps = [
    { n: '1', text: 'We generate the timetable from your course structure and constraints.', to: 'admin-view', label: 'See the team screen' },
    { n: '2', text: 'Students choose their teacher for every course, their lab slot, and their open and professional electives.', to: 'student-view', label: 'See the student screen' },
    { n: '3', text: 'You review and publish.', to: 'admin-view', label: 'See the review screen' },
];

const HowItWorks = () => (
    <section id="how-it-works" tabIndex={-1} aria-labelledby="how-title" className="max-w-7xl mx-auto scroll-mt-6 focus:outline-none">
        <p className="text-sm text-violet-300 mb-3">Three steps</p>
        <h2 id="how-title" className="font-display font-bold text-customGrayLight text-3xl md:text-4xl tracking-tight mb-10">How it works</h2>
        <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
                <li key={s.n} className="rounded-2xl border border-customGrayDark/30 bg-customBlackAlt/60 p-6 md:p-8">
                    <span aria-hidden="true" className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/60 text-violet-200 font-semibold">{s.n}</span>
                    <p className="text-sm text-violet-300 mb-2">Step {s.n}</p>
                    <p className="text-xl text-customGrayLight leading-snug">{s.text}</p>
                    {s.to && <ScrollLink to={s.to} className="mt-4 inline-block text-violet-300 underline underline-offset-4 hover:text-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 rounded">{s.label}</ScrollLink>}
                </li>
            ))}
        </ol>
    </section>
);

export default HowItWorks;
