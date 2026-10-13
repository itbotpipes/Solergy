# SOLERGY — Full-Stack Next.js Application with TypeScript & Admin CMS

A production-ready, full-stack Next.js application migrated from Create React App to the **Next.js App Router (100% TypeScript)** with **Firebase Cloud Firestore**, **Firebase Authentication**, **Cloudinary Media Management**, **Product CMS**, **Form Submission Management**, and **Website SEO Management**.

---

## ⚡ Key Architectural Highlights

1. **100% TypeScript (`.ts` and `.tsx` strictly)**:
   - Complete strict type checking (`"strict": true` in `tsconfig.json`).
   - Zero `.js` / `.jsx` application code.
   - Strongly-typed models for Products, Inquiries, SEO Metadata, and Portfolio Projects.
2. **Next.js App Router**:
   - Modern server & client component separation.
   - Dynamic Server-Side Rendering (SSR), Static Site Generation (SSG), and Incremental Static Regeneration (ISR).
   - Route handlers (`/api/forms`, `/api/auth/*`, `/api/admin/*`, `/api/cloudinary/*`).
3. **Preserved Frontend & Animations**:
   - Full preservation of original Solergy visual identity, dark luxury aesthetics, solar orange accents, SCSS modules, and GSAP ScrollTrigger animations.
   - Responsive navbar, mobile navigation, solar calculator, interactive project portfolio, and contact forms.
4. **Scoped Admin CMS (Strict Boundaries)**:
   - **Product Management**: Full CRUD, categories, technical specifications, features, Cloudinary image/video signed uploads, drag-and-drop gallery reordering, draft/published statuses.
   - **Form Responses & Lead Management**: Captures submissions from homepage contact, contact page, calculator leads, and product quote forms in Firestore. Filterable table, CSV export, WhatsApp contact launcher, and internal notes log.
   - **Website SEO Management**: Live Google SERP preview, title & description character counters, canonical URLs, robots indexing, Open Graph & Twitter Card customization for every public page, project case study, and product.
   - **Media Library**: Direct Cloudinary integration with signed uploads, URL clipboard copy, and asset delivery optimizations.
   - **Security & Authentication**: Firebase Auth with HTTP-only session cookies, server-side role validation, rate limiting, and Zod input sanitization with anti-spam honeypots.

---

## 📁 Project Structure

```text
solergy-react/
├── public/
├── src/
│   ├── app/
│   │   ├── (website)/
│   │   │   ├── page.tsx                 # Homepage (Dynamic SEO + GSAP)
│   │   │   ├── about/page.tsx          # About Us
│   │   │   ├── calculator/page.tsx     # Solar Savings Calculator
│   │   │   ├── projects/page.tsx       # Projects Portfolio (Static data source)
│   │   │   ├── project/[id]/page.tsx   # Project Case Study (SSG + SEO overrides)
│   │   │   ├── products/page.tsx       # Products Catalog (Firestore ISR)
│   │   │   ├── products/[slug]/page.tsx# Product Detail (Hardware + Inquiry Modal)
│   │   │   └── contact/page.tsx        # Contact & Consultation
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx              # Admin Session Wrapper & Sidebar
│   │   │   ├── page.tsx                # Admin Dashboard (Live metrics & recent leads)
│   │   │   ├── login/page.tsx          # Secure Admin Login
│   │   │   ├── products/               # Products List, /new, /[id]/edit
│   │   │   ├── inquiries/              # Form Responses, /[id] detail & notes
│   │   │   ├── seo/                    # All Pages SEO, /[pageKey] editor
│   │   │   └── media/                  # Cloudinary Media Library
│   │   │
│   │   ├── api/
│   │   │   ├── forms/route.ts          # Public Form Submission Handler
│   │   │   ├── auth/login/route.ts     # Admin Login & Session Cookie
│   │   │   ├── auth/logout/route.ts    # Admin Logout
│   │   │   ├── admin/products/         # Admin Products CRUD API
│   │   │   ├── admin/inquiries/        # Admin Inquiries & Notes API
│   │   │   ├── admin/seo/              # Admin SEO API & Cache Invalidation
│   │   │   └── cloudinary/sign/        # Signed Media Upload API
│   │   │
│   │   ├── layout.tsx                  # Root Public Layout
│   │   ├── globals.scss                # Design tokens & Global reset
│   │   ├── sitemap.ts                  # Dynamic XML Sitemap
│   │   └── robots.ts                   # Robots.txt configuration
│   │
│   ├── components/
│   │   ├── admin/                      # AdminLayout, ProductForm, SEOForm, InquiryDetail
│   │   ├── ProductsPage/               # ProductsHero, ProductsGrid, ProductCard
│   │   ├── ProductDetailPage/          # ProductHero, Specs, Features, InquiryModal
│   │   ├── ProjectDetailPage/          # Converted TSX Project Detail Components
│   │   ├── Header/ & Footer/           # Navigation with Next.js Link & Active states
│   │   └── common/Button/              # Universal Button with Next.js Link
│   │
│   ├── services/                       # Firestore Services (products, inquiries, seo)
│   ├── types/                          # TypeScript definitions (product, inquiry, seo, project)
│   ├── lib/                            # Firebase Admin/Client, Cloudinary, Zod validations
│   └── data/                           # projects.ts, testimonials.ts (Source-managed)
│
├── scripts/
│   └── create-admin.ts                 # CLI to provision Firebase Super Admin
├── firestore.rules                     # Cloud Firestore Security Rules
├── firestore.indexes.json              # Firestore Composite Query Indexes
├── next.config.ts                      # Next.js Config (Cloudinary patterns, SCSS)
├── tsconfig.json                       # Strict TypeScript Configuration
└── .env.example                        # Documented environment variables template
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file by copying `.env.example`:

```bash
cp .env.example .env.local
```

Fill in your Firebase and Cloudinary credentials:

```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id

# Firebase Admin SDK (Privileged Server-Side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Cloudinary Media
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Application URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note**: The application has built-in graceful fallbacks for local development when credentials are not yet configured.

### 3. Provision an Admin Account

Run the TypeScript admin creation script:

```bash
npx tsx scripts/create-admin.ts admin@solergy.com SecurePassword123! "Super Admin" super_admin
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public website, or [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin dashboard.

---

## 🛠️ Verification & Build Commands

### TypeScript Strict Verification

```bash
npx tsc --noEmit
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```
