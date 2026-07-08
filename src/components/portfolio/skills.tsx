"use client";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Sigma,
  BarChart3,
  PieChart,
  MessageCircle,
  Lightbulb,
  Users,
  Wand2,
  FileSpreadsheet,
} from "lucide-react";
import { Section } from "./section";
import type { ReactNode } from "react";

type Skill = {
  name: string;
  desc: string;
  level: "Learning" | "Comfortable" | "Proficient";
  icon: ReactNode;
};

type Group = { category: string; skills: Skill[] };

const GROUPS: Group[] = [
  {
    category: "Programming",
    skills: [
      {
        name: "Python",
        desc: "Scripting, data wrangling, notebooks.",
        level: "Comfortable",
        icon: <Code2 className="h-4 w-4" />,
      },
      {
        name: "Pandas",
        desc: "Cleaning, joining and reshaping data.",
        level: "Comfortable",
        icon: <Sigma className="h-4 w-4" />,
      },
      {
        name: "NumPy",
        desc: "Vectorized operations and stats.",
        level: "Learning",
        icon: <Sigma className="h-4 w-4" />,
      },
    ],
  },
  {
    category: "Analytics",
    skills: [
      {
        name: "SQL",
        desc: "Joins, CTEs, window functions.",
        level: "Proficient",
        icon: <Database className="h-4 w-4" />,
      },
      {
        name: "Excel",
        desc: "Pivots, Power Query, modeling.",
        level: "Proficient",
        icon: <FileSpreadsheet className="h-4 w-4" />,
      },
    ],
  },
  {
    category: "Visualization",
    skills: [
      {
        name: "Power BI",
        desc: "DAX measures & interactive reports.",
        level: "Comfortable",
        icon: <BarChart3 className="h-4 w-4" />,
      },
      {
        name: "Tableau",
        desc: "Story-driven, executive dashboards.",
        level: "Comfortable",
        icon: <PieChart className="h-4 w-4" />,
      },
    ],
  },
  {
    category: "Soft skills",
    skills: [
      {
        name: "Communication",
        desc: "Turning findings into decisions.",
        level: "Proficient",
        icon: <MessageCircle className="h-4 w-4" />,
      },
      {
        name: "Problem solving",
        desc: "Framing the right question first.",
        level: "Proficient",
        icon: <Lightbulb className="h-4 w-4" />,
      },
      {
        name: "Leadership",
        desc: "Team lead on the cricket field.",
        level: "Comfortable",
        icon: <Users className="h-4 w-4" />,
      },
      {
        name: "Prompt engineering",
        desc: "Working with LLMs effectively.",
        level: "Comfortable",
        icon: <Wand2 className="h-4 w-4" />,
      },
    ],
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="A toolkit built around clarity."
      description="I pick tools that shorten the path between a question and a confident answer."
    >
      <div className="space-y-14">
        {GROUPS.map((g) => (
          <div key={g.category}>
            <div className="mb-5 flex items-baseline justify-between">
              <h3 className="font-display text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
                {g.category}
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground">
                {String(g.skills.length).padStart(2, "0")}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.skills.map((s, i) => (
                <motion.article
                  key={s.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/40"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(240px circle at var(--x,50%) var(--y,50%), oklch(0.65 0.19 260 / 0.10), transparent 60%)",
                    }}
                  />
                  <div className="flex items-start justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-background text-foreground/80 transition group-hover:text-accent">
                      {s.icon}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {s.level}
                    </span>
                  </div>
                  <h4 className="mt-4 font-display text-lg font-medium">{s.name}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
