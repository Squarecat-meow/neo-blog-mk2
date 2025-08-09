'use client';

import { useUserStore } from '@/store/UserStore';
import { IUser } from '@/types/UserType';
import { CircleUserRound, Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { DropdownMenu } from 'radix-ui';
import { useEffect, useState } from 'react';

export function ProfileButton() {
  const [user, setUser] = useState<IUser | null>();
  const { currentUser } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/users/me');
      const data = await res.json();

      if (data.authenticated) setUser(data.currentUser);
      else setUser(null);
    };

    if (currentUser) setUser(currentUser);
    else fetchUser();
  }, [currentUser]);

  switch (user) {
    case undefined:
      return <Loader2Icon className="animate-spin" />;
    case null:
      return (
        <Link href={'/login'} className="text-xl font-light">
          Login
        </Link>
      );
    default:
      return <UserChip user={user} />;
  }
}

function UserChip({ user }: { user: IUser }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none">
        {user.profileImgUrl ? (
          <img
            src={user.profileImgUrl}
            alt={`${user.nickname}의 프로필 사진`}
          />
        ) : (
          <CircleUserRound
            strokeWidth={isHover ? 1 : 0.5}
            size={32}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          />
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="font-light border border-black mt-2 p-2 bg-neutral-200">
          <DropdownMenu.Item className="hover:font-normal text-black outline-none">
            <Link href={'/writer'}>New Post</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="hover:font-normal text-black outline-none">
            <Link href={'/setting'}>Setting</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="border-b border-black my-2" />
          <DropdownMenu.Item className="hover:font-normal text-black outline-none">
            <button>Logout</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
