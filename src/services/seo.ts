import { getAdminFirestore } from "@/lib/firebase/admin";
import type { SEOPageConfig } from "@/types/seo";
import type { SEOInput } from "@/lib/validations/seo";
import { revalidatePath } from "next/cache";
import PROJECTS from "@/data/projects";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";

export const DEFAULT_SEO_PAGES: Record<string, SEOPageConfig> = {
  home: {
    pageKey: "home",
    title: "Solergy — Solar Energy Solutions in Gujarat & North India",
    description:
      "Solergy designs, installs, and maintains premium rooftop and ground-mounted solar power systems for residential homes, businesses, and industrial facilities.",
    canonicalUrl: "https://solergyindia.com",
    robotsIndex: true,
    robotsFollow: true,
    openGraph: {
      title: "Solergy — Turn Sunlight Into Savings",
      description:
        "Cut electricity costs by up to 90% with custom engineered solar installations backed by 25-year warranties.",
      image:
        "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    },
    twitter: {
      title: "Solergy — Solar Energy Solutions",
      description:
        "Cut electricity costs with custom engineered solar installations.",
      image:
        "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
    },
    updatedAt: Date.now() - 86400000 * 10,
  },
  about: {
    pageKey: "about",
    title: "About Us | Solergy India",
    description:
      "Learn about Solergy India — our mission, clean energy engineering standards, and commitment to sustainable power across India.",
    canonicalUrl: "https://solergyindia.com/about",
    robotsIndex: true,
    robotsFollow: true,
    openGraph: {
      title: "About Us | Solergy India",
      description:
        "Leading solar energy EPC providing customized residential, commercial, and industrial solar plants.",
    },
    updatedAt: Date.now() - 86400000 * 10,
  },
  calculator: {
    pageKey: "calculator",
    title: "Solar Savings Calculator | Solergy India",
    description:
      "Calculate your solar savings, required rooftop system size in kW, and return on investment with our instant solar calculator.",
    canonicalUrl: "https://solergyindia.com/calculator",
    robotsIndex: true,
    robotsFollow: true,
    openGraph: {
      title: "Instant Solar Savings Calculator",
      description:
        "Estimate your monthly electricity savings and solar system payback period in seconds.",
    },
    updatedAt: Date.now() - 86400000 * 10,
  },
  projects: {
    pageKey: "projects",
    title: "Solar Installation Projects & Case Studies | Solergy India",
    description:
      "Explore our portfolio of completed residential rooftop, commercial, and industrial solar projects across Gujarat and North India.",
    canonicalUrl: "https://solergyindia.com/projects",
    robotsIndex: true,
    robotsFollow: true,
    openGraph: {
      title: "Our Solar Projects | Solergy India",
      description:
        "Real installations, actual energy generation, and verified client electricity savings.",
    },
    updatedAt: Date.now() - 86400000 * 10,
  },
  products: {
    pageKey: "products",
    title: "Solar Products, Inverters & Battery Storage | Solergy India",
    description:
      "Discover our range of high-efficiency solar modules, hybrid inverters, and lithium energy storage systems.",
    canonicalUrl: "https://solergyindia.com/products",
    robotsIndex: true,
    robotsFollow: true,
    openGraph: {
      title: "Solar Products & Systems | Solergy India",
      description:
        "Explore tier-1 solar panels, string inverters, and battery storage solutions.",
    },
    updatedAt: Date.now() - 86400000 * 10,
  },
  contact: {
    pageKey: "contact",
    title: "Contact Us | Solergy India",
    description:
      "Get in touch with Solergy for a free solar energy audit, quote, or rooftop site assessment.",
    canonicalUrl: "https://solergyindia.com/contact",
    robotsIndex: true,
    robotsFollow: true,
    openGraph: {
      title: "Contact Solergy India",
      description:
        "Request a callback within 24 hours from our solar energy engineers.",
    },
    updatedAt: Date.now() - 86400000 * 10,
  },
};

export async function getSEOConfig(pageKey: string): Promise<SEOPageConfig> {
  const db = getAdminFirestore();

  // If pageKey is project-specific
  if (pageKey.startsWith("project:")) {
    const projectId = pageKey.replace("project:", "");
    const project = PROJECTS.find((p) => p.id === projectId);
    const defaultProjectSEO: SEOPageConfig = {
      pageKey,
      title: project?.title
        ? `${project.title} | Solar Project | Solergy India`
        : "Solar Project | Solergy India",
      description:
        project?.overview?.heading ||
        "Detailed solar installation case study by Solergy India.",
      canonicalUrl: `https://solergyindia.com/project/${projectId}`,
      robotsIndex: true,
      robotsFollow: true,
      openGraph: {
        title: project?.title || "Solar Project Case Study",
        description: project?.overview?.heading,
        image: typeof project?.image === "string" ? project.image : undefined,
      },
      updatedAt: Date.now() - 86400000 * 10,
    };

    if (!db) return defaultProjectSEO;

    try {
      const doc = await db.collection("seoPages").doc(pageKey).get();
      if (doc.exists) {
        return {
          ...defaultProjectSEO,
          ...(doc.data() as Partial<SEOPageConfig>),
          pageKey,
        };
      }
    } catch (err) {
      console.error("Error fetching project SEO:", err);
    }
    return defaultProjectSEO;
  }

  const fallback = DEFAULT_SEO_PAGES[pageKey] || {
    pageKey,
    title: `${pageKey.toUpperCase()} | Solergy India`,
    description: "Solergy solar energy solutions and installations.",
    canonicalUrl: `https://solergyindia.com/${pageKey}`,
    robotsIndex: true,
    robotsFollow: true,
    updatedAt: Date.now(),
  };

  if (!db) return fallback;

  try {
    const doc = await db.collection("seoPages").doc(pageKey).get();
    if (doc.exists) {
      return {
        ...fallback,
        ...(doc.data() as Partial<SEOPageConfig>),
        pageKey,
      };
    }
  } catch (err) {
    console.error("Error fetching page SEO from Firestore:", err);
  }

  return fallback;
}

export async function getAllSEOConfigs(): Promise<SEOPageConfig[]> {
  const db = getAdminFirestore();
  const basePages = Object.values(DEFAULT_SEO_PAGES);

  const projectPages: SEOPageConfig[] = PROJECTS.map((project) => ({
    pageKey: `project:${project.id}`,
    title: `${project.title} | Solar Project | Solergy India`,
    description:
      project?.overview?.heading ||
      "Detailed solar installation case study by Solergy India.",
    canonicalUrl: `https://solergyindia.com/project/${project.id}`,
    robotsIndex: true,
    robotsFollow: true,
    openGraph: {
      title: project.title,
      description: project?.overview?.heading,
      image: typeof project.image === "string" ? project.image : undefined,
    },
    updatedAt: Date.now() - 86400000 * 10,
  }));

  const allDefaults = [...basePages, ...projectPages];

  if (!db) return allDefaults;

  try {
    const snapshot = await db.collection("seoPages").get();
    const firestoreMap = new Map<string, SEOPageConfig>();
    snapshot.docs.forEach((doc: QueryDocumentSnapshot) => {
      firestoreMap.set(doc.id, {
        pageKey: doc.id,
        ...(doc.data() as Omit<SEOPageConfig, "pageKey">),
      });
    });

    return allDefaults.map((def) => {
      if (firestoreMap.has(def.pageKey)) {
        return {
          ...def,
          ...firestoreMap.get(def.pageKey)!,
        };
      }
      return def;
    });
  } catch (err) {
    console.error("Error fetching all SEO pages:", err);
    return allDefaults;
  }
}

export async function upsertSEOMetadata(input: SEOInput): Promise<SEOPageConfig> {
  const db = getAdminFirestore();
  const now = Date.now();

  const data: SEOPageConfig = {
    pageKey: input.pageKey,
    title: input.pageTitle,
    description: input.metaDescription,
    canonicalUrl: input.canonicalUrl,
    robotsIndex: input.robotsIndex ?? true,
    robotsFollow: input.robotsFollow ?? true,
    openGraph: {
      title: input.ogTitle || input.pageTitle,
      description: input.ogDescription || input.metaDescription,
      image: input.ogImage,
    },
    twitter: {
      title: input.twitterTitle || input.pageTitle,
      description: input.twitterDescription || input.metaDescription,
      image: input.twitterImage,
    },
    updatedAt: now,
  };

  if (db) {
    await db.collection("seoPages").doc(input.pageKey).set(data, { merge: true });
  }

  // Revalidate public route paths based on pageKey
  if (input.pageKey === "home") revalidatePath("/");
  else if (input.pageKey.startsWith("project:")) {
    const projectId = input.pageKey.replace("project:", "");
    revalidatePath(`/project/${projectId}`);
  } else if (input.pageKey.startsWith("product:")) {
    revalidatePath("/products");
  } else {
    revalidatePath(`/${input.pageKey}`);
  }

  return data;
}

export const getSEOMetadata = getSEOConfig;
export const getAllSEOPages = getAllSEOConfigs;
