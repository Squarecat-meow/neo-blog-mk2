import prismaClient from '@/lib/prisma';
import { isTokenValid, verifyToken } from '@/utils/token';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const prisma = prismaClient;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json({ authenticated: false });
    }

    const checkTokenValid = await isTokenValid(accessToken);

    if (!checkTokenValid)
      return NextResponse.json({ authenticated: false }, { status: 403 });

    const payload = await verifyToken(accessToken);

    const foundedUser = await prisma.user.findUnique({
      where: {
        userId: payload.userId,
      },
      select: {
        id: true,
        userId: true,
        nickname: true,
        introduction: true,
        profileImgUrl: true,
      },
    });

    return NextResponse.json({
      authenticated: true,
      currentUser: foundedUser,
    });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
