import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import Hero from "@/components/Hero/Hero";
import WhySolergy from "@/components/WhySolergy/WhySolergy";
import WhySolar from "@/components/WhySolar/WhySolar";
import Services from "@/components/Services/Services";
import Projects from "@/components/Projects/Projects";
import FAQ from "@/components/FAQ/FAQ";
import Testimonials from "@/components/Testimonials/Testimonials";
import Tagline from "@/components/Tagline/Tagline";
import Contact from "@/components/Contact/Contact";

import { getAllProjects } from "@/services/projects";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata("home", {
    title: "Solergy | Premium Rooftop Solar Power Solutions",
    description:
      "Engineered solar installations for homes, factories, and commercial enterprises. High-efficiency photovoltaic systems designed for maximum ROI and reliability.",
  });
}

export default async function HomePage() {
  const projects = await getAllProjects();

  return (
    <main>
      <Hero />
      <WhySolergy />
      <WhySolar />
      <Services />
      <Projects initialProjects={projects} />
      <FAQ />
      <Testimonials />
      <Tagline />
      <Contact />
    </main>
  );
}
