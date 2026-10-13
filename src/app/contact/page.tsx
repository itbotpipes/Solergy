import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import ContactHero from "@/components/ContactPage/ContactHero/ContactHero";
import ContactForm from "@/components/ContactPage/ContactForm/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata("contact", {
    title: "Contact Solergy | Free Solar Consultation & Site Survey",
    description:
      "Get in touch with Solergy's renewable energy engineers for custom rooftop evaluations, financial payback analyses, and turnkey EPC quotes.",
  });
}

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
    </main>
  );
}
