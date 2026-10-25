export type Dept = 'CSE' | 'IT' | 'ECE';
export type Faculty = { id: string; name: string };
export type Course = { code: string; name: string; dept: Dept; room: string; faculty: string; lab?: boolean; slots: [number, string][] };
export type Session = { id: string; course: string; day: number; start: string; end: string; room: string };
export type Assign = Record<string, string>;

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const THEORY_STARTS = ['08:00', '08:50', '10:00', '10:50', '11:40', '13:20', '14:10', '15:00', '15:50'];
export const LAB_STARTS = ['08:00', '10:00', '13:20', '15:00'];
export const WEEKLY_LIMIT_HOURS = 4;

export const FACULTY: Faculty[] = [
    ['f1', 'Dr. Anand K'], ['f2', 'Prof. Latha R'], ['f3', 'Dr. Suresh B'], ['f4', 'Prof. Ishita G'], ['f5', 'Prof. Meera S'],
    ['f6', 'Dr. Vikram P'], ['f7', 'Dr. Naveen T'], ['f8', 'Prof. Gopal C'], ['f9', 'Dr. Harini S'], ['f10', 'Prof. Tara J'],
    ['f11', 'Dr. Manoj V'], ['f12', 'Dr. Nisha A'], ['f13', 'Dr. Rahul D'], ['f14', 'Prof. Divya M'], ['f15', 'Prof. Kavya N'],
].map(([id, name]) => ({ id, name }));

export const COURSES: Course[] = [
    { code: 'CS501', name: 'Algorithms', dept: 'CSE', room: 'A-204', faculty: 'f1', slots: [[0, '08:00'], [2, '08:00']] },
    { code: 'CS502', name: 'Database Systems', dept: 'CSE', room: 'A-204', faculty: 'f2', slots: [[0, '08:50'], [2, '08:50']] },
    { code: 'CS503', name: 'Computer Networks', dept: 'CSE', room: 'A-206', faculty: 'f3', slots: [[1, '10:00'], [3, '10:00']] },
    { code: 'CS504', name: 'Software Engineering', dept: 'CSE', room: 'A-206', faculty: 'f4', slots: [[1, '10:50'], [3, '10:50']] },
    { code: 'CS5L1', name: 'Database Lab', dept: 'CSE', room: 'Lab 3', faculty: 'f2', lab: true, slots: [[4, '13:20']] },
    { code: 'IT501', name: 'Web Technology', dept: 'IT', room: 'B-102', faculty: 'f5', slots: [[0, '10:00'], [3, '10:00']] },
    { code: 'IT502', name: 'Operating Systems', dept: 'IT', room: 'B-102', faculty: 'f6', slots: [[1, '08:00'], [4, '08:00']] },
    { code: 'IT503', name: 'Data Mining', dept: 'IT', room: 'B-104', faculty: 'f7', slots: [[2, '10:50'], [4, '10:50']] },
    { code: 'IT504', name: 'Cloud Basics', dept: 'IT', room: 'B-104', faculty: 'f8', slots: [[0, '13:20'], [2, '13:20']] },
    { code: 'IT5L1', name: 'Web Lab', dept: 'IT', room: 'Lab 1', faculty: 'f5', lab: true, slots: [[3, '15:00']] },
    { code: 'EC501', name: 'Signals and Systems', dept: 'ECE', room: 'C-301', faculty: 'f9', slots: [[0, '08:00'], [3, '08:00']] },
    { code: 'EC502', name: 'Digital Communication', dept: 'ECE', room: 'C-301', faculty: 'f10', slots: [[1, '08:50'], [4, '08:50']] },
    { code: 'EC503', name: 'VLSI Design', dept: 'ECE', room: 'C-305', faculty: 'f11', slots: [[0, '11:40'], [2, '11:40']] },
    { code: 'EC504', name: 'Microwave Basics', dept: 'ECE', room: 'C-305', faculty: 'f12', slots: [[1, '10:00'], [3, '10:00']] },
    { code: 'EC5L1', name: 'Communication Lab', dept: 'ECE', room: 'Lab 5', faculty: 'f13', lab: true, slots: [[2, '13:20']] },
];

export const courseOf = (code: string) => COURSES.find((c) => c.code === code)!;
export const facultyName = (id: string) => FACULTY.find((f) => f.id === id)?.name ?? '';

export const mins = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
export const addMin = (t: string, m: number) => {
    const total = mins(t) + m;
    return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};
export const lengthOf = (code: string) => (courseOf(code).lab ? 100 : 50);

export const initialAssign = (): Assign => Object.fromEntries(COURSES.map((c) => [c.code, c.faculty]));
export const initialSessions = (): Session[] =>
    COURSES.flatMap((c) => c.slots.map(([day, start], i) => ({ id: `${c.code}-${i}`, course: c.code, day, start, end: addMin(start, lengthOf(c.code)), room: c.room })));

type Span = { day: number; start: string; end: string };
export const overlaps = (a: Span, b: Span) => a.day === b.day && mins(a.start) < mins(b.end) && mins(b.start) < mins(a.end);

/** Another course this faculty teaches at the same time as `code`, or null. */
export const facultyClash = (sessions: Session[], assign: Assign, facultyId: string, code: string): string | null => {
    const mine = sessions.filter((s) => s.course === code);
    const other = sessions.find((s) => s.course !== code && assign[s.course] === facultyId && mine.some((m) => overlaps(m, s)));
    return other ? other.course : null;
};

/** Why `session` cannot move to `cand`, or null when it can. */
export const moveClash = (sessions: Session[], assign: Assign, session: Session, cand: Span): string | null => {
    const dept = courseOf(session.course).dept;
    const fac = assign[session.course];
    for (const s of sessions) {
        if (s.id === session.id || !overlaps(s, cand)) continue;
        if (courseOf(s.course).dept === dept) return `Students in ${dept} already have ${s.course} then`;
        if (assign[s.course] === fac) return `${facultyName(fac)} already teaches ${s.course} then`;
    }
    return null;
};

export const countClashes = (sessions: Session[], assign: Assign) => {
    let n = 0;
    for (let i = 0; i < sessions.length; i++) {
        for (let j = i + 1; j < sessions.length; j++) {
            const a = sessions[i];
            const b = sessions[j];
            if (!overlaps(a, b)) continue;
            if (courseOf(a.course).dept === courseOf(b.course).dept || assign[a.course] === assign[b.course]) n++;
        }
    }
    return n;
};

export const hoursFor = (sessions: Session[], assign: Assign, facultyId: string) =>
    sessions.filter((s) => assign[s.course] === facultyId).reduce((h, s) => h + (mins(s.end) - mins(s.start)) / 60, 0);

const COLORS = ['#60a5fa', '#f472b6', '#34d399', '#fbbf24', '#a78bfa', '#f87171', '#38bdf8'];
export const colorOf = (code: string) => {
    let h = 0;
    for (let i = 0; i < code.length; i++) h = code.charCodeAt(i) + ((h << 5) - h);
    return COLORS[Math.abs(h) % COLORS.length];
};

export const btn = 'inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300';
export const card = { background: 'var(--exo-surface-2)', borderColor: 'var(--exo-border)' } as const;
