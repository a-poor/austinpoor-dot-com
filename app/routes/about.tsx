import type { Route } from "./+types/about";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "About Austin" },
    { name: "description", content: "Learn more about Austin" },
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