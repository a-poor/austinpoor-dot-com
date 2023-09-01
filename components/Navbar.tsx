'use client';

import { useState } from "react";
import { ActivePage } from "$/lib/dtypes";
import SearchButton from "./SearchButton";
import MenuButton from "./MenuButton";
import MobileNav from "./MobileNav";


export interface INavbarProps {
  activePage?: ActivePage;
}

export default function Navbar({activePage}: INavbarProps) {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <div className="relative z-20">
        <div className="flex px-2 md:px-4 xl:px-0 py-3 space-x-2 md:space-x-4 mx-auto max-w-7xl items-center h-[60px]">
          <div>
            Austin Poor
          </div>
          <div className="flex-grow" />
          <div>
            <SearchButton />
          </div>
          <div>
            <div className="block md:hidden">
              <MenuButton isOpen={navOpen} onClick={() => setNavOpen?.(!navOpen)}/>
            </div>
            <nav className="hidden md:block">
              <ul 
                className="
                  list-none 
                  flex 
                  flex-row 
                  space-x-2
                  items-center 
                  bg-neutral-100 
                  px-2 
                  py-[5px]
                  border-1 
                  border-neutral-300 
                  rounded-md 
                "
              >
                <li>
                  <a 
                    href="/"
                    className={
                      activePage === ActivePage.Home
                      ? "bg-neutral-800 text-neutral-50 rounded-md px-1.5 py-0.5"
                      : ""
                    }
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="/blog"
                    className={
                      activePage === ActivePage.Blog
                      ? "bg-neutral-800 text-neutral-50 rounded-md px-1.5 py-0.5"
                      : ""
                    }
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a 
                    href="/projects"
                    className={
                      activePage === ActivePage.Projects
                      ? "bg-neutral-800 text-neutral-50 rounded-md px-1.5 py-0.5"
                      : ""
                    }
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a 
                    href="/uses"
                    className={
                      activePage === ActivePage.Uses
                      ? "bg-neutral-800 text-neutral-50 rounded-md px-1.5 py-0.5"
                      : ""
                    }
                  >
                    Uses
                  </a>
                </li>
                <li>
                  <a 
                    href="/about"
                    className={
                      activePage === ActivePage.About
                      ? "bg-neutral-800 text-neutral-50 rounded-md px-1.5 py-0.5"
                      : ""
                    }
                  >
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      
      <MobileNav 
        activePage={activePage}
        open={navOpen}
      />
    </>
  );
}
