import { component$, Slot, useContextProvider } from "@builder.io/qwik";
import { 
  routeLoader$, 
  type RequestHandler,
} from "@builder.io/qwik-city";
import { PlatformIsMacContext } from "~/routes/PlatformIsMacContext";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useIsMac = routeLoader$(async (requestEvent)  => {
  const userAgent = requestEvent.request.headers.get("user-agent");
  return userAgent && userAgent.toLowerCase().includes("mac");
});

export default component$(() => {
  const isMac = useIsMac();
  useContextProvider(PlatformIsMacContext, isMac);
  return <Slot />;
});
