import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiKubernetes,
  SiGo,
  SiPrometheus,
  SiGrafana,
  SiGithubactions,
  SiLinux,
  SiRedux,
  SiDocker,
  SiNodedotjs,
  SiAmazonwebservices,
  SiTerraform,
  SiOpentelemetry,
} from "react-icons/si";
import { FiHexagon } from "react-icons/fi";

const techCategories = {
  devops: [
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    { name: "Go", icon: SiGo, color: "#00ADD8" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
    { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
    { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
    { name: "Linux", icon: SiLinux, color: "#FCC624" },
  ],
  observability: [
    { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
    { name: "Grafana", icon: SiGrafana, color: "#F46800" },
    { name: "Loki", icon: SiGrafana, color: "#F46800" },
    { name: "Thanos", icon: FiHexagon, color: "#7A56D1" },
    { name: "OpenTelemetry", icon: SiOpentelemetry, color: "#000000" },
  ],
  frontend: [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Next.js", icon: SiNextdotjs, color: "#111111" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Redux", icon: SiRedux, color: "#764ABC" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  ],
};

type Tech = { name: string; icon: React.ElementType; color: string };

const categoryMeta: Record<string, { label: string; dot: string }> = {
  frontend: { label: "Frontend", dot: "bg-sky-500" },
  devops: { label: "DevOps & Cloud", dot: "bg-emerald-500" },
  observability: { label: "Observability", dot: "bg-orange-500" },
};

export function TechStackSection() {
  return (
    <section id="tech-stack" className="py-20 md:py-24 relative overflow-hidden bg-muted">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-200/50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Toolbox"
          title="Tech Stack"
          subtitle="The technologies I use to bring ideas to life — from cloud infrastructure to frontend experiences"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(techCategories).map(([category, techs], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-border bg-card p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${categoryMeta[category].dot}`} />
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {categoryMeta[category].label}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-foreground/60">{techs.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border bg-muted/50 text-sm font-semibold text-foreground/80 hover:border-emerald-400 hover:text-emerald-700 transition-colors"
                  >
                    <tech.icon size={14} style={{ color: tech.color }} />
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}