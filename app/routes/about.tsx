import type { Route } from "./+types/about";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "About Me | AustinPoor.com" },
    { name: "description", content: "Learn more about Austin" },
  ];
}

export default function Page() {
  return (
    <div className="text-gray-950 dark:text-gray-50">
      <h1 className="text-4xl font-red-500">
        About Austin
      </h1>
    </div>
  );
}