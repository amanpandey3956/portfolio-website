import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
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

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [purpose, setPurpose] = useState("");
  const { toast } = useToast();

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
    <section className="pt-20 pb-28 bg-card/30">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="Get In Touch"
          subtitle="Whether you're a recruiter, collaborator, or have a project in mind — let's connect"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="purpose" className="text-sm font-medium text-foreground">
                Purpose of Contact
              </label>
              <Select value={purpose} onValueChange={setPurpose} required>
                <SelectTrigger className="bg-card border-border focus:ring-0 focus:ring-offset-0 focus:border-primary">
                  <SelectValue placeholder="Select a purpose" />
                </SelectTrigger>
                <SelectContent className="bg-card z-50 border-border focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary">
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
                  className="bg-card border-border focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
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
                  className="bg-card border-border focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
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
                    className="bg-card border-border focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
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
                    className="bg-card border-border focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
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
                className="bg-card border-border focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
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
                className="bg-card border-border focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary resize-none"
              />
            </div>

            <Button type="submit" size="lg" className="w-full glow" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
