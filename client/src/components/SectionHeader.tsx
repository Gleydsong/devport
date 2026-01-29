import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`flex flex-col gap-3 ${alignClass}`}
    >
      {eyebrow ? (
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-muted-foreground text-lg max-w-2xl">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
