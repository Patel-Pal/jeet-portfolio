"use client";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ExternalLink } from "lucide-react";
import { Section } from "./section";

type Cert = { name: string; issuer: string; status: "Completed" | "In progress" };

const CERTS: Cert[] = [
  { name: "SQL for Data Analysis", issuer: "HackerRank", status: "Completed" },
  { name: "Python for Everybody", issuer: "Coursera", status: "Completed" },
  { name: "Power BI Data Analyst", issuer: "Microsoft Learn", status: "In progress" },
  { name: "Tableau Desktop Specialist", issuer: "Tableau", status: "In progress" },
  { name: "Excel — Advanced Formulas", issuer: "LinkedIn Learning", status: "Completed" },
  { name: "Google Data Analytics", issuer: "Coursera", status: "In progress" },
];

export function Certifications() {
  return (
    <Section
      eyebrow="Certifications"
      title="Learning, verified."
      description="A running list of programs completed and in-flight."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CERTS.map((c, i) => (
          <motion.article
            key={c.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-accent/40"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-background text-accent">
              <Award className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{c.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.issuer}</p>
              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest ${
                    c.status === "Completed" ? "text-emerald-400" : "text-muted-foreground"
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {c.status}
                </span>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground transition group-hover:text-foreground"
                >
                  View <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
