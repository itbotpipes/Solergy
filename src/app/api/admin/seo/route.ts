import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/firebase/auth';
import { getAllSEOPages } from '@/services/seo';

export async function GET() {
  try {
    await requireAdmin();
    const pages = await getAllSEOPages();
    return NextResponse.json({ pages });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to fetch SEO pages' }, { status: 500 });
  }
}
