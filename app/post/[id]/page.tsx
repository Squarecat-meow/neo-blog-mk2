import prismaClient from '@/lib/prisma';
import dateParser from '@/utils/dateParser';
import Image from 'next/image';
import ErrorImage from '@/public/images/error.webp';

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  try {
    const { id } = await params;

    const post = await prismaClient.post.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });

    const user = await prismaClient.user.findUniqueOrThrow({
      where: {
        userId: post.authorId,
      },
    });

    // TODO: markdown 파싱하기
    return (
      <article className="w-5/6 flex flex-col mt-6">
        <h1 className="text-5xl font-noto-serif text-center mb-4">
          {post.title}
        </h1>
        <div className="w-full mb-2 text-sm text-center font-light space-x-2">
          <span>{dateParser(post.createdAt)}</span>
          <span>|</span>
          <span>{post.categoryName}</span>
        </div>
        <div className="w-full mb-12 flex gap-2 justify-center items-center text-sm font-light">
          {user.profileImgUrl ? (
            <img
              src={user.profileImgUrl}
              alt={`${user.nickname}의 프로필 사진`}
              className="h-8 aspect-square rounded-full"
            />
          ) : (
            <div className="h-8 aspect-square rounded-full bg-gray-200" />
          )}
          <span>{user.nickname}</span>
        </div>
        <p>{post.body}</p>
      </article>
    );
  } catch (err) {
    if (err instanceof Error)
      return (
        <article>
          <Image src={ErrorImage} alt="에러 이미지" />
          <span>{err.message}</span>
        </article>
      );
  }
}
