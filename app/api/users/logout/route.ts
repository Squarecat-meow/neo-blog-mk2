import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  const existingCookies = cookieStore.getAll();
  existingCookies.map((cookie) => {
    cookieStore.delete(cookie.name);
  });
  return NextResponse.json({ success: true });
}
