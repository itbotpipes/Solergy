import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/firebase/auth';
import { getInquiries, getInquiryStats } from '@/services/inquiries';
import type { InquiryStatus } from '@/types/inquiry';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as InquiryStatus | null;
    const inquiryType = searchParams.get('type') || undefined;
    const search = searchParams.get('search') || undefined;
    const statsOnly = searchParams.get('stats') === 'true';

    if (statsOnly) {
      const stats = await getInquiryStats();
      return NextResponse.json({ stats });
    }

    const inquiries = await getInquiries({
      status: status || undefined,
      inquiryType,
      search,
    });

    const stats = await getInquiryStats();

    return NextResponse.json({ inquiries, stats });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to fetch inquiries' }, { status: 500 });
  }
}
