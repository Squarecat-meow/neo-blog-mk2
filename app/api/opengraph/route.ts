import { checkRateLimit } from '@/lib/rate-limit-memory';
import ky from 'ky';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for') ??
    req.headers.get('x-real-ip') ??
    'unknown';
  const { success, remaining } = checkRateLimit(ip, 100, 3600000);

  if (!success) {
    return NextResponse.json(
      { error: '요청이 너무 많습니다!' },
      { status: 429, headers: { 'X-RateLimit-Remaning': '0' } },
    );
  }

  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: '요청 URL이 없습니다!' },
      { status: 400 },
    );
  }

  try {
    const res = await ky.get(url);
    const html = await res.text();

    const ogData = {
      title: html.match(/<meta property="og:title" content="([^"]*)"/)?.[1],
      description: html.match(
        /<meta property="og:description" content="([^"]*)"/,
      )?.[1],
      image: html.match(/<meta property="og:image" content="([^"]*)"/)?.[1],
      url: html.match(/<meta property="og:url" content="([^"]*)"/)?.[1],
    };

    return NextResponse.json(ogData);
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json(
        {
          error: 'OpenGraph 데이터를 가져오는 데 실패했습니다! ' + err.message,
        },
        { status: 500 },
      );
  }
}
