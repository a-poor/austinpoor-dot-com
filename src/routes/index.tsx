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
      <Navbar active={ActiveTab.Home} />
      
      <main class="text-mauve-0 dark:bg-mauvedark-700 dark:text-mauvedark-50">
        <section class="max-w-7xl mx-auto px-4 pt-24 pb-32">
          <h1 class="text-7xl font-semibold text-center">
            Austin Poor
          </h1>
          <p class="text-5xl font-medium text-center">
            Developer. Visionary. Inspiration.
          </p>
        </section>

        <div class="max-w-7xl mx-auto px-4">
          {new Array(20).fill(0).map((_, i) => (
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

        <section id="projects" class="max-w-7xl mx-auto px-4 pt-24 pb-32">
          <h2 class="text-5xl font-medium text-center mb-8">
            Projects
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projectData.map((project) => (
              <div key={ project.title } class="px-4 py-4 flex flex-col space-y-2 border">
                <a href={ project.href } target="_blank" rel="" class="block text-xl">
                  { project.title }
                </a>
                <p class="">
                  { project.description }
                </p>
                <p>
                  <a href={ project.href }>
                    Learn more &rarr;
                  </a>
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
});
