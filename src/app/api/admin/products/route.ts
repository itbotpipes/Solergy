import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/firebase/auth';
import { getAllProducts, createProduct } from '@/services/products';
import { productSchema } from '@/lib/validations/product';
import type { ProductStatus } from '@/types/product';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as ProductStatus | null;

    const products = await getAllProducts(status || undefined);
    return NextResponse.json({ products });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const validated = productSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: 'Validation failed', details: validated.error.flatten() }, { status: 400 });
    }

    const product = await createProduct(validated.data);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to create product' }, { status: 500 });
  }
}
