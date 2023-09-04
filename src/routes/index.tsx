import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Navbar from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";


export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

export default component$(() => {
  return (
    <>
      <header class="sticky top-0 left-0 right-0 bg-stone-400 text-stone-50 py-3">
        <div class="max-w-7xl mx-auto px-4">
          <Navbar />
        </div>
      </header>
      
      <main class="bg-stone-300 text-stone-900 dark:bg-stone-700 dark:text-stone-50">
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

      <footer>
        <Footer />
      </footer>
    </>
  );
});
