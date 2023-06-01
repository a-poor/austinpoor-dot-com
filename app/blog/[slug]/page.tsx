import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Nav } from '@/lib/Nav';


export default function BlogPost({params}: { params: { slug: string } }) {
  const { slug } = params;
  return (
    <>
      <Nav activeTab='blog'/>
      <main className="max-w-2xl mx-auto sm:px-4 py-2 pt-4">
        <h1>Page: { slug }</h1>
      </main>
    </>
  )
}
