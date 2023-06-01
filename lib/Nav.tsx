'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import hamburgerIcon from '@/public/hamburger.svg';
import xMarkIcon from '@/public/x-mark.svg';
import githubIcon from '@/public/github.svg';
import linkedinIcon from '@/public/linkedin.svg';


export interface INavProps {
  activeTab?: "blog" | "projects" | "about";
}

export function Nav({activeTab}: INavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="sticky top-0 w-page h-12 bg-neutral-800">
        <nav className="max-w-2xl mx-auto px-4 py-2 flex flex-row items-center space-x-6 text-lg text-neutral-100">
          <button className="block sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Image 
              src={hamburgerIcon}
              width={24}
              height={24}
              alt="Open Menu Icon"
            />
          </button>
          <Link href="/" className="font-semibold">
            Austin Poor
          </Link>
          <ul className="hidden sm:flex flex-row space-x-1 sm:space-x-2 list-none font-light">
            <li className={`border-b-2 ${activeTab === "blog" ? "border-white" : "border-transparent"}`}>
              <Link href="/blog">
                Blog
              </Link>
            </li>
            <li className={`border-b-2 ${activeTab === "projects" ? "border-white" : "border-transparent"}`}>
              <Link href="/projects">
                Projects
              </Link>
            </li>
            <li className={`border-b-2 ${activeTab === "about" ? "border-white" : "border-transparent"}`}>
              <Link href="/about">
                About
              </Link>
            </li>
          </ul>
          <div className="flex-grow"/>
          <div className="flex flex-row space-x-2">
            <a href="https://github.com/a-poor">
              <Image 
                src={githubIcon}
                width={24}
                height={24}
                alt="GitHub"
              />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://github.com/a-poor">
              <Image 
                src={linkedinIcon}
                width={24}
                height={24}
                alt="LinkedIn"
              />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </nav>
      </div>
      
      {isMenuOpen && (
        <div className="absolute sm:hidden top-0 left-0 right-0 bottom-0 bg-neutral-900 z-10 px-3 py-2">
          <div className="flex flex-col space-y-5 h-full pb-20">
            <div className="mb-5">
              <button className="block sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Image 
                  src={xMarkIcon}
                  width={30}
                  height={30}
                  alt="Close Menu Icon"
                />
              </button>
            </div>

            <ul className="flex flex-col text-4xl space-y-3 ml-2 mt-2">
              <li>
                <Link href="/" className={`border-b-2 ${activeTab === undefined ? "border-white" : "border-transparent"}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className={`border-b-2 ${activeTab === "blog" ? "border-white" : "border-transparent"}`}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/projects" className={`border-b-2 ${activeTab === "projects" ? "border-white" : "border-transparent"}`}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className={`border-b-2 ${activeTab === "about" ? "border-white" : "border-transparent"}`}>
                  About
                </Link>
              </li>
            </ul>

            <div className="flex-grow"/>

            <hr />

            <ul className="flex flex-col text-4xl space-y-3 ml-2 mt-2">
              <li className="">
                <a href="https://github.com/a-poor">
                  GitHub
                </a>
              </li>
              <li className="">
                <a href="https://www.linkedin.com/in/austinpoor">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

