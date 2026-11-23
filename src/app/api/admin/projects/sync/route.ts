import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/firebase/auth';
import { syncAllProjectsToFirestore } from '@/services/projects';

export async function POST() {
  try {
    await requireAdmin();
    const result = await syncAllProjectsToFirestore();
    return NextResponse.json(result);
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: err.message || 'Failed to sync projects' },
      { status: 500 }
    );
  }
}
