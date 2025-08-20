import prismaClient from '@/lib/prisma';
import dateParser from '@/utils/dateParser';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeCodeTitles from 'rehype-code-titles';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import NotFound from '@/app/not-found';
import AuthorIntroduction from '@/components/Post/AuthorIntroduction';
import { Separator } from '@radix-ui/themes';

export default async function Page({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const { post: id } = await params;

  try {
    const post = await prismaClient.post.findUniqueOrThrow({
      where: {
        id: parseInt(id),
      },
      include: {
        author: {
          select: {
            id: true,
            userId: true,
            nickname: true,
            profileImgUrl: true,
            introduction: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return (
      <article className="w-5/6 flex flex-col mt-6">
        <h1 className="text-5xl font-noto-serif text-center mb-4">
          {post.title}
        </h1>
        <div className="w-full mb-2 text-sm text-center font-light space-x-2">
          <span>{dateParser(post.createdAt)}</span>
          <span>|</span>
          <span>{post.category.name}</span>
        </div>
        <div className="w-full mb-12 flex gap-2 justify-center items-center text-sm font-light">
          {post.author.profileImgUrl ? (
            <Image
              src={post.author.profileImgUrl}
              alt={`${post.author.nickname}의 프로필 사진`}
              className="h-8 aspect-square rounded-full"
              width={32}
              height={32}
            />
          ) : (
            <div className="h-8 aspect-square rounded-full bg-gray-200" />
          )}
          <span>{post.author.nickname}</span>
        </div>
        <div className="prose-lg">
          <MDXRemote
            source={post.body}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [rehypePrettyCode, { theme: 'catppuccin-frappe' }],
                  rehypeCodeTitles,
                ],
              },
            }}
          />
        </div>
        <Separator size="4" className="my-4" />
        <AuthorIntroduction user={post.author} />
      </article>
    );
  } catch (err) {
    if (err instanceof Error)
      return (
        <>
          <NotFound />
          <span className="text-sm font-light">{err.message}</span>
        </>
      );
  }
}
