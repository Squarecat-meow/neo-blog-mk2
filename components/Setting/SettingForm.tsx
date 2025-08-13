'use client';

import { IUser } from '@/types/UserType';
import ProfileImgButton from './ProfileImgButton';
import Label from '@/components/Primitives/Label/Label';
import Input from '../Primitives/Input/Input';
import { useProfileImgCropperStore } from '@/store/ProfileImgCropStore';

export default function MyPageForm({ user }: { user: IUser }) {
  const { currentImg } = useProfileImgCropperStore();

  return (
    <section>
      <form className="w-2xl grid grid-cols-3">
        <article className="p-4 space-y-4">
          <h1 className="text-lg text-center font-light">프로필 사진</h1>
          <ProfileImgButton />
        </article>
        <article className="col-span-2 flex flex-col gap-4 p-4">
          <Label label="닉네임" htmlFor="nickname">
            <Input placeholder={user.nickname} id="nickname" />
          </Label>
          <Label label="자기소개" htmlFor="introduction">
            <Input
              placeholder={user.introduction ?? '자기소개를 입력해주세요.'}
              id="introduction"
            />
          </Label>
        </article>
      </form>
    </section>
  );
}
