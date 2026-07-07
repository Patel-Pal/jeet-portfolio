"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32 ${className}`}
    >
      {(eyebrow || title || description) && (
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          {eyebrow && (
            <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              <span className="h-px w-6 bg-border" />
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-balance font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </motion.header>
      )}
      {children}
    </section>
  );
}
