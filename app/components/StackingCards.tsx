"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CardItem {
  title: string;
  subtitle: string;
  period: string;
  location: string;
  bullets: string[];
  tag?: string;
}

function StickyCard({ index, total, item }: { index: number; total: number; item: CardItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.035]);
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, index === total - 1 ? 1 : 0.75]);

  return (
    <div
      ref={ref}
      style={{ position: "sticky", top: `${72 + index * 18}px`, zIndex: index + 1, marginBottom: "12px" }}
    >
      <motion.div style={{ scale, opacity, transformOrigin: "top center" }}>
        <div style={{
          borderRadius: "20px",
          border: "1px solid #E4E0DA",
          background: index % 2 === 0 ? "#ffffff" : "#F7F7F5",
          padding: "40px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.05)",
        }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
            <div>
              {item.tag && (
                <span style={{
                  fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase",
                  padding: "3px 10px", borderRadius: "999px", border: "1px solid #E0DADA",
                  color: "var(--ink-faint)", display: "inline-block", marginBottom: "10px",
                }}>
                  {item.tag}
                </span>
              )}
              <h3 className="font-serif" style={{ fontSize: "clamp(18px, 2.5vw, 26px)", letterSpacing: "-0.015em", lineHeight: 1.1 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", marginTop: "4px", color: "var(--ink-soft)" }}>{item.subtitle}</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p style={{ fontSize: "13px", color: "var(--ink-mid)" }}>{item.period}</p>
              <p style={{ fontSize: "12px", marginTop: "3px", color: "var(--ink-faint)" }}>{item.location}</p>
            </div>
          </div>

          {/* Bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {item.bullets.map((b, j) => (
              <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--ink-faint)", marginTop: "8px", flexShrink: 0 }} />
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--ink-soft)" }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function StackingCards({ items }: { items: CardItem[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <StickyCard key={i} index={i} total={items.length} item={item} />
      ))}
    </div>
  );
}
