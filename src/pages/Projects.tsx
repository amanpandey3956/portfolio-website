import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Search, X, Sparkles, Layers, Code2, FolderGit2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Go DevOps Project",
    description: "Built and deployed a Golang web application using containerization and cloud-native technologies. Implemented automated build and deployment workflows with GitHub Actions and GitOps-based delivery using Argo CD. Deployed the application to a Kubernetes cluster on Amazon EKS using Helm and exposed it via an NGINX Ingress Controller with custom domain routing.",
    tech: ["Go", "Docker", "Kubernetes", "AWS EKS", "Helm", "ArgoCD", "GitHub Actions", "CI/CD", "NGINX Ingress"],
    github: "https://github.com/amanpandey3956/go-devops-project",
    featured: true,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    title: "Blog App (DevSecOps)",
    description: "Built a cloud-native 3-tier blog platform using React, Node.js, and PostgreSQL with containerized deployment on Kubernetes running on Amazon EKS. Automated infrastructure provisioning with Terraform and CI workflows using GitHub Actions, with GitOps-based delivery via Argo CD and integrated DevSecOps practices like vulnerability and IaC scanning.",
    tech: ["Docker", "Kubernetes", "AWS EKS", "Terraform", "GitHub Actions", "ArgoCD", "React", "Node.js", "PostgreSQL"],
    github: "https://github.com/amanpandey3956/DevSecOps-Blog-App",
    featured: true,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
  },
  {
    title: "Task Manager App",
    description: "Designed and containerized a 3-tier full-stack task management app. Implemented a complete observability stack using Prometheus, Thanos, and OpenTelemetry to collect metrics and traces, enabling scalable monitoring and long-term metrics storage. Automated Docker image build and push workflows using GitHub Actions for CI/CD.",
    tech: ["Dockerfile", "Prometheus", "Thanos", "OpenTelemetry", "CI/CD", "Observability"],
    github: "https://github.com/amanpandey3956/Full-stack-app",
    featured: true,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
  },
  {
    title: "3-Tier Application",
    description: "Implemented observability for a 3-tier application using OpenTelemetry as the unified instrumentation layer. Collected application metrics, logs and traces using OTEL and visualized in grafana",
    tech: ["OpenTelemetry", "Grafana"],
    github: "https://github.com/amanpandey3956/3-tier-app",
    featured: true,
    gradient: "from-rose-500 via-pink-500 to-red-500",
  },
  {
    title: "Portfolio",
    description: "A modern, responsive portfolio website built with React, featuring smooth animations, dark theme with glassmorphism effects, and optimized performance.",
    tech: ["React", "TypeScript", "Tailwind CSS", "shadcn-ui"],
    link: "https://amanpandey-portfolio.vercel.app/",
    github: "https://github.com/amanpandey3956/portfolio-website",
    featured: true,
    gradient: "from-emerald-500 via-green-500 to-teal-500",
  },
  {
    title: "Clika",
    description: "A cutting-edge MVP SaaS platform with Stripe integration for payments, Google OAuth authentication along with Password based authentication, and Redux state management for seamless team collaboration and real-time data synchronization.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Rest APIs", "Redux", "Stripe", "Google OAuth", "Authentication"],
    featured: false,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    title: "CloudRaft Service Desk",
    description: "Full-stack service desk application with real-time ticket updates using Supabase realtime subscriptions, comprehensive ticket management, role-based access control, and an intuitive dashboard for support teams.",
    tech: ["React", "Supabase", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    link: "https://oss-support.cloudraft.io/",
    github: "https://github.com/amanpandey3956/service-app-clone",
    featured: false,
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
  },
  {
    title: "TuneHouse",
    description: "TuneHouse is an innovative edtech music academy project built using Next.js, TypeScript, Tailwind CSS, and the Aeternity UI library, providing an engaging platform for students to learn music through interactive courses.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Aceternity UI"],
    github: "https://github.com/amanpandey3956/TuneHouse",
    link: "https://tune-house.vercel.app/",
    featured: false,
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
  },
  { 
    title: "Appwrite Blog",
    description: "Developed a dynamic blogging platform using ReactJS, Appwrite, and Tailwind CSS. The site features user authentication, allowing users to create, edit, and delete their own blog posts, as well as upload images.",
    tech: ["React", "Redux", "Appwrite", "Tailwind CSS"],
    github: "https://github.com/amanpandey3956/Appwrite-Blog",
    link: "https://appwrite-blog-vert.vercel.app/",
    featured: false,
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
  },
];

const prioritizedTechs = [
  "Docker", "Kubernetes", "AWS EKS", "Terraform", "React", "Next.js", "TypeScript", "Tailwind CSS", 
  "OpenTelemetry", "Prometheus", "Rest APIs", "Thanos", "PostgreSQL", "Supabase", "Dockerfile", "CI/CD", "Grafana"
];

const allTechStacks = Array.from(new Set(projects.flatMap(p => p.tech)));
const sortedTechStacks = [
  ...prioritizedTechs.filter(tech => allTechStacks.includes(tech)),
  ...allTechStacks.filter(tech => !prioritizedTechs.includes(tech)).sort()
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTech = selectedTechs.length === 0 || 
        selectedTechs.some(tech => project.tech.includes(tech));
      
      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTechs]);

  const featuredCount = filteredProjects.filter(p => p.featured).length;
  const totalCount = filteredProjects.length;

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTechs([]);
  };

  return (
    <Layout>
      <SEO 
        title="Projects"
        description="Explore my portfolio of projects including SaaS platforms, observability tools, and full-stack applications built with React, TypeScript, Docker, Kubernetes, Prometheus, Thanos, and Opentelemetry."
        keywords="DevOps Projects, React and TypeScript Projects, SaaS, Observability, Full Stack Projects, Docker, Kubernetes, Portfolio"
        url="https://amanpandey-portfolio.vercel.app/projects"
      />
      
      <section className="py-16 min-h-screen relative overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-100/50 rounded-full blur-[110px]" />
        </div>

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title="Projects"
              subtitle="A collection of projects I've worked on, from SaaS platforms to observability tools and personal projects"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 h-14 text-base font-medium text-foreground placeholder:text-foreground/40 bg-white border-2 border-zinc-200 rounded-2xl focus:border-emerald-500 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {sortedTechStacks.map((tech) => (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border ${
                  selectedTechs.includes(tech)
                    ? "bg-foreground text-background border-foreground shadow-md shadow-zinc-900/15"
                    : "bg-white text-foreground/70 hover:text-foreground border-zinc-200 hover:border-emerald-400"
                }`}
              >
                {tech}
              </button>
            ))}
            {selectedTechs.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-zinc-100 text-foreground/70 hover:bg-red-50 hover:text-red-600 border border-zinc-200 transition-all duration-200"
              >
                Clear all
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center gap-6 text-sm font-semibold text-foreground/70"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>{featuredCount} Featured</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-sky-600" />
              <span>{totalCount} Total</span>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  layout
                  exit="exit"
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative flex flex-col rounded-2xl border-2 border-zinc-200 bg-white shadow-sm hover:shadow-xl hover:shadow-zinc-900/10 hover:border-zinc-300 transition-all duration-300 overflow-hidden"
                >
                  {project.featured && (
                    <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />
                  )}

                  <div className="relative p-6 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-5 relative">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${project.gradient} text-white shadow-sm`}>
                        <FolderGit2 size={22} />
                      </span>
                      {project.featured ? (
                        <span className="inline-flex px-2.5 py-1 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex px-2.5 py-1 rounded-lg border border-zinc-200 bg-zinc-50 text-foreground/60 text-[11px] font-bold uppercase tracking-wider">
                          Project
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-lg font-bold text-foreground leading-snug mb-2.5">
                      {project.title}
                    </h3>

                    <p className="text-sm font-medium text-foreground/70 leading-relaxed flex-1 mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          onClick={() => toggleTech(tech)}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 border ${
                            selectedTechs.includes(tech)
                              ? "bg-foreground text-background border-foreground"
                              : "bg-zinc-50 text-foreground/70 hover:border-emerald-400 border-zinc-200"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-emerald-700 transition-colors"
                        >
                          <Github size={15} />
                          GitHub
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-foreground/50">Private Repo</span>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-foreground hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-colors"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-100 mb-4">
                <Code2 className="h-8 w-8 text-foreground/50" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">No projects found</h3>
              <p className="text-foreground/60 font-medium mb-4">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={clearFilters} className="border-2 border-zinc-300 font-bold hover:bg-foreground hover:text-background">
                Clear all filters
              </Button>
            </motion.div>
          )}

        </div>
      </section>
    </Layout>
  );
};

export default Projects;