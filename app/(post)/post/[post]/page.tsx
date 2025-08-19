import prismaClient from '@/lib/prisma';
import dateParser from '@/utils/dateParser';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeCodeTitles from 'rehype-code-titles';
import remarkGfm from 'remark-gfm';

export default async function Page({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const { post: id } = await params;
  const post = await prismaClient.post.findUniqueOrThrow({
    where: {
      id: parseInt(id),
    },
    include: {
      author: {
        select: {
          nickname: true,
          profileImgUrl: true,
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
          <img
            src={post.author.profileImgUrl}
            alt={`${post.author.nickname}의 프로필 사진`}
            className="h-8 aspect-square rounded-full"
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
    </article>
  );
}
