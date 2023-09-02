'use client';

import { motion, AnimatePresence } from "framer-motion"
import { ActivePage } from "$/lib/dtypes";


export interface IMobileNavProps {
  open?: boolean;
  activePage?: ActivePage;
}

const tabs = [
  {
    text: "Home",
    href: "/",
    page: ActivePage.Home,
  },
  {
    text: "Blog",
    href: "/blog",
    page: ActivePage.Blog,
  },
  {
    text: "Projects",
    href: "/projects",
    page: ActivePage.Projects,
  },
  {
    text: "Uses",
    href: "/uses",
    page: ActivePage.Uses,
  },
  {
    text: "About",
    href: "/about",
    page: ActivePage.About,
  },
];

export default function MobileNav({ open, activePage }: IMobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav 
          className="block md:hidden fixed inset-0 w-full h-screen z-10 overflow-hidden pt-[60px] bg-neutral-50"
          initial={{ 
            opacity: 0, 
          }}
          animate={{ 
            opacity: 1, 
          }}
          exit={{ 
            opacity: 0, 
          }}
          >
          <motion.ul 
            className="list-none flex flex-col px-2 space-y-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {tabs.map((tab, i) => (
              <motion.li 
                key={i}
                variants={{ hidden: { x: -100, opacity: 0,  }, visible: { x: 0, opacity: 1 } }}
              >
                <a 
                  href={tab.href} 
                  className={
                    activePage === tab.page
                    ? "text-5xl border-b-4 border-neutral-900"
                    : "text-5xl border-b-4 border-transparent hover:text-neutral-700"
                  }
                >
                  { tab.text }
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}