import prismaClient from '@/lib/prisma';
import { IReactionData, reactionArray } from '@/types/ReactionType';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

function incrementOrAddReaction(
  reactions: IReactionData[],
  targetReaction: string,
) {
  const exists = reactions.some((item) => item.reaction === targetReaction);

  if (exists) {
    return reactions.map((item) =>
      item.reaction === targetReaction
        ? { ...item, count: item.count + 1 }
        : item,
    );
  } else {
    return [...reactions, { reaction: targetReaction, count: 1 }];
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id)
    return NextResponse.json(
      { error: '유효한 요청이 아닙니다!' },
      { status: 400 },
    );

  try {
    const res = await prismaClient.post.findUniqueOrThrow({
      where: {
        id: parseInt(id),
      },
      select: {
        reaction: true,
      },
    });

    return NextResponse.json({ res });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const payload = (await req.json()) as { postId: number; reaction: string };

    const post = await prismaClient.post.findUniqueOrThrow({
      where: {
        id: payload.postId,
      },
      select: {
        reaction: true,
      },
    });

    if (!post)
      return NextResponse.json(
        { error: '해당하는 포스트가 없습니다!' },
        { status: 404 },
      );

    const hasReaction = reactionArray.find(
      (el) => el.reaction === payload.reaction,
    );

    if (!hasReaction)
      return NextResponse.json(
        { error: '리액션 리스트에 없는 리액션입니다!' },
        { status: 400 },
      );

    if (!post.reaction) {
      const reactionJson: Prisma.InputJsonArray = [
        {
          reaction: payload.reaction,
          count: 1,
        },
      ];

      const res = await prismaClient.post.update({
        where: { id: payload.postId },
        data: { reaction: reactionJson },
      });

      return NextResponse.json({ res });
    } else {
      const postReaction = post.reaction as unknown as IReactionData[];
      const updated = incrementOrAddReaction(postReaction, payload.reaction);
      const res = await prismaClient.post.update({
        where: {
          id: payload.postId,
        },
        data: {
          reaction: updated as unknown as Prisma.InputJsonArray,
        },
      });

      return NextResponse.json({ res });
    }
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
