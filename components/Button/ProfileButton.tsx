'use client';

import { useUserStore } from '@/store/UserStore';
import { CircleUserRound } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function ProfileButton() {
  const [isHover, setIsHover] = useState(false);
  const { currentUser } = useUserStore();

  if (currentUser) {
    return (
      <div>
        {currentUser.profileImgUrl ? (
          <img
            src={currentUser.profileImgUrl}
            alt="로그인 한 사용자 프로필 사진"
          />
        ) : (
          <CircleUserRound
            size={32}
            strokeWidth={isHover ? 1 : 0.5}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          />
        )}
      </div>
    );
  } else {
    return (
      <Link href={'/login'} className="h-8">
        Login
      </Link>
    );
  }
}
