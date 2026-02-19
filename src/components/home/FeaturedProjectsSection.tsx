import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Layers, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const featuredProjects = [
  {
    title: "Clika",
    description: "A cutting-edge MVP SaaS platform with Stripe integration for payments, OAuth authentication supporting Google and GitHub, and Redux state management for seamless team collaboration and real-time data synchronization.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Rest APIs", "Redux", "Stripe", "OAuth"],
    gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
    accentColor: "violet",
    size: "large",
    image: "/projects/clika.png",
  },
  {
    title: "CloudRaft Service Desk",
    description: "Full-stack service desk application with real-time updates and chat support along with advanced filtering table built using mantine UI, Supabase backend.",
    tech: ["React", "Supabase", "TypeScript", "Tailwind CSS"],
    link: "https://oss-support.cloudraft.io/",
    github: "https://github.com/amanpandey3956/service-app-clone",
    gradient: "from-cyan-500/20 via-teal-500/20 to-emerald-500/20",
    accentColor: "cyan",
    size: "medium",
  },
];

const stats = [
  { value: "10+", label: "Projects", icon: Layers },
  { value: "5+", label: "Technologies", icon: Sparkles },
];

function ProjectCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  const isLarge = project.size === "large";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`group relative rounded-3xl overflow-hidden card-hover ${
        isLarge ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`} />
      <div className="absolute inset-0 border-gradient rounded-3xl" />
      
      <div className="relative p-8 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.gradient} border border-white/10`}>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-${project.accentColor}-400 to-${project.accentColor}-600 flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">
                  {project.title.charAt(0)}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>
          
          <div className="flex gap-2">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-card/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-200"
              >
                <Github size={18} className="text-muted-foreground hover:text-foreground" />
              </motion.a>
            )}
            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-card/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-200"
              >
                <ExternalLink size={18} className="text-muted-foreground hover:text-foreground" />
              </motion.a>
            )}
          </div>
        </div>

        <p className={`text-muted-foreground leading-relaxed mb-4 ${isLarge ? "text-lg" : "text-sm"}`}>
          {project.description}
        </p>

        {project.image && (
          <div className="flex justify-center mb-4">
            <img 
              src={project.image} 
              alt={project.title}
              className="max-h-32 w-auto object-contain rounded-lg opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        )}

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors`}
              >
                {tech}
              </span>
            ))}
          </div>

          {isLarge && (
            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm">Production Ready</span>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export function FeaturedProjectsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            title="Featured Projects"
            subtitle="Some of my recent work"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl border-gradient card-hover flex flex-col justify-between min-h-[200px]"
          >
            <div className="space-y-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="p-2 rounded-xl bg-primary/10">
                    <stat.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            asChild 
            variant="outline" 
            className="group border-border hover:bg-secondary hover:text-foreground text-foreground px-8"
          >
            <Link to="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
