"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useEffect, useRef } from "react";

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const tx = useTransform(sx, [-1, 1], [-10, 10]);
  const ty = useTransform(sy, [-1, 1], [-10, 10]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
      my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      id="home"
      ref={wrapRef}
      className="relative isolate mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-28 pb-16"
    >
      <div className="grid-bg absolute inset-0 -z-10" />

      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_theme(colors.accent)]" />
            Open to Data Analyst roles
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-sm uppercase tracking-[0.28em] text-muted-foreground"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 text-balance font-display text-6xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-[5.5rem]"
          >
            Jeet <span className="text-muted-foreground/60">Rathod</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-5 font-display text-2xl font-medium text-foreground/90 sm:text-3xl"
          >
            Data Analyst
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Transforming raw data into meaningful business insights through analytics, visualization
            and storytelling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition hover:border-accent/50"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>

          <div className="mt-14 flex items-center gap-8 text-xs text-muted-foreground">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest">Stack</p>
              <p className="mt-1 text-foreground/80">SQL · Python · Power BI · Tableau</p>
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div className="hidden sm:block">
              <p className="font-mono text-[10px] uppercase tracking-widest">Based in</p>
              <p className="mt-1 text-foreground/80">Gujarat, India</p>
            </div>
          </div>
        </div>

        {/* Right — dashboard visual (hidden on mobile) */}
        <div className="hidden lg:block">
          <motion.div
            style={{ x: tx, y: ty }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <DashboardVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashboardVisual() {
  return (
    <div className="relative aspect-[5/6] w-full">
      {/* Backdrop card */}
      <div className="absolute inset-0 rounded-3xl border border-border bg-surface/70 shadow-[var(--shadow-elevated)] backdrop-blur-xl" />

      {/* KPI card top-left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute left-5 top-5 w-[46%] rounded-2xl border border-border bg-card p-4"
      >
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Revenue</p>
        <p className="mt-1 font-display text-2xl font-semibold">$284.6K</p>
        <p className="mt-1 text-xs text-emerald-400">▲ 12.4% MoM</p>
        <MiniSpark />
      </motion.div>

      {/* Donut */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="absolute right-5 top-5 w-[42%] rounded-2xl border border-border bg-card p-4"
      >
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Segments</p>
        <Donut />
      </motion.div>

      {/* Bar chart middle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute left-5 right-5 top-[46%] rounded-2xl border border-border bg-card p-4"
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Weekly performance
          </p>
          <p className="font-mono text-[10px] text-muted-foreground">W24</p>
        </div>
        <Bars />
      </motion.div>

      {/* Heatmap bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        className="absolute bottom-5 left-5 w-[46%] rounded-2xl border border-border bg-card p-4"
      >
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Retention</p>
        <Heatmap />
      </motion.div>

      {/* Small KPI bottom-right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-5 right-5 w-[42%] rounded-2xl border border-border bg-card p-4"
      >
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Conversion</p>
        <p className="mt-1 font-display text-2xl font-semibold">4.82%</p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "68%" }}
            transition={{ delay: 1.1, duration: 1.1 }}
            className="h-full rounded-full bg-accent"
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Goal 7.10%</p>
      </motion.div>

      {/* Connecting line */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 30 22 C 45 28, 60 20, 72 22"
          fill="none"
          stroke="oklch(0.65 0.19 260)"
          strokeWidth="0.25"
          strokeDasharray="1 1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 1 }}
        />
      </svg>
    </div>
  );
}

function MiniSpark() {
  const pts = [8, 12, 10, 16, 14, 20, 18, 24];
  const max = Math.max(...pts);
  const d = pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * 100} ${30 - (v / max) * 24}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 30" className="mt-3 h-8 w-full">
      <motion.path
        d={d}
        fill="none"
        stroke="oklch(0.65 0.19 260)"
        strokeWidth="1.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      />
    </svg>
  );
}

function Donut() {
  const segs = [
    { v: 42, c: "oklch(0.65 0.19 260)" },
    { v: 28, c: "oklch(0.75 0.14 190)" },
    { v: 18, c: "oklch(0.78 0.16 90)" },
    { v: 12, c: "oklch(0.4 0.02 285)" },
  ];
  const C = 2 * Math.PI * 28;
  let offset = 0;
  return (
    <div className="mt-2 flex items-center justify-center">
      <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
        {segs.map((s, i) => {
          const len = (s.v / 100) * C;
          const el = (
            <motion.circle
              key={i}
              cx="40"
              cy="40"
              r="28"
              fill="none"
              stroke={s.c}
              strokeWidth="10"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
    </div>
  );
}

function Bars() {
  const data = [40, 62, 48, 74, 58, 82, 70];
  const max = Math.max(...data);
  return (
    <div className="mt-3 flex h-24 items-end gap-2">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ delay: 0.8 + i * 0.05, duration: 0.6 }}
          className={`flex-1 rounded-md ${i === 5 ? "bg-accent" : "bg-secondary"}`}
        />
      ))}
    </div>
  );
}

function Heatmap() {
  return (
    <div className="mt-3 grid grid-cols-8 gap-1">
      {Array.from({ length: 32 }).map((_, i) => {
        const intensity = (Math.sin(i * 1.3) + 1) / 2;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 + intensity * 0.85 }}
            transition={{ delay: 0.9 + i * 0.015 }}
            className="aspect-square rounded-sm"
            style={{ background: `oklch(0.65 0.19 260 / ${0.1 + intensity * 0.7})` }}
          />
        );
      })}
    </div>
  );
}
