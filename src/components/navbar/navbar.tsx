import { component$ } from "@builder.io/qwik";

export const MobileNav = component$(() => {
  return (
    <div></div>
  );
});

export default component$(() => {
  return (
    <div class="flex flex-row space-x-4">
      <div>
        <a href="/">
          AustinPoor.com
        </a>
      </div>
      <div class="flex-grow"/>
      <div>
        Search
      </div>
      <nav>
        <ul class="flex flex-row space-x-2">
          <li>
            <a href="/">
              Home
            </a>
          </li>
          <li>
            <a href="/blog">
              Blog
            </a>
          </li>
          <li>
            <a href="/projects">
              Projects
            </a>
          </li>
          <li>
            <a href="/uses">
              Uses
            </a>
          </li>
          <li>
            <a href="/about">
              About
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
});
