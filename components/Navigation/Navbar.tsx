import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full lg:w-3/4 text-center space-x-44 py-4 border-b border-black">
      <Link href={'/'}>
        <button className="font-light hover:font-normal text-2xl">Home</button>
      </Link>
      <Link href={'/post'}>
        <button className="font-light hover:font-normal text-2xl">Post</button>
      </Link>
      <button className="font-light hover:font-normal text-2xl">About</button>
    </nav>
  );
}
