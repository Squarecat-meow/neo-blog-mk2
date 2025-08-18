import GithubHeatmap from '@/components/Heatmap/Heatmap';
import PostCard from '@/components/Primitives/Card/PostCard';
import prismaClient from '@/lib/prisma';

export default async function Home() {
  const prisma = prismaClient;

  const posts = await prisma.post.findMany();
  const postList = posts.slice(0, 6);

  return (
    <section className="w-full space-y-6 mt-2">
      <article className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
        <GithubHeatmap username="Squarecat-meow" />
        <GithubHeatmap username="yunochi" />
      </article>
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {postList.length !== 0 ? (
          postList.map((el) => <PostCard key={el.id} post={el} />)
        ) : (
          <h1>포스트가 없어요!</h1>
        )}
      </article>
    </section>
  );
}
