import { Link } from "react-router";
import type { Route } from "./+types/about";
import clsx from "clsx";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "About Me | AustinPoor.com" },
    { name: "description", content: "Learn more about Austin" },
    { rel: "canonical", href: "https://austinppoor.com/about" },
  ];
}

export default function Page() {
  return (
    <>
      <div className="pb-8 text-gray-950 dark:text-gray-50">
        <h1 className="pb-4 text-4xl">
          About Me
        </h1>
        <p className="pb-2 text-base">
          A little bit about me.
        </p>
        <div className="py-1 border-b w-14" />
      </div>
      <div className="pb-8 text-gray-950 dark:text-gray-50 text-base space-y-2">
        <div className="pb-6 flex flex-wrap gap-4">
          <figure>
            <img
              src="/images/austin-and-sandwich-350.webp"
              alt="Austin and Sandwich"
              className="max-h-[350px] object-cover rounded-2xl aspect-square"
              width={350}
              height={350}
            />
            <figcaption className="pt-3 text-sm text-gray-500">
              Me and Sandwich
            </figcaption>
          </figure>
        </div>
        <p>
          Hi, I'm Austin! I'm a full-stack software engineer, living in Los Angeles.
        </p>
        <p>
          I work at Command Credit, where I manage the websites, the API, and the infrastructure.
        </p>
        <p className="[&>a]:underline">
          I like writing code in Go, Python, JavaScript/TypeScript, and Rust. And I'm interested in
          learning new things (like AI/LLMs, local-first software, Tauri, Remix, and more), building
          helpful tools, and playing around with code. Check out my <Link to="/blog">blog</Link> or
          my <Link to="/projects">projects</Link> page if you want to see more.
        </p>
        <div id="sandwich-and-mitch">
          <h2 className="mt-8 text-2xl">
            Sandwich and Mitch
          </h2>
          <div aria-hidden="true">
            &ndash;&ndash;&ndash;
          </div>
        </div>
        <div className="pb-6 flex flex-wrap gap-4">
          <figure>
            <img
              src="/images/sandwich-and-mitch-kitchen-350.webp"
              alt="Sandwich and Mitch in the kitchen"
              className="max-h-[350px] object-cover rounded-2xl aspect-square"
              width={350}
              height={350}
            />
            <figcaption className="pt-3 text-sm text-gray-500">
              Sandwich (right) and Mitch (left) in the kitchen
            </figcaption>
          </figure>
        </div>
        <p>
          We have two dogs, Sandwich and Mitch.
        </p>
        <p>
          Sandwich is 11 years old and doesn't have any teeth.
        </p>
        <p>
          Mitch is 2 years old and loves scratches.
        </p>
        <div id="running">
          <h2 className="mt-8 text-2xl">
            Running
          </h2>
          <div aria-hidden="true">
            &ndash;&ndash;&ndash;
          </div>
        </div>
        <div className="pb-6 flex flex-wrap gap-4">
          <figure>
            <img
              src="/images/austin-half-marathon-350.webp"
              alt="Austin after finishing the 2024 San Diego Half-Marathon"
              className="max-h-[350px] object-cover rounded-2xl aspect-square"
              width={350}
              height={350}
            />
            <figcaption className="pt-3 text-sm text-gray-500">
              Me after finishing the 2024 San Diego Half-Marathon
            </figcaption>
          </figure>
        </div>
        <p>
          I've recently started getting into running and I'm training for the 2025 LA Marathon.
        </p>
        <p>
          Here's a picture of me after finishing the 2024 San Diego Half-Marathon.
        </p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Austin Poor",
          url: "https://austinppoor.com/about",
          image: "/images/austin-and-sandwich.webp",
          sameAs: [
            "https://github.com/a-poor",
            "https://linkedin.com/in/austinpoor",
            "https://bsky.app/profile/austinpoor.com",
          ],
        })}}
      />
    </>
  );
}
