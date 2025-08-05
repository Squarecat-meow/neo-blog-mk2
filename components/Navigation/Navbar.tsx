'use client';

import { CircleUserRound } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isHover, setIsHover] = useState(false);

  return (
    <nav className="w-full lg:w-3/4 flex items-center justify-center space-x-44 py-4 border-b border-black">
      <Link href={'/'} className="font-light hover:font-normal text-2xl">
        Home
      </Link>
      <Link href={'/post'} className="font-light hover:font-normal text-2xl">
        Post
      </Link>
      <Link href={'/about'} className="font-light hover:font-normal text-2xl">
        About
      </Link>
      <Link href={'/login'} className="h-8">
        <CircleUserRound
          size={32}
          strokeWidth={isHover ? 1 : 0.5}
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        />
      </Link>
    </nav>
  );
}
