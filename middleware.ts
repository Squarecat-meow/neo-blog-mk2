import { isTokenValid, verifyAndRefreshAccessToken } from '@/utils/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { ACCESSTOKEN_EXPIRES } from './constant/tokenTime';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (!refreshToken) {
    return NextResponse.json({ authenticated: false });
  }

  if (!accessToken) {
    try {
      const newAccessToken = await verifyAndRefreshAccessToken(
        refreshToken.value,
      );

      if (!newAccessToken) return NextResponse.json({ authenticatd: false });

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
