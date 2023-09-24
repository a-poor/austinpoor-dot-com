import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Navbar, { ActiveTab } from "~/components/navbar/navbar";

import ApAndScranWideImg from "~/media/images/ap-and-scran-wide.png?jsx";


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
      <Navbar active={ActiveTab.About} />
      
      <main class="text-mauved-50">
        <section class="max-w-7xl mx-auto px-4 pt-24 pb-32">
          <h1 class="text-7xl font-semibold text-center">
            About Me
          </h1>
          <div>
            <ApAndScranWideImg 
              class="mx-auto hidden"
            />
            <img 
              class="block h-full mx-auto" 
              // eslint-disable-next-line qwik/jsx-img
              src="/images/austin-nye-540.gif" 
              alt="A gif of Austin's head, rotating." 
              width={500}
              height={500}
              decoding="async"
              loading="lazy"
            />
          </div>
        </section>
      </main>
    </>
  );
});
