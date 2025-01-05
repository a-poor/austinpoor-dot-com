import type { Route } from "./+types/_index";
import { Link } from "react-router";
import { GithubLogo, LinkedinLogo, Butterfly, YoutubeLogo } from '@phosphor-icons/react';
import { useRouteLoaderData } from "react-router";
import blogPosts from "virtual:load-blog-posts";
import { useMemo } from "react";

type BlogPost = {
  slug: string;
  front: {
    title: string;
    subtitle: string;
    description: string;
    image: {
      src: string;
      alt: string;
      caption: string;
      captionLink: string;
    };
    publishDate: string;
    tags: string[];
    recommended: string[];
  };
  html: string;
  readTime: string;
};

const orderBlogPost = (a: BlogPost, b: BlogPost) => {
  return new Date(b.front.publishDate).getTime() - new Date(a.front.publishDate).getTime();
};

const recentBlogPosts = Object.values(blogPosts as Record<string, BlogPost>).sort(orderBlogPost).slice(0, 3);

export function meta(_: Route.MetaArgs) {
  return [
    { title: "AustinPoor.com" },
    { name: "description", content: "Welcome to AustinPoor.com!" },
    { rel: "canonical", href: "https://austinppoor.com/" },
  ];
}

export default function Page() {
  return (
    <>
      <div className="text-gray-950 dark:text-gray-50">
        <h1 className="text-7xl pb-4">
          Austin Poor
        </h1>
        <p className="text-2xl pb-2">
          Hey! I'm Austin.
        </p>
        <p className="text-2xl pb-2">
          I'm a full-stack software engineer living in Los Angeles, CA.
        </p>
        <div className="w-fit pb-10 grid grid-cols-4 gap-2 items-center">
          <Link to="https://github.com/a-poor">
            <GithubLogo size={36} />
            <span className="sr-only">Github</span>
          </Link>
          <Link to="https://linkedin.com/in/austinpoor">
            <LinkedinLogo size={36} />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link to="https://bsky.app/profile/austinpoor.com">
            <Butterfly size={36} />
            <span className="sr-only">Bluesky</span>
          </Link>
          {/* <Link to="/youtube">
            <YoutubeLogo size={36} />
            <span className="sr-only">YouTube</span>
          </Link> */}
        </div>
        <section className="py-8 text-gray-950 dark:text-gray-50 text-base space-y-2">
          <div className="pb-2">
            <h2 className="text-2xl font-semibold">
              Recent Blog Posts
            </h2>
            <div aria-hidden="true">
              &ndash;&ndash;&ndash;
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentBlogPosts.map((post, i) => (
              <BlogPostPreviewCard 
                key={post.slug} 
                slug={post.slug}
                img={post.front.image}
                title={post.front.title}
                description={post.front.description}
                readTime={post.readTime}
                postDate={post.front.publishDate}
              />
            ))}
          </div>
          <div className="py-2">
            <Link to="/blog" className="hover:underline">
              Go to Blog &rarr;
            </Link>
          </div>
        </section>
        <section className="py-8 text-gray-950 dark:text-gray-50 text-base space-y-2">
          <div className="pb-2">
            <h2 className="text-2xl font-semibold">
              Projects
            </h2>
            <div aria-hidden="true">
              &ndash;&ndash;&ndash;
            </div>
          </div>
          <div className="pb-8 text-gray-950 dark:text-gray-50 text-base space-y-2">
            <p>
              In my free time, I like to build things and experiment with new technologies.
            </p>
            <p>
              Check out my projects page to see more.
            </p>
            <div className="py-2">
              <Link to="/projects" className="hover:underline">
                Go to Projects &rarr;
              </Link>
            </div>
          </div>
        </section>
        <section className="py-8 text-gray-950 dark:text-gray-50 text-base space-y-2">
          <div className="pb-2">
            <h2 className="text-2xl font-semibold">
              About Me
            </h2>
            <div aria-hidden="true">
              &ndash;&ndash;&ndash;
            </div>
          </div>
          <div className="pb-8 text-gray-950 dark:text-gray-50 text-base space-y-2">
            <p className="[&>a]:underline">
              I'm a software engineer living in Los Angeles, CA. I have two dogs, <Link to="/about#sandwich-and-mitch">Sandwich and Mitch</Link>.
            </p>
            <p>
              Check out my about me page to learn more.
            </p>
            <div className="py-2">
              <Link to="/about" className="hover:underline">
                Go to About Me &rarr;
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function BlogPostPreviewCard({slug, title, description, readTime, postDate, img}: {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  postDate: string;
  img: {
    src: string;
    alt: string;
  }
}) {
  const date = useMemo(() => {
    const d = new Date(postDate);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }, [postDate]);
  return (
    <Link
      to={`/blog/${slug}`}
      className="group rounded-2xl overflow-hidden space-y-2 border-2 border-gray-200 dark:border-gray-600 pb-6"
    >
      <div className="overflow-hidden max-h-[350px]">
        <img
          src={img.src}
          alt={img.alt}
          className="object-cover min-w-[350px] min-h-[175px] aspect-[2/1] object-top brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-300"
          height={350}
          />
      </div>
      <h3 className="px-2 text-xl font-semibold">
        {title}
      </h3>
      <p className="px-2 text-base line-clamp-3">
        {description}
      </p>
      <div className="px-2 text-sm text-gray-500 grid grid-cols-2">
        <div>
          {date}
        </div>
        <div className="text-right">
          {readTime}
        </div>
      </div>
    </Link>
  );
}

