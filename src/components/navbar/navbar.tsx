import { component$ } from "@builder.io/qwik";

export enum ActiveTab {
  Home = "home",
  Blog = "blog",
  Projects = "projects",
  Uses = "uses",
  About = "about",
}

export const MobileNav = component$<{active?: ActiveTab}>(() => {
  return (
    <div></div>
  );
});

export default component$<{active?: ActiveTab}>(({active}) => {
  return (
    <div class="flex flex-row space-x-4">
      <div>
        <a href="/">
          Austin Poor
        </a>
      </div>
      <div class="flex-grow"/>
      <div>
        Search
      </div>
      <nav>
        <ul class="flex flex-row space-x-2">
          <li>
            <a href="/" class={active === ActiveTab.Home && "underline"}>
              Home
            </a>
          </li>
          <li>
            <a href="/blog" class={active === ActiveTab.Blog && "underline"}>
              Blog
            </a>
          </li>
          <li>
            <a href="/projects" class={active === ActiveTab.Projects && "underline"}>
              Projects
            </a>
          </li>
          <li>
            <a href="/uses" class={active === ActiveTab.Uses && "underline"}>
              Uses
            </a>
          </li>
          <li>
            <a href="/about" class={active === ActiveTab.About && "underline"}>
              About
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
});
