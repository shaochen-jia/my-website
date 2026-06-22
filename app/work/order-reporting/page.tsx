"use client";
import Link from "next/link";
import { motion } from "framer-motion";

// ─── Section config ───────────────────────────────────────────────────────────

const SECTIONS = [
  { id: "overview",      label: "Overview",      color: "#0A0A0A" },
  { id: "problem",       label: "Problem",        color: "#E11D48" },
  { id: "process",       label: "Process",        color: "#8B5CF6" },
  { id: "data-design",   label: "Data Design",    color: "#0EA5E9" },
  { id: "architecture",  label: "Architecture",   color: "#10B981" },
  { id: "governance",    label: "Governance",     color: "#F97316" },
  { id: "results",       label: "Results",        color: "#EAB308" },
  { id: "learnings",     label: "Learnings",      color: "#6366F1" },
];

const TOC_CSS = `
  .toc-wrap {
    position: fixed;
    left: 24px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
  }
  .toc-panel {
    background: #fff;
    border: 3px solid #000;
    padding: 12px 10px;
    border-radius: 8px;
    box-shadow: 4px 4px 0 #000;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .toc-btn {
    position: relative;
    width: 36px;
    height: 44px;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
    margin: -3px;
    transition: transform 300ms ease-out;
    -webkit-tap-highlight-color: transparent;
    outline: none;
  }
  .toc-btn::after {
    position: absolute;
    content: '';
    top: 3px; left: 0;
    width: 36px;
    height: 36px;
    background-color: var(--c);
    border-radius: 6px;
    border: 3px solid #000;
    box-shadow: 3px 3px 0 0 #000;
    pointer-events: none;
    transition: 300ms cubic-bezier(0.175,0.885,0.32,1.275);
  }
  .toc-btn::before {
    position: absolute;
    content: attr(data-label);
    left: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%) translateX(-6px) scale(0.7);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 5px 9px;
    background: #fff;
    color: #000;
    border: 2px solid #000;
    border-radius: 4px;
    box-shadow: 2px 2px 0 #000;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    white-space: nowrap;
    transition: all 280ms cubic-bezier(0.175,0.885,0.32,1.275), opacity 200ms ease;
  }
  .toc-btn:hover {
    transform: scale(1.5) translateX(4px);
    z-index: 99;
  }
  .toc-btn:hover::before {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) translateX(0) scale(1);
  }
  .toc-btn:active::after { transform: translate(2px, 2px); box-shadow: 1px 1px 0 0 #000; }
  .toc-btn:hover + .toc-btn { transform: scale(1.25) translateX(3px); z-index: 9; }
  .toc-btn:hover + .toc-btn + .toc-btn { transform: scale(1.1); }
  .toc-btn:has(+ .toc-btn:hover) { transform: scale(1.25) translateX(3px); z-index: 9; }
  .toc-btn:has(+ .toc-btn + .toc-btn:hover) { transform: scale(1.1); }

  @media (max-width: 768px) { .toc-wrap { display: none; } }
`;

// ─── helpers ─────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ label, color, title }: { label: string; color: string; title: string }) {
  return (
    <Reveal style={{ marginBottom: "56px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, flexShrink: 0 }} />
        <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#AAAAAA" }}>{label}</span>
        <div style={{ flex: 1, height: "1px", background: "#EBEBEB" }} />
      </div>
      <h2 className="font-serif" style={{ fontSize: "clamp(32px, 4.5vw, 60px)", lineHeight: 1, letterSpacing: "-0.025em" }}>{title}</h2>
    </Reveal>
  );
}

// ─── flow step component ──────────────────────────────────────────────────────

function FlowStep({ n, text, accent, last }: { n: number; text: string; accent: string; last?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: accent, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "13px", fontWeight: 600, flexShrink: 0,
        }}>
          {n}
        </div>
        <p style={{ fontSize: "14px", lineHeight: 1.4, marginLeft: "14px", color: "#2A2A2A" }}>{text}</p>
      </div>
      {!last && (
        <div style={{ width: "2px", height: "24px", background: `${accent}40`, margin: "4px 0 4px 15px", alignSelf: "flex-start" }} />
      )}
    </div>
  );
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function CaseStudy() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: TOC_CSS }} />

      {/* ── SIDEBAR TOC ── */}
      <nav className="toc-wrap" aria-label="Page sections">
        <div className="toc-panel">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className="toc-btn"
              style={{ "--c": s.color } as React.CSSProperties}
              data-label={s.label}
              onClick={() => scrollTo(s.id)}
              aria-label={`Go to ${s.label}`}
            />
          ))}
        </div>
      </nav>

      <main style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── TOP NAV ── */}
        <header style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 80px",
          backdropFilter: "blur(16px)", background: "rgba(255,255,255,0.88)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}>
          <Link href="/" style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B6B6B", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            ← Back
          </Link>
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#AAAAAA" }}>Case Study</p>
          <p style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#AAAAAA" }}>Global Enterprise · 2025–2026</p>
        </header>

        {/* ─────────────────────────────────────────────────────────────────────
            01 · OVERVIEW
        ───────────────────────────────────────────────────────────────────── */}
        <section id="overview" style={{ background: "#0A0A0A", color: "#fff", padding: "140px 160px 100px", minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          {/* Ghost text */}
          <div style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-60%)", overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
            <p className="font-serif" style={{ fontSize: "clamp(100px, 18vw, 260px)", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.06)", lineHeight: 1, whiteSpace: "nowrap", marginLeft: "-0.02em" }}>
              Automation
            </p>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* NDA disclaimer */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              style={{ marginBottom: "28px", maxWidth: "680px", padding: "11px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.04)" }}
            >
              <p style={{ fontSize: "10px", lineHeight: 1.7, color: "rgba(255,255,255,0.28)", fontStyle: "italic" }}>
                <span style={{ fontStyle: "normal", color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "9px" }}>NDA Notice</span>
                {" "}— To comply with non-disclosure obligations and protect proprietary intellectual property, all corporate entities, internal ERP architectural schemas, and system identifiers have been generalised and anonymised. The logical methodologies, solution architectures, and performance outcomes remain fully representative of the actual engagement.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "32px" }}
            >
              Business Analyst Intern &nbsp;·&nbsp; Global Fortune 500 Enterprise &nbsp;·&nbsp; Dec 2025 – Feb 2026
            </motion.p>

            <motion.h1
              className="font-serif"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: "clamp(42px, 6.5vw, 92px)", lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: "40px" }}
            >
              Order Reporting<br />
              <em style={{ color: "rgba(255,255,255,0.45)" }}>Automation System</em>
            </motion.h1>

            {/* Big 3 stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ display: "flex", gap: "0", flexWrap: "wrap" }}
            >
              {[
                { n: "93%",   sub: "Time reduction",         color: "#E11D48" },
                { n: "500k+", sub: "Records migrated",       color: "#8B5CF6" },
                { n: "30s",   sub: "Per report",             color: "#10B981" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "stretch" }}>
                  {i > 0 && <div style={{ width: "1px", background: "rgba(255,255,255,0.1)", margin: "0 40px" }} />}
                  <div>
                    <p className="font-serif" style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1, color: s.color }}>{s.n}</p>
                    <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: "8px" }}>{s.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Meta pills */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "48px" }}
            >
              {["Power Automate", "Dataverse", "Office Script", "SQL", "ERP (Dynamics 365)"].map(t => (
                <span key={t} style={{ fontSize: "11px", padding: "5px 12px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>{t}</span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            02 · PROBLEM
        ───────────────────────────────────────────────────────────────────── */}
        <section id="problem" style={{ padding: "120px 160px", background: "#fff" }}>
          <SectionHead label="02 · Problem" color="#E11D48" title={"Knowledge locked\ninside people,\nnot systems."} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
            <Reveal>
              <p style={{ fontSize: "17px", lineHeight: 1.8, color: "#2A2A2A", marginBottom: "24px" }}>
                Generating a single customer order report required staff to manually navigate across multiple related Dataverse tables. Although foreign-key relationships existed in the system, users still had to open each record by hand, trace the relationships, and copy data into Excel one field at a time.
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#6B6B6B" }}>
                The process was slow, inconsistent, and entirely dependent on experienced staff who understood how the underlying data connected. When those staff were unavailable, reporting stopped. The challenge wasn&apos;t generating the report — it was making complex enterprise data understandable without requiring users to understand the database structure themselves.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              {/* Root causes */}
              <div style={{ borderLeft: "3px solid #E11D48", paddingLeft: "28px" }}>
                <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "24px" }}>Root causes identified</p>
                {[
                  { title: "Fragmented data", desc: "Related records spread across 4 Dataverse tables — no unified view." },
                  { title: "Manual FK resolution", desc: "Users had to mentally trace PK/FK links between the master sales table and three transactional sub-tables." },
                  { title: "Undocumented logic", desc: "Business rules (coalesce fallbacks, field mappings, country codes) lived only in experienced staff." },
                  { title: "Repetitive Excel work", desc: "Final report assembly done manually in Excel every single time." },
                ].map((r, i) => (
                  <div key={i} style={{ marginBottom: "20px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "#0A0A0A", marginBottom: "4px" }}>{r.title}</p>
                    <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#6B6B6B" }}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            03 · PROCESS TRANSFORMATION
        ───────────────────────────────────────────────────────────────────── */}
        <section id="process" style={{ padding: "120px 160px", background: "#F5F5F3" }}>
          <SectionHead label="03 · Process" color="#8B5CF6" title="As-Is → To-Be" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            {/* AS-IS */}
            <Reveal>
              <div style={{ background: "#fff", border: "1px solid #E4E0DA", borderRadius: "20px", padding: "36px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E11D48" }} />
                  <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#AAAAAA" }}>As-Is · Manual</p>
                </div>
                {[
                  "Search Dataverse manually",
                  "Open related record",
                  "Navigate another table",
                  "Copy field by field",
                  "Excel assembly",
                  "Customer report",
                ].map((step, i, arr) => (
                  <FlowStep key={i} n={i + 1} text={step} accent="#E11D48" last={i === arr.length - 1} />
                ))}
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #EBEBEB" }}>
                  <p style={{ fontSize: "12px", color: "#AAAAAA" }}>⏱ Avg: <strong style={{ color: "#E11D48" }}>5+ minutes</strong> · Inconsistent output · Knowledge-dependent</p>
                </div>
              </div>
            </Reveal>

            {/* TO-BE */}
            <Reveal delay={0.15}>
              <div style={{ background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: "20px", padding: "36px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#8B5CF6" }} />
                  <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>To-Be · Automated</p>
                </div>
                {[
                  "Order number input",
                  "Power Automate triggered",
                  "Dataverse PK/FK resolved",
                  "Business rules applied",
                  "Office Script formats",
                  "Customer report",
                ].map((step, i, arr) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                      <div style={{
                        width: "32px", height: "32px", borderRadius: "50%",
                        background: i === 0 ? "#8B5CF6" : i === arr.length - 1 ? "#10B981" : "rgba(139,92,246,0.2)",
                        border: "2px solid rgba(139,92,246,0.4)",
                        color: i === 0 || i === arr.length - 1 ? "#fff" : "rgba(139,92,246,0.8)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "13px", fontWeight: 600, flexShrink: 0,
                      }}>{i + 1}</div>
                      <p style={{ fontSize: "14px", lineHeight: 1.4, marginLeft: "14px", color: "rgba(255,255,255,0.75)" }}>{step}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ width: "2px", height: "24px", background: "rgba(139,92,246,0.2)", margin: "4px 0 4px 15px", alignSelf: "flex-start" }} />
                    )}
                  </div>
                ))}
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>⚡ Avg: <strong style={{ color: "#10B981" }}>~30 seconds</strong> · Consistent output · No expertise needed</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Time comparison bar */}
          <Reveal delay={0.2} style={{ marginTop: "40px" }}>
            <div style={{ background: "#fff", border: "1px solid #E4E0DA", borderRadius: "16px", padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "8px" }}>Before</p>
                <p className="font-serif" style={{ fontSize: "36px", color: "#E11D48", lineHeight: 1 }}>5 min</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "100%", height: "6px", borderRadius: "3px", background: "#EBEBEB", overflow: "hidden" }}>
                  <div style={{ width: "93%", height: "100%", background: "linear-gradient(to right, #E11D48, #10B981)", borderRadius: "3px" }} />
                </div>
                <p style={{ fontSize: "11px", color: "#AAAAAA", letterSpacing: "0.1em" }}>93% reduction</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: "8px" }}>After</p>
                <p className="font-serif" style={{ fontSize: "36px", color: "#10B981", lineHeight: 1 }}>~30s</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            04 · DATA RELATIONSHIP DESIGN
        ───────────────────────────────────────────────────────────────────── */}
        <section id="data-design" style={{ padding: "120px 160px", background: "#fff" }}>
          <SectionHead label="04 · Data Design" color="#0EA5E9" title={"Abstracting database\ncomplexity from the user"} />

          <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "60px", alignItems: "start" }}>
            <Reveal>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#2A2A2A", marginBottom: "20px" }}>
                Behind a single order number sat records spread across four Dataverse tables — an Enterprise Master Sales Table plus three Transactional Sub-tables (Shipping, Localisation, and Billing schemas) — connected by PK/FK relationships with multi-table coalesce fallback logic.
              </p>
              <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#6B6B6B", marginBottom: "20px" }}>
                The coalesce resolution order: check the Shipping sub-table first → fall back to the Billing sub-table → fall back to the Master Sales Table. This handles cases where certain fields exist only in specific sub-tables.
              </p>
              <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#6B6B6B" }}>
                Additional encoding: shipping destination (510→USA, 520→UK, etc.), foreign trade name truncation at &quot; for &quot;, and agency vs end-user name fallback.
              </p>
            </Reveal>

            {/* Diagram */}
            <Reveal delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Before */}
                <div style={{ padding: "24px", borderRadius: "16px", border: "1px solid #E4E0DA", background: "#FEF2F2" }}>
                  <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#E11D48", marginBottom: "16px" }}>Manual — before</p>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <div style={{ padding: "10px 20px", borderRadius: "8px", border: "2px solid #E11D48", fontSize: "13px", fontWeight: 500, color: "#E11D48", background: "#fff" }}>Order (Master Sales Table)</div>
                    <p style={{ fontSize: "11px", color: "#AAAAAA" }}>↓ manual navigation for each table ↓</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", width: "100%" }}>
                      {["Shipping Table", "Billing Table", "Localisation Table"].map(t => (
                        <div key={t} style={{ padding: "8px", borderRadius: "6px", border: "1.5px dashed #E11D48", fontSize: "12px", textAlign: "center", color: "#E11D48", background: "#fff" }}>{t}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* After */}
                <div style={{ padding: "24px", borderRadius: "16px", border: "1px solid #0EA5E9", background: "#F0F9FF" }}>
                  <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#0EA5E9", marginBottom: "16px" }}>Automated — after</p>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <div style={{ padding: "10px 20px", borderRadius: "8px", background: "#0EA5E9", fontSize: "13px", fontWeight: 500, color: "#fff" }}>Order Number (input)</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ height: "1px", flex: 1, background: "#0EA5E9", opacity: 0.3 }} />
                      <p style={{ fontSize: "11px", color: "#0EA5E9", whiteSpace: "nowrap" }}>coalesce: Shipping → Billing → Master fallback</p>
                      <div style={{ height: "1px", flex: 1, background: "#0EA5E9", opacity: 0.3 }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", width: "100%" }}>
                      {["Shipping Table", "Billing Table", "Localisation Table"].map(t => (
                        <div key={t} style={{ padding: "8px", borderRadius: "6px", border: "2px solid #0EA5E9", fontSize: "12px", textAlign: "center", color: "#0EA5E9", background: "#fff" }}>{t}</div>
                      ))}
                    </div>
                    <p style={{ fontSize: "11px", color: "#AAAAAA" }}>↓</p>
                    <div style={{ padding: "10px 20px", borderRadius: "8px", background: "#10B981", fontSize: "13px", fontWeight: 500, color: "#fff" }}>Customer Report</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            05 · ARCHITECTURE
        ───────────────────────────────────────────────────────────────────── */}
        <section id="architecture" style={{ padding: "120px 160px", background: "#F5F5F3" }}>
          <SectionHead label="05 · Architecture" color="#10B981" title="Solution Architecture" />

          <Reveal>
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
              {[
                { n: "01", title: "User Input",             desc: "Single order number — the only thing the user ever touches.", color: "#10B981" },
                { n: "02", title: "Relationship Resolution", desc: "Power Automate queries Dataverse using existing PK/FK structure to fetch all related records automatically.", color: "#0EA5E9" },
                { n: "03", title: "Business Rule Application", desc: "Coalesce logic, country code mapping, name truncation, and agency/end-user fallback all encoded in the flow.", color: "#8B5CF6" },
                { n: "04", title: "Data Aggregation",       desc: "Records from all four tables merged into a single unified data structure.", color: "#F97316" },
                { n: "05", title: "Template Instantiation", desc: "Master template copied into a new transaction-specific file — protecting the original.", color: "#E11D48" },
                { n: "06", title: "Frozen Report Output",   desc: "Office Script runs formatting rules, locks the output, and delivers a standalone customer-ready report.", color: "#EAB308" },
              ].map((step, i, arr) => (
                <div key={i} style={{ display: "flex", gap: "24px", alignItems: "stretch" }}>
                  {/* Left: number + connector */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "50%",
                      background: step.color, color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "13px", fontWeight: 700, letterSpacing: "0.02em",
                    }}>
                      {step.n}
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ width: "2px", flex: 1, background: `${step.color}30`, margin: "4px 0" }} />
                    )}
                  </div>
                  {/* Right: content */}
                  <div style={{ paddingBottom: i < arr.length - 1 ? "28px" : 0, paddingTop: "8px", flex: 1 }}>
                    <p style={{ fontSize: "16px", fontWeight: 500, color: "#0A0A0A", marginBottom: "6px" }}>{step.title}</p>
                    <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#6B6B6B" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            06 · GOVERNANCE
        ───────────────────────────────────────────────────────────────────── */}
        <section id="governance" style={{ padding: "120px 160px", background: "#fff" }}>
          <SectionHead label="06 · Governance" color="#F97316" title={"Template isolation\nas a design principle"} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            <Reveal>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#2A2A2A", marginBottom: "20px" }}>
                Rather than writing data directly into a shared master template — which risks corruption or accidental modification — the solution copies the master for each report run, injects data into the copy, runs the Office Script, and freezes the result as a standalone file.
              </p>
              <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#6B6B6B" }}>
                Separating configuration from runtime data is a standard principle in maintainable enterprise systems. It ensures the master template can never be corrupted by an individual report run, and every output is independently auditable.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { label: "Template.xlsx",              sub: "Master — never modified",        bg: "#0A0A0A", fg: "#fff", note: null },
                  { label: "↓ Copy",                     sub: null,                              bg: null,      fg: null,   note: true },
                  { label: "Template_[OrderID].xlsx",    sub: "Transaction instance",            bg: "#F97316", fg: "#fff", note: null },
                  { label: "↓ Inject Data + Run Script", sub: null,                              bg: null,      fg: null,   note: true },
                  { label: "Frozen_[OrderID].xlsx",      sub: "Standalone read-only output",     bg: "#10B981", fg: "#fff", note: null },
                ].map((row, i) =>
                  row.note ? (
                    <p key={i} style={{ fontSize: "12px", color: "#AAAAAA", textAlign: "center", margin: "6px 0" }}>{row.label}</p>
                  ) : (
                    <div key={i} style={{ padding: "14px 20px", borderRadius: "12px", background: row.bg ?? "#F5F5F3", border: row.bg === null ? "1px solid #E4E0DA" : "none" }}>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: row.fg ?? "#0A0A0A" }}>{row.label}</p>
                      {row.sub && <p style={{ fontSize: "11px", color: row.fg ? `${row.fg}AA` : "#AAAAAA", marginTop: "2px" }}>{row.sub}</p>}
                    </div>
                  )
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            07 · RESULTS
        ───────────────────────────────────────────────────────────────────── */}
        <section id="results" style={{ padding: "120px 160px", background: "#0A0A0A", color: "#fff" }}>
          <SectionHead label="07 · Results" color="#EAB308" title="Delivered outcomes" />

          {/* Big stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", marginBottom: "60px" }}>
            {[
              { n: "93%",   label: "Reduction in report generation time",       color: "#E11D48",  sub: "5 min → ~30 sec" },
              { n: "500k+", label: "Historical records across the dataset",      color: "#8B5CF6",  sub: "8 global factories" },
              { n: "~30s",  label: "Average report generation time",             color: "#10B981",  sub: "Down from 5+ minutes" },
              { n: "1",     label: "User action required to generate a report",  color: "#0EA5E9",  sub: "Single order number" },
              { n: "0",     label: "Manual data queries needed",                 color: "#F97316",  sub: "Fully automated lookup" },
              { n: "∞",     label: "Company-wide availability",                  color: "#EAB308",  sub: "No expertise required" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ padding: "40px 32px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "2px" }}>
                  <p className="font-serif" style={{ fontSize: "clamp(40px, 5.5vw, 72px)", lineHeight: 1, color: s.color, marginBottom: "12px" }}>{s.n}</p>
                  <p style={{ fontSize: "13px", lineHeight: 1.5, color: "rgba(255,255,255,0.6)", marginBottom: "8px" }}>{s.label}</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Deliverables */}
          <Reveal>
            <p style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "24px" }}>Deliverables</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
              {[
                "Business problem analysis",
                "As-Is & To-Be mapping",
                "Root cause analysis",
                "Data relationship design",
                "Solution architecture",
                "Power Automate workflow",
                "Governance design",
                "Office Script + Excel output",
              ].map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                    <svg width="8" height="7" viewBox="0 0 8 7" fill="none"><path d="M1 3.5L3 5.5L7 1" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────
            08 · LEARNINGS
        ───────────────────────────────────────────────────────────────────── */}
        <section id="learnings" style={{ padding: "120px 160px", background: "#F5F5F3" }}>
          <SectionHead label="08 · Learnings" color="#6366F1" title="Key takeaways" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", maxWidth: "900px" }}>
            {[
              { n: "01", title: "Analysis before automation", body: "The right process came from understanding why the manual process existed and what it was trying to achieve — not from jumping to a technical solution." },
              { n: "02", title: "Remove decisions, not just clicks", body: "The best automation shifts cognitive burden from the user to the system. Users no longer needed to understand how the data connected." },
              { n: "03", title: "Reliable data, reliable output", body: "Correctly resolving PK/FK relationships across all four tables was the foundational design decision. Everything downstream depended on it." },
              { n: "04", title: "Maintainability over complexity", body: "Separating the template from runtime data was a deliberate governance choice that makes the system auditable, recoverable, and safe to iterate on." },
            ].map((l, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: "32px", borderRadius: "16px", border: "1px solid #E4E0DA", background: "#fff" }}>
                  <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6366F1", marginBottom: "14px" }}>{l.n}</p>
                  <h4 className="font-serif" style={{ fontSize: "20px", letterSpacing: "-0.01em", marginBottom: "12px" }}>{l.title}</h4>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#6B6B6B" }}>{l.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ padding: "40px 160px", borderTop: "1px solid #EBEBEB", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff" }}>
          <Link href="/" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", color: "#0A0A0A", textDecoration: "none" }}>Shaochen Jia</Link>
          <div style={{ display: "flex", gap: "32px" }}>
            <a href="mailto:kevjia476@gmail.com" style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B6B6B", textDecoration: "none" }}>Email</a>
            <a href="https://www.linkedin.com/in/shaochen-jia-394b04311/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B6B6B", textDecoration: "none" }}>LinkedIn</a>
            <a href="https://github.com/shaochen-jia" target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B6B6B", textDecoration: "none" }}>GitHub</a>
          </div>
        </footer>

      </main>
    </>
  );
}
