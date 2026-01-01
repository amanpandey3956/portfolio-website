import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { SectionHeading } from "@/components/ui/section-heading";

export function GitHubSection() {
  const theme = {
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <section className="pt-20 pb-10 bg-card/30">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="GitHub Activity"
          subtitle="My coding journey visualized"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex justify-center overflow-x-auto"
        >
          <div className="glass rounded-xl p-6">
            <GitHubCalendar
              username="amanpandey3956"
              theme={theme}
              colorScheme="dark"
              fontSize={12}
              blockSize={12}
              blockMargin={4}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
