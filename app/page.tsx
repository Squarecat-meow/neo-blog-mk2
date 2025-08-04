import PostCard from '@/components/Card/PostCard';
import { mockPosts } from '@/mock/PostMock';

export default function Home() {
  return (
    <main className="flex">
      <section className="w-3/4">
        <section className="grid grid-rows-2 border-b divide-y">
          {mockPosts.slice(0, 2).map((post) => (
            <div key={post.id} className="p-4 @container">
              <PostCard post={post} />
            </div>
          ))}
        </section>
        <section className="grid grid-cols-3 divide-x">
          {mockPosts.slice(2, 5).map((post) => (
            <div key={post.id} className="p-4">
              <PostCard key={post.id} post={post} />
            </div>
          ))}
        </section>
      </section>
      <section className="w-1/4 border-l p-6">미스키 넣기</section>
    </main>
  );
}
