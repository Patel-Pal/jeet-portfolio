"use client";
import { motion } from "framer-motion";
import { Section } from "./section";
import { ArrowUpRight, Github } from "lucide-react";

type Project = {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  problem: string;
  solution: string;
  outcome: string;
  cover: "sales" | "churn" | "retail" | "ipl";
};

const PROJECTS: Project[] = [
  {
    title: "Sales Performance Dashboard",
    tag: "Case Study · 2025",
    description:
      "An executive-ready view of regional sales, top products and rep performance.",
    tech: ["SQL", "Power BI", "DAX"],
    problem: "Weekly sales reviews took hours of manual Excel prep.",
    solution: "Modeled a star schema in SQL and built a Power BI report with drill-throughs.",
    outcome: "Cut weekly reporting from 4h to under 15 minutes.",
    cover: "sales",
  },
  {
    title: "Customer Churn Analysis",
    tag: "Case Study · 2025",
    description:
      "Explored churn signals in a telecom dataset and shipped an at-risk segment view.",
    tech: ["Python", "Pandas", "Matplotlib"],
    problem: "The team lacked a clear picture of which customers were leaving and why.",
    solution: "Cleaned 7K rows, ran EDA and surfaced churn drivers by contract & tenure.",
    outcome: "Identified 3 leading indicators covering ~68% of churn risk.",
    cover: "churn",
  },
  {
    title: "Retail Sales Insights",
    tag: "Excel · 2024",
    description:
      "Store-level insights with dynamic filters, KPIs and category deep-dives.",
    tech: ["Excel", "Power Query", "Pivot"],
    problem: "Store managers needed a single view across categories and seasons.",
    solution: "Built a fully dynamic Excel dashboard with slicers and conditional formatting.",
    outcome: "Enabled a same-day view of underperforming categories.",
    cover: "retail",
  },
  {
    title: "IPL Data Analysis",
    tag: "Personal · 2024",
    description:
      "Ten seasons of IPL, distilled into a Tableau story about batters, venues and toss impact.",
    tech: ["Python", "Tableau"],
    problem: "Cricket commentary tropes rarely match the numbers.",
    solution: "Aggregated ball-by-ball data and built a five-scene Tableau story.",
    outcome: "Debunked 3 common myths with clean, chartable evidence.",
    cover: "ipl",
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects with a beginning, a middle and a result."
      description="A mix of case studies and personal explorations. Each one starts with a question and ends with a decision."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:border-accent/40"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface">
              <ProjectCover kind={p.cover} />
              <span className="absolute left-4 top-4 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
                {p.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>

              <dl className="mt-5 grid gap-2 text-sm">
                <div className="grid grid-cols-[80px_1fr] gap-3">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Problem</dt>
                  <dd className="text-foreground/90">{p.problem}</dd>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-3">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Solution</dt>
                  <dd className="text-foreground/90">{p.solution}</dd>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-3">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Outcome</dt>
                  <dd className="text-accent">{p.outcome}</dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-border pt-5">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-accent/50"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background transition hover:opacity-90"
                >
                  Live demo <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function ProjectCover({ kind }: { kind: Project["cover"] }) {
  const base = "absolute inset-0";
  return (
    <div className={base}>
      <div className="grid-bg absolute inset-0 opacity-60" />
      {kind === "sales" && <SalesCover />}
      {kind === "churn" && <ChurnCover />}
      {kind === "retail" && <RetailCover />}
      {kind === "ipl" && <IPLCover />}
    </div>
  );
}

function SalesCover() {
  const pts = [12, 22, 18, 30, 26, 40, 34, 48, 44, 58];
  const d =
    "M " +
    pts
      .map((v, i) => `${(i / (pts.length - 1)) * 100} ${100 - v * 1.4}`)
      .join(" L ");
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sf" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.65 0.19 260)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.65 0.19 260)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L 100 100 L 0 100 Z`} fill="url(#sf)" />
      <path d={d} fill="none" stroke="oklch(0.65 0.19 260)" strokeWidth="0.6" />
    </svg>
  );
}
function ChurnCover() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-3 p-6">
      {[62, 44, 28, 18, 12].map((v, i) => (
        <div
          key={i}
          className="rounded-md"
          style={{
            width: 22,
            height: `${v}%`,
            background: i === 0 ? "oklch(0.65 0.19 260)" : "oklch(1 0 0 / 0.08)",
          }}
        />
      ))}
    </div>
  );
}
function RetailCover() {
  return (
    <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 gap-1 p-6">
      {Array.from({ length: 60 }).map((_, i) => {
        const v = (Math.sin(i * 0.7) + 1) / 2;
        return (
          <div
            key={i}
            className="rounded-sm"
            style={{ background: `oklch(0.65 0.19 260 / ${0.06 + v * 0.5})` }}
          />
        );
      })}
    </div>
  );
}
function IPLCover() {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
      {Array.from({ length: 42 }).map((_, i) => {
        const x = (i * 17) % 100;
        const y = (i * 31) % 100;
        const r = ((i * 3) % 5) + 1;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r * 0.6}
            fill="oklch(0.65 0.19 260)"
            opacity={0.15 + (i % 5) * 0.12}
          />
        );
      })}
    </svg>
  );
}
