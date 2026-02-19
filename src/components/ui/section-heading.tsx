import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, children, centered = true }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? "text-center" : ""}`}
    >
      <div className="relative inline-block">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-primary/5 via-cyan-500/5 to-teal-500/5 rounded-lg blur-xl"
        />
        <h2 className="relative text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">{title}</span>
        </h2>
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
}
