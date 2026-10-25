import { randomUUID } from 'crypto';
import nodemailer from 'nodemailer';
import { storeEnquiry, type Enquiry } from '@/lib/enquiry-store';

export const runtime = 'nodejs';

const MAX_PER_HOUR = 5;
const HOUR = 60 * 60 * 1000;
const MIN_FILL_MS = 3000;
const attempts = new Map<string, number[]>();

const LIMITS = { name: 120, college: 200, role: 120, email: 200, phone: 40, note: 2000 } as const;

const clientIp = (req: Request) =>
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';

const rateLimited = (ip: string) => {
    const now = Date.now();
    const recent = (attempts.get(ip) || []).filter((t) => now - t < HOUR);
    if (recent.length >= MAX_PER_HOUR) {
        attempts.set(ip, recent);
        return true;
    }
    attempts.set(ip, [...recent, now]);
    return false;
};

const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

async function sendEmail(e: Enquiry): Promise<boolean> {
    const { RESEND_API_KEY, CONTACT_FORM_TO, CONTACT_FORM_FROM, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO } = process.env;
    const rows: [string, string][] = [
        ['Name', e.name], ['College', e.college], ['Role', e.role],
        ['Email', e.email], ['Phone', e.phone], ['Note', e.note || '(none)'],
    ];
    const subject = `Enquiry: ${e.college} (${e.name}, ${e.role})`;
    const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nReference: ${e.id}`;
    const html =
        `<div style="font-family:system-ui,sans-serif;color:#222">` +
        rows.map(([k, v]) => `<p><strong>${k}:</strong> ${escapeHtml(v).replace(/\n/g, '<br>')}</p>`).join('') +
        `<p style="color:#888;font-size:12px">Reference: ${e.id}</p></div>`;

    // Fallback: the company mailbox over SMTP, when no transactional service is configured
    if (!RESEND_API_KEY && SMTP_HOST && SMTP_USER && SMTP_PASS) {
        const to = CONTACT_FORM_TO || SMTP_TO;
        if (!to) {
            console.error('[enquiry] SMTP configured but no recipient (CONTACT_FORM_TO or SMTP_TO)');
            return false;
        }
        try {
            const port = Number(SMTP_PORT) || 465;
            const transporter = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
            await transporter.sendMail({
                from: CONTACT_FORM_FROM || SMTP_FROM || `Exovance <${SMTP_USER}>`,
                to: to.split(',').map((a) => a.trim()).filter(Boolean),
                replyTo: e.email,
                subject, text, html,
            });
            return true;
        } catch (err) {
            console.error('[enquiry] smtp send failed', err);
            return false;
        }
    }

    if (!RESEND_API_KEY || !CONTACT_FORM_TO || !CONTACT_FORM_FROM) {
        console.error('[enquiry] email not configured (set RESEND_API_KEY, CONTACT_FORM_TO, CONTACT_FORM_FROM, or the SMTP_* settings)');
        return false;
    }
    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: CONTACT_FORM_FROM,
                to: CONTACT_FORM_TO.split(',').map((a) => a.trim()).filter(Boolean),
                reply_to: e.email,
                subject, text, html,
            }),
        });
        if (!res.ok) console.error('[enquiry] resend error', res.status, await res.text());
        return res.ok;
    } catch (err) {
        console.error('[enquiry] resend request failed', err);
        return false;
    }
}

export async function POST(req: Request) {
    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Spam protection: honeypot and a minimum fill time. Bots get a silent "success".
    const startedAt = Number(body.startedAt);
    if (str(body.website, 100) || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
        return Response.json({ ok: true });
    }

    const ip = clientIp(req);
    if (rateLimited(ip)) {
        return Response.json({ error: 'Too many enquiries from this connection. Please try again later.' }, { status: 429 });
    }

    const enquiry: Enquiry = {
        id: randomUUID(),
        receivedAt: new Date().toISOString(),
        name: str(body.name, LIMITS.name),
        college: str(body.college, LIMITS.college),
        role: str(body.role, LIMITS.role),
        email: str(body.email, LIMITS.email),
        phone: str(body.phone, LIMITS.phone),
        note: str(body.note, LIMITS.note),
        ip,
    };

    if (!enquiry.name || !enquiry.college || !enquiry.role || !enquiry.email || !enquiry.phone) {
        return Response.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email) || /[\r\n]/.test(enquiry.email)) {
        return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!/^[+()\d\s.-]{7,}$/.test(enquiry.phone)) {
        return Response.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    }

    await storeEnquiry(enquiry);
    const emailed = await sendEmail(enquiry);
    if (!emailed) console.error(`[enquiry] ${enquiry.id} stored but email failed`);

    // The enquiry is stored either way, so the visitor is never told it was lost.
    return Response.json({ ok: true });
}
