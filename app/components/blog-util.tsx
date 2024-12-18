import type { ReactNode } from "react";
import { BlogPostMeta } from "./structured-meta";

export const BlogTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <h1>
    <span className="block prose-h1">
      {title}
    </span>
    {subtitle && (
      <span className="block prose-h2">
        {subtitle}
      </span>
    )}
  </h1>
);

export const BlogSubtitle = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl font-bold">
    {children}
  </h2>
);

export const BlogDescription = ({ children }: { children: ReactNode }) => (
  <p className="text-base">
    {children}
  </p>
);

export const BlogHeaderImage = ({ src, alt, children }: { src: string, alt: string, children?: ReactNode }) => (
  <figure className="w-full h-auto">
    <img src={src} alt={alt} className="w-full h-auto" />
    {children && (
      <figcaption className="text-sm text-gray-500">
        {children}
      </figcaption>
    )}
  </figure>
);

export const BlogHeaderMeta = ({ title, imgSrc, published }: { title: string, imgSrc: string, published: string }) => (
  <BlogPostMeta meta={{
    headline: title,
    image: [imgSrc],
    datePublished: published,
    author: {
      name: "Austin Poor",
      url: "https://austinpoor.com/about",
    },
  }} />
);

export const BlogTags = ({ tags }: { tags: string[] }) => (
  <div></div>
);

export const BlogHeader = ({ title, imgSrc, published }: { title: string, imgSrc: string, published: string }) => (
  <>
    <BlogHeaderMeta title={title} imgSrc={imgSrc} published={published} />
    <BlogHeaderImage src={imgSrc} alt={title} />
  </>
);

export const BlogRecs = ({}: {}) => (
  <div></div>
);


