// src/app/api/email/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createEmailHtml } from '@/lib/emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { products } = await request.json();
        const emailContent = createEmailHtml(products);

        const response = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ["vani.s.30012001@gmail.com"],
            subject: 'Order Data',
            html: emailContent
        });

        console.log('Email send response:', response);

        if (response.error) {
            return NextResponse.json({ error: response.error, ok: false });
        }

        return NextResponse.json({ data: response.data, ok: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error.message, ok: false });
    }
}
