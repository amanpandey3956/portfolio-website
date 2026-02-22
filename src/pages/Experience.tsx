import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, Building2, Mail, Linkedin, ArrowUpRight, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { SEO } from "@/components/SEO";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const experiences = [
  {
    title: "Associate Full Stack Engineer",
    company: "CloudRaft",
    location: "Remote",
    period: "April 2025 - Present",
    description: [
      "Led frontend development for a client SaaS MVP platform, converted Figma designs into responsive UI using React.js, TypeScript, Tailwind CSS.",
      "Integrated all major backend APIs including authentication (email/password, Google OAuth), Stripe APIs to manage user subscriptions, plan tiers, payment methods, and automatic billing workflows, logs/metrics APIs for getting live status of running and existing jobs.",
      "Utilized Redux for state management to handle complex user and subscription flows. Additionally wrote frontend tests cases using Jest and React Testing Library to ensure component stability and correctness.",
      "Improved the performance of the website by 60% (Next.js + TypeScript + Tailwind CSS)",
      "Resolved major JavaScript errors on the website, added new landing pages, and enhanced mobile responsiveness for better user experience.",
    ],
    type: "work",
    current: true,
  },
  {
    title: "ReactJS Developer Intern",
    company: "Travel Eco",
    location: "Remote",
    period: "Feb 2025 - March 2025",
    description: [
      "Developed a secure Admin Authentication System using Firebase Two-Factor Authentication (2FA) and React Redux for state management. Utilized TypeScript for type safety and Clean Architecture for files and folder structure, ensuring maintainable and scalable code.",
      "Built a fully responsive Admin Dashboard featuring data visualization using Recharts for bar charts and various dashboard stats. Implemented a scalable Rides Management System with clear UI for filtering, searching, and exporting ride records.",
      "Integrated React Pro Sidebar and React Router v6+ for smooth navigation and dynamic route handling using nested layouts. Applied Tailwind CSS for rapid UI development, focusing on consistency and responsiveness across laptop screens",
    ],
    type: "work",
    current: false,
  },
  {
    title: "Java Developer Intern",
    company: "Capgemini (FUEL)",
    location: "Maharashtra, India",
    period: "Feb 2024 - May 2024",
    description: [
      "Developed applications using Core Java, applying OOP principles (inheritance, polymorphism, encapsulation).",
      "Managed and manipulated data with MySQL, performing database design and SQL queries.",
    ],
    type: "work",
    current: false,
  },
];

const education = [
  {
    title: "Bachelor of Technology (B.Tech)",
    institution: "Deogiri Institute of Engineering and Management Studies",
    location: "Aurangabad, Maharashtra",
    period: "2020 - 2024",
    details: "CGPA: 7.71",
    type: "education",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Experience = () => {
  const [isHireMeOpen, setIsHireMeOpen] = useState(false);

  return (
    <Layout>
      <SEO
        title="Experience"
        description="Professional experience as a Full Stack Engineer at CloudRaft, working with React, TypeScript, and cloud technologies. View my work history and education."
        keywords="Full Stack Engineer, CloudRaft, React Developer, TypeScript, Work Experience, Software Engineer, Frontend Developer"
        url="https://amanpandey-portfolio.vercel.app/experience"
      />
      <section className="py-20 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-cyan-500/3 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeading
            title="Experience"
            subtitle="My professional journey and educational background"
          />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="p-2.5 rounded-xl bg-primary/10 backdrop-blur-sm">
              <Briefcase className="text-primary" size={22} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Work Experience</h2>
            
            <motion.button
              onClick={() => setIsHireMeOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 transition-all duration-300 group-hover:from-violet-500 group-hover:via-purple-500 group-hover:to-indigo-500" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <Sparkles className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Hire Me</span>
            </motion.button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 mb-20"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title + exp.company}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute -left-3 top-8 w-6 h-6 rounded-full border-2 border-primary/50 bg-background/80 backdrop-blur-sm z-10 hidden md:flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="absolute left-0 top-14 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden md:block" />

                <div className="relative rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 backdrop-blur-xl bg-background/40 dark:bg-background/30" />
                  <div className="absolute inset-0 border border-white/10 dark:border-white/5 rounded-2xl" />
                  <div className="absolute inset-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-2xl" />
                  
                  <div className="relative p-6 md:p-8">
                    <div className="flex flex-col gap-4 mb-5">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          {exp.current && (
                            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 backdrop-blur-sm text-primary text-xs font-medium border border-primary/20">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                              </span>
                              Current
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap md:items-end gap-2">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary/50 backdrop-blur-sm px-3 py-1 rounded-full">
                            <Calendar size={14} className="text-primary" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary/50 backdrop-blur-sm px-3 py-1 rounded-full">
                            <MapPin size={14} className="text-cyan-400" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <Building2 size={16} />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 dark:border-white/5 pt-5">
                      <ul className="space-y-3">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-cyan-400 mt-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="p-2.5 rounded-xl bg-cyan-500/10 backdrop-blur-sm">
              <GraduationCap className="text-cyan-400" size={22} />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Education</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {education.map((edu, index) => (
              <motion.div
                key={edu.title}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 backdrop-blur-xl bg-background/40 dark:bg-background/30" />
                  <div className="absolute inset-0 border border-white/10 dark:border-white/5 rounded-2xl" />
                  <div className="absolute inset-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-2xl" />
                  
                  <div className="relative p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-cyan-400 transition-colors mb-1">
                          {edu.title}
                        </h3>
                        <p className="text-primary font-medium mb-4">{edu.institution}</p>
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary/50 backdrop-blur-sm px-3 py-1 rounded-full">
                            <Calendar size={14} className="text-cyan-400" />
                            <span>{edu.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-secondary/50 backdrop-blur-sm px-3 py-1 rounded-full">
                            <MapPin size={14} className="text-cyan-400" />
                            <span>{edu.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-primary/10 backdrop-blur-sm text-cyan-400 font-semibold border border-cyan-400/20">
                        <span>{edu.details}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Dialog open={isHireMeOpen} onOpenChange={setIsHireMeOpen}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle className="text-xl">Let's Work Together</DialogTitle>
            <DialogDescription>
              I'm open to new opportunities. Let's connect!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <a
              href="mailto:amanpnd01@gmail.com"
              onClick={() => setIsHireMeOpen(false)}
              className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5 text-violet-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">Email Me</p>
                <p className="text-sm text-muted-foreground">amanpnd01@gmail.com</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            
            <a
              href="https://www.linkedin.com/in/amanpandey1213/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsHireMeOpen(false)}
              className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Linkedin className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">LinkedIn</p>
                <p className="text-sm text-muted-foreground">Connect professionally</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Experience;
