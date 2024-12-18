import type { Route } from "./+types/blog";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Austin's Blog" },
    { name: "description", content: "Welcome to Austin's Blog!" },
  ];
}

export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-red-500">
        Blog
      </h1>
    </>
  );
}