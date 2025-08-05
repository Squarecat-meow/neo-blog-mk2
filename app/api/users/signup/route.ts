import prismaClient from '@/lib/prisma';
import { ISignup } from '@/types/UserType';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = prismaClient;
const SALT_ROUND = 10;

export async function POST(req: NextRequest) {
  const data = (await req.json()) as ISignup;

  try {
    if (data.inviteCode !== process.env.INVITE_CODE)
      throw new Error('초대코드가 맞지 않습니다.');

    const salt = await bcrypt.genSalt(SALT_ROUND);
    const saltedPassword = await bcrypt.hash(data.password, salt);

    prisma.user
      .create({
        data: {
          userId: data.id,
          password: saltedPassword,
          nickname: data.nickname,
        },
      })
      .catch((err) => {
        return NextResponse.json({ error: err.message }, { status: 500 });
      });

    return NextResponse.json({}, { status: 201 });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
