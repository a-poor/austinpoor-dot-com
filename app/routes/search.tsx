import type { Route } from "./+types/search";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Search" },
    { name: "description", content: "Search for anything on AustinPoor.com" },
  ];
}

export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-red-500">
        Search
      </h1>
    </>
  );
}