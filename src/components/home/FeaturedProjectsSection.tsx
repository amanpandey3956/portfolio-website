import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

type FeaturedProject = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  link?: string;
  gradient: string;
  accentColor: string;
};

const featuredProjects: FeaturedProject[] = [
  {
    title: "Go DevOps Project",
    description: "Built and deployed a Golang web application using containerization with Docker and Kubernetes on Amazon EKS. Automated build and deployment using GitHub Actions and GitOps delivery with Argo CD, managing releases via Helm and exposing the app through an NGINX Ingress Controller.",
    tech: ["Go", "Docker", "Kubernetes", "AWS EKS", "Helm", "ArgoCD", "GitHub Actions"],
    github: "https://github.com/amanpandey3956/go-devops-project",
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    accentColor: "cyan",
  },
  {
    title: "DevSecOps Blog App",
    description: "Built a cloud-native 3-tier blog platform using React, Node.js, and PostgreSQL with containerized deployment on Kubernetes running on Amazon EKS. Automated infrastructure provisioning with Terraform and CI workflows using GitHub Actions, with GitOps-based delivery via Argo CD and integrated DevSecOps practices like vulnerability and IaC scanning.",
    tech: ["Kubernetes", "AWS EKS", "Terraform", "GitHub Actions", "Argo CD", "React", "Node.js", "PostgreSQL"],
    github: "https://github.com/amanpandey3956/DevSecOps-Blog-App",
    gradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
    accentColor: "indigo",
  },
  {
    title: "Task Manager App",
    description: "3-tier full-stack task management app with complete observability stack using Prometheus, Thanos, and OpenTelemetry. Automated Docker image build and push workflows using GitHub Actions.",
    tech: ["Docker", "Prometheus", "Thanos", "OpenTelemetry", "CI/CD", "Observability"],
    github: "https://github.com/amanpandey3956/Full-stack-app",
    gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
    accentColor: "amber",
  },
];

function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${project.gradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
      
      <div className="relative h-full rounded-3xl overflow-hidden glass-strong border border-border/60 bg-card/40 backdrop-blur-xl">
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient.replace('/20', '')} opacity-80`} />
        
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Featured Project</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
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
                  className="p-3 rounded-xl bg-secondary/60 hover:bg-primary/20 border border-border/60 hover:border-primary/40 transition-all duration-200 backdrop-blur-sm"
                >
                  <Github size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.a>
              )}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-secondary/60 hover:bg-primary/20 border border-border/60 hover:border-primary/40 transition-all duration-200 backdrop-blur-sm"
                >
                  <ExternalLink size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.a>
              )}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6 text-sm flex-1">
            {project.description}
          </p>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/70 text-secondary-foreground border border-border/50 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 5 && (
                <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  +{project.tech.length - 5} more
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${project.gradient.replace('/20', '')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </div>
    </motion.div>
  );
}

export function FeaturedProjectsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
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
