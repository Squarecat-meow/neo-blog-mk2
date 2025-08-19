import prismaClient from '@/lib/prisma';
import { verifyToken } from '@/utils/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken)
    return NextResponse.redirect(`${process.env.APP_URL}/api/users/refresh`);

  const { userId } = await verifyToken(accessToken);

  const data = await req.json();

  const category = await prismaClient.category.findUnique({
    where: {
      id: data.categoryId,
    },
  });

  if (!category)
    return NextResponse.json(
      { error: '카테고리를 찾을 수 없습니다!' },
      { status: 404 },
    );

  const result = await prismaClient.post.create({
    data: {
      authorId: userId,
      title: data.title,
      body: data.body,
      summary: data.summary,
      categoryId: category.id,
      thumbnailImgUrl: data.thumbnailImgUrl,
    },
  });

  return NextResponse.json({ result });
}
