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
        {posts.length !== 0 ? (
          <>
            <section className="grid grid-rows-2 border-b divide-y">
              {posts.slice(0, 2).map((post) => (
                <div key={post.id} className="p-4 @container">
                  <PostCard post={post} />
                </div>
              ))}
            </section>
            <section className="grid grid-cols-3 divide-x">
              {posts.length > 2 &&
                posts.slice(2, 5).map((post) => (
                  <div key={post.id} className="p-4">
                    <PostCard key={post.id} post={post} />
                  </div>
                ))}
            </section>
          </>
        ) : (
          <h1>포스트가 없어요!</h1>
        )}
      </section>
    </main>
  );
}
