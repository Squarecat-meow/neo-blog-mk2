import { ACCESSTOKEN_EXPIRES } from '@/constant/tokenTime';
import { verifyAndRefreshAccessToken } from '@/utils/token';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) return NextResponse.json({ authenticated: false });
  if (!accessToken) {
    const newAccessToken = await verifyAndRefreshAccessToken(refreshToken);
    if (!newAccessToken)
      return NextResponse.redirect(new URL('/login', req.url));

    accessToken = newAccessToken;
  }

  const res = NextResponse.json({ authenticated: true });

  res.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ACCESSTOKEN_EXPIRES,
    path: '/',
  });

  return res;
}
