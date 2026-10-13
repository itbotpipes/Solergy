import React from "react";
import { getSEOConfig } from "@/services/seo";
import SEOForm from "@/components/admin/SEOForm";

interface EditSEOPageProps {
  params: Promise<{ pageKey: string }>;
}

export default async function EditSEOPage({ params }: EditSEOPageProps) {
  const { pageKey } = await params;
  const decodedPageKey = decodeURIComponent(pageKey);
  const config = await getSEOConfig(decodedPageKey);

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a" }}>
          Edit SEO: {decodedPageKey}
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
          Configure title tags, meta descriptions, canonical URLs, and Open Graph previews.
        </p>
      </div>

      <SEOForm pageKey={decodedPageKey} initialConfig={config || undefined} />
    </div>
  );
}
