import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";

const technologies = [
  { name: "React", icon: "⚛️", category: "Frontend" },
  { name: "TypeScript", icon: "📘", category: "Language" },
  { name: "Next.js", icon: "▲", category: "Framework" },
  { name: "Tailwind CSS", icon: "🎨", category: "Styling" },
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "Kubernetes", icon: "☸️", category: "DevOps" },
  { name: "Prometheus", icon: "🔥", category: "Observability" },
  { name: "Grafana Loki", icon: "📊", category: "Observability" },
  { name: "Thanos", icon: "🛡️", category: "Observability" },
  { name: "OpenTelemetry", icon: "🔭", category: "Observability" },
  { name: "GitHub Actions", icon: "🔧", category: "CI/CD" },
  { name: "Linux", icon: "🐧", category: "OS" },
  { name: "Redux", icon: "🔄", category: "State" },
  { name: "Git", icon: "📦", category: "Tools" },
  { name: "REST APIs", icon: "🔗", category: "Backend" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function TechStackSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Tech Stack"
          subtitle="Technologies I use to bring ideas to life"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group p-4 rounded-xl glass hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              <div className="text-center space-y-2">
                <span className="text-3xl block group-hover:scale-110 transition-transform">
                  {tech.icon}
                </span>
                <h3 className="font-medium text-sm text-foreground">{tech.name}</h3>
                <span className="text-xs text-muted-foreground">{tech.category}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
