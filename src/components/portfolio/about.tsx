"use client";
import { motion } from "framer-motion";
import { Section } from "./section";
import { GraduationCap, Sparkles, Compass } from "lucide-react";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="An analytical mind, told through data.">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-5 text-base leading-[1.75] text-muted-foreground sm:text-[17px]"
        >
          <p className="text-foreground/90">
            I&apos;m Jeet — a data analyst who enjoys sitting with a messy dataset until the story
            inside it becomes obvious.
          </p>
          <p>
            I hold a Bachelor of Computer Applications from Veer Narmad South Gujarat University and
            I&apos;m currently pursuing my Master of Computer Applications at Indus University.
            Along the way I&apos;ve fallen for the craft of turning business questions into queries,
            dashboards and decisions.
          </p>
          <p>
            My daily tools are <span className="text-foreground">SQL</span>,{" "}
            <span className="text-foreground">Python</span> (Pandas &amp; NumPy),{" "}
            <span className="text-foreground">Excel</span>,{" "}
            <span className="text-foreground">Power BI</span> and{" "}
            <span className="text-foreground">Tableau</span>. I keep sharpening them through
            personal projects, case studies and a steady diet of new datasets.
          </p>
          <p>
            I care about clarity. A dashboard is only useful when a stakeholder can look at it once
            and know what to do next.
          </p>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="relative rounded-3xl border border-border bg-card p-6"
        >
          <ul className="space-y-6">
            <TimelineItem
              icon={<GraduationCap className="h-4 w-4" />}
              label="Education"
              title="MCA — Indus University"
              caption="2025 — Present"
            />
            <TimelineItem
              icon={<Sparkles className="h-4 w-4" />}
              label="Currently"
              title="Deepening Power BI & advanced SQL"
              caption="Weekly case studies"
            />
            <TimelineItem
              icon={<Compass className="h-4 w-4" />}
              label="Next"
              title="Analyst role in a product team"
              caption="Open to opportunities"
              last
            />
          </ul>
        </motion.aside>
      </div>
    </Section>
  );
}

function TimelineItem({
  icon,
  label,
  title,
  caption,
  last,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  caption: string;
  last?: boolean;
}) {
  return (
    <li className="relative pl-10">
      <span className="absolute left-0 top-0 grid h-7 w-7 place-items-center rounded-full border border-border bg-background text-foreground/80">
        {icon}
      </span>
      {!last && <span className="absolute left-[13px] top-8 h-full w-px bg-border" aria-hidden />}
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{caption}</p>
    </li>
  );
}
