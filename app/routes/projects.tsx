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
        <LinkItem to="https://github.com/a-poor/js-in-rs">
          <ItemDate date="2024-09-12" />
          <ItemHeader>
            Running JavaScript in Rust
          </ItemHeader>
          <ItemDescription>
            A demo of running JavaScript in Rust.
          </ItemDescription>
          <ItemTags tags={["rust", "javascript", "wasm"]} />
        </LinkItem>
        <LinkItem to="https://github.com/a-poor/js-in-rs">
          <ItemDate date="2024-09-12" />
          <ItemHeader>
            Running JavaScript in Rust
          </ItemHeader>
          <ItemDescription>
            A demo of running JavaScript in Rust.
          </ItemDescription>
          <ItemTags tags={["rust", "javascript", "wasm"]} />
        </LinkItem>
      </ItemList>
    </>
  );
}

function ProjectCard() {
  return (
    <></>
  );
}

const ProjectTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl font-bold">
    {children}
  </h2>
);

const ProjectDescription = ({ children }: { children: ReactNode }) => (
  <p className="">
    {children}
  </p>
);

const ProjectTags = ({ tags }: { tags: string[] }) => (
  <p className="">
    {tags}
  </p>
);

