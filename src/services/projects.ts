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

export async function syncAllProjectsToFirestore(db?: FirebaseFirestore.Firestore | null) {
  const firestore = db || getAdminFirestore();
  if (!firestore) return { count: 0, success: false };
  try {
    const projects = getLocalProjects();
    const batch = firestore.batch();
    for (const project of projects) {
      const { id, ...data } = project;
      const ref = firestore.collection('projects').doc(id);
      batch.set(ref, data, { merge: true });
    }
    await batch.commit();
    console.log(`Synced ${projects.length} projects to Firestore`);
    return { count: projects.length, success: true };
  } catch (err) {
    console.warn('Could not sync local projects to Firestore:', err);
    return { count: 0, success: false };
  }
}

async function seedFirestoreIfEmpty(db: FirebaseFirestore.Firestore) {
  try {
    const check = await db.collection('projects').limit(1).get();
    if (check.empty) {
      console.log('Seeding initial projects into Cloud Firestore...');
      await syncAllProjectsToFirestore(db);
      console.log('Successfully seeded projects into Firestore.');
    }
  } catch (err) {
    console.warn('Could not auto-seed Firestore projects:', err);
  }
}

export function sanitizeProject(data: Partial<Project> & { id: string }): Project {
  return {
    id: data.id,
    title: data.title || 'Untitled Project',
    category: data.category || 'Residential',
    city: data.city || 'Ludhiana',
    state: data.state || 'Punjab',
    size: data.size || '10 kW',
    date: data.date || '',
    systemType: data.systemType || 'On-Grid Solar',
    image: data.image || '/images/projects/why-solergy-house.jpg',
    gallery:
      Array.isArray(data.gallery) && data.gallery.length > 0
        ? data.gallery
        : [data.image || '/images/projects/why-solergy-house.jpg'],
    description: data.description || '',
    story: Array.isArray(data.story) ? data.story : [],
    specs: Array.isArray(data.specs) ? data.specs : [],
    overview: {
      heading: data.overview?.heading || data.title || '',
      paragraphs: Array.isArray(data.overview?.paragraphs) ? data.overview.paragraphs : [],
    },
    challenge: {
      heading: data.challenge?.heading || 'The Challenge',
      intro: Array.isArray(data.challenge?.intro) ? data.challenge.intro : [],
      points: Array.isArray(data.challenge?.points) ? data.challenge.points : [],
    },
    solution: {
      heading: data.solution?.heading || 'The Solution',
      intro: Array.isArray(data.solution?.intro) ? data.solution.intro : [],
      points: Array.isArray(data.solution?.points) ? data.solution.points : [],
    },
    glance: Array.isArray(data.glance) ? data.glance : [],
    impact: {
      paragraphs: Array.isArray(data.impact?.paragraphs) ? data.impact.paragraphs : [],
      cumulativeSavings: data.impact?.cumulativeSavings || '',
      paybackYear: typeof data.impact?.paybackYear === 'number' ? data.impact.paybackYear : 4,
      stats: Array.isArray(data.impact?.stats) ? data.impact.stats : [],
    },
    testimonialIndex: typeof data.testimonialIndex === 'number' ? data.testimonialIndex : 0,
    testimonial: data.testimonial,
    seo: data.seo,
    badge: data.badge,
    chartValues: data.chartValues,
    otherProjectIds: Array.isArray(data.otherProjectIds) ? data.otherProjectIds : [],
    galleryAlts: Array.isArray(data.galleryAlts) ? data.galleryAlts : [],
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const localProjects = getLocalProjects().map(sanitizeProject);
  const db = getAdminFirestore();
  if (!db) {
    return localProjects;
  }

  try {
    const snapshot = await db.collection('projects').get();
    if (snapshot.empty) {
      return localProjects;
    }

    const firestoreProjects = snapshot.docs.map((doc: QueryDocumentSnapshot) =>
      sanitizeProject({
        id: doc.id,
        ...(doc.data() as Omit<Project, 'id'>),
      })
    );

    // Merge: local projects take precedence for matching IDs so local edits never get reverted by stale Firestore reads
    const map = new Map<string, Project>();
    for (const p of firestoreProjects) {
      map.set(p.id, p);
    }
    for (const p of localProjects) {
      map.set(p.id, p);
    }

    return Array.from(map.values());
  } catch (err) {
    console.error('Error fetching projects from Firestore:', err);
    return localProjects;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const decodedId = decodeURIComponent(id);
  const localProjects = getLocalProjects();
  let found = localProjects.find((p) => p.id === id || p.id === decodedId) || null;

  if (found) {
    return sanitizeProject(found);
  }

  const db = getAdminFirestore();
  if (db) {
    try {
      let doc = await db.collection('projects').doc(id).get();
      if (!doc.exists && id !== decodedId) {
        doc = await db.collection('projects').doc(decodedId).get();
      }
      if (doc.exists) {
        return sanitizeProject({ id: doc.id, ...(doc.data() as Omit<Project, 'id'>) });
      }
    } catch (err) {
      console.error(`Error fetching project ${id} from Firestore:`, err);
    }
  }

  return null;
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
  const db = getAdminFirestore();
  const decodedId = decodeURIComponent(id);
  const current = getLocalProjects();

  let existingIdx = current.findIndex((p) => p.id === id || p.id === decodedId);
  let existing: Project | null = existingIdx !== -1 ? current[existingIdx] : null;

  // If not found in local JSON, check Firestore
  if (!existing && db) {
    try {
      let doc = await db.collection('projects').doc(id).get();
      if (!doc.exists && id !== decodedId) {
        doc = await db.collection('projects').doc(decodedId).get();
      }
      if (doc.exists) {
        existing = { id: doc.id, ...(doc.data() as Omit<Project, 'id'>) };
      }
    } catch (err) {
      console.warn(`Could not fetch project ${id} from Firestore:`, err);
    }
  }

  if (!existing) {
    return null;
  }

  const baseProject = sanitizeProject(existing);
  const targetId = baseProject.id;
  const finalId = ((data as any).newId || data.id || targetId).trim();
  const idChanged = finalId !== targetId;

  const updated: Project = sanitizeProject({
    ...baseProject,
    ...data,
    id: finalId, // Allow slug/id changes
    overview: {
      heading: data.overview?.heading ?? baseProject.overview.heading,
      paragraphs: data.overview?.paragraphs ?? baseProject.overview.paragraphs,
    },
    challenge: {
      heading: data.challenge?.heading ?? baseProject.challenge.heading,
      intro: data.challenge?.intro ?? baseProject.challenge.intro,
      points: data.challenge?.points ?? baseProject.challenge.points,
    },
    solution: {
      heading: data.solution?.heading ?? baseProject.solution.heading,
      intro: data.solution?.intro ?? baseProject.solution.intro,
      points: data.solution?.points ?? baseProject.solution.points,
    },
    impact: {
      paragraphs: data.impact?.paragraphs ?? baseProject.impact.paragraphs,
      cumulativeSavings: data.impact?.cumulativeSavings ?? baseProject.impact.cumulativeSavings,
      paybackYear: data.impact?.paybackYear ?? baseProject.impact.paybackYear,
      stats: data.impact?.stats ?? baseProject.impact.stats,
    },
    specs: data.specs ?? baseProject.specs,
    glance: data.glance ?? baseProject.glance,
    story: data.story ?? baseProject.story,
    gallery:
      data.gallery && data.gallery.length > 0
        ? data.gallery
        : baseProject.gallery.length > 0
        ? baseProject.gallery
        : [updatedCover(data.image ?? baseProject.image)],
  });

  function updatedCover(img: any) {
    return typeof img === 'string' ? img : img?.src || '/images/projects/why-solergy-house.jpg';
  }

  // 1. Update in local file
  let newCurrent = [...current];
  if (idChanged) {
    newCurrent = newCurrent.filter((p) => p.id !== targetId && p.id !== id);
    newCurrent.unshift(updated);
  } else if (existingIdx !== -1) {
    newCurrent[existingIdx] = updated;
  } else {
    newCurrent.unshift(updated);
  }
  saveLocalProjects(newCurrent);

  // 2. Sync to Firestore
  if (db) {
    try {
      const { id: docId, ...payload } = updated;
      await db.collection('projects').doc(docId).set(payload, { merge: true });
      if (idChanged) {
        await db.collection('projects').doc(targetId).delete();
      }
    } catch (err) {
      console.warn(`Could not update project ${id} in Firestore:`, err);
    }
  }

  // 3. Revalidate paths
  try {
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/project/${targetId}`);
    revalidatePath(`/project/${finalId}`);
    revalidatePath('/admin/projects');
    revalidatePath(`/admin/projects/${targetId}/edit`);
    revalidatePath(`/admin/projects/${finalId}/edit`);
  } catch (err) {
    console.warn('Could not revalidate paths:', err);
  }

  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = getAdminFirestore();
  const decodedId = decodeURIComponent(id);
  const current = getLocalProjects();

  const filtered = current.filter((p) => p.id !== id && p.id !== decodedId);
  let found = filtered.length !== current.length;

  if (found) {
    saveLocalProjects(filtered);
  }

  if (db) {
    try {
      const doc = await db.collection('projects').doc(id).get();
      if (doc.exists) {
        await db.collection('projects').doc(id).delete();
        found = true;
      } else if (id !== decodedId) {
        const docDecoded = await db.collection('projects').doc(decodedId).get();
        if (docDecoded.exists) {
          await db.collection('projects').doc(decodedId).delete();
          found = true;
        }
      }
    } catch (err) {
      console.warn(`Could not delete project ${id} from Firestore:`, err);
    }
  }

  if (!found) {
    return false;
  }

  try {
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath(`/project/${id}`);
    revalidatePath(`/project/${decodedId}`);
    revalidatePath('/admin/projects');
  } catch (err) {
    console.warn('Could not revalidate paths:', err);
  }

  return true;
}
