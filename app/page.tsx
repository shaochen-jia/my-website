"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { SplitText } from "./components/SplitText";
import { StackingCards } from "./components/StackingCards";

// ─── data ───────────────────────────────────────────────────────────────────

const skills = [
  {
    category: "Requirements & Analysis",
    items: ["Requirements Elicitation", "User Stories", "Acceptance Criteria", "BPMN", "Wireframing", "Gap Analysis"],
  },
  {
    category: "Testing & Delivery",
    items: ["UAT Planning & Execution", "Defect Tracking", "Agile / Scrum", "Sprint Planning", "SDLC"],
  },
  {
    category: "Data & Automation",
    items: ["SQL", "Power Automate", "Power Apps", "Power BI", "Tableau", "Excel", "Python", "Dynamics 365"],
  },
];

const experience = [
  {
    title: "Instron (ITW Company)",
    subtitle: "Business Analyst Intern",
    period: "Dec 2025 – Feb 2026",
    location: "Shanghai, China",
    tag: "Enterprise",
    bullets: [
      "Identified a critical manual bottleneck in post-sales onboarding and automated the end-to-end workflow using Power Automate, reducing processing time by 93% (5 min → 20 sec) across multiple business units",
      "Defined data migration requirements and authored SQL scripts to cleanse and migrate 500,000+ records across 8 global factories, supporting a zero-disruption ERP rollout",
      "Investigated cross-system billing discrepancies using Power Apps and Excel, documenting root causes and driving resolution to improve order-to-cash accuracy",
      "Facilitated stakeholder workshops to surface and resolve 3 critical delivery bottlenecks, reducing requirement turnaround time",
    ],
  },
  {
    title: "Dome Design Architect",
    subtitle: "Business Analyst — WIL Placement",
    period: "Mar 2025 – Jun 2025",
    location: "Melbourne, Australia",
    tag: "Agile",
    bullets: [
      "Conducted stakeholder interviews and elicited 25+ functional requirements, translating them into structured epics, user stories and acceptance criteria for the development team in Trello",
      "Mapped and redesigned onboarding workflows in Miro, improving cross-team visibility and reducing sprint setup friction",
      "Authored test cases, coordinated tester sessions, and tracked 80+ defects to resolution, achieving zero critical issues at go-live",
    ],
  },
  {
    title: "A Moment With",
    subtitle: "Business Analyst — WIL Placement",
    period: "Dec 2024 – Feb 2025",
    location: "Melbourne, Australia",
    tag: "Product",
    bullets: [
      "Synthesised 200+ user feedback responses to identify top usability pain points, translating findings into prioritised backlog items",
      "Partnered with the product team to define acceptance criteria for 3 key feature enhancements, resulting in a 25% increase in core feature engagement post-release",
      "Owned stakeholder reporting across the full SDLC, presenting risk updates and milestone progress — maintaining 90% satisfaction rating",
    ],
  },
];

const projects = [
  {
    title: "Order Reporting Automation",
    type: "Case Study",
    org: "Instron · ITW Company",
    tags: ["Power Automate", "Dataverse", "Office Script"],
    stats: [{ n: "93%", l: "Time saved" }, { n: "500k+", l: "Records" }, { n: "30s", l: "Per report" }],
    desc: "Automated enterprise order reporting across four related Dataverse tables by encoding complex PK/FK resolution and business logic — removing manual data lookup entirely.",
    href: "/work/order-reporting",
  },
  {
    title: "Data Analytics Simulation",
    type: "Simulation",
    org: "Deloitte Australia · Forage",
    tags: ["Excel", "Tableau", "Data Analysis"],
    stats: [],
    desc: "Analysed operational datasets to classify anomalies and derive business conclusions. Built a Tableau dashboard translating raw data into executive-readable findings.",
    href: null,
  },
  {
    title: "Campus Stress Tracking System",
    type: "Agile Project",
    org: "Monash University",
    tags: ["Jira", "Scrum", "PMBOK 7"],
    stats: [{ n: "4", l: "Sprints" }, { n: "8", l: "Epics" }],
    desc: "Led Agile delivery of a student stress tracking pilot — managing a 4-sprint roadmap with full traceability from user needs to sprint allocation using MoSCoW prioritisation.",
    href: null,
  },
];

// ─── helpers ─────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Reveal style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "64px" }}>
      <span style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
        {children}
      </span>
      <div style={{ flex: 1, height: "1px", background: "#D8D1C5" }} />
    </Reveal>
  );
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "12%"]);

  return (
    <main style={{ position: "relative", zIndex: 10 }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center", gap: "48px",
        padding: "24px 0",
        backdropFilter: "blur(14px)", background: "rgba(245,240,232,0.72)",
      }}>
        {[
          { label: "About", href: "#about" },
          { label: "Skills", href: "#skills" },
          { label: "Work", href: "#work" },
          { label: "Projects", href: "#projects" },
          { label: "Contact", href: "#contact" },
        ].map((l) => (
          <a key={l.label} href={l.href} className="link-line"
            style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
            {l.label}
          </a>
        ))}
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "96px 24px 80px",
      }}>
        <motion.div style={{ opacity: heroOpacity, y: heroY, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "40px" }}
          >
            Business Analyst &nbsp;·&nbsp; Melbourne
          </motion.p>

          <h1 style={{ lineHeight: 0.92, letterSpacing: "-0.03em" }}>
            <SplitText text="Shaochen" className="font-serif"
              style={{ fontSize: "clamp(56px, 10vw, 148px)", display: "block" }}
              delay={0.1} stagger={0.07} by="char" />
            <SplitText text="Jia" className="font-serif"
              style={{ fontSize: "clamp(56px, 10vw, 148px)", color: "var(--ink-soft)", fontStyle: "italic", display: "block" }}
              delay={0.55} stagger={0.07} by="char" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "16px", lineHeight: 1.75, maxWidth: "480px", marginTop: "40px", color: "var(--ink-soft)" }}
          >
            Translating messy enterprise systems into decisions people can act on.
            <br />BA with a bias toward analysis before automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "0", marginTop: "56px" }}
          >
            {[
              { n: "93%", l: "Time reduction" },
              { n: "500k+", l: "Records migrated" },
              { n: "3×", l: "BA placements" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <div style={{ width: "1px", height: "40px", background: "var(--ink-faint)", opacity: 0.3, margin: "0 40px" }} />}
                <div style={{ textAlign: "center" }}>
                  <p className="font-serif" style={{ fontSize: "clamp(24px, 3.5vw, 44px)", lineHeight: 1 }}>{s.n}</p>
                  <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "8px", color: "var(--ink-faint)" }}>{s.l}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          style={{ position: "absolute", bottom: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        >
          <span style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)" }}>Scroll</span>
          <motion.div
            style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--ink-faint), transparent)" }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ overflow: "hidden", padding: "16px 0", borderTop: "1px solid #D8D1C5", borderBottom: "1px solid #D8D1C5" }}>
        <div className="marquee" style={{ display: "flex", gap: "56px", whiteSpace: "nowrap" }}>
          {Array(2).fill(["Power Automate", "BPMN", "SQL", "Agile", "Stakeholder Analysis", "UAT", "Tableau", "Power BI", "Requirements Elicitation", "SDLC"]).flat()
            .map((t, i) => (
              <span key={i} style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-faint)", flexShrink: 0, display: "inline-flex", alignItems: "center", gap: "56px" }}>
                {t}<span style={{ opacity: 0.3 }}>·</span>
              </span>
            ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "120px 80px" }}>
        <SectionLabel>About</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "64px", maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal style={{ gridColumn: "span 5" }}>
            <h2 className="font-serif" style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
              Hi, I&apos;m<br /><em style={{ color: "var(--ink-soft)" }}>Shaochen.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} style={{ gridColumn: "7 / span 6", paddingTop: "8px" }}>
            <p style={{ fontSize: "17px", lineHeight: 1.8, marginBottom: "24px", color: "var(--ink-mid)" }}>
              I&apos;m a business analyst who cares about the work that happens before any tool gets opened.
              Understanding why a process fails, where requirements break down, and what stakeholders actually need — that&apos;s where I spend most of my energy.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.8, marginBottom: "40px", color: "var(--ink-soft)" }}>
              I&apos;ve worked across enterprise ERP rollouts, product teams, and architecture firms — always as the person connecting what the business wants with what can actually be built.
              Currently completing a Master of IT (Cyber Security) at Monash while looking for my next BA role.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
              {[
                { l: "Degree", v: "BIT — Business Information Systems" },
                { l: "WAM", v: "Distinction" },
                { l: "Location", v: "Melbourne, Australia" },
                { l: "Cert", v: "Google Project Management" },
              ].map((f) => (
                <div key={f.l} style={{ padding: "16px 0", borderTop: "1px solid #D8D1C5" }}>
                  <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "4px", color: "var(--ink-faint)" }}>{f.l}</p>
                  <p style={{ fontSize: "13px", color: "var(--ink-mid)" }}>{f.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "112px 80px", background: "var(--bone-dark)" }}>
        <SectionLabel>Skills</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "1200px", margin: "0 auto" }}>
          {skills.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div style={{ padding: "32px", borderRadius: "16px", border: "1px solid #D4CEC4", background: "var(--bone)", height: "100%" }}>
                <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "24px", color: "var(--ink-faint)" }}>0{i + 1}</p>
                <h3 className="font-serif" style={{ fontSize: "20px", letterSpacing: "-0.01em", marginBottom: "24px" }}>{s.category}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {s.items.map((item) => (
                    <span key={item} style={{
                      fontSize: "12px", padding: "6px 14px", borderRadius: "999px",
                      border: "1px solid #D4CEC4", color: "var(--ink-soft)", background: "var(--bone-dark)"
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── WORK EXPERIENCE (stacking cards) ── */}
      <section id="work" style={{ padding: "112px 80px" }}>
        <SectionLabel>Work Experience</SectionLabel>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <StackingCards items={experience} />
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "112px 80px", background: "var(--bone-dark)" }}>
        <SectionLabel>Projects</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "1200px", margin: "0 auto" }}>
          {projects.map((p, i) => {
            const inner = (
              <div className="group" style={{
                padding: "32px", borderRadius: "16px", border: "1px solid #D4CEC4",
                background: "var(--bone)", height: "100%", display: "flex", flexDirection: "column",
                transition: "box-shadow 0.4s ease",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
                  <div>
                    <span style={{
                      fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase",
                      padding: "4px 12px", borderRadius: "999px", border: "1px solid #C8C0B0",
                      color: "var(--ink-faint)", display: "inline-block", marginBottom: "8px"
                    }}>{p.type}</span>
                    <p style={{ fontSize: "12px", color: "var(--ink-faint)" }}>{p.org}</p>
                  </div>
                  {p.href && <span style={{ fontSize: "18px", color: "var(--ink-faint)" }}>↗</span>}
                </div>
                <h3 className="font-serif" style={{ fontSize: "22px", letterSpacing: "-0.015em", lineHeight: 1.1, marginBottom: "16px" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: 1.7, marginBottom: "24px", color: "var(--ink-soft)", flex: 1 }}>{p.desc}</p>
                {p.stats.length > 0 && (
                  <div style={{ display: "flex", gap: "24px", marginBottom: "24px", paddingTop: "16px", borderTop: "1px solid #D4CEC4" }}>
                    {p.stats.map((s) => (
                      <div key={s.l}>
                        <p className="font-serif" style={{ fontSize: "22px" }}>{s.n}</p>
                        <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px", color: "var(--ink-faint)" }}>{s.l}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "999px", background: "var(--bone-dark)", color: "var(--ink-faint)", border: "1px solid #D4CEC4" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
            return (
              <Reveal key={i} delay={i * 0.1}>
                {p.href ? <Link href={p.href} style={{ display: "block", height: "100%" }}>{inner}</Link> : inner}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "144px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "32px" }}>Contact</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif" style={{ fontSize: "clamp(40px, 7vw, 96px)", lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: "40px" }}>
            Let&apos;s talk.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontSize: "16px", lineHeight: 1.75, maxWidth: "420px", marginBottom: "48px", color: "var(--ink-soft)" }}>
            Open to BA roles, graduate programs, and interesting problems. Drop me a line — I reply promptly.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <a href="mailto:kevjia476@gmail.com" className="link-line" style={{
            display: "inline-block", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "16px 32px", borderRadius: "999px", border: "1px solid var(--ink)", color: "var(--ink)",
            transition: "all 0.4s ease",
          }}>
            kevjia476@gmail.com
          </a>
        </Reveal>
        <Reveal delay={0.4}>
          <div style={{ display: "flex", alignItems: "center", gap: "40px", marginTop: "48px" }}>
            <a href="https://www.linkedin.com/in/shaochen-jia-394b04311/" target="_blank" rel="noopener noreferrer" className="link-line"
              style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)" }}>LinkedIn</a>
            <span style={{ color: "var(--ink-faint)", fontSize: "10px" }}>·</span>
            <a href="https://github.com/shaochen-jia" target="_blank" rel="noopener noreferrer" className="link-line"
              style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)" }}>GitHub</a>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "32px 80px", borderTop: "1px solid #D8D1C5",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <p className="font-serif" style={{ fontSize: "18px", color: "var(--ink)" }}>Shaochen Jia</p>
        <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
          © {new Date().getFullYear()} · Melbourne, Australia
        </p>
      </footer>
    </main>
  );
}
