import { component$, useSignal } from "@builder.io/qwik";
import SearchButton from "~/components/search-button/search-button";

export enum ActiveTab {
  Home = "home",
  Blog = "blog",
  Projects = "projects",
  Uses = "uses",
  About = "about",
}

const navLinks = [
  {
    text: "Home",
    href: "/",
    tab: ActiveTab.Home,
  },
  {
    text: "Blog",
    href: "/blog",
    tab: ActiveTab.Blog,
  },
  {
    text: "Projects",
    href: "/projects",
    tab: ActiveTab.Projects,
  },
  // {
  //   text: "Uses",
  //   href: "/uses",
  //   tab: ActiveTab.Uses,
  // },
  {
    text: "About",
    href: "/about",
    tab: ActiveTab.About,
  },
];

export default component$<{active?: ActiveTab}>(({active}) => {
  const mobileNavOpen = useSignal(false);
  return (
    <header class="sticky top-0 left-0 right-0 backdrop-blur text-mauved-50 py-3 h-[60px]">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-row space-x-2 md:space-x-4 items-center">
          {/* Logo / My Name */}
          <div>
            <a href="/" class="text-xl font-semibold">
              Austin Poor
            </a>
          </div>

          {/* Spacer */}
          <div class="flex-grow"/>
          
          {/* Search Button */}
          <div>
            <SearchButton />
          </div>
          
          {/* Nav links (desktop) */}
          <nav class="hidden md:block" aria-label="Primary">
            <ul class="flex flex-row space-x-1 bg-mauved-100 hover:bg-mauved-50 rounded-md px-2 py-2 group">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href}
                    aria-current={active === link.tab ? "page" : undefined}
                    class={
                      active === link.tab 
                        ? "bg-mauved-700 text-mauved-100 group-hover:text-mauved-50 rounded-md px-2 py-1" 
                        : "text-mauved-700 rounded-md px-2 py-1 hover:bg-mauved-100/50"
                    }
                  >
                    { link.text }
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger (mobile) */}
          <button
            onclick$={() => {mobileNavOpen.value = !mobileNavOpen.value}}
            class="
              bg-mauved-100 
              rounded-md 
              px-2 
              py-2 
              block 
              md:hidden
              hover:bg-mauved-50
              hover:text-mauved-800
            "
          >
            {!mobileNavOpen.value && (
              <svg class="fill-mauved-600" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill-rule="evenodd" clip-rule="evenodd"></path>
              </svg>
            )}
            {mobileNavOpen.value && (
              <svg class="fill-mauved-600" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill-rule="evenodd" clip-rule="evenodd"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Nav links (mobile) */}
      {mobileNavOpen.value && (
        <div class="block md:hidden bg-mauved-400 fixed left-0 right-0 top-[60px] bottom-0">

        </div>
      )}
    </header>
  );
});
