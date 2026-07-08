"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Section } from "./section";
import { Database, LineChart as LineIcon, PieChart as PieIcon } from "lucide-react";

/* ---------- Mock data ---------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const REGIONS = ["North", "South", "East", "West"] as const;

type Region = (typeof REGIONS)[number];

const salesByRegion: Record<Region, number[]> = {
  North: [42, 48, 55, 51, 60, 68, 74, 71, 78, 82, 88, 96],
  South: [30, 34, 33, 40, 44, 46, 50, 55, 58, 60, 62, 65],
  East: [22, 25, 27, 30, 34, 40, 44, 42, 48, 52, 56, 60],
  West: [48, 52, 58, 62, 68, 72, 76, 82, 86, 90, 94, 100],
};

const segments = [
  { name: "Enterprise", value: 42, color: "oklch(0.65 0.19 260)" },
  { name: "SMB", value: 28, color: "oklch(0.75 0.14 190)" },
  { name: "Startup", value: 18, color: "oklch(0.78 0.16 90)" },
  { name: "Other", value: 12, color: "oklch(0.55 0.03 285)" },
];

const QUERIES = [
  {
    id: "top-products",
    label: "Top 5 products by revenue",
    sql: `SELECT product_name,
       ROUND(SUM(quantity * unit_price), 2) AS revenue
FROM   order_items
GROUP  BY product_name
ORDER  BY revenue DESC
LIMIT  5;`,
    rows: [
      { product_name: "Signal Pro", revenue: 184320.5 },
      { product_name: "Arc Kit", revenue: 152980.1 },
      { product_name: "Halo Lite", revenue: 128740.75 },
      { product_name: "Node Mini", revenue: 98420.0 },
      { product_name: "Field Pack", revenue: 76180.4 },
    ],
  },
  {
    id: "monthly-growth",
    label: "MoM growth (last 6 months)",
    sql: `WITH m AS (
  SELECT DATE_TRUNC('month', order_date) AS month,
         SUM(total) AS revenue
  FROM   orders
  GROUP  BY 1
)
SELECT month,
       revenue,
       ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
             / LAG(revenue) OVER (ORDER BY month), 1) AS growth_pct
FROM   m
ORDER  BY month DESC
LIMIT  6;`,
    rows: [
      { month: "2025-06", revenue: 96420, growth_pct: 9.1 },
      { month: "2025-05", revenue: 88320, growth_pct: 7.0 },
      { month: "2025-04", revenue: 82530, growth_pct: 5.4 },
      { month: "2025-03", revenue: 78320, growth_pct: 6.7 },
      { month: "2025-02", revenue: 73420, growth_pct: 4.2 },
      { month: "2025-01", revenue: 70450, growth_pct: 3.1 },
    ],
  },
  {
    id: "churn",
    label: "Churn rate by contract type",
    sql: `SELECT contract_type,
       ROUND(100.0 *
             SUM(CASE WHEN churned THEN 1 ELSE 0 END) / COUNT(*), 1)
             AS churn_rate
FROM   customers
GROUP  BY contract_type
ORDER  BY churn_rate DESC;`,
    rows: [
      { contract_type: "Month-to-month", churn_rate: 42.7 },
      { contract_type: "One year", churn_rate: 11.2 },
      { contract_type: "Two year", churn_rate: 2.8 },
    ],
  },
];

/* ---------- Component ---------- */

export function AnalyticsPlayground() {
  const [region, setRegion] = useState<Region | "All">("All");
  const [quarter, setQuarter] = useState<0 | 1 | 2 | 3>(0);
  const [queryId, setQueryId] = useState(QUERIES[0].id);

  const trend = useMemo(() => {
    const start = quarter * 3;
    const end = start + 3;
    return MONTHS.slice(start, end).map((m, i) => {
      const idx = start + i;
      const value =
        region === "All"
          ? REGIONS.reduce((acc, r) => acc + salesByRegion[r][idx], 0)
          : salesByRegion[region as Region][idx];
      return { month: m, value };
    });
  }, [region, quarter]);

  const regionData = useMemo(
    () =>
      REGIONS.map((r) => ({
        region: r,
        value: salesByRegion[r].slice(quarter * 3, quarter * 3 + 3).reduce((a, b) => a + b, 0),
      })),
    [quarter],
  );

  const query = QUERIES.find((q) => q.id === queryId)!;

  return (
    <Section
      id="playground"
      eyebrow="Analytics playground"
      title="Poke around. Ask a question."
      description="A small, live sandbox with mock data. Change a filter, run a query, watch the charts follow."
    >
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <ChipGroup
            label="Region"
            icon={<LineIcon className="h-3.5 w-3.5" />}
            options={["All", ...REGIONS] as const}
            value={region}
            onChange={(v) => setRegion(v as Region | "All")}
          />
          <ChipGroup
            label="Quarter"
            icon={<PieIcon className="h-3.5 w-3.5" />}
            options={["Q1", "Q2", "Q3", "Q4"] as const}
            value={`Q${quarter + 1}` as "Q1" | "Q2" | "Q3" | "Q4"}
            onChange={(v) => setQuarter((Number(v.slice(1)) - 1) as 0 | 1 | 2 | 3)}
          />
        </div>

        {/* Charts row */}
        <div className="grid gap-px bg-border/60 md:grid-cols-3">
          <div className="bg-card p-5">
            <ChartHead
              title="Revenue trend"
              hint={`${region === "All" ? "All regions" : region} · Q${quarter + 1}`}
            />
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 10, right: 6, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.65 0.19 260)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.65 0.19 260)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="oklch(1 0 0 / 0.06)" />
                  <XAxis
                    dataKey="month"
                    stroke="oklch(1 0 0 / 0.4)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="oklch(1 0 0 / 0.4)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.185 0.004 285)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "oklch(0.7 0.01 285)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="oklch(0.65 0.19 260)"
                    fill="url(#g1)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card p-5">
            <ChartHead title="Regions" hint={`Q${quarter + 1} totals`} />
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} margin={{ top: 10, right: 6, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="oklch(1 0 0 / 0.06)" />
                  <XAxis
                    dataKey="region"
                    stroke="oklch(1 0 0 / 0.4)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="oklch(1 0 0 / 0.4)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "oklch(1 0 0 / 0.04)" }}
                    contentStyle={{
                      background: "oklch(0.185 0.004 285)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {regionData.map((d, i) => (
                      <Cell
                        key={i}
                        fill={
                          region === "All" || region === d.region
                            ? "oklch(0.65 0.19 260)"
                            : "oklch(1 0 0 / 0.1)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card p-5">
            <ChartHead title="Customer segments" hint="share of revenue" />
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segments}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={44}
                    outerRadius={72}
                    stroke="oklch(0.185 0.004 285)"
                    strokeWidth={2}
                  >
                    {segments.map((s, i) => (
                      <Cell key={i} fill={s.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.185 0.004 285)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {segments.map((s) => (
                <span key={s.name} className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SQL playground */}
        <div className="grid gap-px bg-border/60 lg:grid-cols-[1fr_1fr]">
          <div className="bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Database className="h-4 w-4 text-accent" />
                <span className="font-medium">SQL sandbox</span>
              </div>
              <select
                value={queryId}
                onChange={(e) => setQueryId(e.target.value)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground outline-none focus:border-accent/50"
              >
                {QUERIES.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.label}
                  </option>
                ))}
              </select>
            </div>
            <motion.pre
              key={query.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="overflow-auto rounded-2xl border border-border bg-background/60 p-4 font-mono text-[12.5px] leading-relaxed text-foreground/90"
            >
              <code>{query.sql}</code>
            </motion.pre>
          </div>

          <div className="bg-card p-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-medium">Result</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {query.rows.length} rows · {(Math.random() * 40 + 12).toFixed(0)}ms
              </span>
            </div>
            <motion.div
              key={query.id + "-tbl"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-2xl border border-border"
            >
              <table className="w-full text-left text-sm">
                <thead className="bg-background/60 text-[11px] uppercase tracking-widest text-muted-foreground">
                  <tr>
                    {Object.keys(query.rows[0]).map((k) => (
                      <th key={k} className="px-4 py-2 font-mono font-normal">
                        {k}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {query.rows.map((row, i) => (
                    <tr key={i} className="border-t border-border">
                      {Object.values(row).map((v, j) => (
                        <td key={j} className="px-4 py-2 text-foreground/90">
                          {typeof v === "number" ? v.toLocaleString() : String(v)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ChartHead({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between">
      <p className="text-sm font-medium">{title}</p>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {hint}
      </p>
    </div>
  );
}

function ChipGroup<T extends string>({
  label,
  icon,
  options,
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </span>
      <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full px-2.5 py-1 text-xs transition ${
              value === o
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
