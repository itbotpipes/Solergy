import fs from 'fs';
import path from 'path';
import { getAdminFirestore } from '@/lib/firebase/admin';
import type { Product, ProductStatus } from '@/types/product';
import type { ProductInput } from '@/lib/validations/product';
import { revalidatePath } from 'next/cache';
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore';

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'solergy-5kw-monocrystalline',
    name: 'Solergy Pro 5kW Mono PERC Rooftop System',
    slug: 'solergy-5kw-monocrystalline',
    categoryId: 'Solar Panels',
    categoryName: 'Residential Systems',
    shortDescription: 'High-efficiency 5kW on-grid solar system designed for modern residential homes, villas, and apartments.',
    fullDescription: 'The Solergy Pro 5kW Monocrystalline system is engineered specifically for residential homes seeking maximum energy yield in compact roof spaces. Built with premium half-cut cell technology, it ensures high generation even during partial shading and high ambient temperatures. Includes an IP65 rated smart inverter with WiFi app monitoring.',
    features: [
      { id: 'f1', title: 'Half-Cut Mono PERC Technology', description: '21.5%+ module efficiency with low temperature coefficient' },
      { id: 'f2', title: 'Smart App Monitoring', description: 'Real-time daily yield tracking and performance diagnostics via mobile app' },
      { id: 'f3', title: 'IP65 Weatherproof Inverter', description: 'Dual MPPT with 98.4% peak conversion efficiency' },
      { id: 'f4', title: 'Rapid Net Metering Integration', description: 'Pre-certified for rapid DISCOM approval and grid synchronization' }
    ],
    specifications: [
      { id: 's1', label: 'System Capacity', value: '5.0 kW' },
      { id: 's2', label: 'Annual Generation', value: '~7,800 kWh' },
      { id: 's3', label: 'Panel Type', value: '10 x 550W Tier-1 Mono PERC' },
      { id: 's4', label: 'Required Roof Area', value: '350 - 450 sq.ft' },
      { id: 's5', label: 'Warranty', value: '25-Year Performance Warranty, 10-Year Inverter Warranty' },
      { id: 's6', label: 'Grid Type', value: 'Single Phase / Three Phase On-Grid' }
    ],
    featuredImage: {
      id: 'img1',
      publicId: 'solergy/products/featured/5kw-residential',
      secureUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      resourceType: 'image',
      altText: 'Solergy 5kW Rooftop Solar Installation',
      sortOrder: 0
    },
    gallery: [
      {
        id: 'g1',
        publicId: 'solergy/products/gallery/5kw-residential-1',
        secureUrl: 'https://images.unsplash.com/photo-1508873696983-2df57046475a?auto=format&fit=crop&w=1200&q=80',
        resourceType: 'image',
        altText: 'Rooftop panels overview',
        sortOrder: 0
      },
      {
        id: 'g2',
        publicId: 'solergy/products/gallery/5kw-residential-2',
        secureUrl: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80',
        resourceType: 'image',
        altText: 'Solar Inverter Mounting',
        sortOrder: 1
      }
    ],
    status: 'published',
    isFeatured: true,
    sortOrder: 1,
    createdAt: Date.now() - 86400000 * 30,
    updatedAt: Date.now() - 86400000 * 5,
    publishedAt: Date.now() - 86400000 * 30
  },
  {
    id: 'solergy-10kw-commercial',
    name: 'Solergy Commercial 10kW Smart Solar Plant',
    slug: 'solergy-10kw-commercial',
    categoryId: 'Solar Panels',
    categoryName: 'Commercial & Industrial',
    shortDescription: 'Heavy-duty 10kW three-phase solar power solution for offices, retail hubs, schools, and light industrial units.',
    fullDescription: 'Designed for commercial establishments that run heavy air conditioning and electrical machinery during peak daytime tariff hours. Slashes operational electricity bills by up to 80% while providing commercial accelerated depreciation tax benefits. Engineered with anodized aluminum mounting to withstand 160 km/h winds.',
    features: [
      { id: 'f1', title: 'Commercial Grade Inverter', description: 'Three-phase multi-MPPT inverter with active surge suppression' },
      { id: 'f2', title: 'Anodized Aluminum Structure', description: 'Corrosion resistant mounting engineered to withstand 160 km/h wind speeds' },
      { id: 'f3', title: 'Zero Export Capability', description: 'Programmable export control for flexible grid compliance' },
      { id: 'f4', title: 'Automated Dust Detection', description: 'Sensors alert your maintenance team for scheduled cleaning cycles' }
    ],
    specifications: [
      { id: 's1', label: 'System Capacity', value: '10.0 kW' },
      { id: 's2', label: 'Annual Generation', value: '~15,600 kWh' },
      { id: 's3', label: 'Panel Type', value: '18 x 550W Bifacial Mono PERC' },
      { id: 's4', label: 'Required Roof Area', value: '750 - 900 sq.ft' },
      { id: 's5', label: 'Warranty', value: '25-Year Linear Power Output Warranty' },
      { id: 's6', label: 'Grid Type', value: 'Three Phase On-Grid' }
    ],
    featuredImage: {
      id: 'img2',
      publicId: 'solergy/products/featured/10kw-commercial',
      secureUrl: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80',
      resourceType: 'image',
      altText: 'Commercial Solar System Solergy',
      sortOrder: 0
    },
    gallery: [
      {
        id: 'g3',
        publicId: 'solergy/products/gallery/10kw-commercial-1',
        secureUrl: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1200&q=80',
        resourceType: 'image',
        altText: 'Commercial Array on Flat Roof',
        sortOrder: 0
      }
    ],
    status: 'published',
    isFeatured: true,
    sortOrder: 2,
    createdAt: Date.now() - 86400000 * 20,
    updatedAt: Date.now() - 86400000 * 2,
    publishedAt: Date.now() - 86400000 * 20
  },
  {
    id: 'solergy-lifepo4-battery-5kwh',
    name: 'Solergy PowerVault 5.12kWh LiFePO4 Energy Storage',
    slug: 'solergy-lifepo4-battery-5kwh',
    categoryId: 'Energy Storage',
    categoryName: 'Battery Storage',
    shortDescription: 'Modular lithium iron phosphate battery storage for uninterrupted 24/7 solar backup power and load shifting.',
    fullDescription: 'Store excess daytime solar power and maintain seamless power supply through evening blackouts. With 6,000+ deep cycles and 90% depth of discharge, PowerVault offers over 15 years of daily cycling reliability. Features rapid sub-10ms automatic transfer switch for zero flicker on sensitive electronics.',
    features: [
      { id: 'f1', title: 'Safe LiFePO4 Chemistry', description: 'Thermal and chemical stability with built-in multi-stage Battery Management System (BMS)' },
      { id: 'f2', title: 'Modular Scalability', description: 'Stack up to 8 units in parallel to reach 40.96kWh capacity' },
      { id: 'f3', title: 'Ultra-Fast Switchover', description: 'Sub-10ms automatic transfer switch for zero flicker on sensitive electronics' }
    ],
    specifications: [
      { id: 's1', label: 'Nominal Energy', value: '5.12 kWh' },
      { id: 's2', label: 'Usable Capacity', value: '4.6 kWh (90% DoD)' },
      { id: 's3', label: 'Nominal Voltage', value: '51.2V' },
      { id: 's4', label: 'Cycle Life', value: '> 6000 cycles @ 80% EOL' },
      { id: 's5', label: 'Dimensions', value: '480 x 600 x 160 mm' },
      { id: 's6', label: 'Warranty', value: '10-Year Full Warranty' }
    ],
    featuredImage: {
      id: 'img3',
      publicId: 'solergy/products/featured/battery-storage',
      secureUrl: 'https://images.unsplash.com/photo-1558441719-8b449c6ff673?auto=format&fit=crop&w=1200&q=80',
      resourceType: 'image',
      altText: 'Solergy Battery Energy Storage',
      sortOrder: 0
    },
    gallery: [],
    status: 'published',
    isFeatured: true,
    sortOrder: 3,
    createdAt: Date.now() - 86400000 * 15,
    updatedAt: Date.now() - 86400000 * 1,
    publishedAt: Date.now() - 86400000 * 15
  },
  {
    id: 'solergy-hyperpeak-580w-bifacial',
    name: 'Solergy HyperPeak 580W TOPCon Bifacial Solar Module',
    slug: 'solergy-hyperpeak-580w-bifacial',
    categoryId: 'Solar Panels',
    categoryName: 'Solar Panels',
    shortDescription: 'Next-generation N-Type TOPCon dual-glass bifacial module delivering up to 22.8% front efficiency plus 25% rear gain.',
    fullDescription: 'The HyperPeak 580W module harnesses advanced tunnel oxide passivated contact (TOPCon) silicon cells with lower degradation and superior temperature coefficients. Dual-glass encapsulation provides extreme resistance against PID, salt mist, sand, and ammonia corrosion.',
    features: [
      { id: 'f1', title: 'N-Type TOPCon Architecture', description: 'Significantly lower first-year degradation (<1.0%) and annual degradation (<0.4%)' },
      { id: 'f2', title: 'Bifaciality up to 80%', description: 'Generates extra power from ground albedo reflection on concrete, gravel, and metal roofs' },
      { id: 'f3', title: 'Dual-Glass Durability', description: '2.0mm + 2.0mm heat-strengthened glass with IP68 junction box' }
    ],
    specifications: [
      { id: 's1', label: 'Max Power (Pmax)', value: '580W' },
      { id: 's2', label: 'Module Efficiency', value: '22.8%' },
      { id: 's3', label: 'Cell Type', value: '144 (6x24) N-Type Monocrystalline' },
      { id: 's4', label: 'Dimensions', value: '2278 x 1134 x 30 mm' },
      { id: 's5', label: 'Weight', value: '31.5 kg' },
      { id: 's6', label: 'Performance Warranty', value: '30-Year Linear Warranty (87.4% at Year 30)' }
    ],
    featuredImage: {
      id: 'img4',
      publicId: 'solergy/products/featured/hyperpeak-580w',
      secureUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
      resourceType: 'image',
      altText: 'Solergy HyperPeak 580W TOPCon Solar Panel',
      sortOrder: 0
    },
    gallery: [],
    status: 'published',
    isFeatured: false,
    sortOrder: 4,
    createdAt: Date.now() - 86400000 * 10,
    updatedAt: Date.now() - 86400000 * 1,
    publishedAt: Date.now() - 86400000 * 10
  },
  {
    id: 'solergy-hybrid-inverter-6kw',
    name: 'Solergy Smart Hybrid Inverter 6kW Dual MPPT',
    slug: 'solergy-hybrid-inverter-6kw',
    categoryId: 'Inverters',
    categoryName: 'Inverters',
    shortDescription: 'Intelligent hybrid inverter with battery charging capability, grid-tie synchronization, and emergency off-grid backup.',
    fullDescription: 'All-in-one solar energy management hub capable of simultaneous PV generation, battery energy storage charging/discharging, and net-metered grid feed-in. Supports high DC/AC ratio up to 1.5 and ultra-wide MPPT voltage range for maximum daily yield.',
    features: [
      { id: 'f1', title: 'Dual Independent MPPTs', description: 'Optimizes generation for roofs facing different orientations or roof pitches' },
      { id: 'f2', title: 'Seamless UPS-Class Backup', description: 'Automatically transfers essential home circuits in less than 8 milliseconds' },
      { id: 'f3', title: 'Integrated Smart Energy App', description: 'Live monitoring, tariff optimization, and remote firmware upgrades' }
    ],
    specifications: [
      { id: 's1', label: 'Rated AC Output Power', value: '6,000 VA' },
      { id: 's2', label: 'Max PV Input Power', value: '9,000 W' },
      { id: 's3', label: 'Max Efficiency', value: '98.2%' },
      { id: 's4', label: 'Battery Compatibility', value: 'LiFePO4 & Lead-Acid (40V - 60V)' },
      { id: 's5', label: 'Ingress Protection', value: 'IP65' },
      { id: 's6', label: 'Standard Warranty', value: '10 Years' }
    ],
    featuredImage: {
      id: 'img5',
      publicId: 'solergy/products/featured/hybrid-inverter-6kw',
      secureUrl: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80',
      resourceType: 'image',
      altText: 'Solergy Smart Hybrid Inverter 6kW',
      sortOrder: 0
    },
    gallery: [],
    status: 'published',
    isFeatured: false,
    sortOrder: 5,
    createdAt: Date.now() - 86400000 * 8,
    updatedAt: Date.now() - 86400000 * 1,
    publishedAt: Date.now() - 86400000 * 8
  },
  {
    id: 'solergy-ev-charger-22kw',
    name: 'Solergy Solar-Integrated EV Fast Charger 22kW',
    slug: 'solergy-ev-charger-22kw',
    categoryId: 'EV Charging',
    categoryName: 'EV Charging',
    shortDescription: 'Three-phase smart electric vehicle wallbox charger with dedicated 100% solar surplus charging mode.',
    fullDescription: 'Charge your electric vehicle directly with free excess solar energy generated by your roof. Equipped with dynamic load balancing to prevent main breaker trips, RFID authentication for commercial fleet access, and OCPP 1.6J protocol for backend billing integration.',
    features: [
      { id: 'f1', title: 'Solar Surplus Tracking', description: 'Automatically adjusts EV charging amperage based on real-time excess solar generation' },
      { id: 'f2', title: 'Dynamic Load Balancing', description: 'Protects household and commercial electrical supply from overload' },
      { id: 'f3', title: 'Universal Type-2 Connector', description: 'Compatible with all modern electric cars, SUVs, and commercial vans' }
    ],
    specifications: [
      { id: 's1', label: 'Charging Power', value: '22 kW (Three Phase) / 7.4 kW (Single Phase)' },
      { id: 's2', label: 'Charging Current', value: 'Up to 32A per phase' },
      { id: 's3', label: 'Connector Type', value: 'Type 2 Tethered Cable (5 Meters)' },
      { id: 's4', label: 'Protection Rating', value: 'IP65 & IK10 Impact Resistant' },
      { id: 's5', label: 'Connectivity', value: 'WiFi, Bluetooth, Ethernet, 4G Optional' },
      { id: 's6', label: 'Warranty', value: '3 Years Comprehensive' }
    ],
    featuredImage: {
      id: 'img6',
      publicId: 'solergy/products/featured/ev-charger-22kw',
      secureUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      resourceType: 'image',
      altText: 'Solergy Solar Integrated EV Fast Charger',
      sortOrder: 0
    },
    gallery: [],
    status: 'published',
    isFeatured: false,
    sortOrder: 6,
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 1,
    publishedAt: Date.now() - 86400000 * 5
  }
];

// Local JSON persistence file path
const LOCAL_PRODUCTS_FILE = path.join(process.cwd(), 'src', 'data', 'cms-products.json');

function getLocalProducts(): Product[] {
  try {
    if (fs.existsSync(LOCAL_PRODUCTS_FILE)) {
      const data = fs.readFileSync(LOCAL_PRODUCTS_FILE, 'utf-8');
      const parsed = JSON.parse(data) as Product[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading local products file:', err);
  }
  return [...DEFAULT_PRODUCTS];
}

function saveLocalProducts(products: Product[]): void {
  try {
    const dir = path.dirname(LOCAL_PRODUCTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Error saving local products file:', err);
  }
}

// Auto-seed helper for Firestore
async function seedFirestoreIfEmpty(db: FirebaseFirestore.Firestore) {
  try {
    const check = await db.collection('products').limit(1).get();
    if (check.empty) {
      console.log('Seeding initial products into Cloud Firestore...');
      const prods = getLocalProducts();
      for (const prod of prods) {
        const { id, ...data } = prod;
        await db.collection('products').doc(id).set(data);
      }
      console.log('Successfully seeded products into Firestore.');
    }
  } catch (err) {
    console.warn('Could not auto-seed Firestore products:', err);
  }
}

export async function getPublishedProducts(): Promise<Product[]> {
  const db = getAdminFirestore();
  if (!db) {
    return getLocalProducts().filter((p) => p.status === 'published');
  }

  try {
    await seedFirestoreIfEmpty(db);

    const snapshot = await db
      .collection('products')
      .where('status', '==', 'published')
      .orderBy('sortOrder', 'asc')
      .get();

    if (snapshot.empty) {
      return getLocalProducts().filter((p) => p.status === 'published');
    }

    return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...(doc.data() as Omit<Product, 'id'>),
    }));
  } catch (err) {
    console.error('Error fetching published products from Firestore:', err);
    return getLocalProducts().filter((p) => p.status === 'published');
  }
}

export async function getAllProducts(statusFilter?: ProductStatus): Promise<Product[]> {
  const db = getAdminFirestore();
  if (!db) {
    const prods = getLocalProducts();
    if (statusFilter) {
      return prods.filter((p) => p.status === statusFilter);
    }
    return prods;
  }

  try {
    await seedFirestoreIfEmpty(db);

    let query: FirebaseFirestore.Query = db.collection('products');
    if (statusFilter) {
      query = query.where('status', '==', statusFilter);
    }
    query = query.orderBy('sortOrder', 'asc');

    const snapshot = await query.get();
    if (snapshot.empty) {
      const prods = getLocalProducts();
      if (statusFilter) {
        return prods.filter((p) => p.status === statusFilter);
      }
      return prods;
    }

    return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      id: doc.id,
      ...(doc.data() as Omit<Product, 'id'>),
    }));
  } catch (err) {
    console.error('Error fetching all products from Firestore:', err);
    const prods = getLocalProducts();
    if (statusFilter) {
      return prods.filter((p) => p.status === statusFilter);
    }
    return prods;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = getAdminFirestore();
  if (!db) {
    return getLocalProducts().find((p) => p.slug === slug) || null;
  }

  try {
    await seedFirestoreIfEmpty(db);

    const snapshot = await db.collection('products').where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) {
      return getLocalProducts().find((p) => p.slug === slug) || null;
    }

    const doc = snapshot.docs[0]!;
    return {
      id: doc.id,
      ...(doc.data() as Omit<Product, 'id'>),
    };
  } catch (err) {
    console.error('Error fetching product by slug:', err);
    return getLocalProducts().find((p) => p.slug === slug) || null;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const db = getAdminFirestore();
  if (!db) {
    return getLocalProducts().find((p) => p.id === id) || null;
  }

  try {
    const doc = await db.collection('products').doc(id).get();
    if (!doc.exists) {
      return getLocalProducts().find((p) => p.id === id) || null;
    }

    return {
      id: doc.id,
      ...(doc.data() as Omit<Product, 'id'>),
    };
  } catch (err) {
    console.error('Error fetching product by id:', err);
    return getLocalProducts().find((p) => p.id === id) || null;
  }
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const db = getAdminFirestore();
  const now = Date.now();

  const productData: Omit<Product, 'id'> = {
    ...input,
    createdAt: now,
    updatedAt: now,
    publishedAt: input.status === 'published' ? now : undefined,
  };

  const localList = getLocalProducts();
  const newProduct: Product = {
    id: `prod_${now}`,
    ...productData,
  };

  if (!db) {
    localList.unshift(newProduct);
    saveLocalProducts(localList);
    revalidatePath('/products');
    revalidatePath('/admin/products');
    revalidatePath(`/products/${input.slug}`);
    return newProduct;
  }

  // Check unique slug in Firestore
  const existing = await db.collection('products').where('slug', '==', input.slug).limit(1).get();
  if (!existing.empty) {
    throw new Error('A product with this slug already exists');
  }

  const docRef = await db.collection('products').add(productData);
  const created: Product = {
    id: docRef.id,
    ...productData,
  };

  localList.unshift(created);
  saveLocalProducts(localList);

  revalidatePath('/products');
  revalidatePath('/admin/products');
  revalidatePath(`/products/${input.slug}`);

  return created;
}

export async function updateProduct(id: string, input: Partial<ProductInput>): Promise<void> {
  const db = getAdminFirestore();
  const now = Date.now();

  const updatePayload: Record<string, unknown> = {
    updatedAt: now,
  };

  for (const [key, val] of Object.entries(input)) {
    if (val !== undefined) {
      updatePayload[key] = val;
    }
  }

  if (input.status === 'published') {
    updatePayload.publishedAt = now;
  }

  // Update local file storage
  const localList = getLocalProducts();
  const index = localList.findIndex((p) => p.id === id);
  const oldProduct = index !== -1 ? localList[index] : null;
  const oldSlug = oldProduct?.slug;

  if (index !== -1) {
    localList[index] = {
      ...localList[index]!,
      ...updatePayload,
    } as Product;
    saveLocalProducts(localList);
  }

  if (db) {
    if (input.slug && input.slug !== oldSlug) {
      const existing = await db.collection('products').where('slug', '==', input.slug).get();
      const conflict = existing.docs.find((d: QueryDocumentSnapshot) => d.id !== id);
      if (conflict) {
        throw new Error('A product with this slug already exists');
      }
    }

    await db.collection('products').doc(id).set(updatePayload, { merge: true });
  }

  revalidatePath('/products');
  revalidatePath('/admin/products');
  if (oldSlug) {
    revalidatePath(`/products/${oldSlug}`);
  }
  if (input.slug && input.slug !== oldSlug) {
    revalidatePath(`/products/${input.slug}`);
  }
}

export async function deleteProduct(id: string): Promise<void> {
  const db = getAdminFirestore();

  const localList = getLocalProducts();
  const target = localList.find((p) => p.id === id);
  const updatedList = localList.filter((p) => p.id !== id);
  saveLocalProducts(updatedList);

  if (db) {
    const doc = await db.collection('products').doc(id).get();
    if (doc.exists) {
      const data = doc.data() as Product;
      await db.collection('products').doc(id).delete();
      revalidatePath('/products');
      revalidatePath('/admin/products');
      if (data.slug) {
        revalidatePath(`/products/${data.slug}`);
      }
    }
  }

  if (target?.slug) {
    revalidatePath('/products');
    revalidatePath('/admin/products');
    revalidatePath(`/products/${target.slug}`);
  }
}
