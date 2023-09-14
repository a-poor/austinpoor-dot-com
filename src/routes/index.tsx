import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Navbar, { ActiveTab } from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";
import { BackgroundColor } from "~/components/background-color/background-color";

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
  useStylesScoped$(`
    @keyframes animHighlight {
      0% {
        width: 0%;
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        width: 100%;
        opacity: 1;
      }
    }
    
    .anim-hl-0 {
      animation: 1000ms ease-in-out 0s 1 animHighlight;
      background-color: rgb(116 139 253 / 85%);
      z-index: -1;
      position: absolute;
      left: -5px;
      top: 0;
      bottom: 0;
      width: calc(100% + 10px);
    }
    
    .anim-hl-1 {
      animation: 900ms ease-in-out 100ms 1 animHighlight;
      background-color: rgb(194 116 253 / 85%);
      z-index: -1;
      position: absolute;
      left: -5px;
      top: 0;
      bottom: 0;
      width: calc(100% + 10px);
    }
  `);
  return (
    <>
      <Navbar active={ActiveTab.Home} />
      
      <main class="text-mauve-0 dark:bg-mauved-700 dark:text-mauved-50">
        <section class="max-w-7xl mx-auto px-4 pt-24 pb-32">
          <h1 class="text-6xl font-bold text-center mx-auto mb-6">
            Hi, I'm Austin!
          </h1>
          <h2 class="text-2xl sm:text-5xl font-normal text-center max-w-3xl mx-auto flex flex-col space-y-1 sm:space-y-4">
            <div>
              <span>I'm a </span>
              <span class="relative">full-stack software engineer<div class="anim-hl-0"/></span>
            </div>
            <div>
              <span>curremtly living in </span>
              <span class="relative">Los Angeles, CA.<div class="anim-hl-1"/></span>
            </div>
          </h2>
        </section>

        <div class="max-w-7xl mx-auto px-0 ">
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
            {projectData.slice(0, 5).map((project) => (
              <div key={ project.title } class="px-4 py-4 flex flex-col space-y-2">
                <h3 class="block text-xl">
                  { project.title }
                </h3>
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
          <div class="py-8 text-center">
            <a href="/projects" class="text-xl">
              See more projects &rarr;
            </a>
          </div>
        </section>
      </main>

      <BackgroundColor />
      <Footer />
    </>
  );
});
