// middleware/validateContactForm.js
import { NextResponse } from 'next/server';

export function middleware(req) {
    const { name, company, email, subject, message } = req.body;

    if (!name || !company || !email || !subject || !message) {
        return new NextResponse(400).json({ error: 'Invalid input' });
    }

    return NextResponse.next();
}