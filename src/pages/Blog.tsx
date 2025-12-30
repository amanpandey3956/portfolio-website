import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";

const blogPosts = [
  {
    id: "1",
    title: "Building Scalable React Applications with TypeScript",
    excerpt: "Learn best practices for building maintainable and scalable React applications using TypeScript, including proper typing, component patterns, and state management.",
    date: "2024-12-15",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Best Practices"],
  },
  {
    id: "2",
    title: "Getting Started with Supabase for Full-Stack Development",
    excerpt: "A comprehensive guide to using Supabase as your backend, covering authentication, database operations, real-time subscriptions, and storage.",
    date: "2024-11-28",
    readTime: "10 min read",
    tags: ["Supabase", "Backend", "PostgreSQL"],
  },
  {
    id: "3",
    title: "Modern CSS Techniques with Tailwind CSS",
    excerpt: "Explore advanced Tailwind CSS techniques including custom utilities, animations, and building beautiful responsive designs efficiently.",
    date: "2024-11-10",
    readTime: "6 min read",
    tags: ["Tailwind CSS", "CSS", "Design"],
  },
];

const Blog = () => {
  return (
    <Layout>
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Blog"
            subtitle="Thoughts, tutorials, and insights on web development"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 flex flex-col"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
                  {post.title}
                </h2>

                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  <Link to={`/blog/${post.id}`} className="flex items-center gap-1 text-primary hover:underline">
                    Read <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
