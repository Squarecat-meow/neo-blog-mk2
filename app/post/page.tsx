import PostListItem from '@/components/Primitives/Card/PostListItem';
import { mockPosts } from '@/mock/mockdata';

export default function Page() {
  const posts = mockPosts;
  return (
    <section className="flex flex-col gap-4">
      {posts.map((el) => (
        <PostListItem post={el} key={el.id} />
      ))}
    </section>
  );
}
