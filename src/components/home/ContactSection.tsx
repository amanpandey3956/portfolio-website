import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Linkedin, Github, Copy, Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/ui/section-heading";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const purposeOptions = [
  { value: "job-opportunity", label: "Job Opportunity" },
  { value: "freelance", label: "Freelance Project" },
  { value: "collaboration", label: "Collaboration" },
  { value: "general", label: "General Inquiry" },
];

const email = "amanpnd01@gmail.com";

const socials = [
  { icon: Github, href: "https://github.com/amanpandey3956", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/amanpandey1213/", label: "LinkedIn" },
];

const inputClass =
  "h-12 bg-white border-zinc-300 text-foreground placeholder:text-foreground/40 focus:border-emerald-500 focus-visible:border-emerald-500 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0";

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast({
        title: "Email copied!",
        description: email,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the email manually",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("purpose", purpose);

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!accessKey) {
      toast({
        title: "Configuration error",
        description: "Web3Forms API key is missing.",
      });
      setIsLoading(false);
      return;
    }

    formData.append("access_key", accessKey);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon!",
        });
        form.reset();
        setPurpose("");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isRecruiter = purpose === "job-opportunity";

  return (
    <section id="contact" className="py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a04_1px,transparent_1px),linear-gradient(to_bottom,#0f172a04_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-100/50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          subtitle="Whether you're a recruiter, collaborator, or have a project in mind — let's connect"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid lg:grid-cols-2 max-w-6xl mx-auto rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl shadow-zinc-900/10"
        >
          <div className="bg-[#0A1F17] p-8 sm:p-12 text-white flex flex-col">
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
                Let's Talk
              </span>
              <h3 className="font-display mt-4 text-3xl sm:text-4xl font-bold leading-tight">
                Have an idea?
                <br />
                Let's build it together.
              </h3>
              <p className="mt-4 text-white/70 leading-relaxed">
                I'm currently open to new opportunities, freelance projects, and
                collaborations in the DevOps, SRE, and cloud-native space.
              </p>

              <div className="mt-8 flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-sm font-bold text-emerald-400">Currently Available</span>
              </div>

              <div className="mt-8 space-y-4">
                <button
                  onClick={handleCopyEmail}
                  className="group flex w-full items-center gap-4 rounded-2xl bg-white/5 border border-white/15 p-4 hover:bg-white/10 transition-colors"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400">
                    {copied ? <Check size={19} /> : <Mail size={19} />}
                  </span>
                  <span className="flex-1 text-left">
                    <span className="block text-xs font-medium text-white/50">Email</span>
                    <span className="block text-sm font-bold">{copied ? "Copied!" : email}</span>
                  </span>
                  <Copy size={16} className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/15 p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/15 text-teal-400">
                    <MapPin size={19} />
                  </span>
                  <span>
                    <span className="block text-xs font-medium text-white/50">Location</span>
                    <span className="block text-sm font-bold">Maharashtra, India</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-xs font-medium text-white/50 mb-4">Find me on</p>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 hover:bg-emerald-400 hover:text-[#0A1F17] hover:border-emerald-400 transition-colors"
                  >
                    <social.icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="purpose" className="text-sm font-bold text-foreground">
                  Purpose of Contact
                </label>
                <Select value={purpose} onValueChange={setPurpose} required>
                  <SelectTrigger className={inputClass}>
                    <SelectValue placeholder="Select a purpose" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-zinc-200">
                    {purposeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-foreground">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Your name" required className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {isRecruiter && (
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-bold text-foreground">
                      Company
                    </label>
                    <Input id="company" name="company" placeholder="Company name" className={inputClass} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-bold text-foreground">
                      Role / Position
                    </label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="e.g. Frontend Engineer"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-foreground">
                  Subject
                </label>
                <Input id="subject" name="subject" placeholder="What's this about?" required className={inputClass} />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={
                    isRecruiter
                      ? "Tell me about the role, team, and what you're looking for..."
                      : "Tell me about your project..."
                  }
                  rows={4}
                  required
                  className="bg-white border-zinc-300 text-foreground placeholder:text-foreground/40 focus:border-emerald-500 focus-visible:border-emerald-500 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-foreground text-background hover:bg-emerald-700 hover:text-white text-base rounded-xl h-12 shadow-lg shadow-zinc-900/10 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}