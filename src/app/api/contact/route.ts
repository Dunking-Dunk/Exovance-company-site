import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type ContactPayload = {
    name: string;
    email: string;
    subject: string;
    message: string;
    website?: string;
};

const emailAttempts = new Map<string, number[]>();
const MAX_EMAILS_PER_DAY = 3;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

const cleanupOldAttempts = () => {
    const now = Date.now();
    Array.from(emailAttempts.entries()).forEach(([ip, timestamps]) => {
        const validTimestamps = timestamps.filter((time: number) => now - time < DAY_IN_MS);
        if (validTimestamps.length === 0) {
            emailAttempts.delete(ip);
        } else {
            emailAttempts.set(ip, validTimestamps);
        }
    });
};

const checkRateLimit = (ip: string): { allowed: boolean; remaining: number } => {
    cleanupOldAttempts();

    const now = Date.now();
    const attempts = emailAttempts.get(ip) || [];
    const recentAttempts = attempts.filter(time => now - time < DAY_IN_MS);

    const remaining = Math.max(0, MAX_EMAILS_PER_DAY - recentAttempts.length);
    const allowed = recentAttempts.length < MAX_EMAILS_PER_DAY;

    if (allowed) {
        recentAttempts.push(now);
        emailAttempts.set(ip, recentAttempts);
    }

    return { allowed, remaining: remaining - (allowed ? 1 : 0) };
};

const getClientIP = (req: Request): string => {
    // Try to get real IP from headers (for proxies/CDNs)
    const forwarded = req.headers.get('x-forwarded-for');
    const realIP = req.headers.get('x-real-ip');

    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    if (realIP) {
        return realIP;
    }

    // Fallback to a default for development
    return 'unknown-ip';
};

const isValidEmail = (email: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);

export async function POST(req: Request) {
    try {
        // Rate limiting check
        const clientIP = getClientIP(req);
        const rateLimitResult = checkRateLimit(clientIP);

        if (!rateLimitResult.allowed) {
            return Response.json({
                error: 'Rate limit exceeded. You can send a maximum of 3 messages per day.',
                remaining: rateLimitResult.remaining,
                resetTime: 'in 24 hours'
            }, { status: 429 });
        }

        const body = (await req.json()) as Partial<ContactPayload>;

        if (!body) {
            return Response.json({ error: 'Invalid request' }, { status: 400 });
        }

        const { name, email, subject, message, website } = body;

        // Honeypot check
        if (website) {
            return Response.json({ ok: true }, { status: 200 });
        }

        if (!name || !email || !subject || !message) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!isValidEmail(email)) {
            return Response.json({ error: 'Invalid email address' }, { status: 400 });
        }

        const {
            SMTP_HOST,
            SMTP_PORT,
            SMTP_USER,
            SMTP_PASS,
            SMTP_FROM,
            SMTP_TO,
        } = process.env as Record<string, string | undefined>;

        if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
            return Response.json({ error: 'Email service not configured' }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT) || 587,
            secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });

        const toAddress = SMTP_TO || SMTP_FROM || 'contact@exovance.in';

        const info = await transporter.sendMail({
            from: SMTP_FROM || `Exovance <${SMTP_USER}>`,
            to: toAddress,
            replyTo: email,
            subject: `[Contact] ${subject}`,
            text: `New contact inquiry from ${name} <${email}>

Subject: ${subject}

Message:
${message}
`,
            html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #222;">
          <h2>New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <pre style="white-space: pre-wrap; font-family: inherit;">${message}</pre>
        </div>
      `,
        });

        return Response.json({
            ok: true,
            id: info.messageId,
            remaining: rateLimitResult.remaining
        });
    } catch (err: any) {
        console.error('Contact POST error:', err);
        return Response.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
