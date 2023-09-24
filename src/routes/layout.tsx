import { component$, Slot, useContextProvider, useSignal, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { 
  routeLoader$, 
  type RequestHandler,
} from "@builder.io/qwik-city";

import { PlatformIsMacContext } from "~/routes/PlatformIsMacContext";
import { PortalProviderContext } from "~/routes/PortalProvider";
import { SearchModal } from "~/components/search-modal/search-modal";
import { BackgroundColor } from "~/components/background-color/background-color";
import Footer  from "~/components/footer/footer";

import { animate } from "motion";
import hotkeys from 'hotkeys-js';


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

const SearchPortalBackground = component$(() => {
  const portalOpen = useContext(PortalProviderContext);
  useVisibleTask$(() => {
    animate("#search-portal-background",
      {
        opacity: [0, 1],
      },
      { duration: 0.05 },
    );
  });
  return (
    <div 
      id="search-portal-background"
      class="absolute z-10 inset-0 bg-mauved-700/50 flex items-center justify-center opacity-0" 
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
      <Slot />
    </div>
  );
});

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

  useVisibleTask$(() => {
    hotkeys('ctrl+k, command+k, esc', function (event, handler){
      switch (handler.key) {
      case 'ctrl+k': 
      case 'command+k': 
        event.preventDefault();
        portalOpen.value = true;
        window.scrollTo(0, 0);
        break;
      case 'esc':
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
        break;
      default: 
        alert(event);
      }
    });    
  });
  
  return (
    <>
      <Slot />
      <BackgroundColor />
      <Footer />
      
      {portalOpen.value && (
        <SearchPortalBackground>
          <SearchModal />
        </SearchPortalBackground>
      )}
    </>
  );
});
