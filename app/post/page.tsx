import PostCard from '@/components/Card/PostCard';
import { mockPosts } from '@/mock/PostMock';

export default function Page() {
  return (
    <>
      {mockPosts.map((post) => (
        <div key={post.id} className="p-8">
          <PostCard post={post} />
        </div>
      ))}
    </>
  );
}
