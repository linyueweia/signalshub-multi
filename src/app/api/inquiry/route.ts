import { NextRequest, NextResponse } from 'next/server';
import { InquiryFormData } from '@/lib/types';

function generateInquiryNumber(): string {
  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `GW-${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body: InquiryFormData = await req.json();

    // Validation
    if (!body.name?.trim()) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Name is required' } },
        { status: 400 }
      );
    }
    if (!body.company?.trim()) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Company is required' } },
        { status: 400 }
      );
    }
    if (!body.country?.trim()) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Country is required' } },
        { status: 400 }
      );
    }
    if (!body.email?.trim()) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Email is required' } },
        { status: 400 }
      );
    }
    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_EMAIL', message: 'Invalid email format' } },
        { status: 400 }
      );
    }
    if (!body.message?.trim()) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Message is required' } },
        { status: 400 }
      );
    }

    const inquiryNumber = generateInquiryNumber();
    const submittedAt = new Date().toISOString();

    // ── TODO: Send email notification ─────────────────────
    // Option A: Resend (recommended)
    //   import { Resend } from 'resend';
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: 'inquiry@guangwei-optics.com',
    //     to: 'info@guangwei-optics.com',
    //     subject: `New Inquiry #${inquiryNumber} from ${body.company} (${body.country})`,
    //     html: `<h2>New Inquiry #${inquiryNumber}</h2><p>...details...</p>`,
    //   });
    //
    // Option B: SendGrid
    //   const sgMail = require('@sendgrid/mail');
    //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    //   await sgMail.send({ ... });
    //
    // Option C: SMTP (nodemailer)
    // ──────────────────────────────────────────────────────

    // Log for development
    console.log(`[Inquiry #${inquiryNumber}]`, {
      name: body.name,
      company: body.company,
      country: body.country,
      email: body.email,
      phone: body.phone,
      productType: body.productType,
      quantity: body.quantity,
      message: body.message,
      submittedAt,
    });

    return NextResponse.json({
      success: true,
      inquiryNumber,
      submittedAt,
      message: 'Your inquiry has been received. Our team will reply within 2 hours.',
    });
  } catch (err) {
    console.error('[Inquiry API Error]', err);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Server error. Please try again.' } },
      { status: 500 }
    );
  }
}
