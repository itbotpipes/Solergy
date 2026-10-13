import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import CalcHero from "@/components/CalculatorPage/CalcHero/CalcHero";
import CalcTool from "@/components/CalculatorPage/CalcTool/CalcTool";
import CalcBenefits from "@/components/CalculatorPage/CalcBenefits/CalcBenefits";
import CalcHowItWorks from "@/components/CalculatorPage/CalcHowItWorks/CalcHowItWorks";
import CalcFAQ from "@/components/CalculatorPage/CalcFAQ/CalcFAQ";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata("calculator", {
    title: "Solar Savings Calculator | Solergy Solar ROI Estimator",
    description:
      "Estimate your rooftop solar system size, monthly savings, payback period, and 25-year cumulative ROI with Solergy's interactive solar calculator.",
  });
}

export default function CalculatorPage() {
  return (
    <main>
      <CalcHero />
      <CalcTool />
      <CalcBenefits />
      <CalcHowItWorks />
      <CalcFAQ />
    </main>
  );
}
