'use client';

import { useUserStore } from '@/store/UserStore';
import { IUser } from '@/types/UserType';
import { CircleUserRound, Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function ProfileButton() {
  const [isHover, setIsHover] = useState(false);
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
        <Link href={'/login'} className="text-2xl font-light hover:font-normal">
          Login
        </Link>
      );
    default:
      return (
        <>
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
        </>
      );
  }
}
