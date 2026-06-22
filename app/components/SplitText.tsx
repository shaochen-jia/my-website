"use client";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  by?: "word" | "char";
}

export function SplitText({
  text,
  className = "",
  style,
  delay = 0,
  stagger = 0.06,
  by = "word",
}: SplitTextProps) {
  const units = by === "char" ? text.split("") : text.split(" ");

  return (
    <span className={className} style={{ ...style, display: "block" }} aria-label={text}>
      {units.map((unit, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {unit}
            {by === "word" && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
