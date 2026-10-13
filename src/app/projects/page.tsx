import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import ProjectsHero from "@/components/ProjectsPage/ProjectsHero/ProjectsHero";
import ProjectsGrid from "@/components/ProjectsPage/ProjectsGrid/ProjectsGrid";
import ProjectsCTA from "@/components/ProjectsPage/ProjectsCTA/ProjectsCTA";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata("projects", {
    title: "Portfolio & Case Studies | Solergy Completed Installations",
    description:
      "Explore completed rooftop and ground-mount solar installations across residential communities, manufacturing facilities, and corporate complexes.",
  });
}

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />
      <ProjectsGrid />
      <ProjectsCTA />
    </main>
  );
}
