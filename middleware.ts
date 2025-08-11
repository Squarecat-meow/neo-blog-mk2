import { isTokenValid, publishAccessToken } from '@/utils/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import { IAccessTokenPayload } from './types/TokenType';
import { ACCESSTOKEN_EXPIRES } from './constant/tokenTime';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!accessToken) {
    try {
      const secretKey = jose.base64url.decode(process.env.JWT_SECRET!);
      const { payload }: { payload: IAccessTokenPayload } =
        await jose.jwtVerify(refreshToken.value, secretKey);

      if (!payload) {
        throw new Error('JWT가 유효하지 않습니다.');
      }

      const newAccessToken = await publishAccessToken(payload.userId);

      const res = NextResponse.next();

      res.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: ACCESSTOKEN_EXPIRES,
        path: '/',
      });

      return res;
    } catch (err) {
      console.error('액세스 토큰 재발급 중 오류 발생:', err);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  const [isAccessTokenValid, isRefreshTokenValid] = await Promise.all([
    isTokenValid(accessToken.value),
    isTokenValid(refreshToken.value),
  ]);

  if (!isAccessTokenValid || !isRefreshTokenValid) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/setting', '/writer', '/api/users/me'],
};
