# Portfolio — Jeet Rathod

A single-page data analyst portfolio built with React, TanStack Start, Tailwind CSS v4, and Framer Motion.

## Stack

- **Framework:** TanStack Start (SSR) + React 19
- **Styling:** Tailwind CSS v4 (CSS-first config in `src/styles.css`)
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **UI primitives:** Radix UI / shadcn
- **Build:** Vite 8, Nitro (Cloudflare target)

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Project structure

```
src/
├── components/portfolio/  — All portfolio section components
├── components/ui/         — shadcn/ui primitives
├── lib/                   — Utilities (cn, error handling)
├── routes/                — TanStack Router file-based routes
├── styles.css             — Tailwind v4 theme + global styles
├── router.tsx             — Router factory
├── server.ts              — SSR error wrapper
└── start.ts              — TanStack Start entry with middleware
```
