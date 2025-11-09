import { isTokenValid, verifyAndRefreshAccessToken } from '@/utils/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { ACCESSTOKEN_EXPIRES } from './constant/tokenTime';

function isProtectedRoute(pathname: string): boolean {
  const protectedRoute = [
    '/setting',
    '/writer',
    '/api/users/me',
    '/api/setting/:path*',
    '/api/writer/:path*',
  ];
  return protectedRoute.some((route) => pathname.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const response = NextResponse.next();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const anonymousId = request.cookies.get('anonymous_id')?.value;

  if (!refreshToken && !accessToken) {
    if (isProtectedRoute(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!anonymousId) {
      response.cookies.set('anonymous_id', crypto.randomUUID(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });

      return response;
    }
  }

  if (!accessToken && refreshToken) {
    try {
      const newAccessToken = await verifyAndRefreshAccessToken(refreshToken);

      if (!newAccessToken)
        return NextResponse.redirect(new URL('/login', request.url));

      response.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: ACCESSTOKEN_EXPIRES,
        path: '/',
      });

      return response;
    } catch (err) {
      console.error('액세스 토큰 재발급 중 오류 발생:', err);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (refreshToken && accessToken) {
    if (anonymousId) {
      response.cookies.delete('anonymous_id');

      return response;
    }

    const [isAccessTokenValid, isRefreshTokenValid] = await Promise.all([
      isTokenValid(accessToken),
      isTokenValid(refreshToken),
    ]);

    if (!isAccessTokenValid || !isRefreshTokenValid) {
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
