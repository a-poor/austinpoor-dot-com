import { component$, Slot, useContextProvider, useOnWindow, $, useSignal } from "@builder.io/qwik";
import { 
  routeLoader$, 
  type RequestHandler,
} from "@builder.io/qwik-city";
import { PlatformIsMacContext } from "~/routes/PlatformIsMacContext";
import { PortalProviderContext } from "~/routes/PortalProvider";
import { SearchModal } from "~/components/search-modal/search-modal";
import { animate } from "motion";

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
  // Detect the mac-ness of the user's platform...
  const isMac = useIsMac();
  const portalOpen = useSignal(false);

  // And store it in a context provider...
  useContextProvider(PlatformIsMacContext, isMac);
  useContextProvider(PortalProviderContext, portalOpen);

  // Detect hotkeys to open/close the portal...
  useOnWindow('keydown',  $((e) => {
    const { key, ctrlKey, metaKey } = e as KeyboardEvent;
    const pressedOnMac = isMac.value && metaKey && key === "k";
    const pressedOnNotMac = !isMac.value && ctrlKey && key === "k";
    
    if (pressedOnMac || pressedOnNotMac) {
      portalOpen.value = true;
      window.scrollTo(0, 0);
    }
    if (key === "Escape") {
      animate("#search-modal",
        {
          opacity: [1, 0],
          scale: [1, 0.9],
          y: [0, 20],
        },
        { duration: 0.05 },
      ).finished.then(() => {
        portalOpen.value = false;
      });
    }
  }));
  return (
    <>
      <Slot />
      {portalOpen.value && (
        <div 
          class="absolute z-10 inset-0 bg-mauved-700/50 flex items-center justify-center" 
          onClick$={() => {
            animate("#search-modal",
              {
                opacity: [1, 0],
                scale: [1, 0.9],
                y: [0, 20],
              },
              { duration: 0.05 },
            ).finished.then(() => {
              portalOpen.value = false;
            });
          }}
        >
          <SearchModal />
        </div>
      )}
    </>
  );
});
