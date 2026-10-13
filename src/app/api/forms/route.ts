import { NextResponse, type NextRequest } from 'next/server';
import { inquirySchema } from '@/lib/validations/inquiry';
import { createInquiry } from '@/services/inquiries';

// Rate limiting in-memory store for basic flood prevention
const ipRequestTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  const timestamps = ipRequestTimestamps.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxRequests) {
    return true;
  }

  recent.push(now);
  ipRequestTimestamps.set(ip, recent);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validated = inquirySchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    // Honeypot spam check
    if (validated.data._hp) {
      return NextResponse.json({ success: true, message: 'Inquiry received' });
    }

    const inquiry = await createInquiry(validated.data);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your request has been received. Our solar engineers will contact you within 24 hours.',
        inquiryId: inquiry.id,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error handling form submission:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to submit form. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
