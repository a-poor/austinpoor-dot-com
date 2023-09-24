import { component$, useVisibleTask$, Slot } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { animate } from "motion";

import Navbar, { ActiveTab } from "~/components/navbar/navbar";
import ApPortraitSquareish from "~/media/images/ap-portrait-square-ish.png?jsx";

import { projectData } from "~/lib";


const ImageOfMe = component$(() => {
  useVisibleTask$(() => {
    animate("#austin-photo", 
      {
        opacity: [0, 1],
        scale: [0.9, 1],
        y: [30, 0],
      },
      {
        duration: 1,
        easing: "ease-out",
      },
    );
  });
  return (
    <ApPortraitSquareish 
      id="austin-photo"
      alt="A portrait of Austin"
      class="max-w-[350px] h-auto opacity-0" 
      loading="eager" 
    />
  );
});

/** A reusable component for styling page sub-sections. */
const PageSection = component$<{id: string}>(({id}) => {
  return (
    <section id={id} class="max-w-7xl mx-auto px-4 pt-12 pb-20">
      <h2 class="text-5xl font-medium text-center mb-8">
        <Slot name="title"/>
      </h2>
      <div>
        <Slot />
      </div>
      <div>
        <Slot name="footer"/>
      </div>
    </section>
  );
});

// const EmojiHand = component$(() => {
//   useVisibleTask$(() => {
//     animate("#emoji-hand", 
//       {
//         transform: [
//           "rotate(10deg)",
//           "rotate(-10deg)",
//           "rotate(10deg)",
//         ],
//       },
//       {
//         duration: 0.75,
//         repeat: Infinity,
//         easing: "linear",
//       },
//     );
//   });
//   return (
//     <span id="emoji-hand" class="inline-block">👋</span> 
//   );
// });

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

      <main class="text-mauve-0 dark:text-mauved-50">
        <section class="max-w-7xl mx-auto px-4 pt-24 pb-32">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-y-0 lg:gap-12">
            <div class="col-span-2 text-center lg:text-right flex flex-col justify-center space-y-4">
              <h1 class="text-5xl sm:text-7xl xl:text-8xl font-bold">
                Hi, I'm Austin!
              </h1>
              <h2 class="text-2xl sm:text-6xl font-extralight">
                I'm a software engineer
                <br/>
                living in Los Angeles.
              </h2>
              <div class="flex justify-center lg:justify-end space-x-6 text-xl">
                <a href="https://github.com/a-poor" class="flex items-center space-x-2">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-4 fill-neutral-50">
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                  </svg>
                  <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/austinpoor" class="flex items-center space-x-2">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-4 fill-neutral-50">
                    <title>LinkedIn</title>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
            <div class="flex place-content-center">
              <ImageOfMe />
            </div>
          </div>
        </section>

        <PageSection id="about">
          <span q:slot="title">About Me</span>
          <div class="">
            Hi, I'm Austin! I'm a full-stack software engineer living in Los Angeles, CA.
          </div>
          <div class="py-8 text-center">
            <a href="/projects" class="text-xl">
              See more projects &rarr;
            </a>
          </div>
        </PageSection>
        
        <PageSection id="blog">
          <span q:slot="title">
            Blog
          </span>
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
          <div q:slot="footer" class="py-8 text-center">
            <a href="/projects" class="text-xl">
              See more projects &rarr;
            </a>
          </div>
        </PageSection>
        
        <PageSection id="projects">
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
          <div q:slot="footer" class="py-8 text-center">
            <a href="/projects" class="text-xl">
              See more projects &rarr;
            </a>
          </div>
        </PageSection>

        <PageSection id="uses">
          <h2 class="text-5xl font-medium text-center mb-8">
            Uses
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            I have a uses page
          </div>
          <div class="py-8 text-center">
            <a href="/projects" class="text-xl">
              See more projects &rarr;
            </a>
          </div>
        </PageSection>

        <PageSection id="etc">
          <h2 class="text-5xl font-medium text-center mb-8">
            <span>/etc</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            ...
          </div>
          <div class="py-8 text-center">
            <a href="/projects" class="text-xl">
              See more projects &rarr;
            </a>
          </div>
        </PageSection>

      </main>
    </>
  );
});
