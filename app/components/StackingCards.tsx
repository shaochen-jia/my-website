"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Card {
  index: number;
  total: number;
  children: React.ReactNode;
}

function StickyCard({ index, total, children }: Card) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Cards behind scale down as new cards stack on top
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.04]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, index === total - 1 ? 1 : 0.7]);

  return (
    <div
      ref={ref}
      style={{
        position: "sticky",
        top: `${80 + index * 20}px`,
        zIndex: index + 1,
      }}
      className="mb-6"
    >
      <motion.div style={{ scale, opacity }} className="origin-top">
        {children}
      </motion.div>
    </div>
  );
}

interface StackingCardsProps {
  items: {
    title: string;
    subtitle: string;
    period: string;
    location: string;
    bullets: string[];
    tag?: string;
  }[];
}

export function StackingCards({ items }: StackingCardsProps) {
  return (
    <div>
      {items.map((item, i) => (
        <StickyCard key={i} index={i} total={items.length}>
          <div
            className="rounded-2xl p-8 md:p-10 border"
            style={{
              background: i % 2 === 0 ? "var(--bone)" : "var(--bone-dark)",
              borderColor: "#D4CEC4",
              boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                {item.tag && (
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border inline-block mb-3"
                    style={{ borderColor: "#C8C0B0", color: "var(--ink-faint)" }}
                  >
                    {item.tag}
                  </span>
                )}
                <h3
                  className="font-serif"
                  style={{ fontSize: "clamp(20px, 2.5vw, 28px)", letterSpacing: "-0.015em" }}
                >
                  {item.title}
                </h3>
                <p className="text-[14px] mt-1" style={{ color: "var(--ink-soft)" }}>
                  {item.subtitle}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[13px]" style={{ color: "var(--ink-mid)" }}>{item.period}</p>
                <p className="text-[12px] mt-1" style={{ color: "var(--ink-faint)" }}>{item.location}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {item.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  <span className="mt-[6px] w-1 h-1 rounded-full shrink-0" style={{ background: "var(--ink-faint)" }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </StickyCard>
      ))}
    </div>
  );
}
