import prismaClient from '@/lib/prisma';
import { IReactionData, reactionArray } from '@/types/ReactionType';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const anonymousId = req.cookies.get('anonymous_id')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!id)
    return NextResponse.json(
      { error: '유효한 요청이 아닙니다!' },
      { status: 400 },
    );

  try {
    const res = (await prismaClient.post.findUniqueOrThrow({
      where: {
        id: parseInt(id),
      },
      select: {
        reaction: true,
      },
    })) as unknown as { reaction: IReactionData[] | null };

    if (!res.reaction) return NextResponse.json(null);

    const reactionCounts = res.reaction.reduce(
      (acc, r) => {
        acc[r.reaction] = (acc[r.reaction] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const userReaction = res.reaction
      .filter((r) =>
        refreshToken ? r.id === refreshToken : r.id === anonymousId,
      )
      .map((r) => r.reaction);

    const reactions = Object.entries(reactionCounts).map(
      ([reaction, count]) => ({
        reaction,
        count,
        isActive: userReaction.includes(reaction),
      }),
    );

    return NextResponse.json({ reactions });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const anonymousId = req.cookies.get('anonymous_id')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!anonymousId && !refreshToken) {
      return NextResponse.json(
        { error: '유저ID가 없습니다!' },
        { status: 401 },
      );
    }

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

    // 포스트에 리액션이 없으면?
    if (!post.reaction) {
      const reactionJson: Prisma.InputJsonArray = [
        {
          reaction: payload.reaction,
          id: anonymousId ? anonymousId : refreshToken,
        },
      ];

      const res = await prismaClient.post.update({
        where: { id: payload.postId },
        data: { reaction: reactionJson },
      });

      return NextResponse.json({ res });

      // 포스트에 리액션이 있으면?
    } else {
      const postReaction = post.reaction as unknown as IReactionData[];
      const updated = [
        ...postReaction,
        {
          reaction: payload.reaction,
          id: anonymousId ? anonymousId : refreshToken,
        },
      ];

      // const updated = addReaction(
      //   postReaction,
      //   payload.reaction,
      //   anonymousId ? anonymousId : refreshToken,
      // ); // 숫자를 증가시키거나 하나 만드는 함수 호출
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

export async function DELETE(req: NextRequest) {
  try {
    const anonymousId = req.cookies.get('anonymous_id')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!anonymousId && !refreshToken) {
      return NextResponse.json(
        { error: '유저ID가 없습니다!' },
        { status: 401 },
      );
    }

    const payload = (await req.json()) as {
      postId: number;
      reaction: string;
    };

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

    const postReaction = post.reaction as unknown as IReactionData[];
    const updated = postReaction.filter((r) =>
      refreshToken ? r.id !== refreshToken : r.id !== anonymousId,
    );

    const res = await prismaClient.post.update({
      where: { id: payload.postId },
      data: {
        reaction: updated as unknown as Prisma.InputJsonArray,
      },
    });

    return NextResponse.json({ res });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
