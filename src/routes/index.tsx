import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Navbar, { ActiveTab } from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";


export const head: DocumentHead = {
  title: "AustinPoor.com",
  meta: [
    {
      name: "description",
      content: "Austin Poor's personal website.",
    },
  ],
};

export default component$(() => {
  return (
    <>
      <header class="sticky top-0 left-0 right-0 bg-stone-400 text-stone-50 py-3 h-[60px]">
        <Navbar active={ActiveTab.Home} />
      </header>
      
      {/* <main class="bg-gradient-to-b from-stone-300 to-stone-600 text-stone-900 dark:bg-stone-700 dark:text-stone-50"> */}
      <main class="bg-stone-200 text-stone-900 dark:bg-stone-700 dark:text-stone-50">
        <section class="max-w-7xl mx-auto px-4 pt-24 pb-32">
          <h1 class="text-7xl font-semibold text-center">
            Austin Poor
          </h1>
          <h2 class="text-5xl font-medium text-center">
            Developer. Visionary. Inspiration.
          </h2>

        </section>

        <div class="max-w-7xl mx-auto px-4">
          {new Array(100).fill(0).map((_, i) => (
            <div key={i}>
              <h1>Hi 👋</h1>
              <p>
                Can't wait to see what you build with qwik!
                <br />
                Happy coding.
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
});
