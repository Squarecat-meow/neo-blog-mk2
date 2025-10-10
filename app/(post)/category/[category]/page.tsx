import PostListItem from '@/components/Primitives/Card/PostListItem';
import prismaClient from '@/lib/prisma';

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = await prismaClient.post.findMany({
    where: {
      categoryId: parseInt(category),
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return (
    <section className="flex flex-col gap-4">
      {posts.reverse().map((el) => (
        <PostListItem post={el} key={el.id} />
      ))}
    </section>
  );
}
