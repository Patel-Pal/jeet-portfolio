"use client";
import { motion } from "framer-motion";
import { Section } from "./section";
import { Compass, MapPin, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: <Compass className="h-4 w-4" />,
    label: "Today",
    title: "Building fluency",
    body: "Personal projects, business case studies and hands-on analytics practice — sharpening the muscle every week.",
  },
  {
    icon: <MapPin className="h-4 w-4" />,
    label: "Next",
    title: "Analyst role",
    body: "Joining a product-minded team where data shapes decisions, not just reports.",
  },
  {
    icon: <Rocket className="h-4 w-4" />,
    label: "Later",
    title: "Analytics engineering",
    body: "Owning models, metrics layers and the story that ties them together end-to-end.",
  },
];

export function CareerJourney() {
  return (
    <Section
      eyebrow="Career journey"
      title="Currently seeking Data Analyst opportunities."
      description="Not a fresher story — an early-career one. Here's the roadmap I'm walking."
    >
      <div className="relative rounded-3xl border border-border bg-card p-6 sm:p-10">
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="relative rounded-2xl border border-border bg-background p-5"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-accent">
                  {s.icon}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-medium">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>

        {/* connecting dashed road */}
        <svg
          className="pointer-events-none absolute inset-x-10 top-1/2 hidden h-8 -translate-y-1/2 md:block"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0 5 C 25 -3, 45 12, 55 5 S 90 -2, 100 5"
            stroke="oklch(0.65 0.19 260 / 0.45)"
            strokeDasharray="1.4 1.6"
            strokeWidth="0.35"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </svg>
      </div>
    </Section>
  );
}
