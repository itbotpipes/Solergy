import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjectById, getAllProjects } from "@/services/projects";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import ProjectDetailHero from "@/components/ProjectDetailPage/ProjectDetailHero/ProjectDetailHero";
import ProjectDetailOverview from "@/components/ProjectDetailPage/ProjectDetailOverview/ProjectDetailOverview";
import ProjectDetailGlance from "@/components/ProjectDetailPage/ProjectDetailGlance/ProjectDetailGlance";
import ProjectDetailStory from "@/components/ProjectDetailPage/ProjectDetailStory/ProjectDetailStory";
import ProjectDetailChallenge from "@/components/ProjectDetailPage/ProjectDetailChallenge/ProjectDetailChallenge";
import ProjectDetailSolution from "@/components/ProjectDetailPage/ProjectDetailSolution/ProjectDetailSolution";
import ProjectDetailProcess from "@/components/ProjectDetailPage/ProjectDetailProcess/ProjectDetailProcess";
import ProjectDetailImpact from "@/components/ProjectDetailPage/ProjectDetailImpact/ProjectDetailImpact";
import ProjectDetailGallery from "@/components/ProjectDetailPage/ProjectDetailGallery/ProjectDetailGallery";
import ProjectDetailTestimonial from "@/components/ProjectDetailPage/ProjectDetailTestimonial/ProjectDetailTestimonial";
import ProjectDetailOtherProjects from "@/components/ProjectDetailPage/ProjectDetailOtherProjects/ProjectDetailOtherProjects";
import ProjectDetailCTA from "@/components/ProjectDetailPage/ProjectDetailCTA/ProjectDetailCTA";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found | Solergy",
    };
  }

  const pageKey = `project:${id}`;
  const ogImg = typeof project.image === "string" ? project.image : (project.image as any)?.src;

  return generateSEOMetadata(pageKey, {
    title: `${project.title} — ${project.size} Solar Installation | Solergy`,
    description: `Case study on how Solergy engineered and delivered a ${project.size} solar system for ${project.title} in ${project.city}, ${project.state || "Gujarat"}.`,
    openGraphImage: ogImg,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const allProjects = await getAllProjects();

  return (
    <main>
      <ProjectDetailHero project={project} />
      <ProjectDetailOverview project={project} />
      <ProjectDetailChallenge project={project} />
      <ProjectDetailSolution project={project} />
      <ProjectDetailGlance project={project} />
      <ProjectDetailStory project={project} />
      <ProjectDetailProcess project={project} />
      <ProjectDetailImpact project={project} />
      <ProjectDetailGallery project={project} />
      <ProjectDetailTestimonial project={project} />
      <ProjectDetailOtherProjects project={project} otherProjects={allProjects} />
      <ProjectDetailCTA />
    </main>
  );
}
