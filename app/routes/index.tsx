import type { Route } from "./+types/index";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.VALUE_FROM_CLOUDFLARE };
}

export default function Page({ loaderData }: Route.ComponentProps) {
    return <Welcome message={loaderData.message} />;
}

function Welcome({ message }: { message?: string }) {
    return <div>{message || "Hello World"}</div>;
}