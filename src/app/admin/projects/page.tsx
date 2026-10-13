import React from "react";
import { getAllProjects } from "@/services/projects";
import AdminProjectsTable from "./AdminProjectsTable";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const initialProjects = await getAllProjects();
  return <AdminProjectsTable initialProjects={initialProjects} />;
}
