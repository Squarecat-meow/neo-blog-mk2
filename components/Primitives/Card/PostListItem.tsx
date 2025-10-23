import { IPostWithCategory } from '@/types/PostTypes';
import dateParser from '@/utils/dateParser';
import { Flex, Text } from '@radix-ui/themes';
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
      <Flex
        direction={'column'}
        minWidth={'150px'}
        maxWidth={'1000px'}
        className="p-2"
      >
        <h1 className="text-2xl font-noto-serif">{post.title}</h1>
        <Flex gap="2" className="break-keep">
          <span className="text-xs font-light">
            {post.updatedAt
              ? dateParser(post.updatedAt)
              : dateParser(post.createdAt)}
          </span>
          <span className="text-xs font-light">|</span>
          <span className="text-xs font-light">{post.category.name}</span>
        </Flex>
        <Text as="p" className="text-sm md:text-md" truncate wrap={'balance'}>
          {post.summary}
        </Text>
      </Flex>
    </Link>
  );
}
