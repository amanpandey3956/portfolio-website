import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllPosts } from "@/lib/blog";
import type { BlogPostMeta } from "@/types/blog";

function BlogCard({ post, index }: { post: BlogPostMeta; index: number }) {
  const content = (
    <>
      {post.banner && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={post.banner}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/60">
            <Calendar size={13} />
            {post.date}
          </span>
        </div>

        <h3 className="font-display mb-3 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-emerald-700">
          {post.title}
        </h3>

        <p className="mb-6 flex-1 text-sm font-medium leading-relaxed text-foreground/70 line-clamp-3">
          {post.summary}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-5">
          <span className="text-sm font-bold text-foreground group-hover:text-emerald-700 transition-colors">
            {post.externalUrl ? "Read on CloudRaft" : "Read Article"}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-foreground transition-colors group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-900/10"
    >
      {post.externalUrl ? (
        <a
          href={post.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full flex-col"
        >
          {content}
        </a>
      ) : (
        <Link to={`/blog/${post.slug}`} className="flex h-full flex-col">
          {content}
        </Link>
      )}
    </motion.article>
  );
}

export function LatestBlogSection() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="latest-blog" className="py-20 md:py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-100/60 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-sky-100/60 rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-6">
        <SectionHeading
          eyebrow="Writing"
          title="Latest Blog Posts"
          subtitle="Practical guides and lessons on DevOps, Kubernetes, and cloud-native engineering — straight from my recent work"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Button
            asChild
            className="group bg-foreground text-background hover:bg-primary hover:text-white text-base rounded-xl px-9 py-6 shadow-lg shadow-zinc-900/10 hover:shadow-emerald-500/25"
          >
            <Link to="/blog">
              View All Blogs
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
