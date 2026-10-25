import AdminConsole from '../_component/admin/AdminConsole';

const AdminView = () => (
    <section id="admin-view" tabIndex={-1} aria-labelledby="admin-title" className="max-w-7xl mx-auto scroll-mt-6 focus:outline-none">
        <p className="text-sm text-violet-300 mb-3">Try it</p>
        <h2 id="admin-title" className="font-display font-bold text-customGrayLight text-3xl md:text-4xl tracking-tight mb-4">This is what your team sees</h2>
        <p className="text-lg text-customGray mb-8 max-w-2xl">
            Plan who teaches what, generate the timetable, edit it, check each teacher&apos;s week and workload, and publish.
        </p>
        <AdminConsole />
    </section>
);

export default AdminView;
