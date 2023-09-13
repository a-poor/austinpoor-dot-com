import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { animate } from "motion";

import Navbar, { ActiveTab } from "~/components/navbar/navbar";
import Footer from "~/components/footer/footer";
import ImgApAndScranSquare1024 from '~/media/images/ap-and-scran-square-1024.webp?jsx';
import { BackgroundColor } from "~/components/background-color/background-color";


export const head: DocumentHead = {
  title: "AustinPoor.com",
  meta: [
    {
      name: "description",
      content: "Austin Poor's personal website.",
    },
  ],
};

const ImageOfMe = component$(() => {
  useVisibleTask$(() => {
    animate("#austin-and-sandwich-photo", 
      {
        opacity: [0, 1],
        scale: [0.9, 1],
        y: [20, 0],
      },
      {
        duration: 0.5,
      },
    );
  });
  return (
    <ImgApAndScranSquare1024
      id="austin-and-sandwich-photo"
      alt="Austin holding his dog, Sandwich"
      loading="eager"
      class="max-w-md mx-auto opacity-0"
    />
  );
})

export default component$(() => {
  return (
    <>
      <Navbar active={ActiveTab.About} />
      
      <main class="text-mauve-0 dark:bg-mauved-700 dark:text-mauved-50">
        <section class="max-w-7xl mx-auto px-4 pt-24 pb-32">
          <h1 class="text-7xl font-semibold text-center mb-12">
            About Me
          </h1>
          <ImageOfMe />
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
      </main>

      <BackgroundColor />
      <Footer />
    </>
  );
});
