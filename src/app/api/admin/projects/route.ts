import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/firebase/auth';
import { getAllProjects, createProject } from '@/services/projects';

export async function GET() {
  try {
    await requireAdmin();
    const projects = await getAllProjects();
    return NextResponse.json({ projects });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();

    if (!body.title || !body.category || !body.size) {
      return NextResponse.json({ error: 'Title, category, and size are required fields' }, { status: 400 });
    }

    const project = await createProject(body);
    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (err: any) {
    if (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || 'Failed to create project' }, { status: 500 });
  }
}
