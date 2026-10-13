"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Inbox,
  Search,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import logo from "@/assets/solergy-black.png";
import styles from "./AdminLayout.module.scss";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, don't show admin sidebar/header
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Projects", href: "/admin/projects", icon: Package },
    { label: "Form Inquiries", href: "/admin/inquiries", icon: Inbox },
    { label: "SEO Management", href: "/admin/seo", icon: Search },
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <Link href="/admin" className={styles.brandLink}>
            <Image
              src={logo}
              alt="Solergy"
              width={120}
              height={28}
              priority
              style={{ width: "auto", height: "28px" }}
              className={styles.brandLogo}
            />
          </Link>
          <span className={styles.badge}>CMS</span>
        </div>

        <nav className={styles.nav}>
          <span className={styles.sectionLabel}>Management</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
              >
                <span className={styles.icon}>
                  <Icon size={18} />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>A</div>
            <div className={styles.userInfo}>
              <div className={styles.name}>Administrator</div>
              <div className={styles.role}>Super Admin</div>
            </div>
          </div>

          <button
            type="button"
            className={styles.logoutBtn}
            onClick={handleLogout}
          >
            <LogOut size={14} style={{ display: "inline", marginRight: "6px" }} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <h2 className={styles.headerTitle}>Administration Console</h2>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.siteLink}
          >
            View Live Site
            <ExternalLink size={14} />
          </a>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
