import Link from 'next/link';
import { ProfileButton } from './ProfileButton';
import Image from 'next/image';
import Logo from '@/public/images/logo.gif';

export default function Navbar() {
  return (
    <nav className="w-full lg:w-3/4 flex items-center justify-center gap-32 py-2">
      <Link href="/post" className="font-light hover:font-normal text-xl">
        Post
      </Link>
      <Link href="/about" className="font-light hover:font-normal text-xl">
        About
      </Link>
      <Link href="/" className="font-light hover:font-normal text-xl">
        <Image src={Logo} alt="블로그 로고" width={120} height={30} />
      </Link>
      <Link href="/timeline" className="font-light hover:font-normal text-xl">
        Timeline
      </Link>
      <ProfileButton />
    </nav>
  );
}
