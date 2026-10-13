import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/firebase/auth';
import { deleteCloudinaryAsset } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();

    if (!body.publicId) {
      return NextResponse.json({ error: 'publicId is required' }, { status: 400 });
    }

    const success = await deleteCloudinaryAsset(body.publicId, body.resourceType || 'image');
    return NextResponse.json({ success });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to delete asset' }, { status: 500 });
  }
}
