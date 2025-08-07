import PostCard from '@/components/Primitives/Card/PostCard';
import prismaClient from '@/lib/prisma';
import { IPost } from '@/types/PostTypes';

export default async function Home() {
  const prisma = prismaClient;

  const posts = await prisma.post.findMany();

  return (
    <main className="flex">
      <section className="w-3/4">
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
      <section className="w-1/4 border-l p-6">미스키 넣기</section>
    </main>
  );
}
