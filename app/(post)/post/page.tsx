import PostListItem from '@/components/Primitives/Card/PostListItem';
import prismaClient from '@/lib/prisma';

export default async function Page() {
  const posts = await prismaClient.post.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <section className="flex flex-col gap-4">
      {posts.map((el) => (
        <PostListItem post={el} key={el.id} />
      ))}
    </section>
  );
}
