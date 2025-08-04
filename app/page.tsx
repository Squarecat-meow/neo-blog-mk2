import PostCard from '@/components/Card/PostCard';
import { mockPosts } from '@/mock/PostMock';

export default function Home() {
  return (
    <main>
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
