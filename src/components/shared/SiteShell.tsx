"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

interface SiteShellProps {
  children: React.ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
