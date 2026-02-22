import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, Search, X, FileText, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllPosts } from "@/lib/blog";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const Blog = () => {
  const posts = getAllPosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags))).sort();

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  const totalCount = filteredPosts.length;

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  return (
    <Layout>
      <SEO 
        title="Blog"
        description="Thoughts, tutorials and my learnings from Kubernetes, AI, Observability, DevOps and Web Development."
        keywords="Docker Tutorial, Kubernetes Blog, Redux Toolkit Blog, React Blog, Cloud Native, DevOps Blog, Web Development"
        url="https://amanpandey-portfolio.vercel.app/blog"
      />
      <section className="py-20 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
        </div>

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title="Blog"
              subtitle="Thoughts, tutorials, and insights on web development, Kubernetes, Cloud Native, and Observability."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 h-14 text-lg bg-card/60 backdrop-blur-xl border-border/50 rounded-2xl focus:border-primary focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary/80 text-secondary-foreground hover:bg-secondary border border-border/50"
                }`}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-full text-sm font-medium bg-secondary/80 text-secondary-foreground hover:bg-destructive/10 hover:text-destructive border border-border/50 transition-all duration-200"
              >
                Clear all
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span>{totalCount} Article{totalCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-500" />
              <span>{allTags.length} Topics</span>
            </div>
          </motion.div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/80 mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post) => (
                  <motion.article
                    key={post.slug}
                    variants={itemVariants}
                    layout
                    exit="exit"
                    whileHover={{ y: -5 }}
                    className="group glass rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col"
                  >
                    {post.banner && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.banner}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-2 py-1 text-xs rounded-md font-medium cursor-pointer transition-all duration-200 ${
                              selectedTags.includes(tag)
                                ? "bg-primary/20 text-primary border border-primary/30"
                                : "bg-primary/10 text-primary hover:bg-primary/20"
                            }`}
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
                        {post.externalUrl ? (
                          <a
                            href={post.externalUrl}
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            Read <ArrowRight size={14} />
                          </a>
                        ) : (
                          <Link
                            to={`/blog/${post.slug}`}
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            Read <ArrowRight size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
