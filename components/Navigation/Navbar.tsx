import Link from 'next/link';
import { ProfileButton } from '../Button/ProfileButton';

export default function Navbar() {
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
      <ProfileButton />
    </nav>
  );
}
