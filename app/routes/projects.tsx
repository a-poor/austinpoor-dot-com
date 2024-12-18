import type { ReactNode } from "react";
import type { Route } from "./+types/projects";

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
      <p>
      </p>
      <div>
      </div>
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

