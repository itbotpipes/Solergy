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

export function saveLocalProjects(projects: Project[]): boolean {
  try {
    const dir = path.dirname(LOCAL_PROJECTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.warn('Error saving local projects file:', err);
    return false;
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
  const db = getAdminFirestore();
  if (db) {
    try {
      const snapshot = await db.collection('projects').get();
      if (snapshot.empty) {
        console.log('Firestore projects collection is empty. Auto-seeding from local template...');
        await syncAllProjectsToFirestore(db);
        const seededSnapshot = await db.collection('projects').get();
        if (!seededSnapshot.empty) {
          return seededSnapshot.docs.map((doc: QueryDocumentSnapshot) =>
            sanitizeProject({
              id: doc.id,
              ...(doc.data() as Omit<Project, 'id'>),
            })
          );
        }
      } else {
        return snapshot.docs.map((doc: QueryDocumentSnapshot) =>
          sanitizeProject({
            id: doc.id,
            ...(doc.data() as Omit<Project, 'id'>),
          })
        );
      }
    } catch (err) {
      console.error('Error querying projects from Firestore:', err);
    }
  }

  // Fallback to local projects if Firestore is unconfigured or unreachable
  return getLocalProjects().map(sanitizeProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const decodedId = decodeURIComponent(id);
  const db = getAdminFirestore();

  // 1. In production / cloud, Firestore is authoritative
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

  // 2. Fallback to local projects if not in Firestore or Firestore disabled
  const localProjects = getLocalProjects();
  const found = localProjects.find((p) => p.id === id || p.id === decodedId) || null;
  if (found) {
    return sanitizeProject(found);
  }

  return null;
}

export async function createProject(data: Partial<Project>): Promise<Project> {
  const rawId = (data.id || `proj-${Date.now()}`).trim();
  const id = rawId.replace(/\s+/g, '-').replace(/\/+/g, '-');
  const newProject: Project = sanitizeProject({
    ...data,
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
  });

  // 1. Sync to Firestore (primary persistent database)
  const db = getAdminFirestore();
  if (db) {
    try {
      const { id: docId, ...payload } = newProject;
      await db.collection('projects').doc(docId).set(payload);
    } catch (err) {
      console.error('Could not write project to Firestore:', err);
      throw new Error(`Failed to persist new project to database: ${(err as any)?.message}`);
    }
  }

  // 2. Save local (best-effort)
  const current = getLocalProjects();
  const existingIdx = current.findIndex((p) => p.id === id);
  if (existingIdx >= 0) {
    current[existingIdx] = newProject;
  } else {
    current.unshift(newProject);
  }
  const savedLocally = saveLocalProjects(current);

  if (!db && !savedLocally) {
    throw new Error('Persistence failed: Cloud Firestore is not configured and local filesystem is read-only.');
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

  let existing: Project | null = null;

  // 1. In cloud / production, check Firestore first
  if (db) {
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

  // 2. Fallback to local JSON template if not yet in Firestore
  let existingIdx = current.findIndex((p) => p.id === id || p.id === decodedId);
  if (!existing && existingIdx !== -1) {
    existing = current[existingIdx];
  }

  if (!existing) {
    return null;
  }

  const baseProject = sanitizeProject(existing);
  const targetId = baseProject.id;
  const rawNewId = ((data as any).newId || data.id || targetId).trim();
  const finalId = rawNewId.replace(/\s+/g, '-').replace(/\/+/g, '-') || targetId;
  const idChanged = finalId !== targetId;

  const updated: Project = sanitizeProject({
    ...baseProject,
    ...data,
    id: finalId, // Allow slug/id changes
    testimonial:
      (data as any).testimonial === null
        ? undefined
        : data.testimonial ?? baseProject.testimonial,
    seo:
      (data as any).seo === null
        ? undefined
        : data.seo ?? baseProject.seo,
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

  // 1. Sync to Firestore (primary persistent database)
  if (db) {
    try {
      const { id: docId, ...payload } = updated;
      await db.collection('projects').doc(docId).set(payload);
      if (idChanged) {
        await db.collection('projects').doc(targetId).delete();
      }
    } catch (err) {
      console.error(`Error saving project ${finalId} to Firestore:`, err);
      throw new Error(`Failed to persist project update to database: ${(err as any)?.message}`);
    }
  }

  // 2. Best-effort update to local file (safely ignored in read-only serverless runtimes)
  let savedLocally = false;
  try {
    let newCurrent = [...current];
    if (idChanged) {
      newCurrent = newCurrent.filter((p) => p.id !== targetId && p.id !== id && p.id !== finalId);
      newCurrent.unshift(updated);
    } else if (existingIdx !== -1) {
      newCurrent[existingIdx] = updated;
    } else {
      newCurrent.unshift(updated);
    }
    savedLocally = saveLocalProjects(newCurrent);
  } catch (err) {
    console.warn('Local file write skipped (serverless environment):', err);
  }

  if (!db && !savedLocally) {
    throw new Error('Persistence failed: Cloud Firestore is not configured and local filesystem is read-only.');
  }

  // 3. Revalidate paths across Next.js ISR/SSR
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
