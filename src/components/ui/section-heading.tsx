import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: ReactNode;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  children,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-14 ${centered ? "text-center" : ""}`}
    >
      <div className={`relative inline-flex items-center gap-3 mb-4 ${centered ? "justify-center mx-auto" : ""}`}>
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span className="h-px w-12 bg-primary/40" />
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
          {eyebrow ?? "Portfolio"}
        </span>
        <span className="h-px w-12 bg-primary/40" />
        <span className="h-2 w-2 rounded-full bg-primary" />
      </div>

      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground text-balance">
        {title}
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className={`text-muted-foreground mt-4 text-base md:text-lg leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}

      {children}
    </motion.div>
  );
}