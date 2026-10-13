import React from "react";
import { getAllProducts } from "@/services/products";
import AdminProductsTable from "./AdminProductsTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const initialProducts = await getAllProducts();
  return <AdminProductsTable initialProducts={initialProducts} />;
}
