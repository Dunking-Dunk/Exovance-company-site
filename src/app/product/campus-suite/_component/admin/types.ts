import type { Assign, Session } from './data';

export type Phase = 'draft' | 'running' | 'ready' | 'published';
export type TabKey = 'planning' | 'workload' | 'generate' | 'timetable' | 'teachers' | 'analytics';

export type Ctx = {
    assign: Assign;
    setAssign: (a: Assign) => void;
    sessions: Session[];
    setSessions: (s: Session[]) => void;
    phase: Phase;
    ready: boolean;
    locked: boolean;
    runs: number;
    note: (message: string) => void;
    goTo: (tab: TabKey) => void;
};
