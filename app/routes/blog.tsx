import type { Route } from "./+types/blog";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Austin's Blog" },
    { name: "description", content: "Welcome to Austin's Blog!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_CLOUDFLARE };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <div className="text-2xl font-red-500">
      {loaderData.message || "Hello World"}
    </div>
  );
}