import type { Route } from "./+types/about";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Uses | AustinPoor.com" },
    { name: "description", content: "Austin's tools and gear" },
    { rel: "canonical", href: "https://austinppoor.com/uses/" },
  ];
}

export default function Page() {
  return (
    <>
      <div className="pb-8 text-gray-950 dark:text-gray-50">
        <h1 className="pb-4 text-4xl">
          Uses
        </h1>
        <p className="pb-2 text-base [&>a]:underline">
          All the gear, software, and configs I <a href="https://uses.tech/" target="_blank" rel="noopener noreferrer">use</a>.
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
