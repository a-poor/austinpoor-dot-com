
export type BlogPostMetaData = {
  headline: string;
  image: string[];
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url: string;
  };
};

export const BlogPostMeta = ({ meta }: { meta: BlogPostMetaData }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    ...meta,
  }) }} />
);

