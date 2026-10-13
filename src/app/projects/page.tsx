import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import ProjectsHero from "@/components/ProjectsPage/ProjectsHero/ProjectsHero";
import ProjectsGrid from "@/components/ProjectsPage/ProjectsGrid/ProjectsGrid";
import ProjectsCTA from "@/components/ProjectsPage/ProjectsCTA/ProjectsCTA";

import { getAllProjects } from "@/services/projects";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata("projects", {
    title: "Portfolio & Case Studies | Solergy Completed Installations",
    description:
      "Explore completed rooftop and ground-mount solar installations across residential communities, manufacturing facilities, and corporate complexes.",
  });
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main>
      <ProjectsHero />
      <ProjectsGrid initialProjects={projects} />
      <ProjectsCTA />
    </main>
  );
}
