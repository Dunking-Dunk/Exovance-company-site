"use client";

import React, { useEffect, useRef, useState } from 'react';

const FIELD = "w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-customGrayDark/50 text-customGrayLight placeholder-customGrayDark/70 text-base focus:outline-none focus-visible:border-violet-300 focus-visible:ring-2 focus-visible:ring-violet-400/60";
const LABEL = "block text-sm text-customGray mb-2";

type Status = 'idle' | 'sending' | 'sent' | 'error';

const EnquiryForm = () => {
    const startedAt = useRef(0);
    const doneRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState('');

    useEffect(() => { startedAt.current = Date.now(); }, []);
    useEffect(() => { if (status === 'sent') doneRef.current?.focus(); }, [status]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');
        setError('');
        const data = Object.fromEntries(new FormData(e.currentTarget).entries());
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, startedAt: startedAt.current }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || 'Something went wrong. Please try again.');
            }
            setStatus('sent');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    if (status === 'sent') {
        return (
            <div ref={doneRef} tabIndex={-1} role="status" className="p-6 rounded-xl border border-emerald-400/40 bg-emerald-400/[0.07] focus:outline-none">
                <p className="text-lg font-semibold text-customGrayLight mb-2">Thank you. We have your enquiry.</p>
                <p className="text-customGray">We will get in touch to arrange a 20-minute call.</p>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="enq-name" className={LABEL}>Your name</label>
                    <input id="enq-name" name="name" type="text" autoComplete="name" required maxLength={120} className={FIELD} />
                </div>
                <div>
                    <label htmlFor="enq-role" className={LABEL}>Your role</label>
                    <input id="enq-role" name="role" type="text" autoComplete="organization-title" required maxLength={120} placeholder="For example, Principal or Dean" className={FIELD} />
                </div>
            </div>
            <div>
                <label htmlFor="enq-college" className={LABEL}>College</label>
                <input id="enq-college" name="college" type="text" autoComplete="organization" required maxLength={200} className={FIELD} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="enq-email" className={LABEL}>Email</label>
                    <input id="enq-email" name="email" type="email" autoComplete="email" required maxLength={200} className={FIELD} />
                </div>
                <div>
                    <label htmlFor="enq-phone" className={LABEL}>Phone</label>
                    <input id="enq-phone" name="phone" type="tel" autoComplete="tel" required maxLength={40} className={FIELD} />
                </div>
            </div>
            <div>
                <label htmlFor="enq-note" className={LABEL}>Note <span className="text-customGrayDark">(optional)</span></label>
                <textarea id="enq-note" name="note" rows={4} maxLength={2000} className={FIELD + ' resize-y'} />
            </div>

            {/* Honeypot: hidden from people, filled in by bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="enq-website">Website</label>
                <input id="enq-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center w-full sm:w-auto min-h-[48px] px-8 rounded-full bg-violet-500 hover:bg-violet-400 disabled:opacity-60 text-white font-semibold text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-200 focus-visible:ring-offset-2 focus-visible:ring-offset-customBlack"
            >
                {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            </button>

            <div role="alert" aria-live="assertive">
                {status === 'error' && (
                    <p className="p-4 rounded-lg border border-red-400/50 bg-red-400/[0.08] text-red-200">{error}</p>
                )}
            </div>

            <p className="text-sm text-customGrayDark">We use these details only to reply to your enquiry.</p>
        </form>
    );
};

export default EnquiryForm;
