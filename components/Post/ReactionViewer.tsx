'use client';

import { IReactionRes, reactionArray } from '@/types/ReactionType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';
import { AnimatePresence, motion } from 'motion/react';

export default function ReactionViewer({
  reactions,
  postId,
}: {
  reactions: IReactionRes[] | undefined;
  postId: number;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['reaction'],
    mutationFn: async (reaction: string) => {
      await ky.delete('/api/post/reaction', {
        json: {
          reaction,
          postId,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reaction'],
      });
    },
  });
  const emojiDict = new Map(
    reactionArray.map((item) => [item.reaction, item.emoji]),
  );

  if (!reactions) return null;

  const newReaction = reactions.map((el) => {
    return {
      reaction: el.reaction,
      emoji: emojiDict.get(el.reaction),
      count: el.count,
      isActive: el.isActive,
    };
  });

  const handleReactionClick = (reaction: string, isActive: boolean) => {
    if (isActive) {
      mutation.mutate(reaction);
    } else {
      return null;
    }
  };

  return (
    <div className="flex gap-2">
      <AnimatePresence>
        {newReaction.map(({ reaction, emoji, count, isActive }) => (
          <motion.button
            key={reaction}
            className={`h-10 flex items-center gap-2 px-4 border ${isActive ? 'border-green-300 bg-green-100 hover:bg-green-200 cursor-pointer' : 'border-gray-300'} rounded-4xl transition-colors`}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 5, opacity: 0 }}
            onClick={() => handleReactionClick(reaction, isActive)}
          >
            <div>{emoji}</div>
            <div>{count}</div>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
