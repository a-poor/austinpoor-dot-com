import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { AppLayout } from "~/components/app-layout";
import type { Theme } from "~/components/theme-picker";
import { themeCookie } from "~/cookies.server";
import { Footer } from "~/components/footer";

const IS_PROD = import.meta.env.PROD;

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: "/favicon.svg" },
  { rel: "sitemap", type: "application/xml", title: "Sitemap", href: "sitemap.xml" },
];

export function headers(_: Route.HeadersArgs) {
  return {
    'Document-Policy': 'js-profiling',
  };
}


export async function loader({ request }: Route.LoaderArgs) {
  const cookieData = await themeCookie.parse(request.headers.get("Cookie") ?? "");
  let theme: Theme = "system";
  if (cookieData === "light" || cookieData === "dark") {
    theme = cookieData;
  }
  return data({ theme }, {
    headers: {
      "Set-Cookie": await themeCookie.serialize(theme),
    },
  });
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const ftheme = formData.get("theme");
  let theme: Theme = "system";
  if (ftheme === "light" || ftheme === "dark") {
    theme = ftheme;
  }
  return data({ theme }, {
    headers: {
      "Set-Cookie": await themeCookie.serialize(theme),
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {IS_PROD && (
          <PlausibleStuff />
        )}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const setTheme = (theme: Theme) => {
    fetcher.submit({ theme }, { method: "post" });
  };
  return (
    <div className={["light", "dark"].includes(theme) ? theme : undefined}>
      <AppLayout theme={theme} setTheme={setTheme}>
        <Outlet />
      </AppLayout>
      <Footer />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

function PlausibleStuff() {
  return (
    <>
      <script
        defer 
        id="plausible-script"
        data-domain="austinpoor.com"
        src="https://plausible.io/js/script.outbound-links.tagged-events.js"
      ></script>
      <script dangerouslySetInnerHTML={{
        __html: `
          window.plausible = window.plausible || function() { 
            (window.plausible.q = window.plausible.q || []).push(arguments) 
          }
        `,
      }}></script>
    </>
  );
}
