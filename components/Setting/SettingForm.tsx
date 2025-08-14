'use client';

import { IUser } from '@/types/UserType';
import ProfileImgButton from './ProfileImgButton';
import Label from '@/components/Primitives/Label/Label';
import Input from '../Primitives/Input/Input';
import { useProfileImgCropperStore } from '@/store/ProfileImgCropStore';
import Button from '../Primitives/Button/Button';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ISettingForm {
  profileImgUrl: string | null;
  nickname: string;
  introduction: string | null;
}

export default function MyPageForm({ user }: { user: IUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const { currentImg, changeCurrentImg } = useProfileImgCropperStore();

  const { register, handleSubmit, setValue } = useForm<ISettingForm>();

  const onSubmit: SubmitHandler<ISettingForm> = async (e) => {
    setIsLoading(true);
    const formData = new FormData();

    try {
      let blob: Blob | null = null;

      if (currentImg) {
        blob = await fetch(currentImg).then((r) => r.blob());
      }

      for (const [k, v] of Object.entries(e)) {
        formData.append(k, v);
        formData.set('profileImgUrl', blob ?? '');
      }

      fetch('/api/users/setting', {
        method: 'POST',
        body: formData,
      });
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    changeCurrentImg(user.profileImgUrl);
  }, [user.profileImgUrl, changeCurrentImg]);

  useEffect(() => {
    setValue('profileImgUrl', currentImg);
  }, [currentImg, setValue]);

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2xl grid grid-cols-3"
      >
        <article className="p-4 space-y-4">
          <h1 className="text-lg text-center font-light">프로필 사진</h1>
          <ProfileImgButton />
        </article>
        <article className="col-span-2 flex flex-col gap-4 p-4">
          <Label label="닉네임" htmlFor="nickname">
            <Input
              placeholder={user.nickname}
              id="nickname"
              {...register('nickname', {
                value: user.nickname,
              })}
            />
          </Label>
          <Label label="자기소개" htmlFor="introduction">
            <Input
              placeholder={user.introduction ?? '자기소개를 입력해주세요.'}
              id="introduction"
              {...register('introduction', {
                value: user.introduction,
              })}
            />
          </Label>
          <Button
            variant={isLoading ? 'disabled' : 'primary'}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? '적용 완료!' : '적용'}
          </Button>
        </article>
      </form>
    </section>
  );
}
