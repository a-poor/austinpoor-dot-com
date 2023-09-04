import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="max-w-7xl mx-auto px-4 pt-8 pb-20">
      <div class="text-center mb-6">
        Copyright © 2023 Austin Poor
      </div>
      <hr class="mx-auto w-16 mb-6"/>
      <div>
        <ul class="w-fit mx-auto flex flex-row space-x-4 underline">
          <li>
            <a href="https://github.com/a-poor" target="_blank" rel="external">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/austinpoor" target="_blank" rel="external">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://mastodon.social/@austinpoor" target="_blank" rel="external">
              Mastodon
            </a>
          </li>
          <li>
            <a href="https://austinpoor.com/rss.xml">
              RSS
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
});
