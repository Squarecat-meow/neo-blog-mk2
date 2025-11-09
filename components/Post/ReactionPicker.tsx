'use client';

import { PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, stagger } from 'motion/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';
import { reactionArray } from '@/types/ReactionType';

export default function ReactionPicker({
  postId,
  isActive,
}: {
  postId: number;
  isActive: boolean;
}) {
  const [showReactions, setShowReactions] = useState(false);
  const reactionPickerRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['reaction'],
    mutationFn: async (reaction: string) => {
      const res = await ky
        .patch('/api/post/reaction', {
          json: {
            postId,
            reaction,
          },
        })
        .json();

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reaction'] });
    },
  });
  const containerVariants = {
    hidden: {
      transition: {
        delayChildren: stagger(0.01, { from: 'last' }),
        when: 'afterChildren',
      },
    },
    show: {
      transition: {
        delayChildren: stagger(0.05),
      },
    },
  };
  const childrenVariants = {
    hidden: { opacity: 0, y: 10, rotate: 90 },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
    },
  };

  const handleToggleReaction = () => {
    setShowReactions(!showReactions);
  };
  const handleReactionClick = (reaction: string) => {
    mutation.mutate(reaction);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        reactionPickerRef.current &&
        !reactionPickerRef.current.contains(e.target as Node)
      )
        setShowReactions(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  return (
    <div className="relative mt-12">
      <motion.button
        onClick={handleToggleReaction}
        disabled={!isActive}
        animate={showReactions ? 'active' : 'inactive'}
        variants={{
          inactive: {
            rotate: 180,
          },
          active: {
            rotate: 0,
          },
        }}
        className="h-10 grid place-items-center aspect-square border border-gray-300 rounded-full hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        ref={reactionPickerRef}
      >
        <PlusIcon />
      </motion.button>
      <AnimatePresence>
        {showReactions && (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="absolute -top-10 flex gap-2"
          >
            {reactionArray.map((el, i) => (
              <motion.li
                key={i}
                className="h-8 grid place-items-center aspect-square border border-gray-300 rounded-full hover:bg-gray-300 transition-colors cursor-pointer"
                variants={childrenVariants}
                onClick={() => handleReactionClick(el.reaction)}
              >
                {el.emoji}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
