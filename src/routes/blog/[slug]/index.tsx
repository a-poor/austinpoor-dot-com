import { component$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import Navbar, { ActiveTab } from "~/components/navbar/navbar";
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
  const loc = useLocation();
  return (
    <>
      <Navbar active={ActiveTab.Blog} />
      
      <main class="text-mauve-0 dark:bg-mauved-700 dark:text-mauved-50">
        <section class="max-w-7xl mx-auto px-4 pt-24 pb-32">
          <h1 class="text-7xl font-semibold text-center">
            Blog: {loc.params.slug}
          </h1>
          <h2 class="text-5xl font-medium text-center">
            Developer. Visionary. Inspiration.
          </h2>
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

      <Footer />
    </>
  );
});

