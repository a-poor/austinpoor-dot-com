import { component$ } from '@builder.io/qwik';


export const BackgroundColor = component$(() => {
  return (
    <div class="fixed inset-0 -z-[5] select-none pointer-events-none">
      <img
        width="1440"
        height="1024"
        // eslint-disable-next-line qwik/jsx-img
        src="/images/blurred-gradient-background.svg" 
        alt="" 
        class="w-full h-full object-right object-cover opacity-50" 
      />
      <div class="bg-noisy pointer-events-none absolute inset-0"></div>
    </div>
  );
});
