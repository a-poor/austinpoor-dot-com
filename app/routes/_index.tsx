import type { Route } from "./+types/_index";
import { AppLayout } from "~/components/app-layout";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "AustinPoor.com" },
    { name: "description", content: "Welcome to AustinPoor.com!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_CLOUDFLARE };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <AppLayout>
      <div className="text-2xl font-red-500">{loaderData.message || "Hello World"}</div>
    </AppLayout>
  );
}