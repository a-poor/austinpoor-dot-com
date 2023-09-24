import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <footer>
      <div class="max-w-7xl mx-auto px-4 pt-8 pb-20 text-mauved-300">
        <div class="text-center mb-6">
          Austin Poor © 2023 (<a class="underline" href="https://github.com/a-poor/austinpoor-dot-com">View Source</a>)
        </div>
        <hr class="mx-auto w-16 mb-6 border-mauved-300"/>
        <div>
          <ul class="w-fit mx-auto flex flex-row space-x-4 underline">
            <li>
              <a href="https://github.com/a-poor" target="_blank" rel="external" class="hover:text-mauved-100">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/austinpoor" target="_blank" rel="external" class="hover:text-mauved-100">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://mastodon.social/@austinpoor" target="_blank" rel="external" class="hover:text-mauved-100">
                Mastodon
              </a>
            </li>
            <li>
              <a href="https://austinpoor.com/rss.xml" class="hover:text-mauved-100">
                RSS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
});
