import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  author?: string;
  publishedTime?: string;
  tags?: string[];
}

const BASE_URL = "https://amanpandey-portfolio.vercel.app/"; 

export const SEO = ({
  title = "Aman Pandey | Full Stack Engineer",
  description = "Software Engineer specializing in React, TypeScript, Kubernetes, and Cloud Native technologies. Building scalable web applications and sharing knowledge through technical blogs.",
  keywords = "Aman Pandey, Full Stack Developer, React Developer, TypeScript, Kubernetes, Docker, Cloud Native, Web Development, Frontend Developer, DevOps",
  image = "/projects/myimg.jpg",
  url = BASE_URL,
  type = "website",
  author = "Aman Pandey",
  publishedTime,
  tags = [],
}: SEOProps) => {
  const fullTitle = title.includes("Aman Pandey") ? title : `${title} | Aman Pandey`;
  const fullImageUrl = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    if (type === "profile" || url === BASE_URL || url === `${BASE_URL}/`) {
      return {
        ...baseData,
        "@type": "Person",
        name: "Aman Pandey",
        url: BASE_URL,
        image: `${BASE_URL}/projects/myimg.jpg`,
        jobTitle: "Full Stack Engineer",
        worksFor: {
          "@type": "Organization",
          name: "CloudRaft",
        },
        sameAs: [
          "https://github.com/amanpandey3956",
          "https://www.linkedin.com/in/amanpandey1213/",
        ],
        knowsAbout: [
          "React",
          "TypeScript",
          "Kubernetes",
          "Docker",
          "RHCSA",
          "Prometheus",
          "Opentelemetry",
          "Cloud Native",
          "Web Development",
        ],
      };
    }

    if (type === "article") {
      return {
        ...baseData,
        "@type": "BlogPosting",
        headline: title,
        description,
        image: fullImageUrl,
        author: {
          "@type": "Person",
          name: author,
          url: BASE_URL,
        },
        publisher: {
          "@type": "Person",
          name: "Aman Pandey",
          url: BASE_URL,
        },
        datePublished: publishedTime,
        keywords: tags.join(", "),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
      };
    }

    return {
      ...baseData,
      "@type": "WebSite",
      name: "Aman Pandey Portfolio",
      url: BASE_URL,
      description,
      author: {
        "@type": "Person",
        name: "Aman Pandey",
      },
    };
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type === "article" ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Aman Pandey Portfolio" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {tags.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@amanpandey39563" />

      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Helmet>
  );
};
