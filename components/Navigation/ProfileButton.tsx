'use client';

import { ILoginResponse, IUser } from '@/types/UserType';
import { DropdownMenu } from '@radix-ui/themes';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function ProfileButton() {
  const [user, setUser] = useState<IUser | null>();
  useEffect(() => {
    const fn = async () => {
      const res = await fetch('/api/users/me', { credentials: 'include' });
      const data = (await res.json()) as ILoginResponse;

      if (data.authenticated) {
        setUser(data.currentUser);
      } else {
        setUser(null);
      }
    };

    fn();
  }, []);
  switch (user) {
    case undefined:
      return <Loader2Icon className="animate-spin" />;
    case null:
      return (
        <Link href={'/login'} className="text-md md:text-xl font-light">
          Login
        </Link>
      );
    default:
      return <UserChip user={user} />;
  }
}

function UserChip({ user }: { user: IUser }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="outline-none font-light text-md md:text-xl">
        <button className="cursor-pointer">{user.nickname}</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content color="sky">
        <DropdownMenu.Item className="font-light">
          <Link href={'/writer'}>New Post</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="font-light">
          <Link href={'/setting'}>Setting</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red" className="font-light">
          <button>Logout</button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
