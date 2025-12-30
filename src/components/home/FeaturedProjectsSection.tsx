import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const featuredProjects = [
  {
    title: "Clika MVP",
    description: "A cutting-edge SaaS platform with Stripe integration, OAuth authentication, and Redux state management for seamless team collaboration.",
    tech: ["React", "TypeScript", "Redux", "Stripe", "OAuth"],
    link: "#",
    github: "#",
  },
  {
    title: "CloudRaft Service Desk",
    description: "Full-stack service desk application with real-time updates, Supabase backend, and comprehensive ticket management system.",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    link: "#",
    github: "#",
  },
];

export function FeaturedProjectsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Featured Projects"
          subtitle="Some of my recent work"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 rounded-xl glass hover:border-primary/50 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild variant="outline" className="group">
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
