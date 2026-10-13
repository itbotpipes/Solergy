import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/firebase/auth';
import { generateUploadSignature, isCloudinaryConfigured } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { error: 'Cloudinary environment variables (CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) are not configured.' },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const folder = body.folder || 'solergy/products/gallery';

    const signatureData = generateUploadSignature(folder);
    return NextResponse.json(signatureData);
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to sign upload' }, { status: 500 });
  }
}
