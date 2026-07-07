"use client";
import { animate, motion, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { Section } from "./section";

type Stat = { label: string; value: number; suffix?: string };

const STATS: Stat[] = [
  { label: "Datasets analyzed", value: 15, suffix: "+" },
  { label: "Dashboards created", value: 8, suffix: "+" },
  { label: "SQL queries written", value: 250, suffix: "+" },
  { label: "Learning hours", value: 600, suffix: "+" },
];

export function AnalyticsShowcase() {
  return (
    <Section eyebrow="By the numbers" title="A snapshot of the practice.">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border/60 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Counter key={s.label} stat={s} delay={i * 0.1} />
        ))}
      </div>
    </Section>
  );
}

function Counter({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const val = useMotionValue(0);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(val, stat.value, {
      duration: 1.6,
      delay,
      ease: "easeOut",
      onUpdate: (v) => {
        if (nodeRef.current) nodeRef.current.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, stat.value, delay, val]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-background p-8"
    >
      <p className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
        <span ref={nodeRef}>0</span>
        <span className="text-accent">{stat.suffix}</span>
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
    </motion.div>
  );
}
