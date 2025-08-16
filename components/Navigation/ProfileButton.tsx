'use client';

import { ILoginResponse, IUser } from '@/types/UserType';
import { DropdownMenu } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';

export function ProfileButton() {
  const fetchUserData = async () => {
    const res = await fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = (await res.json()) as ILoginResponse;

    return data;
  };
  const { data, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUserData,
  });

  if (isPending) {
    return <Loader2Icon className="animate-spin" />;
  }

  return <UserChip user={data!.currentUser} />;
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
