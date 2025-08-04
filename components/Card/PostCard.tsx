import { IPost } from '@/types/PostTypes';
import Link from 'next/link';

export default function PostCard({ post }: { post: IPost }) {
  return (
    <article>
      <Link href={`/post/${post.id}`} className="w-fit h-fit">
        <header>{post.title}</header>
        <span>
          {post.updatedAt
            ? post.updatedAt.toISOString()
            : post.createdAt.toISOString()}
        </span>
        <p>{post.body}</p>
      </Link>
    </article>
  );
}
