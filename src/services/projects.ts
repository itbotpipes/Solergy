import fs from 'fs';
import path from 'path';
import { getAdminFirestore } from '@/lib/firebase/admin';
import type { Project } from '@/types/project';
import { revalidatePath } from 'next/cache';
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore';

const LOCAL_PROJECTS_FILE = path.join(process.cwd(), 'src', 'data', 'cms-projects.json');

export function getLocalProjects(): Project[] {
  try {
    if (fs.existsSync(LOCAL_PROJECTS_FILE)) {
      const data = fs.readFileSync(LOCAL_PROJECTS_FILE, 'utf-8');
      const parsed = JSON.parse(data) as Project[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading local projects file:', err);
  }
  return [];
}

export function saveLocalProjects(projects: Project[]): void {
  try {
    const dir = path.dirname(LOCAL_PROJECTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Error saving local projects file:', err);
  }
}

async function seedFirestoreIfEmpty(db: FirebaseFirestore.Firestore) {
  try {
    const check = await db.collection('projects').limit(1).get();
    if (check.empty) {
      console.log('Seeding initial projects into Cloud Firestore...');
      const projects = getLocalProjects();
      for (const project of projects) {
        const { id, ...data } = project;
        await db.collection('projects').doc(id).set(data);
      }
      console.log('Successfully seeded projects into Firestore.');
    }
  } catch (err) {
    console.warn('Could not auto-seed Firestore projects:', err);
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const db = getAdminFirestore();
  if (!db) {
    return getLocalProjects();
  }

  try {
    await seedFirestoreIfEmpty(db);

    const snapshot = await db.collection('projects').get();
    if (snapshot.empty) {
      return getLocalProjects();
    }

    const projects: Project[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...(doc.data() as Omit<Project, 'id'>),
    }));

    return projects;
  } catch (err) {
    console.error('Error fetching projects from Firestore:', err);
    return getLocalProjects();
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const db = getAdminFirestore();
  if (!db) {
    const projects = getLocalProjects();
    return projects.find((p) => p.id === id) || null;
  }

  try {
    const doc = await db.collection('projects').doc(id).get();
    if (doc.exists) {
      return { id: doc.id, ...(doc.data() as Omit<Project, 'id'>) };
    }
    // Fallback to local
    const projects = getLocalProjects();
    return projects.find((p) => p.id === id) || null;
  } catch (err) {
    console.error(`Error fetching project ${id} from Firestore:`, err);
    const projects = getLocalProjects();
    return projects.find((p) => p.id === id) || null;
  }
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  const id = data.id || `proj-${Date.now()}`;
  const newProject: Project = {
    id,
    title: data.title || 'Untitled Project',
    category: data.category || 'Residential',
    city: data.city || 'Ludhiana',
    state: data.state || 'Punjab',
    size: data.size || '10 kW',
    date: data.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    systemType: data.systemType || 'On-Grid Solar',
    image: data.image || '/images/projects/why-solergy-house.jpg',
    gallery: data.gallery && data.gallery.length > 0 ? data.gallery : ['/images/projects/why-solergy-house.jpg'],
    description: data.description || '',
    story: data.story || [],
    specs: data.specs || [],
    overview: data.overview || { heading: data.title || '', paragraphs: [] },
    challenge: data.challenge || { heading: 'Challenges Faced', intro: [], points: [] },
    solution: data.solution || { heading: 'Our Solution', intro: [], points: [] },
    glance: data.glance || [],
    impact: data.impact || {
      paragraphs: [],
      cumulativeSavings: '',
      paybackYear: 4,
      stats: [],
    },
    testimonialIndex: data.testimonialIndex ?? 0,
  };

  // 1. Save local
  const current = getLocalProjects();
  const existingIdx = current.findIndex((p) => p.id === id);
  if (existingIdx >= 0) {
    current[existingIdx] = newProject;
  } else {
    current.unshift(newProject);
  }
  saveLocalProjects(current);

  // 2. Sync to Firestore
  const db = getAdminFirestore();
  if (db) {
    try {
      const { id: docId, ...payload } = newProject;
      await db.collection('projects').doc(docId).set(payload);
    } catch (err) {
      console.warn('Could not write project to Firestore:', err);
    }
  }

  // 3. Revalidate paths
  try {
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/project/${id}`);
    revalidatePath('/admin/projects');
  } catch (err) {
    console.warn('Could not revalidate paths:', err);
  }

  return newProject;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
  const current = getLocalProjects();
  const existingIdx = current.findIndex((p) => p.id === id);

  if (existingIdx === -1) {
    return null;
  }

  const updated: Project = {
    ...current[existingIdx],
    ...data,
    id, // Keep ID intact
  };

  // 1. Update local
  current[existingIdx] = updated;
  saveLocalProjects(current);

  // 2. Sync Firestore
  const db = getAdminFirestore();
  if (db) {
    try {
      const { id: docId, ...payload } = updated;
      await db.collection('projects').doc(docId).set(payload, { merge: true });
    } catch (err) {
      console.warn(`Could not update project ${id} in Firestore:`, err);
    }
  }

  // 3. Revalidate paths
  try {
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/project/${id}`);
    revalidatePath('/admin/projects');
  } catch (err) {
    console.warn('Could not revalidate paths:', err);
  }

  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  const current = getLocalProjects();
  const filtered = current.filter((p) => p.id !== id);
  if (filtered.length === current.length) {
    return false;
  }

  saveLocalProjects(filtered);

  const db = getAdminFirestore();
  if (db) {
    try {
      await db.collection('projects').doc(id).delete();
    } catch (err) {
      console.warn(`Could not delete project ${id} from Firestore:`, err);
    }
  }

  try {
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/project/${id}`);
    revalidatePath('/admin/projects');
  } catch (err) {
    console.warn('Could not revalidate paths:', err);
  }

  return true;
}
