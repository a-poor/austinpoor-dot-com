import { Link } from "react-router";
import type { Route } from "./+types/about";
import clsx from "clsx";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "About Me | AustinPoor.com" },
    { name: "description", content: "Learn more about Austin" },
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
          <img
            src="/images/austin-and-sandwich-800x800.webp"
            alt="Austin and Sandwich"
            className="max-h-[350px] object-cover rounded-2xl aspect-square"
          />
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
        <div>
          <h2 className="mt-8 text-2xl">
            Running
          </h2>
          <div aria-hidden="true">
            &ndash;&ndash;&ndash;
          </div>
        </div>
        <div className="pb-6 flex flex-wrap gap-4">
          <img
            src="/images/austin-half-marathon-800x1067.webp"
            alt="Austin and Sandwich"
            className="max-h-[350px] object-cover rounded-2xl aspect-square"
          />
        </div>
        <p>
          I've recently started getting into running and I'm training for the 2025 LA Marathon.
        </p>
        <p>
          Here's a picture of me after finishing the 2024 San Diego Half-Marathon.
        </p>
        <div>
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
              src="/images/sandwich-and-mitch-kitchen-800x800.webp"
              alt="Sandwich and Mitch in the kitchen"
              className="max-h-[350px] object-cover rounded-2xl aspect-square"
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
      </div>
    </>
  );
}

/**
I'm a full-stack software engineer with a bit of an unconventional path to tech. Before diving into software engineering, I actually worked in the animation industry as an Executive Creative Director's assistant. It was an amazing experience where I got to dabble in everything from stop-motion animation to creating VR holiday cards for clients. Being on set and helping with various creative projects taught me how to think outside the box and work collaboratively – skills that still serve me well today.

What I'm Up To Now
These days, you'll find me at Command Credit, where I wear multiple hats as a full-stack engineer. I work on everything from our websites and APIs to our AWS infrastructure. I code primarily in Go, Python, JavaScript/TypeScript, and Rust. Before landing here, I did some freelance work in programming and data analysis after completing an intensive Data Science bootcamp. Oh, and somewhere in there I went back to school and got my Computer Science degree!
Life Outside of Code
When I'm not coding, I'm probably out running through the streets of Los Angeles, training for the 2025 LA Marathon. It's a new challenge I've taken on this year, and I'm loving every (sweaty) minute of it.
Home is where you'll find me with my two terriers – Sandwich (11) and Mitch (2). They're scruffy, loud, and absolutely the best debugging partners anyone could ask for. They may not write code, but they're experts at reminding me when it's time to take a break!
 */