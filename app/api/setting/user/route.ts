import prismaClient from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prismaClient.user.findMany();

    return NextResponse.json(users);
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
