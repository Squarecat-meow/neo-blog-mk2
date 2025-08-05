'use client';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Label from '@/components/Label/Label';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ILoginForm {
  id: string;
  password: string;
}

export default function Page() {
  const { register, handleSubmit } = useForm<ILoginForm>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ILoginForm> = (e) => {
    console.log(e);
  };
  return (
    <main className="grid place-items-center">
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
        <Label label="비밀번호" htmlFor="password">
          <Input
            placeholder="비밀번호를 입력해주세요"
            id="password"
            type="password"
            className="font-medium"
            {...register('password')}
          />
        </Label>
        <Button
          type="submit"
          className="w-full transition-colors hover:bg-slate-700/30"
        >
          로그인
        </Button>
      </form>
      <Link href={'/signin'} className="mt-4 hover:border-b">
        회원가입
      </Link>
    </main>
  );
}
