import prismaClient from '@/lib/prisma';
import { verifyToken } from '@/utils/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // TODO: req에서 받아온 categoryName으로 DB에 작성자 소유로 새 카테고리 만들기
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
