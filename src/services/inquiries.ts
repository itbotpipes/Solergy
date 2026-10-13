import fs from 'fs';
import path from 'path';
import { getAdminFirestore } from '@/lib/firebase/admin';
import type { Inquiry, InquiryStatus, InquiryNote } from '@/types/inquiry';
import type { InquiryInput } from '@/lib/validations/inquiry';
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

const LOCAL_INQUIRIES_FILE = path.join(process.cwd(), 'src', 'data', 'cms-inquiries.json');

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq_sample_1',
    name: 'Anand Verma',
    email: 'anand.verma@example.com',
    phone: '+91 98765 43210',
    company: 'Verma Textiles',
    city: 'Ludhiana',
    subject: 'Factory Rooftop Solar Audit',
    message: 'We want to install a 50kW solar system on our hosiery factory roof. Please call to schedule an energy audit.',
    inquiryType: 'industry',
    sourcePage: '/contact',
    formData: {
      roofType: 'Tin Shed',
      monthlyBill: '₹1,20,000',
    },
    status: 'new',
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'inq_sample_2',
    name: 'Pooja Patel',
    email: 'pooja.patel@example.com',
    phone: '+91 98250 12345',
    city: 'Surat',
    message: 'Interested in a 5kW on-grid rooftop system for 3BHK bungalow.',
    inquiryType: 'home',
    sourcePage: '/',
    formData: {
      name: 'Pooja Patel',
      phone: '+91 98250 12345',
    },
    calculatorData: {
      capacityKW: 5,
      monthlyBill: 6000,
      monthlySavingsRs: 5200,
    },
    status: 'contacted',
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 86400000 * 3,
  },
];

export function getLocalInquiries(): Inquiry[] {
  try {
    if (fs.existsSync(LOCAL_INQUIRIES_FILE)) {
      const data = fs.readFileSync(LOCAL_INQUIRIES_FILE, 'utf-8');
      const parsed = JSON.parse(data) as Inquiry[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading local inquiries file:', err);
  }
  return DEFAULT_INQUIRIES;
}

export function saveLocalInquiries(inquiries: Inquiry[]): void {
  try {
    const dir = path.dirname(LOCAL_INQUIRIES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Error saving local inquiries file:', err);
  }
}

async function seedInquiriesIfEmpty(db: FirebaseFirestore.Firestore) {
  try {
    const check = await db.collection('inquiries').limit(1).get();
    if (check.empty) {
      console.log('Seeding initial inquiries into Cloud Firestore...');
      for (const inq of DEFAULT_INQUIRIES) {
        const { id, ...data } = inq;
        await db.collection('inquiries').doc(id).set(data);
      }
      console.log('Successfully seeded inquiries into Firestore.');
    }
  } catch (err) {
    console.warn('Could not auto-seed Firestore inquiries:', err);
  }
}

export async function createInquiry(input: InquiryInput): Promise<Inquiry> {
  // Check honeypot spam protection
  if (input._hp) {
    throw new Error('Spam detected');
  }

  const db = getAdminFirestore();
  const now = Date.now();

  const rawData: Record<string, any> = {
    name: input.name?.trim() || null,
    email: input.email?.trim() || null,
    phone: input.phone.trim(),
    company: input.company?.trim() || null,
    city: input.city?.trim() || null,
    subject: input.subject?.trim() || null,
    message: input.message?.trim() || null,
    inquiryType: input.inquiryType,
    sourcePage: input.sourcePage,
    productId: input.productId || null,
    productName: input.productName || null,
    projectId: input.projectId || null,
    projectName: input.projectName || null,
    formData: input.formData || {},
    calculatorData: input.calculatorData || null,
    status: 'new',
    createdAt: now,
    updatedAt: now,
  };

  // Strip keys that are strictly undefined
  const cleanedData = Object.fromEntries(
    Object.entries(rawData).filter(([_, v]) => v !== undefined)
  ) as Omit<Inquiry, 'id'>;

  const localCurrent = getLocalInquiries();

  if (!db) {
    const newInquiry: Inquiry = {
      id: `inq_${now}`,
      ...cleanedData,
    };
    localCurrent.unshift(newInquiry);
    saveLocalInquiries(localCurrent);
    try {
      revalidatePath('/admin/inquiries');
      revalidatePath('/admin');
    } catch {}
    return newInquiry;
  }

  const docRef = await db.collection('inquiries').add(cleanedData);
  const created: Inquiry = {
    id: docRef.id,
    ...cleanedData,
  };

  localCurrent.unshift(created);
  saveLocalInquiries(localCurrent);

  try {
    revalidatePath('/admin/inquiries');
    revalidatePath('/admin');
  } catch {}
  return created;
}

export async function getInquiries(params?: {
  status?: InquiryStatus;
  inquiryType?: string;
  search?: string;
  limit?: number;
}): Promise<Inquiry[]> {
  const db = getAdminFirestore();
  if (!db) {
    let result = getLocalInquiries();
    if (params?.status) {
      result = result.filter((i) => i.status === params.status);
    }
    if (params?.inquiryType) {
      result = result.filter((i) => i.inquiryType === params.inquiryType);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name?.toLowerCase().includes(q) ||
          i.email?.toLowerCase().includes(q) ||
          i.phone?.toLowerCase().includes(q) ||
          i.city?.toLowerCase().includes(q)
      );
    }
    return result;
  }

  try {
    let query: FirebaseFirestore.Query = db.collection('inquiries');
    if (params?.status) {
      query = query.where('status', '==', params.status);
    }
    if (params?.inquiryType) {
      query = query.where('inquiryType', '==', params.inquiryType);
    }

    if (params?.limit) {
      query = query.limit(params.limit);
    }

    const snapshot = await query.get();
    if (snapshot.empty) {
      return getLocalInquiries();
    }

    let inquiries = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...(doc.data() as Omit<Inquiry, 'id'>),
    }));

    // Sort descending by createdAt in JavaScript
    inquiries.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    if (params?.search) {
      const q = params.search.toLowerCase();
      inquiries = inquiries.filter(
        (i) =>
          i.name?.toLowerCase().includes(q) ||
          i.email?.toLowerCase().includes(q) ||
          i.phone?.toLowerCase().includes(q) ||
          i.city?.toLowerCase().includes(q)
      );
    }

    return inquiries;
  } catch (err) {
    console.error('Error fetching inquiries from Firestore:', err);
    return getLocalInquiries();
  }
}

export async function getInquiryById(id: string): Promise<Inquiry | null> {
  const db = getAdminFirestore();
  if (!db) {
    return getLocalInquiries().find((i) => i.id === id) || null;
  }

  try {
    const doc = await db.collection('inquiries').doc(id).get();
    if (!doc.exists) {
      return getLocalInquiries().find((i) => i.id === id) || null;
    }

    const notesSnapshot = await db.collection('inquiries').doc(id).collection('notes').orderBy('createdAt', 'asc').get();
    const notes: InquiryNote[] = notesSnapshot.docs.map((d: QueryDocumentSnapshot) => ({
      id: d.id,
      ...(d.data() as Omit<InquiryNote, 'id'>),
    }));

    return {
      id: doc.id,
      ...(doc.data() as Omit<Inquiry, 'id'>),
      notes,
    };
  } catch (err) {
    console.error('Error fetching inquiry by id:', err);
    return getLocalInquiries().find((i) => i.id === id) || null;
  }
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<void> {
  const db = getAdminFirestore();
  const now = Date.now();

  const local = getLocalInquiries();
  const found = local.find((i) => i.id === id);
  if (found) {
    found.status = status;
    found.updatedAt = now;
    saveLocalInquiries(local);
  }

  if (db) {
    try {
      await db.collection('inquiries').doc(id).update({
        status,
        updatedAt: now,
      });
    } catch (err) {
      console.warn('Error updating inquiry status in Firestore:', err);
    }
  }
}

export async function addInquiryNote(
  inquiryId: string,
  note: { content: string; authorEmail?: string }
): Promise<InquiryNote> {
  const db = getAdminFirestore();
  const now = Date.now();

  const noteData = {
    content: note.content,
    createdAt: now,
    authorEmail: note.authorEmail,
  };

  const newNote: InquiryNote = {
    id: `note_${now}`,
    ...noteData,
  };

  const local = getLocalInquiries();
  const found = local.find((i) => i.id === inquiryId);
  if (found) {
    found.notes = found.notes || [];
    found.notes.push(newNote);
    saveLocalInquiries(local);
  }

  if (db) {
    try {
      const docRef = await db.collection('inquiries').doc(inquiryId).collection('notes').add(noteData);
      await db.collection('inquiries').doc(inquiryId).update({ updatedAt: now });
      return {
        id: docRef.id,
        ...noteData,
      };
    } catch {}
  }

  return newNote;
}

export async function getInquiryStats(): Promise<{
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  converted: number;
  closed: number;
}> {
  const list = await getInquiries();
  return {
    total: list.length,
    new: list.filter((i) => i.status === 'new').length,
    contacted: list.filter((i) => i.status === 'contacted').length,
    inProgress: list.filter((i) => i.status === 'in_progress').length,
    converted: list.filter((i) => i.status === 'converted').length,
    closed: list.filter((i) => i.status === 'closed').length,
  };
}
