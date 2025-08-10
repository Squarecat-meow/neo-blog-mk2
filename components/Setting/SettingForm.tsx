'use client';

import { IUser } from '@/types/UserType';
import ProfileImgButton from './ProfileImgButton';
import { useState } from 'react';
import Label from '@/components/Primitives/Label/Label';
import Input from '../Primitives/Input/Input';

export default function MyPageForm({ user }: { user: IUser }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <section className="w-2xl grid grid-cols-3">
      <article className="p-4 space-y-4">
        <h1 className="text-2xl text-center font-light">프로필 사진</h1>
        <ProfileImgButton user={user} callback={setImageUrl} />
      </article>
      <article className="col-span-2 p-4">
        <Label label="닉네임" htmlFor="nickname">
          <Input placeholder={user.nickname} id="nickname" />
        </Label>
      </article>
    </section>
  );
}
