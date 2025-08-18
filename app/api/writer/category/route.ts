import prismaClient from '@/lib/prisma';
import { verifyToken } from '@/utils/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const categories = await prismaClient.user.findMany({
    select: {
      userId: true,
      nickname: true,
      ownedCategories: true,
    },
  });

  if (!categories)
    return NextResponse.json(
      { error: '카테고리를 찾을 수 없습니다!' },
      { status: 404 },
    );

  return NextResponse.json({ categories });
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.redirect('/api/users/refresh');
  }

  try {
    const userId = await verifyToken(accessToken);
    if (!userId)
      return NextResponse.json(
        { error: '액세스 토큰이 유효하지 않습니다!' },
        { status: 403 },
      );

    const categoryName = await req.json();
    const createdCategory = await prismaClient.user
      .update({
        where: {
          userId: userId.userId,
        },
        data: {
          ownedCategories: {
            create: {
              name: categoryName,
            },
          },
        },
      })
      .ownedCategories();

    return NextResponse.json(createdCategory);
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
