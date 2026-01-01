import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";

const projects = [
  {
    title: "Clika",
    description: "A cutting-edge MVP SaaS platform with Stripe integration for payments, OAuth authentication supporting Google and GitHub, and Redux state management for seamless team collaboration and real-time data synchronization.",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Rest APIs", "Redux", "Stripe", "Google OAuth", "Authentication"],
    featured: true,
  },
  {
    title: "CloudRaft Service Desk",
    description: "Full-stack service desk application with real-time ticket updates using Supabase realtime subscriptions, comprehensive ticket management, role-based access control, and an intuitive dashboard for support teams.",
    tech: ["React.js", "Supabase", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    link: "https://oss-support.cloudraft.io/",
    github: "https://github.com/amanpandey3956/service-app-clone",
    featured: true,
  },
  {
    title: "Task Manager App",
    description: "Designed and containerized a 3-tier full-stack task management app. Implemented a complete observability stack using Prometheus, Thanos, and OpenTelemetry to collect metrics and traces, enabling scalable monitoring and long-term metrics storage. Automated Docker image build and push workflows using GitHub Actions for CI/CD.",
    tech: ["Dockerfile", "Prometheus", "Thanos", "OpenTelemetry", "CI/CD", "Observability"],
    github: "https://github.com/amanpandey3956/Full-stack-app",
    featured: true,
  },
  {
    title: "3-Tier Application",
    description: "Implemented observability for a 3-tier application using OpenTelemetry as the unified instrumentation layer. Collected application metrics, logs and traces using OTEL and visualized in grafana",
    tech: ["OpenTelemetry", "Grafana"],
    github: "https://github.com/amanpandey3956/3-tier-app",
    featured: true,
  },
  {
    title: "Portfolio",
    description: "A modern, responsive portfolio website built with React, featuring smooth animations, dark theme with glassmorphism effects, and optimized performance.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "#",
    github: "https://github.com/amanpandey3956/portfolio-website",
    featured: true,
  },
  {
    title: "TuneHouse",
    description: "TuneHouse is an innovative edtech music academy project built using Next.js, TypeScript, Tailwind CSS, and the Aeternity UI library, providing an engaging platform for students to learn music through interactive courses.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Aceternity UI"],
    github: "https://github.com/amanpandey3956/TuneHouse",
    link: "https://tune-house.vercel.app/",
    featured: false,
  },
  { 
    title: "Appwrite Blog",
    description: "Developed a dynamic blogging platform using ReactJS, Appwrite, and Tailwind CSS. The site features user authentication, allowing users to create, edit, and delete their own blog posts, as well as upload images.",
    tech: ["React", "Redux", "Appwrite", "Tailwind CSS"],
    github: "https://github.com/amanpandey3956/Appwrite-Blog",
    link: "https://appwrite-blog-vert.vercel.app/",
    featured: false,
  },
  {
    title: "Admin Sales Dashboard",
    description: "Developed a responsive sales dashboard using React.js, Material-UI, and Nivo Charts for dynamic data visualization. Integrated mock APIs from JSONPlaceholder for real-time transaction tracking and user activity insights",
    tech: ["React.js", "Material-UI", "Axios", "Jsonplaceholder"],
    github: "https://github.com/amanpandey3956/React-Sales-Dashboard",
    link: "https://dashboard-one-beryl-65.vercel.app/",
    featured: false,

  },
  {
    title: "Nike Landing Page",
    description: "Created an engaging Nike landing page using ReactJS and Tailwind CSS. The site features a visually appealing design that showcases products with responsive layouts and smooth animations. Leveraged Tailwind CSS for rapid styling, ensuring a seamless user experience across devices.",
    tech: ["React", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/amanpandey3956/Nike-Website",
    link: "https://nike-website-sage-eight.vercel.app/",
    featured: false,
  } 
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Projects = () => {
  return (
    <Layout>
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Projects"
            subtitle="A collection of projects I've worked on, from SaaS platforms to projects in observability fields and some of my personal projects "
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`group p-6 rounded-xl glass hover:border-primary/50 transition-all duration-300 flex flex-col ${
                  project.featured ? "md:col-span-1 lg:col-span-1" : ""
                }`}
              >
                {project.featured && (
                  <span className="inline-flex self-start px-2 py-1 text-xs rounded-md bg-primary/20 text-primary font-medium mb-4">
                    Featured
                  </span>
                )}

                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="glass rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-3 gradient-text">More Projects Coming Soon</h3>
              <p className="text-muted-foreground">
                I'm always working on new projects. Check back soon or connect with me on GitHub to see my latest work!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
