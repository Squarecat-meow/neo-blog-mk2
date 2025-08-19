import { IPostWithCategory } from '@/types/PostTypes';
import dateParser from '@/utils/dateParser';
import { Camera } from 'lucide-react';
import Link from 'next/link';

export default function PostCard({ post }: { post: IPostWithCategory }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="flex flex-col rounded-lg border border-slate-200 transition-shadow hover:shadow-lg"
    >
      {post.thumbnailImgUrl ? (
        <img
          src={post.thumbnailImgUrl}
          alt="포스트 썸네일"
          className="h-36 aspect-video object-cover rounded-t-lg"
        />
      ) : (
        <div className="h-36 aspect-video bg-slate-200 rounded-t-lg grid place-items-center">
          <Camera className="stroke-slate-300" size={48} />
        </div>
      )}
      <div className="mt-6 p-3">
        <div className="mb-2">
          <header className="font-noto-serif text-2xl">{post.title}</header>
          <div className="space-x-2">
            <span className="font-light">
              {post.updatedAt
                ? dateParser(post.updatedAt)
                : dateParser(post.createdAt)}
            </span>
            <span className="font-light"> | </span>
            <span className="font-light text-sm">{post.category.name}</span>
          </div>
        </div>
        <p className="break-keep">{post.body}</p>
      </div>
    </Link>
  );
}
