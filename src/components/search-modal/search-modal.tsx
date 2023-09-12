import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { animate } from 'motion';

export interface SearchModalProps {}

export const SearchModal = component$<SearchModalProps>(() => {
  useVisibleTask$(() => {
    animate("#search-modal",
      {
        opacity: [0, 1],
        scale: [0.9, 1],
        y: [20, 0],
      },
    );
  });
  return (
    <div
      id="search-modal"
      aria-modal="true"
      onClick$={e => e.stopPropagation()}
      class="px-10 py-5 bg-mauved-50 text-mauved-800 opacity-0" 
    >
      Search stuff goes here...
    </div>
  );
});
