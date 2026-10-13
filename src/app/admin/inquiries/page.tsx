import React from "react";
import { getInquiries } from "@/services/inquiries";
import AdminInquiriesTable from "./AdminInquiriesTable";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const initialInquiries = await getInquiries();
  return <AdminInquiriesTable initialInquiries={initialInquiries} />;
}
