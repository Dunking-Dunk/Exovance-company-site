const stays = ['Your curriculum', 'Your regulations', 'Your ERP'];
const changes = [
    'Students choose.',
    'Every student gets a clash-free schedule.',
    'Your timetable team has far fewer manual fixes.',
];

const List = ({ title, items }: { title: string; items: string[] }) => (
    <div className="rounded-2xl border border-customGrayDark/40 bg-customBlackAlt p-6 md:p-8">
        <h3 className="text-xl font-semibold text-customGrayLight mb-4">{title}</h3>
        <ul className="space-y-4 text-lg text-customGray">
            {items.map((i) => (
                <li key={i} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-300" />
                    {i}
                </li>
            ))}
        </ul>
    </div>
);

const StaysAndChanges = () => (
    <section aria-labelledby="stays-title" className="max-w-7xl mx-auto">
        <h2 id="stays-title" className="font-display font-bold text-customGrayLight text-3xl md:text-4xl tracking-tight mb-10">What stays and what changes</h2>
        <div className="grid gap-6 md:grid-cols-2">
            <List title="What stays" items={stays} />
            <List title="What changes" items={changes} />
        </div>
    </section>
);

export default StaysAndChanges;
