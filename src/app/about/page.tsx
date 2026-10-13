import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import AboutHero from "@/components/About/AboutHero/AboutHero";
import AboutStory from "@/components/About/AboutStory/AboutStory";
import AboutWhy from "@/components/About/AboutWhy/AboutWhy";
import HowWeWork from "@/components/About/HowWeWork/HowWeWork";
import MissionVision from "@/components/About/MissionVision/MissionVision";
import AboutTeam from "@/components/About/AboutTeam/AboutTeam";
import AboutClosing from "@/components/About/AboutClosing/AboutClosing";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata("about", {
    title: "About Solergy | Engineering the Clean Energy Transition",
    description:
      "Learn about Solergy's mission, engineering pedigree, and dedication to delivering uncompromising solar energy infrastructure across India.",
  });
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutWhy />
      <HowWeWork />
      <MissionVision />
      <AboutTeam />
      <AboutClosing />
    </main>
  );
}
