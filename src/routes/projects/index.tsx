import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Navbar, { ActiveTab } from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";

import { projectData } from "~/lib";


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
      <Navbar active={ActiveTab.Projects} />
      
      <main class="text-mauve-0 dark:bg-mauved-700 dark:text-mauved-50">
        <section class="max-w-7xl mx-auto px-4 pt-24 pb-32">
          <h1 class="text-7xl font-semibold text-center mb-8">
            Projects
          </h1>
          <p class="text-lg font-medium text-center">
            
          </p>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projectData.map(p => (
            <div key={ p.title } class="px-4 py-4 flex flex-col space-y-2">
              <h2 class="">
                { p.title }
              </h2>
              <p>
                { p.description }
              </p>
              <p>
                <a href={ p.href } class="text-mauve-300 hover:text-mauve-200">
                  Check it out &rarr;
                </a>
              </p>
            </div>
          ))}
        </section>

      </main>

      <Footer />
    </>
  );
});
