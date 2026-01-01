import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllPosts } from "@/lib/blog";

const Blog = () => {
  const posts = getAllPosts();

  return (
    <Layout>
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Blog"
            subtitle="Thoughts, tutorials, and insights on web development, Kubernetes, Cloud Native, and Observability."
          />

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group glass rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col"
                >
                  {post.banner && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.banner}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-3">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                      {post.summary}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        Read <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
