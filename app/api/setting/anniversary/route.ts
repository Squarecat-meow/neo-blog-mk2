import { Anniversary } from '@prisma/client';
import prismaClient from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const anniversary = req.nextUrl.searchParams.get('anniversary');

    if (!anniversary) {
      const allAnniversary = await prismaClient.anniversary.findMany();

      return NextResponse.json(allAnniversary);
    } else {
      const specificAnniversary = await prismaClient.anniversary.findUnique({
        where: {
          id: parseInt(anniversary),
        },
      });

      return NextResponse.json(specificAnniversary);
    }
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as Omit<Anniversary, 'id'>;
    const res = await prismaClient.anniversary.create({
      data: {
        name: payload.name,
        description: payload.description,
        startDay: payload.startDay,
        endDay: payload.endDay,
      },
    });

    return NextResponse.json(res);
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const payload = (await req.json()) as Anniversary;
    const res = await prismaClient.anniversary.update({
      where: {
        id: payload.id,
      },
      data: {
        name: payload.name,
        description: payload.description,
        startDay: payload.startDay,
        endDay: payload.endDay,
      },
    });

    return NextResponse.json(res);
  } catch (err) {
    if (err instanceof Error)
      NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const payload = (await req.json()) as Partial<Anniversary>;
    const res = await prismaClient.anniversary.delete({
      where: {
        id: payload.id,
      },
    });

    return NextResponse.json(res);
  } catch (err) {
    if (err instanceof Error)
      NextResponse.json({ error: err.message }, { status: 500 });
  }
}
