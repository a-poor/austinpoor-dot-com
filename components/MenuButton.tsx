'use client';

import { motion } from 'framer-motion';


export interface IMenuButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
}

export default function MenuButton({isOpen, onClick}: IMenuButtonProps) {
  return (
    <button 
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
      onClick={onClick}
    >
      <svg 
        width="15" 
        height="15" 
        viewBox="0 0 15 15" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-[1.25em] w-[1.25em]" 
      >
        <motion.line
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          x1="1"
          y1="2"
          stroke="#0f0f0f"
          strokeWidth={1}
          variants={{
            open: {
              x2: 14,
              y2: 13,
            },
            closed: {
              x2: 14,
              y2: 2,
            },
          }}
          transition={{
            delay: isOpen ? 0.1 : 0,
          }}
          />
        <motion.line
          animate={isOpen ? "open" : "closed"}
          x1="1"
          y1="7.5"
          x2="14"
          y2="7.5"
          stroke="#0f0f0f"
          strokeWidth={1}
          variants={{
            open: {
              opacity: 0,
            },
            closed: {
              opacity: 1,
            },
          }}
          transition={{
            delay: isOpen ? 0 : 0.1,
            duration: isOpen ? undefined : 0.05,
          }}
        />
        <motion.line
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          x1="1"
          y1="13"
          stroke="#0f0f0f"
          strokeWidth={1}
          variants={{
            open: {
              x2: 14,
              y2: 2,
            },
            closed: {
              x2: 14,
              y2: 13,
            },
          }}
          transition={{
            delay: isOpen ? 0.1 : 0,
          }}
        />
      </svg>
    </button>
  );
}