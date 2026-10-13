import { getAdminFirestore } from '@/lib/firebase/admin';
import type { Inquiry, InquiryStatus, InquiryNote } from '@/types/inquiry';
import type { InquiryInput } from '@/lib/validations/inquiry';
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore';

// Fallback in-memory storage for local dev when Firestore is not connected
const memoryInquiries: Inquiry[] = [
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

export async function createInquiry(input: InquiryInput): Promise<Inquiry> {
  // Check honeypot spam protection
  if (input._hp) {
    throw new Error('Spam detected');
  }

  const db = getAdminFirestore();
  const now = Date.now();

  const inquiryData: Omit<Inquiry, 'id'> = {
    name: input.name?.trim() || undefined,
    email: input.email?.trim() || undefined,
    phone: input.phone.trim(),
    company: input.company?.trim() || undefined,
    city: input.city?.trim() || undefined,
    subject: input.subject?.trim() || undefined,
    message: input.message?.trim() || undefined,
    inquiryType: input.inquiryType,
    sourcePage: input.sourcePage,
    productId: input.productId,
    productName: input.productName,
    projectId: input.projectId,
    projectName: input.projectName,
    formData: input.formData || {},
    calculatorData: input.calculatorData || undefined,
    status: 'new',
    createdAt: now,
    updatedAt: now,
  };

  if (!db) {
    const newInquiry: Inquiry = {
      id: `inq_${now}`,
      ...inquiryData,
    };
    memoryInquiries.unshift(newInquiry);
    return newInquiry;
  }

  const docRef = await db.collection('inquiries').add(inquiryData);
  return {
    id: docRef.id,
    ...inquiryData,
  };
}

export async function getInquiries(params?: {
  status?: InquiryStatus;
  inquiryType?: string;
  search?: string;
  limit?: number;
}): Promise<Inquiry[]> {
  const db = getAdminFirestore();
  if (!db) {
    let result = [...memoryInquiries];
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
    query = query.orderBy('createdAt', 'desc');

    if (params?.limit) {
      query = query.limit(params.limit);
    }

    const snapshot = await query.get();
    let inquiries = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...(doc.data() as Omit<Inquiry, 'id'>),
    }));

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
    return memoryInquiries;
  }
}

export async function getInquiryById(id: string): Promise<Inquiry | null> {
  const db = getAdminFirestore();
  if (!db) {
    return memoryInquiries.find((i) => i.id === id) || null;
  }

  try {
    const doc = await db.collection('inquiries').doc(id).get();
    if (!doc.exists) {
      return memoryInquiries.find((i) => i.id === id) || null;
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
    return memoryInquiries.find((i) => i.id === id) || null;
  }
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<void> {
  const db = getAdminFirestore();
  const now = Date.now();

  if (!db) {
    const found = memoryInquiries.find((i) => i.id === id);
    if (found) {
      found.status = status;
      found.updatedAt = now;
    }
    return;
  }

  await db.collection('inquiries').doc(id).update({
    status,
    updatedAt: now,
  });
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

  if (!db) {
    const newNote: InquiryNote = {
      id: `note_${now}`,
      ...noteData,
    };
    const found = memoryInquiries.find((i) => i.id === inquiryId);
    if (found) {
      found.notes = found.notes || [];
      found.notes.push(newNote);
    }
    return newNote;
  }

  const docRef = await db.collection('inquiries').doc(inquiryId).collection('notes').add(noteData);
  await db.collection('inquiries').doc(inquiryId).update({ updatedAt: now });

  return {
    id: docRef.id,
    ...noteData,
  };
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
