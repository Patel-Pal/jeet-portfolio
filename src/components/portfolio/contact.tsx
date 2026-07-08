"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { Section } from "./section";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s connect."
      description="Have a role, a project or a dataset that needs a second pair of eyes? I’d love to hear about it."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            The quickest way to reach me is email — I usually reply within a day. For more casual
            conversations, LinkedIn works too.
          </p>

          <ul className="space-y-3">
            <ContactRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value="jeet.rathod@example.com"
              href="mailto:jeet.rathod@example.com"
            />
            <ContactRow
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              value="+91 00000 00000"
              href="tel:+910000000000"
            />
            <ContactRow
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              value="Gujarat, India"
            />
            <ContactRow
              icon={<Linkedin className="h-4 w-4" />}
              label="LinkedIn"
              value="linkedin.com/in/jeet-rathod"
              href="#"
              external
            />
            <ContactRow
              icon={<Github className="h-4 w-4" />}
              label="GitHub"
              value="github.com/jeet-rathod"
              href="#"
              external
            />
          </ul>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 4000);
          }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-xl sm:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{ background: "oklch(0.65 0.19 260 / 0.4)" }}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" required />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
          </div>
          <div className="mt-4">
            <Field label="Subject" name="subject" placeholder="What’s this about?" />
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="A few lines about your project or role…"
              className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-accent/50 focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {sent ? "Thanks — I’ll be in touch." : "I’ll reply within 24 hours."}
            </p>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
            >
              Send message
              <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-accent/50 focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-foreground/80 transition group-hover:text-accent">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-sm text-foreground">{value}</p>
      </div>
      {href && (
        <ArrowUpRight
          className={`h-4 w-4 text-muted-foreground transition group-hover:text-foreground ${
            external ? "" : "rotate-45"
          }`}
        />
      )}
    </>
  );
  return (
    <li>
      {href ? (
        <a
          href={href}
          className="group flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-3 transition hover:border-accent/40"
        >
          {inner}
        </a>
      ) : (
        <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-3">
          {inner}
        </div>
      )}
    </li>
  );
}
