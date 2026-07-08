import { Github, Linkedin, Mail } from "lucide-react";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#playground", label: "Playground" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card font-display font-semibold">
            JR
          </span>
          <div>
            <p className="text-sm font-medium">Jeet Rathod</p>
            <p className="text-xs text-muted-foreground">Data Analyst · Gujarat, India</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="transition hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="mailto:jeet.rathod@example.com"
            aria-label="Email"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground/80 transition hover:border-accent/50 hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground/80 transition hover:border-accent/50 hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="#"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground/80 transition hover:border-accent/50 hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Jeet Rathod. All rights reserved.</p>
          <p>Designed with passion for data.</p>
        </div>
      </div>
    </footer>
  );
}
