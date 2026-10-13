import React, { type ReactNode, type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "white" | "ghost";
  showArrow?: boolean;
  href?: string;
  to?: string;
  className?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  variant = "primary",
  showArrow = false,
  href,
  to,
  className = "",
  target,
  rel,
  ...rest
}: ButtonProps) {
  const combinedClassName = `${styles.button} ${styles[variant] || ""} ${className}`.trim();
  const content = (
    <>
      {children}
      {showArrow && <span className={styles.arrow}>&rarr;</span>}
    </>
  );

  if (to) {
    return (
      <Link href={to} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={combinedClassName} target={target} rel={rel}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={combinedClassName} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...rest}>
      {content}
    </button>
  );
}
