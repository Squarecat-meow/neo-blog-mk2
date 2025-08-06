import { isTokenValid } from '@/utils/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const [isAccessTokenValid, isRefreshTokenValid] = await Promise.all([
    isTokenValid(accessToken),
    isTokenValid(refreshToken),
  ]);

  if (!isRefreshTokenValid) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!isAccessTokenValid) {
    try {
      const res = await fetch('/api/users/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL('/login', request.url));
      } else {
        const res = NextResponse.next();
        const resCookies = res.cookies;

        const accessToken = resCookies.get('accessToken');
        const refreshToken = resCookies.get('refreshToken');

        if (accessToken) {
          res.cookies.set('accessToken', accessToken.value, {
            httpOnly: accessToken.httpOnly,
            sameSite: accessToken.sameSite,
            path: accessToken.path,
            secure: accessToken.secure,
          });
        }

        if (refreshToken) {
          res.cookies.set('refreshToken', refreshToken.value, {
            httpOnly: refreshToken.httpOnly,
            sameSite: refreshToken.sameSite,
            path: refreshToken.path,
            secure: refreshToken.secure,
          });
        }

        return res;
      }
    } catch (err) {
      console.error('액세스 토큰 재발급 중 오류 발생:', err);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: ['/mypage', '/writer'],
};
