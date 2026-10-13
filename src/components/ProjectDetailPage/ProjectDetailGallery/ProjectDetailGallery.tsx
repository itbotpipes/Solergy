"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useInView from "../../../hooks/useInView";
import styles from "./ProjectDetailGallery.module.scss";
import reveal from "../../../styles/reveal.module.scss";
import { Project } from "@/types/project";

interface ProjectDetailGalleryProps {
  project: Project;
}

export default function ProjectDetailGallery({ project }: ProjectDetailGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const images = project.gallery;

  const isOpen = activeIndex !== null;

  const showPrev = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % images.length,
    );
  }, [images.length]);

  const closeModal = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeModal, showPrev, showNext]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${reveal.sectionReveal} ${
        visible ? reveal.sectionVisible : ""
      }`}
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          {images.map((image, index) => {
            const src = typeof image === "string" ? image : image?.src;
            return (
              <button
                key={index}
                type="button"
                className={styles.item}
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${project.title} image ${index + 1}`}
              >
                <img
                  src={src}
                  alt={`${project.title} ${index + 1}`}
                  className={styles.image}
                />
              </button>
            );
          })}
        </div>
      </div>

      {isOpen && typeof document !== "undefined" &&
        createPortal(
          <div
            className={styles.modalBackdrop}
            role="dialog"
            aria-modal="true"
            onClick={closeModal}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Close gallery"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonLeft}`}
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div
              className={styles.modalContent}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={
                  typeof images[activeIndex!] === "string"
                    ? (images[activeIndex!] as string)
                    : (images[activeIndex!] as any)?.src
                }
                alt={`${project.title} ${activeIndex! + 1}`}
                className={styles.modalImage}
              />
              <p className={styles.modalCounter}>
                {activeIndex! + 1} / {images.length}
              </p>
            </div>

            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonRight}`}
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
}
