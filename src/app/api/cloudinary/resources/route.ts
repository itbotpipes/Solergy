import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/firebase/auth';
import { listCloudinaryAssets, isCloudinaryConfigured } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { error: 'Cloudinary is not configured' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(req.url);
    const prefix = searchParams.get('prefix') || undefined;
    const resourceType = (searchParams.get('type') as 'image' | 'video') || 'image';

    const assets = await listCloudinaryAssets({
      prefix,
      resourceType,
      maxResults: 50,
    });

    return NextResponse.json({ assets });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to list assets' }, { status: 500 });
  }
}
