import { ILogin } from '@/types/UserType';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prismaClient from '@/lib/prisma';
import { publishAccessToken, publishRefreshToken } from '@/utils/token';

const prisma = prismaClient;

export async function POST(req: NextRequest) {
  const data = (await req.json()) as ILogin;

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: data.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: '유저를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    const validPassword = await bcrypt.compare(data.password, user.password);

    if (!validPassword)
      throw new Error('아이디나 비밀번호가 일치하지 않습니다.');

    const accessToken = await publishAccessToken(data.id);
    const refreshToken = await publishRefreshToken(data.id);

    const updatedUser = await prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    console.log(updatedUser);

    const response = NextResponse.json({ success: true });

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60,
      path: '/',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
