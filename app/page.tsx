"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { SplitText } from "./components/SplitText";
import { SkillCard } from "./components/SkillCard";
import { MapWidget } from "./components/MapWidget";

// ─── data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  {
    num: "01", category: "Analysis & Design",
    tools: ["Figma", "Miro", "Jira", "Confluence", "Trello", "Notion"],
  },
  {
    num: "02", category: "Delivery & Testing",
    tools: ["Jira", "Azure DevOps", "Excel", "Trello", "Confluence"],
  },
  {
    num: "03", category: "Data & Automation",
    tools: ["SQL", "Python", "Power Automate", "Power BI", "Power Apps", "Tableau", "Excel", "Dynamics 365"],
  },
];

const PROJECTS = [
  {
    title: "Order Reporting Automation", type: "Case Study", org: "Instron · ITW Company",
    tags: ["Power Automate", "Dataverse", "Office Script"],
    stats: [{ n: "93%", l: "Time saved" }, { n: "500k+", l: "Records" }, { n: "30s", l: "Per report" }],
    desc: "Automated enterprise order reporting across four related Dataverse tables — encoding complex PK/FK resolution and business logic to remove manual data lookup entirely.",
    href: "/work/order-reporting",
  },
  {
    title: "Personal Portfolio Website", type: "Personal Project", org: "jiashaochen.com",
    tags: ["Next.js 16", "Framer Motion", "Tailwind v4", "TypeScript"],
    stats: [{ n: "3D", l: "CSS tilt cards" }, { n: "2", l: "City pins" }],
    desc: "Designed and built this portfolio from scratch — editorial typography, staggered Framer Motion animations, CSS-only 3D tilt skill cards, interactive Asia-Pacific map, and scroll-stacking cards. Deployed on Vercel.",
    href: null,
  },
  {
    title: "Campus Stress Tracking System", type: "Agile Project", org: "Monash University",
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
      <div style={{ flex: 1, height: "1px", background: "#E4E0DA" }} />
    </Reveal>
  );
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "12%"]);

  return (
    <main style={{ position: "relative", zIndex: 10 }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center", gap: "48px",
        padding: "22px 0",
        backdropFilter: "blur(16px)", background: "rgba(255,255,255,0.78)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}>
        {[["About","#about"],["Skills","#skills"],["Projects","#projects"],["Contact","#contact"]].map(([l,h]) => (
          <a key={l} href={h} className="link-line"
            style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
            {l}
          </a>
        ))}
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "96px 24px 80px", position: "relative",
      }}>
        <motion.div style={{ opacity: heroOpacity, y: heroY, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
            style={{ fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "40px" }}
          >
            Business Analyst &nbsp;·&nbsp; Melbourne
          </motion.p>

          <h1 style={{ lineHeight: 0.92, letterSpacing: "-0.03em" }}>
            <SplitText text="Shaochen" className="font-serif"
              style={{ fontSize: "clamp(56px,10vw,148px)", display: "block" }}
              delay={0.1} stagger={0.07} by="char" />
            <SplitText text="Jia" className="font-serif"
              style={{ fontSize: "clamp(56px,10vw,148px)", color: "var(--ink-soft)", fontStyle: "italic", display: "block" }}
              delay={0.55} stagger={0.07} by="char" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16,1,0.3,1] }}
            style={{ fontSize: "16px", lineHeight: 1.75, maxWidth: "480px", marginTop: "40px", color: "var(--ink-soft)" }}
          >
            Translating messy enterprise systems into decisions people can act on.
            <br />BA with a bias toward analysis before automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16,1,0.3,1] }}
            style={{ display: "flex", alignItems: "center", marginTop: "56px" }}
          >
            {[{ n: "93%", l: "Time reduction" }, { n: "500k+", l: "Records migrated" }, { n: "3×", l: "BA placements" }].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <div style={{ width: "1px", height: "40px", background: "var(--ink-faint)", opacity: 0.35, margin: "0 36px" }} />}
                <div style={{ textAlign: "center" }}>
                  <p className="font-serif" style={{ fontSize: "clamp(24px,3.5vw,44px)", lineHeight: 1 }}>{s.n}</p>
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
      <div style={{ overflow: "hidden", padding: "14px 0", borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB" }}>
        <div className="marquee" style={{ display: "flex", gap: "56px", whiteSpace: "nowrap" }}>
          {Array(2).fill(["Power Automate","BPMN","SQL","Agile","Stakeholder Analysis","Figma","Tableau","Power BI","Requirements Elicitation","SDLC"]).flat()
            .map((t, i) => (
              <span key={i} style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#BBBBBB", flexShrink: 0, display: "inline-flex", alignItems: "center", gap: "56px" }}>
                {t}<span style={{ opacity: 0.35 }}>·</span>
              </span>
            ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "120px 80px" }}>
        <SectionLabel>About</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", maxWidth: "1200px", margin: "0 auto", alignItems: "start" }}>

          {/* Left: name + map */}
          <div>
            <Reveal>
              <h2 className="font-serif" style={{ fontSize: "clamp(40px,6vw,80px)", lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: "40px" }}>
                Hi, I&apos;m<br /><em style={{ color: "var(--ink-soft)" }}>Shaochen.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <MapWidget />
            </Reveal>
          </div>

          {/* Right: bio + facts */}
          <Reveal delay={0.15} style={{ paddingTop: "8px" }}>
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
                { l: "Degree",   v: "Monash University — Bachelor of Information Technology (Business Information Systems)" },
                { l: "WAM",      v: "Distinction" },
                { l: "Location", v: "Melbourne, Australia" },
                { l: "Cert",     v: "Google Project Management" },
              ].map(f => (
                <div key={f.l} style={{ padding: "14px 0", borderTop: "1px solid #EBEBEB" }}>
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
          {SKILLS.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <SkillCard idx={i} num={s.num} category={s.category} tools={s.tools} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "112px 80px" }}>
        <SectionLabel>Projects</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", maxWidth: "1200px", margin: "0 auto" }}>
          {PROJECTS.map((p, i) => {
            const inner = (
              <div style={{
                padding: "32px", borderRadius: "20px", border: "1px solid #E4E0DA",
                background: "#ffffff", height: "100%", display: "flex", flexDirection: "column",
                transition: "box-shadow 0.4s ease, transform 0.4s ease",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)"; el.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "none"; el.style.transform = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
                  <div>
                    <span style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "999px", border: "1px solid #E0DADA", color: "var(--ink-faint)", display: "inline-block", marginBottom: "8px" }}>{p.type}</span>
                    <p style={{ fontSize: "12px", color: "var(--ink-faint)" }}>{p.org}</p>
                  </div>
                  {p.href && <span style={{ fontSize: "16px", color: "var(--ink-faint)" }}>↗</span>}
                </div>
                <h3 className="font-serif" style={{ fontSize: "22px", letterSpacing: "-0.015em", lineHeight: 1.1, marginBottom: "14px" }}>{p.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.7, marginBottom: "24px", color: "var(--ink-soft)", flex: 1 }}>{p.desc}</p>
                {p.stats.length > 0 && (
                  <div style={{ display: "flex", gap: "24px", marginBottom: "20px", paddingTop: "16px", borderTop: "1px solid #EBEBEB" }}>
                    {p.stats.map(s => (
                      <div key={s.l}>
                        <p className="font-serif" style={{ fontSize: "22px" }}>{s.n}</p>
                        <p style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px", color: "var(--ink-faint)" }}>{s.l}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "999px", background: "#F5F5F3", color: "var(--ink-faint)", border: "1px solid #E4E0DA" }}>{t}</span>
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
      <section id="contact" style={{ padding: "144px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", background: "var(--bone-dark)" }}>
        <Reveal><p style={{ fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: "32px" }}>Contact</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif" style={{ fontSize: "clamp(40px,7vw,96px)", lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: "40px" }}>Let&apos;s talk.</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontSize: "16px", lineHeight: 1.75, maxWidth: "420px", marginBottom: "48px", color: "var(--ink-soft)" }}>
            Open to BA roles, graduate programs, and interesting problems. Drop me a line — I reply promptly.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <a href="mailto:kevjia476@gmail.com" style={{
            display: "inline-block", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "16px 32px", borderRadius: "999px", border: "1px solid var(--ink)", color: "var(--ink)",
            transition: "all 0.4s ease", textDecoration: "none",
          }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = "var(--ink)"; el.style.color = "#fff"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "var(--ink)"; }}
          >
            kevjia476@gmail.com
          </a>
        </Reveal>
        <Reveal delay={0.4}>
          <div style={{ display: "flex", alignItems: "center", gap: "40px", marginTop: "48px" }}>
            <a href="https://www.linkedin.com/in/shaochen-jia-394b04311/" target="_blank" rel="noopener noreferrer" className="link-line" style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)" }}>LinkedIn</a>
            <span style={{ color: "var(--ink-faint)", fontSize: "10px" }}>·</span>
            <a href="https://github.com/shaochen-jia" target="_blank" rel="noopener noreferrer" className="link-line" style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)" }}>GitHub</a>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "28px 80px", borderTop: "1px solid #EBEBEB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p className="font-serif" style={{ fontSize: "18px" }}>Shaochen Jia</p>
        <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-faint)" }}>© {new Date().getFullYear()} · Melbourne, Australia</p>
      </footer>
    </main>
  );
}
