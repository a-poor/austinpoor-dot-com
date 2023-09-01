export default function SearchButton() {
  return (
    <button 
      aria-label="Toggle search"
      className="
        flex 
        items-center 
        bg-neutral-100 
        px-2 
        py-1 
        border-1 
        border-neutral-300 
        rounded-md 
        space-x-2 
        hover:border-neutral-500
      "
    >
      <svg 
        className="h-[1.25em] w-[1.25em]" 
        width="15" 
        height="15" 
        viewBox="0 0 15 15" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      </svg>
      <span className="pr-5 hidden md:block">
        Search
      </span>
      <kbd className="border-1 border-neutral-300 rounded-md min-w-[1.75em] hidden md:block space-x-1 px-1 font-mono">
        <span className="text-sm">⌘</span>
        <span className="">K</span>
      </kbd>
    </button>
  );
}