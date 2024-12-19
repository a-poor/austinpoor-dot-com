import type { Route } from "./+types/about";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Uses | AustinPoor.com" },
    { name: "description", content: "Austin's tools and gear" },
  ];
}

export default function Page() {
  return (
    <div className="text-gray-950 dark:text-gray-50">
      <h1 className="text-4xl font-red-500">
        Uses
      </h1>
    </div>
  );
}