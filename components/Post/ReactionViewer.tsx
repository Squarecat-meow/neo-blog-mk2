'use client';

import { IReactionData, reactionArray } from '@/types/ReactionType';
import { Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { Loader2Icon } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReactionViewer({
  postId,
}: {
  reactionJson: Prisma.JsonValue;
  postId: number;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ['reaction'],
    queryFn: async () => {
      const res = await ky
        .get(`/api/post/reaction`, {
          searchParams: {
            id: postId,
          },
        })
        .json();
      return res as { res: { reaction: IReactionData[] } };
    },
    staleTime: 5000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (!data?.res.reaction) return null;

  if (isLoading)
    return (
      <div className="h-8">
        <Loader2Icon className="animate-spin" />
      </div>
    );

  const emojiDict = new Map(
    reactionArray.map((item) => [item.reaction, item.emoji]),
  );

  const newReaction = data.res.reaction
    .filter((el) => emojiDict.has(el.reaction))
    .map((el) => ({
      ...el,
      emoji: emojiDict.get(el.reaction)!,
    }));
  return (
    <div className="flex gap-2">
      {newReaction.map(({ reaction, emoji, count }) => (
        <motion.div
          key={reaction}
          className="h-10 flex items-center gap-2 px-4 border border-gray-300 rounded-4xl cursor-pointer transition-colors hover:bg-gray-300"
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div>{emoji}</div>
          <div>{count}</div>
        </motion.div>
      ))}
    </div>
  );
}
