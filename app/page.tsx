import GithubHeatmap from '@/components/Heatmap/Heatmap';
import PostCard from '@/components/Primitives/Card/PostCard';
import prismaClient from '@/lib/prisma';
import { mockPosts } from '@/mock/mockdata';

export default async function Home() {
  const prisma = prismaClient;

  // const posts = await prisma.post.findMany();
  const posts = mockPosts;

  return (
    <main className="flex">
      <section className="w-full mt-2">
        <article className="grid grid-cols-1 xl:grid-cols-2 gap-2">
          <GithubHeatmap username="Squarecat-meow" />
          <GithubHeatmap username="yunochi" />
        </article>
        <article className="grid grid-cols-3 gap-12">
          {posts.length !== 0 ? (
            posts.map((el) => <PostCard key={el.id} post={el} />)
          ) : (
            <h1>포스트가 없어요!</h1>
          )}
        </article>
      </section>
    </main>
  );
}
