import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { certifications, Certification } from "@/data/certifications";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
  const Icon = cert.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-3xl overflow-hidden card-hover"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 border-gradient rounded-3xl" />

      <div className="relative p-8 h-full flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${cert.color}15` }}>
              <Icon className="w-6 h-6" style={{ color: cert.color }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <Badge variant="secondary">
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

const Certifications = () => {
  return (
    <Layout>
      <SEO
        title="Certifications | Aman Pandey"
        description="Professional certifications and courses by Aman Pandey including AWS, RHCSA, Kubernetes, and more."
      />
      
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Certifications
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and courses that validate my expertise in cloud computing, 
              DevOps, and software development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Certifications;
