import { component$ } from "@builder.io/qwik";


export default component$(() => {
  return (
    <button
      class="
        flex 
        flex-row 
        items-center 
        space-x-2 
        bg-mauvedark-100 
        rounded-md 
        px-2 
        py-1.5
        text-mauvedark-600 
        hover:bg-mauvedark-50
        hover:text-mauvedark-800
      "
    >
      <div class="stroke-mauvedark-700 stroke-[0.5] py-0.5">
        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" />
        </svg>
      </div>

      <span class="pr-6 hidden md:block">
        Search
      </span>
      
      <kbd class="px-1.5 rounded-md hidden md:block flex flex-row items-baseline space-x-0.5 align-bottom">
        <span class="text-xl">⌘</span>
        <span class="">K</span>
      </kbd>
    </button>
  );
});

