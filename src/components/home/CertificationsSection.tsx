import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredCertifications, Certification } from "@/data/certifications";

function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
  const Icon = cert.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col overflow-hidden"
    >
      <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-[100%] bg-emerald-50 group-hover:bg-emerald-100 transition-colors" />

      <div className="relative flex items-center gap-3 mb-5">
        <span
          className="p-2.5 rounded-xl border border-zinc-200 bg-white"
          style={{ backgroundColor: `${cert.color}12` }}
        >
          <Icon className="w-6 h-6" style={{ color: cert.color }} />
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider capitalize">
          <BadgeCheck size={12} />
          {cert.category}
        </span>
      </div>

      <h3 className="font-display text-lg font-bold text-foreground leading-snug mb-1.5 relative">
        {cert.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-5 relative">{cert.issuer}</p>

      <div className="mt-auto pt-5 border-t border-zinc-100 flex items-center justify-between relative">
        <span className="text-xs font-semibold text-muted-foreground">{cert.date}</span>
        {cert.credentialUrl && cert.credentialUrl !== "#" && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-600"
          >
            View Certificate
            <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 md:py-24 relative overflow-hidden bg-[#EDF5F1]">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-200/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-200/40 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          subtitle="Professional certifications that back up my hands-on experience"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCertifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="group text-base rounded-xl px-8 py-6 border-zinc-300 bg-white hover:bg-foreground hover:text-background hover:border-foreground"
          >
            <Link to="/certifications">
              View All Certifications
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}