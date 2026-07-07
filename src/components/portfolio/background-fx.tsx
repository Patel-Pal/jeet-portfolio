"use client";
import { useEffect, useRef, useState } from "react";

/** Cursor spotlight + subtle floating particles + noise. */
export function BackgroundFX() {
  const ref = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ ["--mx" as never]: "50vw", ["--my" as never]: "-20vh" }}
    >
      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), oklch(0.65 0.19 260 / 0.10), transparent 60%)",
        }}
      />
      {/* Ambient gradient mesh */}
      <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
           style={{ background: "radial-gradient(closest-side, oklch(0.65 0.19 260 / 0.18), transparent)" }} />
      <div className="absolute bottom-0 right-0 h-[420px] w-[560px] rounded-full opacity-40 blur-3xl"
           style={{ background: "radial-gradient(closest-side, oklch(0.72 0.14 200 / 0.15), transparent)" }} />
      {/* Noise */}
      <div className="noise-overlay absolute inset-0" />
      {/* Particles */}
      {!reduced && (
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {Array.from({ length: 22 }).map((_, i) => {
            const x = (i * 137) % 100;
            const y = (i * 53) % 100;
            const dur = 12 + ((i * 7) % 10);
            const r = 0.6 + (i % 3) * 0.4;
            return (
              <circle
                key={i}
                cx={`${x}%`}
                cy={`${y}%`}
                r={r}
                fill="white"
                opacity="0.25"
              >
                <animate
                  attributeName="cy"
                  values={`${y}%;${(y + 6) % 100}%;${y}%`}
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.05;0.3;0.05"
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </svg>
      )}
    </div>
  );
}
