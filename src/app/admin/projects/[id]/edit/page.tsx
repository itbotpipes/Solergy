import React from "react";
import { notFound } from "next/navigation";
import { getProjectById } from "@/services/projects";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectForm initialProject={project} isEditing={true} />;
}
