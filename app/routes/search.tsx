import type { Route } from "./+types/search";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Search | AustinPoor.com" },
    { name: "description", content: "Search for anything on AustinPoor.com" },
  ];
}

export default function Page() {
  return (
    <div className="text-gray-950 dark:text-gray-50">
      <h1 className="text-4xl font-red-500">
        Search
      </h1>
    </div>
  );
}