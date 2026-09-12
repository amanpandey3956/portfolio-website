import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, FolderGit2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

type FeaturedProject = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  link?: string;
  tag: string;
  accentBar: string;
  tagBg: string;
};

const featuredProjects: FeaturedProject[] = [
  {
    title: "Go DevOps Project",
    description:
      "Containerized Golang web application with Docker & Kubernetes on Amazon EKS, automated via GitHub Actions, GitOps delivery with Argo CD, Helm-managed releases, and NGINX Ingress Controller.",
    tech: ["Go", "Docker", "Kubernetes", "AWS EKS", "Helm", "ArgoCD"],
    github: "https://github.com/amanpandey3956/go-devops-project",
    tag: "Cloud Native",
    accentBar: "from-sky-500 to-cyan-400",
    tagBg: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    title: "Blog App (DevSecOps)",
    description:
      "Cloud-native 3-tier blog platform built with React, Node.js, and PostgreSQL on Kubernetes (EKS), provisioned with Terraform, secured with DevSecOps scanning, and deployed via Argo CD.",
    tech: ["Kubernetes", "Terraform", "GitHub Actions", "Argo CD", "React", "PostgreSQL"],
    github: "https://github.com/amanpandey3956/DevSecOps-Blog-App",
    tag: "DevSecOps",
    accentBar: "from-violet-500 to-indigo-400",
    tagBg: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    title: "Task Manager App",
    description:
      "3-tier full-stack task manager with a complete observability stack — Prometheus, Thanos, and OpenTelemetry — plus automated Docker image builds and push workflows via GitHub Actions.",
    tech: ["Docker", "Prometheus", "Thanos", "OpenTelemetry", "CI/CD"],
    github: "https://github.com/amanpandey3956/Full-stack-app",
    tag: "Observability",
    accentBar: "from-amber-500 to-orange-400",
    tagBg: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col rounded-2xl border-2 border-zinc-200 bg-white shadow-sm hover:shadow-xl hover:border-zinc-300 hover:shadow-zinc-900/10 transition-all duration-300 overflow-hidden"
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${project.accentBar}`} />

      <div className="relative p-7 sm:p-8 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-6 relative">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-white">
            <FolderGit2 size={22} />
          </span>
          <span className={`inline-flex px-2.5 py-1 rounded-lg border text-[11px] font-bold uppercase tracking-wider ${project.tagBg}`}>
            {project.tag}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-foreground leading-snug mb-3">
          {project.title}
        </h3>

        <p className="text-sm font-medium text-foreground/70 leading-relaxed flex-1 mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-7">
          {project.tech.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-xs font-bold text-foreground/70"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-xs font-bold text-foreground/70">
              +{project.tech.length - 5} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 pt-5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-emerald-700 transition-colors"
          >
            <Github size={16} />
            View Repository
          </a>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-foreground hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-emerald-100/60 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-sky-100/60 rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Work"
          title="Featured Projects"
          subtitle="A snapshot of recent work — cloud-native platforms, GitOps delivery, and observability"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Button
            asChild
            className="group bg-foreground text-background hover:bg-primary hover:text-white text-base rounded-xl px-9 py-6 shadow-lg shadow-zinc-900/10 hover:shadow-emerald-500/25"
          >
            <Link to="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}