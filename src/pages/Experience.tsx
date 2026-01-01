import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";

const experiences = [
  {
    title: "Associate Full Stack Engineer",
    company: "CloudRaft",
    location: "Remote",
    period: "April 2025 - Present",
    description: [
      "Developing full-stack applications using React, TypeScript, and Next.js",
      "Building and maintaining Clika MVP SaaS platform with Stripe and OAuth integration",
      "Implementing CloudRaft Service Desk with Supabase backend and real-time features",
      "Collaborating with cross-functional teams to deliver high-quality software solutions",
    ],
    type: "work",
  },
  {
    title: "ReactJS Developer Intern",
    company: "Travel Eco",
    location: "Remote",
    period: "Feb 2025 - March 2025",
    description: [
      "Developed responsive web applications using React and modern JavaScript",
      "Implemented UI components with Tailwind CSS for consistent design",
      "Worked on front-end optimization and performance improvements",
    ],
    type: "work",
  },
  {
    title: "Java Developer Intern",
    company: "Capgemini (FUEL)",
    location: "Maharashtra, India",
    period: "Feb 2024 - May 2024",
    description: [
      "Developed Java-based applications and backend services",
      "Gained experience with enterprise software development practices",
      "Collaborated with senior developers on production code",
    ],
    type: "work",
  },
];

const education = [
  {
    title: "Bachelor of Technology (B.Tech)",
    institution: "Deogiri Institute of Engineering and Management Studies",
    location: "Aurangabad, Maharashtra IN",
    period: "2020 - 2024",
    details: "CGPA: 7.71",
    type: "education",
  },
];

const Experience = () => {
  return (
    <Layout>
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Experience"
            subtitle="My professional journey and educational background"
          />

          {/* Work Experience */}
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-xl font-semibold mb-8"
            >
              <Briefcase className="text-primary" size={24} />
              Work Experience
            </motion.h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />

              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title + exp.company}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative mb-8 pl-12 md:pl-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute top-2 w-3 h-3 rounded-full bg-primary glow-sm left-[10px] md:left-auto ${
                      index % 2 === 0 ? "md:right-[-6px]" : "md:left-[-6px]"
                    }`}
                  />

                  <div className="glass p-6 rounded-xl hover:border-primary/50 transition-all duration-300">
                    <div className={`flex flex-wrap items-center gap-2 mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <span className="text-primary font-semibold">{exp.title}</span>
                    </div>
                    <h4 className="text-lg font-medium text-foreground mb-2">{exp.company}</h4>
                    <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>
                    <ul className={`space-y-2 text-sm text-muted-foreground ${index % 2 === 0 ? "md:text-right" : ""}`}>
                      {exp.description.map((item, i) => (
                        <li key={i} className={`leading-relaxed flex items-start gap-2 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                          <span className="text-primary mt-1.5 text-xs">●</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xl font-semibold mb-8"
            >
              <GraduationCap className="text-primary" size={24} />
              Education
            </motion.h3>

            {education.map((edu, index) => (
              <motion.div
                key={edu.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl max-w-2xl hover:border-primary/50 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-primary mb-1">{edu.title}</h4>
                <p className="text-foreground font-medium mb-2">{edu.institution}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {edu.location}
                  </span>
                  <span className="text-primary font-medium">{edu.details}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Experience;
