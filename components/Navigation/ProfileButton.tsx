'use client';

import { ILoginResponse, IUser } from '@/types/UserType';
import { DropdownMenu } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import ky from 'ky';

export function ProfileButton() {
  const { data, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await ky.get('/api/users/me').json<ILoginResponse>();
      return res;
    },
  });

  if (isPending) {
    return <Loader2Icon className="animate-spin" />;
  } else {
    if (data?.authenticated) {
      return <UserChip user={data.currentUser} />;
    } else {
      return (
        <Link href={'/login'} className="text-md md:text-xl font-light">
          Login
        </Link>
      );
    }
  }
}

function UserChip({ user }: { user: IUser }) {
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        body: '',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('(왜인지?) 로그아웃이 실패했어요!');

      return (window.location.href = '/');
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
  };

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
          <button onClick={handleLogout}>Logout</button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
