import StudentChoiceDemo from '../_component/StudentChoiceDemo';

const StudentView = () => (
    <section id="student-view" tabIndex={-1} aria-labelledby="student-title" className="max-w-7xl mx-auto scroll-mt-6 focus:outline-none">
        <p className="text-sm text-violet-300 mb-3">Try it</p>
        <h2 id="student-title" className="font-display font-bold text-customGrayLight text-3xl md:text-4xl tracking-tight mb-4">This is what a student sees</h2>
        <p className="text-lg text-customGray mb-8 max-w-2xl">
            Choose a teacher for each course, an elective and a lab batch. Options that would clash are switched off, so every student ends with a clash-free timetable.
        </p>
        <StudentChoiceDemo />
    </section>
);

export default StudentView;
