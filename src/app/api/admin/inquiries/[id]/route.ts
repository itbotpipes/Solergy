import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/firebase/auth';
import { getInquiryById, updateInquiryStatus, addInquiryNote } from '@/services/inquiries';
import type { InquiryStatus } from '@/types/inquiry';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const inquiry = await getInquiryById(id);

    if (!inquiry) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ inquiry });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to fetch inquiry' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();

    if (body.status) {
      await updateInquiryStatus(id, body.status as InquiryStatus);
    }

    return NextResponse.json({ success: true, message: 'Inquiry updated successfully' });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin();
    const { id } = await params;
    const body = await req.json();

    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json({ error: 'Note content is required' }, { status: 400 });
    }

    const note = await addInquiryNote(id, {
      content: body.content.trim(),
      authorEmail: session.email,
    });

    return NextResponse.json({ success: true, note }, { status: 201 });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to add note' }, { status: 500 });
  }
}
