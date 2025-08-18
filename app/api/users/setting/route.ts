import prismaClient from '@/lib/prisma';
import { Bucket, s3 } from '@/lib/s3';
import { IUser } from '@/types/UserType';
import { isTokenValid, verifyToken } from '@/utils/token';
import { PutObjectCommand } from '@aws-sdk/client-s3';
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
      const profileImgArrayBuffer = await profileImg.arrayBuffer();
      const profileImgBuffer = Buffer.from(profileImgArrayBuffer);
      const fileName = crypto.randomUUID();

      const res = await s3.send(
        new PutObjectCommand({
          Bucket: Bucket,
          Key: `profile-photo/${fileName}`,
          Body: profileImgBuffer,
          ContentType: 'image/png',
        }),
      );

      if (res.$metadata.httpStatusCode !== 200) {
        throw new Error('버킷에 업로드가 실패했습니다.');
      }

      parsedData.profileImgUrl = `https://${process.env.BACKBLAZE_BUCKET}.s3.${process.env.BACKBLAZE_REGION}.backblazeb2.com/profile-photo/${fileName}`;
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
