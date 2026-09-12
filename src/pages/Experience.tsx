import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, Building2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { SEO } from "@/components/SEO";
import { HireMeButton } from "@/components/ui/hire-me-button";

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

const chipClass =
  "inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/70 bg-white border border-zinc-200 px-3 py-1 rounded-full";

const Experience = () => {
  return (
    <Layout>
      <SEO
        title="Experience"
        description="Professional experience as a Full Stack Engineer at CloudRaft, working with React, TypeScript, and cloud technologies. View my work history and education."
        keywords="DevOps Engineer, Full Stack Engineer, CloudRaft, React Developer, TypeScript, Work Experience, Software Engineer, Frontend Developer"
        url="https://amanpandey-portfolio.vercel.app/experience"
      />
      <section className="py-16 md:py-20 min-h-screen relative overflow-hidden bg-muted">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/50 rounded-full blur-[130px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-200/50 rounded-full blur-[110px]" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeading
            title="Experience"
            subtitle="My professional journey and educational background"
          />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
                <Briefcase size={22} />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Work Experience</h2>
            </div>

            <div className="self-start sm:self-auto">
              <HireMeButton />
            </div>
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
                className="relative md:pl-12"
              >
                <div className="absolute left-0 top-8 bottom-0 w-px bg-zinc-300 hidden md:block" />
                <div className="absolute -left-[7px] md:left-0 top-8 w-4 h-4 rounded-full border-4 border-[#F6F8F7] bg-emerald-500 hidden md:block" />

                <div className="rounded-2xl border-2 border-zinc-200 bg-white shadow-sm hover:shadow-xl hover:shadow-zinc-900/10 hover:border-zinc-300 transition-all duration-300 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                        <h3 className="font-display text-xl font-bold text-foreground">
                          {exp.title}
                        </h3>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 font-bold text-emerald-700">
                        <Building2 size={16} />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={chipClass}>
                        <Calendar size={14} className="text-emerald-600" />
                        {exp.period}
                      </span>
                      <span className={chipClass}>
                        <MapPin size={14} className="text-sky-600" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-100 pt-5">
                    <ul className="space-y-3.5">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[15px] font-medium text-foreground/75 leading-relaxed"
                        >
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background">
              <GraduationCap size={22} />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Education</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {education.map((edu) => (
              <motion.div
                key={edu.title}
                variants={itemVariants}
                className="rounded-2xl border-2 border-zinc-200 bg-white shadow-sm hover:shadow-xl hover:shadow-zinc-900/10 hover:border-zinc-300 transition-all duration-300 p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {edu.title}
                    </h3>
                    <p className="font-bold text-emerald-700 mb-4">{edu.institution}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={chipClass}>
                        <Calendar size={14} className="text-sky-600" />
                        {edu.period}
                      </span>
                      <span className={chipClass}>
                        <MapPin size={14} className="text-sky-600" />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                  <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white font-bold text-sm self-start md:self-auto">
                    {edu.details}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Experience;