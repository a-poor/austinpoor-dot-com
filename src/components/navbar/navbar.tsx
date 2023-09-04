import { component$ } from "@builder.io/qwik";
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
  {
    text: "Uses",
    href: "/uses",
    tab: ActiveTab.Uses,
  },
  {
    text: "About",
    href: "/about",
    tab: ActiveTab.About,
  },
];

export const MobileNav = component$<{active?: ActiveTab}>(() => {
  return (
    <div></div>
  );
});

export default component$<{active?: ActiveTab}>(({active}) => {
  return (
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex flex-row space-x-4 items-center">
        <div>
          <a href="/" class="text-xl font-semibold">
            Austin Poor
          </a>
        </div>
        <div class="flex-grow"/>
        <div>
          <SearchButton />
        </div>
        <nav>
          <ul class="flex flex-row space-x-1 bg-stone-300 rounded-md px-2 py-1.5">
            {navLinks.map((link, i) => (
              <li key={i}>
                <a 
                  href={link.href} 
                  class={
                    active === link.tab 
                      ? "bg-stone-700 text-stone-50 rounded-md px-2 py-0.5" 
                      : "text-stone-950 rounded-md px-2 py-0.5 hover:bg-stone-200"
                  }
                >
                  { link.text }
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
});
