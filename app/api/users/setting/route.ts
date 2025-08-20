import prismaClient from '@/lib/prisma';
import { uploadFile } from '@/lib/s3';
import { IUser } from '@/types/UserType';
import { isTokenValid, verifyToken } from '@/utils/token';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Token Validation
  const accessToken = req.cookies.get('accessToken');
  if (!accessToken)
    return NextResponse.json({ authenticatd: false }, { status: 401 });

  const checkTokenValid = await isTokenValid(accessToken.value);
  if (!checkTokenValid)
    return NextResponse.json({ authenticated: false }, { status: 403 });

  try {
    const jwtPayload = await verifyToken(accessToken.value);

    const data = await req.formData();
    const profileImg = data.get('profileImgUrl');
    const parsedData = Object.fromEntries(data.entries()) as Partial<IUser>;

    if (profileImg && typeof profileImg !== 'string') {
      const profileImgUrl = await uploadFile(profileImg);

      parsedData.profileImgUrl = profileImgUrl;
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        userId: jwtPayload.userId,
      },
      data: {
        nickname: parsedData.nickname,
        introduction: parsedData.introduction,
        profileImgUrl: parsedData.profileImgUrl,
      },
      select: {
        id: true,
        userId: true,
        nickname: true,
        introduction: true,
        profileImgUrl: true,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
