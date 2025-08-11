import Link from 'next/link';
import { ProfileButton } from './ProfileButton';
import Image from 'next/image';
import Logo from '@/public/images/logo.gif';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/token';
import { IAccessTokenPayload } from '@/types/TokenType';
import prismaClient from '@/lib/prisma';
import { IUser } from '@/types/UserType';

export default async function Navbar() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  let user: IUser | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/me`, {
      cache: 'no-store',
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('유저정보를 가져오는데 문제가 발생했습니다.');
    }

    const { currentUser } = await res.json();

    user = currentUser;
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }

  console.log(user);

  // if (accessToken) {
  //   try {
  //     const payload = (await verifyToken(accessToken)) as IAccessTokenPayload;
  //
  //     const userInfo = (await prismaClient.user.findFirst({
  //       where: {
  //         userId: payload.userId,
  //       },
  //       select: {
  //         id: true,
  //         userId: true,
  //         nickname: true,
  //         profileImgUrl: true,
  //         introduction: true,
  //       },
  //     })) as IUser;
  //
  //     user = userInfo;
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       console.error(err.message);
  //     }
  //   }
  // } else {
  // }
  return (
    <nav className="w-full lg:w-3/5 px-6 flex items-center justify-between py-2">
      <Link href="/post" className="text:md md:text-xl font-light">
        Post
      </Link>
      <Link href="/about" className="text:md md:text-xl font-light">
        About
      </Link>
      <Link href="/" className="w-16 md:w-28">
        <Image src={Logo} alt="블로그 로고" width={120} height={30} />
      </Link>
      <Link href="/timeline" className="text:md md:text-xl font-light">
        Timeline
      </Link>
      <ProfileButton user={user} />
    </nav>
  );
}
