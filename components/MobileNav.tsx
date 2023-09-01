'use client';

import { motion, AnimatePresence } from "framer-motion"
import { ActivePage } from "$/lib/dtypes";


export interface IMobileNavProps {
  open?: boolean;
  activePage?: ActivePage;
}

export default function MobileNav({ open, activePage }: IMobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav 
          className="block md:hidden fixed inset-0 w-full h-screen z-10 overflow-hidden pt-[60px] bg-neutral-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delayChildren: 0.1,
          }}
        >
          <motion.ul 
            className="list-none flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <li>
              <a href="/">
                Home {activePage === ActivePage.Home && (
                  <span>&larr;</span>
                )}
              </a>
            </li>
            <li>
              <a href="/blog">
                Blog {activePage === ActivePage.Blog && (
                  <span>&larr;</span>
                )}
              </a>
            </li>
            <li>
              <a href="/projects">
                Projects {activePage === ActivePage.Projects && (
                  <span>&larr;</span>
                )}
              </a>
            </li>
            <li>
              <a href="/uses">
                Uses {activePage === ActivePage.Uses && (
                  <span>&larr;</span>
                )}
              </a>
            </li>
            <li>
              <a href="/about">
                About {activePage === ActivePage.About && (
                  <span>&larr;</span>
                )}
              </a>
            </li>
          </motion.ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}