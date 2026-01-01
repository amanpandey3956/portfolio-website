import type { BlogPost, BlogPostMeta } from '@/types/blog';

// Simple frontmatter parser (browser-compatible, no Buffer needed)
function parseFrontmatter(content: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontmatterStr = match[1];
  const markdownContent = match[2];
  const data: Record<string, any> = {};
  
  // Parse YAML-like frontmatter
  const lines = frontmatterStr.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    
    // Handle quoted strings
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Handle arrays (simple case: ["item1", "item2"])
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        data[key] = JSON.parse(value);
      } catch {
        data[key] = value;
      }
    } else {
      data[key] = value;
    }
  }
  
  return { data, content: markdownContent };
}

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
    const { data } = parseFrontmatter(fileContent);
    
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
    const { data, content } = parseFrontmatter(fileContent);
    
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
