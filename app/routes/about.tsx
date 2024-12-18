import type { Route } from "./+types/about";
import { Footer } from "~/components/footer";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "About Austin" },
    { name: "description", content: "Learn more about Austin" },
  ];
}

export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-red-500">
        About Austin
      </h1>
    </>
  );
}