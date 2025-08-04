import { IPost } from '@/types/PostTypes';
import dateParser from '@/utils/dateParser';
import Link from 'next/link';

export default function PostCard({ post }: { post: IPost }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="flex flex-col space-x-0 @xs:flex-row @xs:space-x-4"
    >
      {post.thumbnailImgUrl && (
        <img
          src={post.thumbnailImgUrl}
          alt="포스트 썸네일"
          className="h-32 aspect-square object-cover"
        />
      )}
      <div>
        <div className="mb-4">
          <header className="font-noto-serif text-2xl">{post.title}</header>
          <div className="space-x-2">
            <span className="font-light">
              {post.updatedAt
                ? dateParser(post.updatedAt)
                : dateParser(post.createdAt)}
            </span>
            <span className="font-light"> | </span>
            <span className="font-light text-sm">{post.category}</span>
          </div>
        </div>
        <p>{post.body}</p>
      </div>
    </Link>
  );
}
