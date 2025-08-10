import { ACCESSTOKEN_EXPIRES } from '@/constant/tokenTime';
import { IAccessTokenPayload } from '@/types/TokenType';
import { publishAccessToken } from '@/utils/token';
import * as jose from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export default async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.redirect('/login');
  }

  try {
    const secretKey = jose.base64url.decode(process.env.JWT_SECRET!);
    const { payload }: { payload: IAccessTokenPayload } = await jose.jwtVerify(
      refreshToken,
      secretKey,
    );

    if (!payload) {
      throw new Error('JWT가 유효하지 않습니다.');
    }

    const newAccessToken = await publishAccessToken(payload.userId);

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: ACCESSTOKEN_EXPIRES,
      path: '/',
    });

    return response;
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
