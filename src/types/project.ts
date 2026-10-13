import type { StaticImageData } from "next/image";

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectPoint {
  title: string;
  description: string;
}

export interface ProjectSectionDetail {
  heading: string;
  intro: string[];
  paragraphs?: string[];
  points: ProjectPoint[];
}

export interface ProjectOverviewDetail {
  heading: string;
  paragraphs: string[];
}

export interface ProjectGlanceItem {
  label: string;
  value: string;
}

export interface ProjectImpact {
  paragraphs: string[];
  cumulativeSavings: string;
  paybackYear: number;
  stats: Array<{ label: string; value: string }>;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  city: string;
  state?: string;
  size: string;
  date: string;
  systemType: string;
  image: string | StaticImageData;
  gallery: Array<string | StaticImageData>;
  description: string;
  story: string[];
  specs: ProjectSpec[];
  overview: ProjectOverviewDetail;
  challenge: ProjectSectionDetail;
  solution: ProjectSectionDetail;
  glance: ProjectGlanceItem[];
  impact: ProjectImpact;
  testimonialIndex?: number;
}

export function getProjectImageUrl(img: string | StaticImageData | undefined): string {
  if (!img) return "";
  if (typeof img === "string") return img;
  return img.src;
}
