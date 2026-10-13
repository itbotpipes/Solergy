"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/solergy-black.png";
import styles from "./page.module.scss";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please check credentials.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Authentication error"
      );
    }
  };

  return (
    <div className={styles.loginWrap}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoWrap}>
            <Image
              src={logo}
              alt="Solergy"
              width={140}
              height={32}
              priority
              className={styles.logoImage}
            />
          </div>
          <h1>Admin Portal</h1>
          <p>Sign in with your authorized admin credentials</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}

          <div className={styles.field}>
            <label>Admin Email</label>
            <input
              type="email"
              required
              placeholder="admin@solergy.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Signing in..." : "Sign In to Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
