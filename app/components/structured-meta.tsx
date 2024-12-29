
export type BlogPostMetaData = {
  headline: string;
  image: string[];
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person';
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

