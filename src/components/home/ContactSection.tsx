import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Mail, MapPin, Linkedin, Instagram, Github, Twitter, MessageSquare, ArrowUpRight, Copy, Check } from "lucide-react";
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

const socialLinks = [
  { icon: Github, href: "https://github.com/amanpandey3956", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/amanpandey1213/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/aman_pandey_39563/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/amanpandey39563", label: "Twitter" },
];

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
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 mesh-gradient-strong opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            title="Get In Touch"
            subtitle="Whether you're a recruiter, collaborator, or have a project in mind — let's connect"
          />
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col justify-between gap-6"
          >
            <div className="p-6 rounded-2xl border-gradient card-hover">
              <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <MessageSquare size={20} className="text-primary" />
                Let's Connect
              </h3>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                  className="group"
                >
                  <button
                    onClick={handleCopyEmail}
                    className="hidden md:flex w-full items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      {copied ? <Check size={18} className="text-green-500" /> : <Mail size={18} className="text-primary" />}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-xs text-muted-foreground">Email</div>
                      <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {copied ? "Copied!" : email}
                      </div>
                    </div>
                    <Copy size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <a
                    href={`mailto:${email}`}
                    className="md:hidden flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">Email</div>
                      <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {email}
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="group"
                >
                  <div className="flex items-center gap-4 p-3 rounded-xl">
                    <div className="p-2 rounded-lg bg-cyan-500/10">
                      <MapPin size={18} className="text-cyan-500" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Location</div>
                      <div className="text-sm font-medium text-foreground">Maharashtra, India</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border-gradient card-hover">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Find me on
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-xl bg-card/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-200 group"
                    title={social.label}
                  >
                    <social.icon size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                  </motion.a>
                ))}
                <motion.button
                  onClick={handleCopyEmail}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: socialLinks.length * 0.1 }}
                  className="hidden md:flex p-3 rounded-xl bg-card/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-200 group"
                  title="Copy email"
                >
                  {copied ? (
                    <Check size={20} className="text-green-500" />
                  ) : (
                    <Mail size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </motion.button>
                <motion.a
                  href={`mailto:${email}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: socialLinks.length * 0.1 }}
                  className="md:hidden p-3 rounded-xl bg-card/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-200 group"
                  title="Email"
                >
                  <Mail size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-cyan-500/10 to-teal-500/10 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-foreground">Currently Available</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Open to exciting opportunities in frontend development and cloud-native technologies.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 flex"
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl border-gradient card-hover space-y-6 w-full flex flex-col justify-between">
              <div className="space-y-2">
                <label htmlFor="purpose" className="text-sm font-medium text-foreground">
                  Purpose of Contact
                </label>
                <Select value={purpose} onValueChange={setPurpose} required>
                  <SelectTrigger className="bg-card/50 border-border/50 focus:ring-0 focus:ring-offset-0 focus:border-primary h-12">
                    <SelectValue placeholder="Select a purpose" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {purposeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="bg-card/50 border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-card/50 border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary h-12"
                  />
                </div>
              </div>

              {isRecruiter && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-foreground">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Company name"
                      className="bg-card/50 border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium text-foreground">
                      Role / Position
                    </label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="e.g. Frontend Engineer"
                      className="bg-card/50 border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary h-12"
                    />
                  </div>
                </motion.div>
              )}

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                  className="bg-card/50 border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
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
                  rows={5}
                  required
                  className="bg-card/50 border-border/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary resize-none"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full glow group relative overflow-hidden bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 border-0 h-12" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
