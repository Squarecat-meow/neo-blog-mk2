import prismaClient from '@/lib/prisma';
import dateParser from '@/utils/dateParser';

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

    return (
      <article className="w-5/6 flex flex-col mt-6">
        <h1 className="text-5xl font-noto-serif text-center mb-4">
          {post.title}
        </h1>
        <div className="w-full mb-12 text-sm text-center font-light space-x-2">
          <span>{dateParser(post.createdAt)}</span>
          <span>|</span>
          <span>{post.categoryName}</span>
        </div>
        <p>{post.body}</p>
      </article>
    );
  } catch (err) {
    console.error(err);
  }
}
