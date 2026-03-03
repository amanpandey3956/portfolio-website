import { motion } from "framer-motion";
import { ArrowRight, Award, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { featuredCertifications, Certification } from "@/data/certifications";

function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
  const Icon = cert.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl overflow-hidden card-hover"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 border-gradient rounded-3xl" />

      <div className="relative p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${cert.color}15` }}>
            <Icon className="w-5 h-5" style={{ color: cert.color }} />
          </div>
        </div>

        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
          {cert.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>

        <div className="mt-auto flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {cert.date}
          </Badge>
          {cert.credentialUrl && cert.credentialUrl !== "#" && (
            <Button variant="link" asChild className="p-0 h-auto text-primary">
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                View Certificate
                <ExternalLink className="ml-1 w-3 h-3" />
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export function CertificationsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            title="Certifications"
            subtitle="Professional certifications and courses"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {featuredCertifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
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
            <Link to="/certifications">
              View All Certifications
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
