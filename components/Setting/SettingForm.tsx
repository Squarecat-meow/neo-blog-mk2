'use client';

import { IUser } from '@/types/UserType';
import ProfileImgButton from './ProfileImgButton';
import { useState } from 'react';

export default function MyPageForm({ user }: { user: IUser }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  console.log(imageUrl);

  return (
    <section className="w-xl grid grid-cols-3">
      <article className="p-4 border-r space-y-4">
        <h1 className="text-2xl text-center font-light">프로필 사진</h1>
        <ProfileImgButton user={user} callback={setImageUrl} />
      </article>
      <article className="col-span-2 p-4">
        <span>므아</span>
      </article>
    </section>
  );
}
