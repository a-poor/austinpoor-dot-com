import { data, useLoaderData, useFetcher } from 'react-router';
import type { Route } from './+types/data.theme';
import { themeCookie } from '~/cookies.server';

export async function loader({ request }: Route.LoaderArgs) {
  const cookieData = await themeCookie.parse(request.headers.get("Cookie") ?? "");
  console.log("Cookie data", cookieData);
  const theme = cookieData ?? "system";
  const d = {
    theme,
  };
  console.log("Loading theme data", d);
  return data(d, {
    headers: {
      "Set-Cookie": await themeCookie.serialize(theme),
    },
  });
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log("Got request data", Array.from(formData.keys()));
  const theme = formData.get("theme");
  console.log("Setting theme", theme);
  return data({ theme }, {
    headers: {
      "Set-Cookie": await themeCookie.serialize(theme),
    },
  });
}

export default function Page() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  return (
    <>
      <div className="flex flex-col gap-2">
        <button onClick={() => fetcher.submit({ theme: "light" }, { method: "post" })}>Light</button>
        <button onClick={() => fetcher.submit({ theme: "dark" }, { method: "post" })}>Dark</button>
        <button onClick={() => fetcher.submit({ theme: "system" }, { method: "post" })}>System</button>
      </div>
      {JSON.stringify(data, null, 2)}
    </>
  );
}