import { appendFile, mkdir } from 'fs/promises';
import path from 'path';

export type Enquiry = {
    id: string;
    receivedAt: string;
    name: string;
    college: string;
    role: string;
    email: string;
    phone: string;
    note: string;
    ip: string;
};

/**
 * Every enquiry is written to a JSON-lines file (ENQUIRY_LOG_DIR, default ./data)
 * and to stdout, so a submission survives an email failure. On hosts with a
 * read-only filesystem the file write fails and the stdout line (platform logs)
 * is the record.
 */
export async function storeEnquiry(enquiry: Enquiry): Promise<boolean> {
    const line = JSON.stringify(enquiry);
    console.log(`[enquiry] ${line}`);
    try {
        const dir = process.env.ENQUIRY_LOG_DIR || path.join(process.cwd(), 'data');
        await mkdir(dir, { recursive: true });
        await appendFile(path.join(dir, 'enquiries.jsonl'), line + '\n', 'utf8');
    } catch (err) {
        console.error('[enquiry] file write failed', err);
    }
    return true;
}
