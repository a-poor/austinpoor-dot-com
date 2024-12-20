import type { Route } from "./+types/search";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Search | AustinPoor.com" },
    { name: "description", content: "Search for anything on AustinPoor.com" },
  ];
}

export default function Page() {
  return (
    <>
      <div className="pb-8 text-gray-950 dark:text-gray-50">
        <h1 className="pb-4 text-4xl">
          Search
        </h1>
        <p className="pb-2 text-base">
          Looking for something?
        </p>
        <div className="py-1 border-b w-14" />
      </div>
      <div className="pb-8 text-gray-950 dark:text-gray-50 text-base space-y-2">
        <p>
          🚧 Coming soon...
        </p>
      </div>
    </>
  );
}