import { IPost } from '@/types/PostTypes';
import dateParser from '@/utils/dateParser';
import Link from 'next/link';

export default function PostCard({ post }: { post: IPost }) {
  return (
    <Link href={`/post/${post.id}`}>
      <div className="mb-4">
        <header className="font-noto-serif text-2xl">{post.title}</header>
        <span className="font-light">
          {post.updatedAt
            ? dateParser(post.updatedAt)
            : dateParser(post.createdAt)}
        </span>
      </div>
      <p>{post.body}</p>
    </Link>
  );
}
