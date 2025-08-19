import { IPostWithCategory } from '@/types/PostTypes';
import dateParser from '@/utils/dateParser';
import Link from 'next/link';

export default function PostListItem({ post }: { post: IPostWithCategory }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="h-32 flex gap-2 border border-slate-200 rounded-lg transition-shadow hover:shadow-lg"
    >
      {post.thumbnailImgUrl && (
        <img
          src={post.thumbnailImgUrl}
          alt="포스트 사진의 썸네일"
          className="h-32 object-cover aspect-square rounded-l-lg"
        />
      )}
      <div className="p-2">
        <h1 className="text-2xl font-noto-serif">{post.title}</h1>
        <div className="flex gap-2">
          <span className="text-sm font-light">
            {post.updatedAt
              ? dateParser(post.updatedAt)
              : dateParser(post.createdAt)}
          </span>
          <span className="text-sm font-light">|</span>
          <span className="text-sm font-light">{post.category.name}</span>
        </div>
        <p className="text-lg">{post.summary}</p>
      </div>
    </Link>
  );
}
