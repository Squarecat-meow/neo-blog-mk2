import Image from 'next/image';
import MinaImage from '@/public/images/mina.png';
import YunoImage from '@/public/images/yuno.png';
import prismaClient from '@/lib/prisma';
import Link from 'next/link';

export default async function Sidebar() {
  const users = await prismaClient.user.findMany({
    select: {
      userId: true,
      nickname: true,
      ownedCategories: true,
    },
  });

  return (
    <nav className="w-1/5 sticky top-0 h-fit">
      <h1 className="text-2xl mb-2">카테고리</h1>
      {users.map((user) => (
        <div key={user.nickname}>
          <ul className="space-y-2">
            <div className="flex gap-2 items-center" key={user.nickname}>
              <Image
                src={user.userId === 'yozumina' ? MinaImage : YunoImage}
                alt="카테고리 이미지"
                className="w-10"
              />
              <span className="font-light hidden sm:block">
                {user.nickname}
              </span>
            </div>
            {user.ownedCategories.map((category) => (
              <Link href={`/category/${category.id}`} key={category.id}>
                <li className="font-light">{category.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
