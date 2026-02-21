import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Search, X, Sparkles, Layers, Code2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Clika",
    description: "A cutting-edge MVP SaaS platform with Stripe integration for payments, Google OAuth authentication along with Password based authentication, and Redux state management for seamless team collaboration and real-time data synchronization.",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Rest APIs", "Redux", "Stripe", "Google OAuth", "Authentication"],
    featured: true,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    title: "CloudRaft Service Desk",
    description: "Full-stack service desk application with real-time ticket updates using Supabase realtime subscriptions, comprehensive ticket management, role-based access control, and an intuitive dashboard for support teams.",
    tech: ["React.js", "Supabase", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    link: "https://oss-support.cloudraft.io/",
    github: "https://github.com/amanpandey3956/service-app-clone",
    featured: true,
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
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
    tech: ["React.js", "TypeScript", "Tailwind CSS", "shadcn-ui"],
    link: "https://amanpandey-portfolio.vercel.app/",
    github: "https://github.com/amanpandey3956/portfolio-website",
    featured: true,
    gradient: "from-emerald-500 via-green-500 to-teal-500",
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
    tech: ["React.js", "Redux", "Appwrite", "Tailwind CSS"],
    github: "https://github.com/amanpandey3956/Appwrite-Blog",
    link: "https://appwrite-blog-vert.vercel.app/",
    featured: false,
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
  },
  {
    title: "Admin Sales Dashboard",
    description: "Developed a responsive sales dashboard using React.js, Material-UI, and Nivo Charts for dynamic data visualization. Integrated mock APIs from JSONPlaceholder for real-time transaction tracking and user activity insights",
    tech: ["React.js", "Material-UI", "Axios", "Jsonplaceholder"],
    github: "https://github.com/amanpandey3956/React-Sales-Dashboard",
    link: "https://dashboard-one-beryl-65.vercel.app/",
    featured: false,
    gradient: "from-slate-500 via-gray-500 to-zinc-500",
  },
  {
    title: "Nike Landing Page",
    description: "Created an engaging Nike landing page using ReactJS and Tailwind CSS. The site features a visually appealing design that showcases products with responsive layouts and smooth animations. Leveraged Tailwind CSS for rapid styling, ensuring a seamless user experience across devices.",
    tech: ["React.js", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/amanpandey3956/Nike-Website",
    link: "https://nike-website-sage-eight.vercel.app/",
    featured: false,
    gradient: "from-red-500 via-orange-500 to-amber-500",
  } 
];

const prioritizedTechs = [
  "React.js", "Next.js", "TypeScript", "Tailwind CSS", 
  "OpenTelemetry", "Prometheus", "Rest APIs", "Thanos", "PostgreSQL", "Supabase", 
  "Redux", "Dockerfile", "CI/CD", "Grafana"
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
        keywords="React and TypeScript Projects, SaaS, Observability, Full Stack Projects, Docker, Kubernetes, Portfolio"
        url="https://amanpandey-portfolio.vercel.app/projects"
      />
      
      <section className="py-16 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 h-14 text-lg bg-card/60 backdrop-blur-xl border-border/50 rounded-2xl focus:border-primary focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTechs.includes(tech)
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary/80 text-secondary-foreground hover:bg-secondary border border-border/50"
                }`}
              >
                {tech}
              </button>
            ))}
            {selectedTechs.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-full text-sm font-medium bg-secondary/80 text-secondary-foreground hover:bg-destructive/10 hover:text-destructive border border-border/50 transition-all duration-200"
              >
                Clear all
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>{featuredCount} Featured</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-500" />
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
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  <div className="relative h-full p-6 rounded-2xl glass-strong border border-border/50 hover:border-primary/30 transition-all duration-300 flex flex-col">
                    {project.featured && (
                      <div className="absolute -top-px left-6 right-6 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-b-full" />
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="text-xs text-primary font-medium">Featured Project</span>
                        )}
                      </div>
                      
                      <div className="flex gap-1.5">
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 rounded-xl bg-secondary/80 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-200"
                            aria-label={`${project.title} GitHub repository`}
                          >
                            <Github size={16} className="text-muted-foreground hover:text-foreground" />
                          </motion.a>
                        )}
                        {project.link && (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 rounded-xl bg-secondary/80 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-200"
                            aria-label={`${project.title} live demo`}
                          >
                            <ExternalLink size={16} className="text-muted-foreground hover:text-foreground" />
                          </motion.a>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          onClick={() => toggleTech(tech)}
                          className={`px-2.5 py-1 text-xs rounded-lg font-medium cursor-pointer transition-all duration-200 ${
                            selectedTechs.includes(tech)
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "bg-secondary/60 text-secondary-foreground hover:bg-secondary border border-transparent"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`} />
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/80 mb-4">
                <Code2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-3 gradient-text">More Projects Coming Soon</h3>
                <p className="text-muted-foreground">
                  I'm always working on new projects. Check back soon or connect with me on GitHub to see my latest work!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
