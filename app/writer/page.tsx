'use client';

import Button from '@/components/Primitives/Button/Button';
import Input from '@/components/Primitives/Input/Input';
import { Editor } from '@/components/Writer/DynamicEditor';
import CategorySelector from '@/components/Writer/CategorySelector';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import ConfirmPostModal from '@/components/Writer/ConfirmPostModal';
import { useState } from 'react';

interface IPost {
  categoryId: number;
  title: string;
  body: string;
  summary: string;
  thumbnailImgUrl: string;
}

const mutatePost = async (data: IPost) => {
  const res = await fetch('/api/writer/post', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('포스트를 만드는데 실패했습니다!');

  return await res.json();
};

export const dynamic = 'force-dynamic';

export default function Page() {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const { register, handleSubmit, setValue } = useForm<IPost>();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: mutatePost,
    onSuccess: async (res) => {
      router.push(`/post/${res.result.id}`);
    },
  });

  const onSubmit: SubmitHandler<IPost> = (e) => {
    const thumbnail = e.body.match(/\(([^)]+)\)/)?.[1];

    mutation.mutate({
      categoryId: e.categoryId,
      title: e.title,
      body: e.body,
      summary: e.summary,
      thumbnailImgUrl: thumbnail ?? '',
    });
  };

  return (
    <>
      <section className="w-full flex justify-center">
        <article className="w-full md:w-3/4 space-y-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col sm:flex-row sm:items-center gap-2"
          >
            <CategorySelector setValue={(id) => setValue('categoryId', id)} />
            <Input
              placeholder="제목"
              className="w-full flex-1"
              {...register('title', { required: true })}
            />
            <Button
              tabIndex={1}
              variant="primary"
              className="px-4"
              onClick={(e) => {
                e.preventDefault();
                setIsConfirmModalVisible(true);
              }}
            >
              글쓰기
            </Button>
          </form>
          <Editor
            onChange={(markdown, plainText) => {
              setValue('body', markdown);
              setValue('summary', plainText);
            }}
          />
        </article>
      </section>
      <ConfirmPostModal
        isVisible={isConfirmModalVisible}
        setIsVisible={setIsConfirmModalVisible}
        confirmCallback={handleSubmit(onSubmit)}
      />
    </>
  );
}
