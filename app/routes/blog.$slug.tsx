import { useMemo, useEffect } from "react";
import moment from "moment";
import { data, Link, redirect } from "react-router";
import type { Route } from "./+types/blog.$slug";
import blogPosts from 'virtual:load-blog-posts';
import { Badge } from "~/components/catalyst/badge";
import { BlogPostMeta } from "~/components/structured-meta";



export function meta({ params }: Route.ComponentProps) {
  const post = blogPosts[params.slug];
  if (!post) {
    console.error("No post data found for slug:", params.slug);
    return;
  }
  return [
    { title: post.front?.title && `${post.front.title} | AustinPoor.com` },
    { name: "description", content: post.front?.description },
    { name: "og:image", content: post.front?.image?.src },
    { name: "og:image:alt", content: post.front?.image?.alt },
    { "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post?.front?.title,
      image: post?.front?.image?.src,
      datePublished: post?.front?.publishDate,
      author: {
        name: "Austin Poor",
        url: "https://austinpoor.com/about",
      },
    }},
  ];
}

export default function Page({ params }: Route.ComponentProps) {
  const post = blogPosts[params.slug];
  const pd = useMemo(() => post?.front?.publishDate ? moment(post.front.publishDate) : null, [post?.front?.publishDate]);
  useEffect(() => {
    if (!post) {
      redirect("/blog");
    }
  }, [post]);
  return (
    <>
      <article className="mx-auto prose dark:prose-invert lg:prose-xl">
        <div className="not-prose">
          <h1 className="text-3xl lg:text-5xl text-gray-950 dark:text-gray-50 mb-1">
            {post.front.title}
          </h1>
          <p className="text-gray-800 dark:text-gray-200 mb-2">
            {post.front.subtitle}
          </p>
          <div 
            className="
              text-sm
              text-gray-700
              dark:text-gray-300
              grid
              grid-cols-1
              gap-1
              mb-4
            "
          >
            <div>
              Written by <Link to="/about" className="hover:underline">Austin Poor</Link> ({post.readTime})
            </div>
            <div>
              {pd && (
                <>
                  {pd.format("MMM DD, YYYY")} ({pd.fromNow()})
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              {post.front.tags?.map((tag: string) => (
                <Badge key={tag} color="zinc">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          {post.front.image && (
            <figure>
              <img src={post.front.image.src} alt={post.front.image.alt} />
              {post.front.image.caption && (
                <figcaption className="text-gray-600 dark:text-gray-400 text-base">
                  {post.front.image.caption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <BlogPostMeta meta={{
        headline: post?.front?.title,
        image: post?.front?.image?.src,
        datePublished: post?.front?.publishDate,
        author: {
          name: "Austin Poor",
          url: "/about",
        },
      }} />
    </>
  );
}
