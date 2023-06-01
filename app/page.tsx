import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Nav } from '@/lib/Nav';

import profilePicture from '@/public/propic.png';


export default function Home() {
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto sm:px-4 py-2 pt-4">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center sm:text-right">
            <h1 className="font-semibold text-5xl">
              Hi {"I'm"} Austin
            </h1>
            <h2 className="font-base text-xl">
              {"I'm"} a software engineer based in Los Angeles, CA.
            </h2>
            <div>

            </div>
          </div>
          <div>
            <div>
              <Image 
                src={profilePicture}
                width={300}
                height={300}
                alt="A photo of Austin Poor"
                className="rounded-full overflow-hidden w-64 sm:w-fit"
                placeholder='blur'
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
