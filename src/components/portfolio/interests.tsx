"use client";
import { motion } from "framer-motion";
import { Section } from "./section";
import { Camera, Compass, Cpu, Trophy } from "lucide-react";

const LANGS = [
  { name: "English", note: "Professional" },
  { name: "Hindi", note: "Fluent" },
  { name: "Gujarati", note: "Native" },
];

const INTERESTS = [
  {
    icon: <Trophy className="h-4 w-4" />,
    title: "District-level cricket",
    body: "Team lead. Where I learned to make decisions with imperfect information.",
  },
  {
    icon: <Compass className="h-4 w-4" />,
    title: "Travelling",
    body: "New cities, unfamiliar routines, notebooks full of small observations.",
  },
  {
    icon: <Cpu className="h-4 w-4" />,
    title: "Learning AI",
    body: "Following the applied ML space and experimenting with LLM workflows.",
  },
  {
    icon: <Camera className="h-4 w-4" />,
    title: "Photography",
    body: "Composition, contrast, light — the same instincts that shape a good chart.",
  },
];

export function LanguagesAndInterests() {
  return (
    <Section eyebrow="Beyond analytics" title="What I do when I close the laptop.">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Languages
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {LANGS.map((l) => (
              <span
                key={l.name}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm"
              >
                <span className="text-foreground">{l.name}</span>
                <span className="text-xs text-muted-foreground">· {l.note}</span>
              </span>
            ))}
          </div>
        </aside>

        <div className="grid gap-3 sm:grid-cols-2">
          {INTERESTS.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-accent/40"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-background text-accent">
                {it.icon}
              </span>
              <h3 className="mt-4 font-display text-base font-medium">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
