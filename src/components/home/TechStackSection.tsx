import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { 
  SiReact, 
  SiTypescript, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiKubernetes, 
  SiPrometheus, 
  SiGrafana, 
  SiGithubactions, 
  SiLinux, 
  SiRedux,
  SiDocker,
  SiNodedotjs,
  SiAmazonwebservices,
  SiTerraform,
  SiOpentelemetry
} from "react-icons/si";
import { FiHexagon } from "react-icons/fi";

const techCategories = {
  frontend: [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Redux", icon: SiRedux, color: "#764ABC" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  ],
  devops: [
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
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
};

const allTechs = [...techCategories.frontend, ...techCategories.devops, ...techCategories.observability];

function TechCard({ tech }: { tech: { name: string; icon: React.ElementType; color: string } }) {
  const Icon = tech.icon;
  
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -5 }}
      className="group flex items-center gap-3 px-6 py-4 rounded-2xl glass hover:border-primary/40 transition-all duration-300 cursor-pointer min-w-[160px]"
    >
      <div 
        className="p-2 rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${tech.color}15` }}
      >
        <Icon 
          size={24} 
          style={{ color: tech.color }}
          className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]"
        />
      </div>
      <span className="font-medium text-foreground text-sm whitespace-nowrap">{tech.name}</span>
    </motion.div>
  );
}

function MarqueeRow({ techs }: { techs: typeof allTechs }) {
  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex gap-4 animate-marquee"
        style={{ width: 'fit-content' }}
      >
        {[...techs, ...techs, ...techs].map((tech, index) => (
          <TechCard key={`${tech.name}-${index}`} tech={tech} />
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}

export function TechStackSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            title="Tech Stack"
            subtitle="Technologies I use to bring ideas to life"
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 mt-12">
        <MarqueeRow techs={allTechs} />
      </div>

      <div className="container mx-auto px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {Object.entries(techCategories).map(([category, techs], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="p-6 rounded-2xl border-gradient card-hover"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 capitalize flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  category === 'frontend' ? 'bg-primary' : 
                  category === 'devops' ? 'bg-cyan-400' : 'bg-teal-400'
                }`} />
                {category === 'devops' ? 'DevOps & Cloud' : category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-200"
                    >
                      <Icon size={14} style={{ color: tech.color }} />
                      <span className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
