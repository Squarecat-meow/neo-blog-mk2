'use client';

import Button from '@/components/Primitives/Button/Button';
import Input from '@/components/Primitives/Input/Input';
import Label from '@/components/Primitives/Label/Label';
import { useUserStore } from '@/store/UserStore';
import { ILogin } from '@/types/UserType';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILogin>({ mode: 'onChange' });
  const router = useRouter();
  const { addCurrentUser } = useUserStore();

  const onSubmit: SubmitHandler<ILogin> = async (e) => {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(e),
    });

    const data = await res.json();

    switch (res.status) {
      case 400:
        return setError('root', { message: data.error });
      case 404:
        return setError('root', { message: data.error });
      case 200:
        addCurrentUser(data.currentUser);
        return router.push('/');
    }
  };
  return (
    <section className="grid place-items-center h-full">
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-8 mt-8"
        >
          <Label label="아이디" htmlFor="id">
            <Input
              placeholder="아이디를 입력해주세요"
              id="id"
              className="font-medium"
              autoComplete="off"
              {...register('id')}
            />
          </Label>
          <Label label="비밀번호" htmlFor="password" className="relative">
            <Input
              placeholder="비밀번호를 입력해주세요"
              id="password"
              type="password"
              className="font-medium"
              {...register('password')}
            />
            {errors.root && (
              <span className="absolute -bottom-5 w-full text-right text-sm text-red-600">
                {errors.root.message}
              </span>
            )}
          </Label>
          <Button type="submit" variant="primary" className="w-full">
            로그인
          </Button>
        </form>
        <Link href={'/signup'} className="mt-4">
          회원가입
        </Link>
      </div>
    </section>
  );
}
