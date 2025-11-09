'use client';

import ReactionPicker from './ReactionPicker';
import ReactionViewer from './ReactionViewer';
import { IReactionRes } from '@/types/ReactionType';
import ky from 'ky';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';

export default function Reaction({ postId }: { postId: number }) {
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
      return res as { reactions: IReactionRes[] };
    },
    staleTime: 5000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading)
    return (
      <div className="h-8">
        <Loader2Icon className="animate-spin" />
      </div>
    );

  if (!data)
    return (
      <div className="flex items-end gap-2">
        <ReactionPicker postId={postId} isActive={true} />
      </div>
    );

  const isActive = data.reactions.some((el) => el.isActive);

  return (
    <div className="flex items-end gap-2">
      <ReactionPicker postId={postId} isActive={!isActive} />
      <ReactionViewer postId={postId} reactions={data?.reactions} />
    </div>
  );
}
