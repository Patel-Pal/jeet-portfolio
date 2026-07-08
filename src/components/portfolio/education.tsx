"use client";
import { motion } from "framer-motion";
import { Section } from "./section";
import { GraduationCap } from "lucide-react";

const ITEMS = [
  {
    period: "2025 — Present",
    title: "Master of Computer Applications",
    place: "Indus University",
    body: "Deepening data structures, analytics and applied ML foundations while shipping side projects in SQL and Power BI.",
  },
  {
    period: "2022 — 2025",
    title: "Bachelor of Computer Applications",
    place: "Veer Narmad South Gujarat University",
    body: "Fell in love with data through database systems, statistics and Python — the projects that made analytics click.",
  },
];

export function EducationTimeline() {
  return (
    <Section id="education" eyebrow="Education" title="Academic timeline.">
      <div className="relative">
        <div
          className="absolute left-[15px] top-2 bottom-2 w-px bg-border md:left-1/2"
          aria-hidden
        />
        <ul className="space-y-12">
          {ITEMS.map((it, i) => (
            <motion.li
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative grid gap-6 md:grid-cols-2 md:items-start"
            >
              <div
                className={`pl-12 md:pl-0 ${
                  i % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"
                }`}
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  {it.period}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                  {it.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{it.place}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
              </div>
              <span className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-border bg-background text-accent md:left-1/2 md:-translate-x-1/2">
                <GraduationCap className="h-4 w-4" />
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
