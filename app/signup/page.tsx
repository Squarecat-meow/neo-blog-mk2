'use client';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Label from '@/components/Label/Label';
import { ISignup } from '@/types/UserType';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<ISignup>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ISignup> = async (e) => {
    const res = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(e),
    });

    switch (res.status) {
      case 400:
        setError('inviteCode', { message: '초대코드가 맞지 않습니다.' });
      case 201:
        router.push('/login');
    }
  };
  return (
    <main className="grid place-items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-8 mt-8"
      >
        <section className="space-y-6">
          <Label label="초대코드" htmlFor="invite-code" className="relative">
            <Input
              placeholder="초대코드를 입력해주세요"
              id="invite-code"
              className="font-medium"
              autoComplete="off"
              {...register('inviteCode', {
                required: '초대코드를 입력해주세요.',
              })}
            />
            {errors.inviteCode && (
              <span className="absolute -bottom-5 w-full text-right text-sm text-red-600">
                {errors.inviteCode.message}
              </span>
            )}
          </Label>
          <Label label="아이디" htmlFor="id">
            <Input
              placeholder="아이디를 입력해주세요"
              id="id"
              className="font-medium"
              autoComplete="off"
              {...register('id', { required: '아이디를 입력해주세요.' })}
            />
            {errors.id && (
              <span className="absolute -bottom-5 w-full text-right text-sm text-red-600">
                {errors.id.message}
              </span>
            )}
          </Label>
          <Label label="닉네임" htmlFor="nickname">
            <Input
              placeholder="닉네임을 입력해주세요"
              id="nickname"
              className="font-medium"
              autoComplete="off"
              {...register('nickname', { required: '닉네임을 입력해주세요.' })}
            />
            {errors.nickname && (
              <span className="absolute -bottom-5 w-full text-right text-sm text-red-600">
                {errors.nickname.message}
              </span>
            )}
          </Label>
        </section>
        <section className="space-y-6">
          <Label label="비밀번호" htmlFor="password">
            <Input
              placeholder="비밀번호를 입력해주세요"
              id="password"
              type="password"
              className="font-medium"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
            />
            {errors.password && (
              <span className="absolute -bottom-5 w-full text-right text-sm text-red-600">
                {errors.password.message}
              </span>
            )}
          </Label>
          <Label
            label="비밀번호 확인"
            htmlFor="password-confirm"
            className="relative"
          >
            <Input
              placeholder="비밀번호를 다시 입력해주세요"
              id="password-confirm"
              type="password"
              className="font-medium"
              {...register('passwordConfirm', {
                required: '비밀번호를 다시 입력해주세요.',
                validate: (val) => {
                  if (val !== getValues('password')) {
                    return '비밀번호가 맞지 않습니다.';
                  }
                },
              })}
            />
            {errors.passwordConfirm && (
              <span className="absolute -bottom-5 w-full text-right text-sm text-red-600">
                {errors.passwordConfirm.message}
              </span>
            )}
          </Label>
        </section>
        <Button
          type="submit"
          className="col-span-2 w-full transition-colors hover:bg-slate-700/30"
        >
          회원가입
        </Button>
      </form>
    </main>
  );
}
