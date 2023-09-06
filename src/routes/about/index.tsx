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
      <header class="sticky top-0 left-0 right-0 bg-mauvedark-400 text-mauvedark-50 py-3 h-[60px]">
        <Navbar active={ActiveTab.About} />
      </header>
      <div class="block md:hidden bg-mauvedark-400 fixed left-0 right-0 top-[60px] bottom-0">

      </div>
      
      {/* <main class="bg-gradient-to-b from-mauvedark-300 to-mauvedark-600 text-mauvedark-900 dark:bg-mauvedark-700 dark:text-mauvedark-50"> */}
      <main class="bg-mauvedark-200 text-mauvedark-900 dark:bg-mauvedark-700 dark:text-mauvedark-50">
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
