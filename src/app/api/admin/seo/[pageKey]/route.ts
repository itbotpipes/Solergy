import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/firebase/auth';
import { getSEOMetadata, upsertSEOMetadata } from '@/services/seo';
import { seoSchema } from '@/lib/validations/seo';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  try {
    await requireAdmin();
    const { pageKey } = await params;
    const decodedPageKey = decodeURIComponent(pageKey);
    const seo = await getSEOMetadata(decodedPageKey);

    return NextResponse.json({ seo });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to fetch SEO' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ pageKey: string }> }
) {
  try {
    await requireAdmin();
    const { pageKey } = await params;
    const decodedPageKey = decodeURIComponent(pageKey);
    const body = await req.json();

    const validated = seoSchema.safeParse({
      ...body,
      pageKey: decodedPageKey,
    });

    if (!validated.success) {
      return NextResponse.json({ error: 'Validation failed', details: validated.error.flatten() }, { status: 400 });
    }

    const updated = await upsertSEOMetadata(validated.data);
    return NextResponse.json({ success: true, seo: updated });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to update SEO' }, { status: 500 });
  }
}
