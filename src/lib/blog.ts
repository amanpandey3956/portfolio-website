import matter from 'gray-matter';
import type { BlogPost, BlogPostMeta } from '@/types/blog';

// Import all markdown files from the blog content directory
const blogFiles = import.meta.glob('/src/content/blog/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

export function getAllPosts(): BlogPostMeta[] {
  const posts: BlogPostMeta[] = [];

  for (const path in blogFiles) {
    const fileContent = blogFiles[path] as string;
    const { data } = matter(fileContent);
    
    posts.push({
      slug: data.slug || path.split('/').pop()?.replace('.md', '') || '',
      title: data.title || '',
      banner: data.banner || '',
      author: data.author || '',
      authorImage: data.authorImage || '',
      date: data.date || '',
      summary: data.summary || '',
      tags: data.tags || [],
    });
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  for (const path in blogFiles) {
    const fileContent = blogFiles[path] as string;
    const { data, content } = matter(fileContent);
    
    const postSlug = data.slug || path.split('/').pop()?.replace('.md', '') || '';
    
    if (postSlug === slug) {
      return {
        slug: postSlug,
        title: data.title || '',
        banner: data.banner || '',
        author: data.author || '',
        authorImage: data.authorImage || '',
        date: data.date || '',
        summary: data.summary || '',
        tags: data.tags || [],
        content: content,
      };
    }
  }

  return null;
}
