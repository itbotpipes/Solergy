import React from "react";
import { notFound } from "next/navigation";
import { getInquiryById } from "@/services/inquiries";
import InquiryDetail from "@/components/admin/InquiryDetail";

interface InquiryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function InquiryDetailPage({
  params,
}: InquiryDetailPageProps) {
  const { id } = await params;
  const inquiry = await getInquiryById(id);

  if (!inquiry) {
    notFound();
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a" }}>
          Inquiry: {inquiry.name || inquiry.id}
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
          Manage customer correspondence, view submitted payload, and log internal notes.
        </p>
      </div>

      <InquiryDetail inquiry={inquiry} />
    </div>
  );
}
