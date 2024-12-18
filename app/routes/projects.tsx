import type { ReactNode } from "react";
import type { Route } from "./+types/projects";
import {
  ItemList,
  LinkItem,
  ItemDate,
  ItemHeader,
  ItemDescription,
  ItemTags,
} from "~/components/item-list";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Projects" },
    { name: "description", content: "Check out Austin's projects!" },
  ];
}

export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-red-500">
        Projects
      </h1>
      <p className="pb-8 text-base">
        Some projects I've worked on and links to learn more about them.
      </p>

      <ItemList>
        <LinkItem to="https://github.com/a-poor/watercooler">
          <ItemDate date="2023-08-29" />
          <ItemHeader>
            WaterCooler
          </ItemHeader>
          <ItemDescription>
            A desktop app for chatting with ChatGPT using the OpenAI API
            &ndash; built with Tauri, Rust, React and Mantine.
          </ItemDescription>
          <ItemTags tags={["rust", "javascript", "chatgpt", "tauri", "react"]} />
        </LinkItem>
        <LinkItem to="https://github.com/a-poor/js-in-rs">
          <ItemDate date="2023-05-04" />
          <ItemHeader>
            Running JavaScript in Rust
          </ItemHeader>
          <ItemDescription>
            A demo of embedding a JavaScript runtime in Rust using Deno.
          </ItemDescription>
          <ItemTags tags={["rust", "javascript", "deno"]} />
        </LinkItem>
        <LinkItem to="https://github.com/a-poor/openai-stream-rust-demo">
          <ItemDate date="2023-05-26" />
          <ItemHeader>
            Streaming ChatGPT API Responses in Rust
          </ItemHeader>
          <ItemDescription>
            A demo of streaming ChatGPT API responses in Rust.
          </ItemDescription>
          <ItemTags tags={["rust", "ai", "chatgpt", "async"]} />
        </LinkItem>
        <LinkItem to="https://github.com/a-poor/color-palettes">
          <ItemDate date="2021-01-27" />
          <ItemHeader>
            Generating Color Palettes with AI
          </ItemHeader>
          <ItemDescription>
            Using traditional machine learning techniques &ndash; like k-means
            and agglomerative clustering &ndash; to generate color palettes
            from film stills.
          </ItemDescription>
          <ItemTags tags={["ai", "clustering", "python"]} />
        </LinkItem>
      </ItemList>
    </>
  );
}

// https://github.com/a-poor/flask-celery-ml
// https://github.com/a-poor/vhttp
// https://github.com/a-poor/apoor-ssh