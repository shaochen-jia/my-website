"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-scale").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="relative z-10">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6" style={{ backdropFilter: "blur(12px)", background: "rgba(245,240,232,0.7)" }}>
        <span className="font-serif text-[15px] tracking-tight" style={{ color: "var(--ink)" }}>SJ</span>
        <div className="flex items-center gap-8">
          {["work", "about"].map((s) => (
            <a key={s} href={`#${s}`} className="link-line text-[13px] tracking-[0.08em] uppercase" style={{ color: "var(--ink-soft)" }}>{s}</a>
          ))}
          <a href="mailto:kevjia476@gmail.com" className="link-line text-[13px] tracking-[0.08em] uppercase" style={{ color: "var(--ink-soft)" }}>Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end px-8 md:px-16 pb-20 pt-36">
        {/* Ghost background word */}
        <div className="absolute top-1/2 left-0 -translate-y-[55%] select-none pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
          <p className="font-serif whitespace-nowrap leading-none" style={{ fontSize: "clamp(100px, 16vw, 260px)", color: "transparent", WebkitTextStroke: "1px #D4CEC4", opacity: 0.5, marginLeft: "-0.03em" }}>
            Analyst
          </p>
        </div>

        <div className="max-w-5xl ml-auto w-full">
          <p className="reveal text-[12px] tracking-[0.22em] uppercase mb-8" style={{ color: "var(--ink-faint)" }}>
            Shaochen Jia &nbsp;·&nbsp; Business Analyst
          </p>

          <h1 className="reveal font-serif delay-1" style={{ fontSize: "clamp(44px, 7vw, 112px)", lineHeight: 0.93, letterSpacing: "-0.025em" }}>
            Turning complex<br />
            <em style={{ color: "var(--ink-soft)" }}>enterprise data</em><br />
            into clear decisions.
          </h1>

          {/* Stats row */}
          <div className="reveal delay-3 mt-14 flex items-start gap-12 flex-wrap">
            {[
              { n: "93", unit: "%", label: "Time reduction" },
              { n: "500", unit: "k+", label: "Records automated" },
              { n: "30", unit: "s", label: "Per report" },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-12">
                {i > 0 && <div className="w-px h-14 self-center opacity-30" style={{ background: "var(--ink-faint)" }} />}
                <div>
                  <p className="font-serif" style={{ fontSize: "clamp(28px, 4.5vw, 64px)", lineHeight: 1 }}>
                    {s.n}<span style={{ fontSize: "0.5em", color: "var(--ink-faint)" }}>{s.unit}</span>
                  </p>
                  <p className="text-[11px] tracking-[0.12em] uppercase mt-2" style={{ color: "var(--ink-soft)" }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-8 flex flex-col items-start gap-2 reveal delay-7">
          <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--ink-faint)" }}>Scroll</span>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--ink-faint), transparent)" }} />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative overflow-hidden py-4 border-y" style={{ borderColor: "#D8D1C5" }}>
        <div className="marquee flex gap-16 whitespace-nowrap">
          {Array(2).fill(["Power Automate", "Dataverse", "Office Script", "Process Mapping", "Data Relationship Design", "Business Analysis", "Automation Architecture", "Governance Design"]).flat().map((t, i) => (
            <span key={i} className="text-[12px] tracking-[0.18em] uppercase shrink-0 flex items-center gap-16" style={{ color: "var(--ink-faint)" }}>
              {t}<span style={{ opacity: 0.35 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* WORK */}
      <section id="work" className="relative px-8 md:px-16 py-32">
        <div className="reveal flex items-center gap-6 mb-20">
          <span className="text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--ink-faint)" }}>Selected Work</span>
          <div className="flex-1 h-px" style={{ background: "#D8D1C5" }} />
          <span className="text-[11px] font-serif" style={{ color: "var(--ink-faint)" }}>01</span>
        </div>

        <Link href="/work/order-reporting" className="group block">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Big number */}
            <div className="md:col-span-1 reveal-left hidden md:block">
              <p className="font-serif" style={{ fontSize: "clamp(64px, 9vw, 128px)", lineHeight: 1, color: "transparent", WebkitTextStroke: "1px #C8C0B0" }}>01</p>
            </div>

            {/* Info */}
            <div className="md:col-span-6 md:col-start-2 reveal delay-2">
              <p className="text-[11px] tracking-[0.2em] uppercase mb-5" style={{ color: "var(--ink-faint)" }}>
                2024 · Business Analysis · Automation
              </p>
              <h2 className="font-serif mb-6 group-hover:opacity-60 transition-opacity duration-500" style={{ fontSize: "clamp(30px, 4.5vw, 64px)", lineHeight: 0.95, letterSpacing: "-0.025em" }}>
                Order Reporting<br />Automation System
              </h2>
              <p className="text-[15px] leading-relaxed max-w-md" style={{ color: "var(--ink-soft)" }}>
                Redesigned an enterprise reporting workflow across four Dataverse tables — reducing generation time by 93% through automated PK/FK resolution and standardised business rules.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <span className="text-[11px] tracking-[0.12em] uppercase py-1 px-4 rounded-full border" style={{ borderColor: "#C8C0B0", color: "var(--ink-soft)" }}>
                  Case Study
                </span>
                <span className="text-[18px] group-hover:translate-x-2 transition-transform duration-300" style={{ color: "var(--ink-faint)" }}>→</span>
              </div>
            </div>

            {/* Stat card */}
            <div className="md:col-span-4 md:col-start-9 reveal-scale delay-4">
              <div className="p-8 rounded-2xl border transition-all duration-500 group-hover:shadow-lg relative overflow-hidden" style={{ background: "var(--bone-dark)", borderColor: "#D4CEC4" }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "linear-gradient(135deg, #E8E2D5 0%, #F0EBE0 100%)" }} />
                <div className="relative">
                  <p className="font-serif" style={{ fontSize: "64px", lineHeight: 1 }}>93%</p>
                  <p className="text-[11px] tracking-[0.12em] uppercase mt-2" style={{ color: "var(--ink-soft)" }}>Time saved</p>
                  <div className="mt-6 pt-6 flex flex-col gap-2" style={{ borderTop: "1px solid #D4CEC4" }}>
                    <p className="text-[11px]" style={{ color: "var(--ink-faint)" }}>500,000+ records</p>
                    <p className="text-[11px]" style={{ color: "var(--ink-faint)" }}>~30 seconds per report</p>
                    <p className="text-[11px]" style={{ color: "var(--ink-faint)" }}>Company-wide availability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Placeholder */}
        <div className="reveal mt-28 py-16 rounded-2xl border border-dashed flex items-center justify-center" style={{ borderColor: "#C8C0B0" }}>
          <p className="text-[12px] tracking-[0.18em] uppercase" style={{ color: "var(--ink-faint)" }}>More projects coming soon</p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative px-8 md:px-16 py-32" style={{ background: "var(--bone-dark)" }}>
        <div className="reveal flex items-center gap-6 mb-20">
          <span className="text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--ink-faint)" }}>About</span>
          <div className="flex-1 h-px" style={{ background: "#D8D1C5" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start max-w-6xl">
          <div className="md:col-span-5 reveal-left">
            <h2 className="font-serif" style={{ fontSize: "clamp(50px, 7vw, 96px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
              Shao<br />chen<br /><em style={{ color: "var(--ink-soft)" }}>Jia</em>
            </h2>
          </div>

          <div className="md:col-span-6 md:col-start-7 reveal delay-2 pt-2">
            <p className="text-[17px] leading-[1.8] mb-6" style={{ color: "var(--ink-mid)" }}>
              Business analyst with a focus on turning messy enterprise data into systems that actually make sense. I care about the analysis before the automation — understanding why a process breaks before deciding how to fix it.
            </p>
            <p className="text-[15px] leading-[1.75]" style={{ color: "var(--ink-soft)" }}>
              Currently building experience across commercial operations, data architecture, and process design. Based in Melbourne, Australia.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-10">
              {["Business Analysis", "Process Mapping", "Power Platform", "Data Modelling", "Automation Design", "Stakeholder Communication"].map((s) => (
                <div key={s} className="flex items-center gap-3 text-[13px]" style={{ color: "var(--ink-soft)" }}>
                  <div className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--ink-faint)" }} />
                  {s}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-8 mt-12 pt-8" style={{ borderTop: "1px solid #D4CEC4" }}>
              <a href="mailto:kevjia476@gmail.com" className="link-line text-[13px] tracking-[0.08em] uppercase" style={{ color: "var(--ink)" }}>Email</a>
              <a href="https://www.linkedin.com/in/shaochen-jia-394b04311/" target="_blank" rel="noopener noreferrer" className="link-line text-[13px] tracking-[0.08em] uppercase" style={{ color: "var(--ink)" }}>LinkedIn</a>
              <a href="https://github.com/shaochen-jia" target="_blank" rel="noopener noreferrer" className="link-line text-[13px] tracking-[0.08em] uppercase" style={{ color: "var(--ink)" }}>GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6" style={{ borderTop: "1px solid #D8D1C5" }}>
        <p className="font-serif text-[22px]" style={{ color: "var(--ink)" }}>Shaochen Jia</p>
        <p className="text-[11px] tracking-[0.12em] uppercase" style={{ color: "var(--ink-faint)" }}>
          © {new Date().getFullYear()} · Melbourne, Australia
        </p>
        <a href="mailto:kevjia476@gmail.com" className="link-line text-[12px] tracking-[0.08em]" style={{ color: "var(--ink-soft)" }}>
          kevjia476@gmail.com
        </a>
      </footer>
    </main>
  );
}
