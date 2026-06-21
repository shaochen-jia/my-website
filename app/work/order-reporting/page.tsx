"use client";
import { useEffect } from "react";
import Link from "next/link";

const flow = {
  before: ["Search Dataverse manually", "Open related record", "Navigate another table", "Copy field by field", "Excel assembly", "Customer report"],
  after: ["Order number input", "Power Automate triggered", "Dataverse PK/FK resolved", "Business rules applied", "Office Script formats", "Customer report"],
};

const stats = [
  { n: "500k+", label: "Historical records across dataset" },
  { n: "93%", label: "Reduction in generation time" },
  { n: "~30s", label: "Average report generation" },
  { n: "1", label: "User action required" },
  { n: "0", label: "Manual data queries" },
];

const arch = [
  "User Input (Order Number)",
  "Relationship Resolution (PK/FK)",
  "Business Rule Application",
  "Data Aggregation",
  "Template Instantiation",
  "Frozen Customer Report",
];

const deliverables = [
  "Business problem analysis",
  "As-Is and To-Be process mapping",
  "Root cause analysis",
  "Data relationship design",
  "Solution architecture",
  "Automation workflow (Power Automate)",
  "Governance design",
  "Reporting output (Office Script + Excel)",
];

export default function CaseStudy() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-scale").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="relative z-10">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6" style={{ backdropFilter: "blur(12px)", background: "rgba(245,240,232,0.75)" }}>
        <Link href="/" className="link-line text-[12px] tracking-[0.15em] uppercase flex items-center gap-2" style={{ color: "var(--ink-soft)" }}>
          <span>←</span> Back
        </Link>
        <span className="font-serif text-[14px]" style={{ color: "var(--ink-faint)" }}>Case Study</span>
      </nav>

      {/* HERO */}
      <section className="min-h-[80vh] flex flex-col justify-end px-8 md:px-16 pb-24 pt-36 relative overflow-hidden">
        {/* Ghost text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
          <p className="font-serif whitespace-nowrap leading-none" style={{ fontSize: "clamp(80px, 13vw, 200px)", color: "transparent", WebkitTextStroke: "1px #D4CEC4", opacity: 0.45, marginLeft: "-0.02em" }}>
            Automation
          </p>
        </div>

        <div className="max-w-5xl">
          <p className="reveal text-[11px] tracking-[0.25em] uppercase mb-6" style={{ color: "var(--ink-faint)" }}>
            2024 · Business Analysis · Power Platform
          </p>
          <h1 className="reveal font-serif delay-1" style={{ fontSize: "clamp(40px, 6.5vw, 96px)", lineHeight: 0.93, letterSpacing: "-0.025em" }}>
            Order Reporting<br />
            <em style={{ color: "var(--ink-soft)" }}>Automation System</em>
          </h1>
          <p className="reveal delay-3 text-[16px] leading-relaxed max-w-xl mt-8" style={{ color: "var(--ink-soft)" }}>
            A six-week internship project that automated enterprise order reporting across four related Dataverse tables, encoding complex business logic and abstracting PK/FK relationships away from end users.
          </p>

          {/* Meta row */}
          <div className="reveal delay-4 flex flex-wrap gap-8 mt-12">
            {[
              { label: "Role", value: "Business Analyst Intern" },
              { label: "Duration", value: "Six-week internship project" },
              { label: "Team", value: "Commercial Sales" },
              { label: "Stack", value: "Power Automate · Dataverse · Office Script" },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--ink-faint)" }}>{m.label}</p>
                <p className="text-[13px]" style={{ color: "var(--ink-mid)" }}>{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <div className="px-8 md:px-16 py-16 border-y" style={{ borderColor: "#D8D1C5", background: "var(--bone-dark)" }}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((s, i) => (
            <div key={i} className={`reveal delay-${i + 1}`}>
              <p className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1 }}>{s.n}</p>
              <p className="text-[11px] tracking-[0.1em] uppercase mt-2 leading-snug" style={{ color: "var(--ink-soft)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <section className="px-8 md:px-16 py-28">
        <SectionLabel index="01" title="The Problem" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mt-16">
          <div className="md:col-span-5 reveal-left">
            <h2 className="font-serif mb-6" style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
              Knowledge locked<br />inside people,<br /><em style={{ color: "var(--ink-soft)" }}>not systems.</em>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 reveal delay-2 pt-1">
            <p className="text-[16px] leading-[1.8] mb-6" style={{ color: "var(--ink-mid)" }}>
              Generating a single customer report required users to manually search across multiple related Dataverse tables. Although FK relationships existed, users had to open each record, navigate between tables, and copy data by hand.
            </p>
            <p className="text-[15px] leading-[1.8]" style={{ color: "var(--ink-soft)" }}>
              The result: a process slow, inconsistent, and entirely dependent on experienced staff who understood how the underlying data connected. The challenge wasn&apos;t generating a report — it was making complex enterprise data understandable without requiring users to understand the database structure.
            </p>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER FLOW */}
      <section className="px-8 md:px-16 py-20" style={{ background: "var(--bone-dark)" }}>
        <SectionLabel index="02" title="Process Transformation" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Before */}
          <div className="reveal reveal-scale">
            <p className="text-[11px] tracking-[0.2em] uppercase mb-8" style={{ color: "var(--ink-faint)" }}>As-Is · Manual</p>
            <div className="space-y-3">
              {flow.before.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center shrink-0 pt-1">
                    <div className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]" style={{ borderColor: "#C8C0B0", color: "var(--ink-faint)" }}>
                      {i + 1}
                    </div>
                    {i < flow.before.length - 1 && <div className="w-px flex-1 mt-1" style={{ height: "24px", background: "#D4CEC4" }} />}
                  </div>
                  <p className="text-[14px] pb-4" style={{ color: i === flow.before.length - 1 ? "var(--ink)" : "var(--ink-soft)" }}>{step}</p>
                </div>
              ))}
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid #D4CEC4" }}>
                <p className="text-[12px]" style={{ color: "var(--ink-faint)" }}>Avg time: several minutes · Inconsistent output</p>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="reveal reveal-scale delay-3">
            <p className="text-[11px] tracking-[0.2em] uppercase mb-8" style={{ color: "var(--ink-faint)" }}>To-Be · Automated</p>
            <div className="space-y-3">
              {flow.after.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center shrink-0 pt-1">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: "var(--ink)", color: "var(--bone)" }}>
                      {i + 1}
                    </div>
                    {i < flow.after.length - 1 && <div className="w-px mt-1" style={{ height: "24px", background: "var(--ink)", opacity: 0.15 }} />}
                  </div>
                  <p className="text-[14px] pb-4" style={{ color: i === flow.after.length - 1 ? "var(--ink)" : "var(--ink-soft)" }}>{step}</p>
                </div>
              ))}
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid #D4CEC4" }}>
                <p className="text-[12px]" style={{ color: "var(--ink)" }}>Avg time: ~30 seconds · Consistent, standardised</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DATA RELATIONSHIP */}
      <section className="px-8 md:px-16 py-28">
        <SectionLabel index="03" title="Data Relationship Design" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mt-16 items-start">
          <div className="md:col-span-5 reveal">
            <h3 className="font-serif mb-6" style={{ fontSize: "clamp(22px, 3vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Abstracting database<br />complexity<br /><em style={{ color: "var(--ink-soft)" }}>from the user</em>
            </h3>
            <p className="text-[15px] leading-[1.8]" style={{ color: "var(--ink-soft)" }}>
              Behind a single order number sat multiple related records across four Dataverse tables — Compass (master) plus three sub-tables (5X0, 580, 280) — connected by PK/FK relationships with multi-table coalesce logic for fallback resolution.
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7 reveal delay-3">
            {/* Diagram */}
            <div className="rounded-2xl p-8 border space-y-4" style={{ background: "var(--bone-dark)", borderColor: "#D4CEC4" }}>
              {/* Before */}
              <p className="text-[10px] tracking-[0.2em] uppercase mb-6" style={{ color: "var(--ink-faint)" }}>Manual resolution</p>
              <div className="flex flex-col gap-2">
                <div className="rounded-lg px-4 py-3 text-[13px] text-center border" style={{ borderColor: "#C8C0B0", color: "var(--ink)" }}>Order (Compass)</div>
                <div className="text-center text-[11px]" style={{ color: "var(--ink-faint)" }}>↓ manual navigation ↓</div>
                <div className="grid grid-cols-3 gap-2">
                  {["5X0 Table", "580 Table", "280 Table"].map((t) => (
                    <div key={t} className="rounded-lg px-3 py-3 text-[12px] text-center border" style={{ borderColor: "#C8C0B0", color: "var(--ink-soft)" }}>{t}</div>
                  ))}
                </div>
              </div>

              <div className="h-px my-6" style={{ background: "#D4CEC4" }} />

              {/* After */}
              <p className="text-[10px] tracking-[0.2em] uppercase mb-6" style={{ color: "var(--ink-faint)" }}>Automated resolution</p>
              <div className="flex flex-col gap-2">
                <div className="rounded-lg px-4 py-3 text-[13px] text-center" style={{ background: "var(--ink)", color: "var(--bone)" }}>Order Number (single input)</div>
                <div className="text-center text-[11px]" style={{ color: "var(--ink-faint)" }}>↓ coalesce logic: 580 → 280 → Compass fallback ↓</div>
                <div className="grid grid-cols-3 gap-2">
                  {["5X0 Table", "580 Table", "280 Table"].map((t) => (
                    <div key={t} className="rounded-lg px-3 py-3 text-[12px] text-center border" style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>{t}</div>
                  ))}
                </div>
                <div className="text-center text-[11px]" style={{ color: "var(--ink-faint)" }}>↓</div>
                <div className="rounded-lg px-4 py-3 text-[13px] text-center border" style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>Customer Report</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="px-8 md:px-16 py-24" style={{ background: "var(--bone-dark)" }}>
        <SectionLabel index="04" title="Solution Architecture" />
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="space-y-0">
            {arch.map((step, i) => (
              <div key={i} className={`reveal delay-${i + 1} flex items-stretch gap-6`}>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[11px] shrink-0" style={{ borderColor: i === 0 || i === arch.length - 1 ? "var(--ink)" : "#C8C0B0", background: i === 0 ? "var(--ink)" : "transparent", color: i === 0 ? "var(--bone)" : "var(--ink-soft)" }}>
                    {i + 1}
                  </div>
                  {i < arch.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: "#D4CEC4", minHeight: "32px" }} />
                  )}
                </div>
                <p className="text-[15px] py-2" style={{ color: i === 0 || i === arch.length - 1 ? "var(--ink)" : "var(--ink-soft)", paddingBottom: i < arch.length - 1 ? "16px" : "0" }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOVERNANCE */}
      <section className="px-8 md:px-16 py-28">
        <SectionLabel index="05" title="Governance Design" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mt-16 items-center">
          <div className="md:col-span-5 reveal">
            <h3 className="font-serif mb-6" style={{ fontSize: "clamp(22px, 3vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Template isolation<br /><em style={{ color: "var(--ink-soft)" }}>as a design principle</em>
            </h3>
            <p className="text-[15px] leading-[1.8]" style={{ color: "var(--ink-soft)" }}>
              Rather than writing data into a shared template (which risks corruption), the solution copies a master template for each report run, injects data into the copy, runs the Office Script, and freezes the result as a standalone file. Configuration and runtime data are deliberately kept separate — a common principle in maintainable enterprise systems.
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7 reveal delay-3">
            <div className="rounded-2xl p-8 border space-y-3" style={{ background: "var(--bone-dark)", borderColor: "#D4CEC4" }}>
              {[
                { label: "Template.xlsx", note: "Master template — never modified" },
                { label: "Copy", arrow: true },
                { label: "Template_[OrderID].xlsx", note: "Transaction instance" },
                { label: "Inject Data + Office Script", arrow: true },
                { label: "Frozen Report Output", note: "Standalone, read-only" },
              ].map((row, i) =>
                row.arrow ? (
                  <div key={i} className="text-center text-[13px] py-1" style={{ color: "var(--ink-faint)" }}>↓</div>
                ) : (
                  <div key={i} className="rounded-xl px-5 py-4 border" style={{ borderColor: i === 0 ? "var(--ink)" : i === 4 ? "var(--ink)" : "#C8C0B0", background: i === 0 || i === 4 ? "var(--ink)" : "transparent" }}>
                    <p className="text-[13px] font-medium" style={{ color: i === 0 || i === 4 ? "var(--bone)" : "var(--ink)" }}>{row.label}</p>
                    {row.note && <p className="text-[11px] mt-1" style={{ color: i === 0 || i === 4 ? "rgba(245,240,232,0.6)" : "var(--ink-faint)" }}>{row.note}</p>}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LEARNINGS */}
      <section className="px-8 md:px-16 py-24" style={{ background: "var(--bone-dark)" }}>
        <SectionLabel index="06" title="Key Learnings" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl">
          {[
            { title: "Analysis before automation", body: "Understanding the process mattered more than understanding the tool. Every automation decision came after the analysis work was complete." },
            { title: "Remove decisions, not just clicks", body: "The best automation abstracts complexity. Users no longer needed to understand how the data connected — the system handled it." },
            { title: "Reliable relationships, reliable output", body: "Correctly resolving PK/FK relationships across four tables was the foundation. Trustworthy outputs depend on trustworthy data design." },
            { title: "Maintainability over complexity", body: "Separating the template from runtime data was a deliberate governance choice. A simpler, maintainable solution creates more long-term value." },
          ].map((l, i) => (
            <div key={i} className={`reveal reveal-scale delay-${i + 1} p-7 rounded-2xl border`} style={{ background: "var(--bone)", borderColor: "#D4CEC4" }}>
              <p className="text-[11px] tracking-[0.15em] uppercase mb-4" style={{ color: "var(--ink-faint)" }}>0{i + 1}</p>
              <h4 className="font-serif mb-3" style={{ fontSize: "20px", letterSpacing: "-0.01em" }}>{l.title}</h4>
              <p className="text-[14px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>{l.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="px-8 md:px-16 py-24">
        <SectionLabel index="07" title="Deliverables" />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
          {deliverables.map((d, i) => (
            <div key={i} className={`reveal delay-${i % 4 + 1} flex items-center gap-4`}>
              <div className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[14px]" style={{ color: "var(--ink-mid)" }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8" style={{ borderTop: "1px solid #D8D1C5", background: "var(--bone-dark)" }}>
        <div>
          <Link href="/" className="font-serif text-[22px] link-line" style={{ color: "var(--ink)" }}>Shaochen Jia</Link>
          <p className="text-[12px] mt-1" style={{ color: "var(--ink-faint)" }}>Business Analyst · Melbourne</p>
        </div>
        <div className="flex flex-wrap gap-8">
          <a href="mailto:kevjia476@gmail.com" className="link-line text-[12px] tracking-[0.08em] uppercase" style={{ color: "var(--ink-soft)" }}>Email</a>
          <a href="https://www.linkedin.com/in/shaochen-jia-394b04311/" target="_blank" rel="noopener noreferrer" className="link-line text-[12px] tracking-[0.08em] uppercase" style={{ color: "var(--ink-soft)" }}>LinkedIn</a>
          <a href="https://github.com/shaochen-jia" target="_blank" rel="noopener noreferrer" className="link-line text-[12px] tracking-[0.08em] uppercase" style={{ color: "var(--ink-soft)" }}>GitHub</a>
        </div>
      </footer>
    </main>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="reveal flex items-center gap-6 mb-2">
      <span className="text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--ink-faint)" }}>{index}</span>
      <span className="text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--ink-faint)" }}>{title}</span>
      <div className="flex-1 h-px" style={{ background: "#D8D1C5" }} />
    </div>
  );
}
