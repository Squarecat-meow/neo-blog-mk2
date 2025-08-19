import { Bucket, s3 } from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const img = data.get('file');

  if (!img || typeof img !== 'object') {
    return NextResponse.json({ error: '파일이 없습니다!' }, { status: 400 });
  }

  const arrayBuffer = await img.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileName = crypto.randomUUID();

  const res = await s3.send(
    new PutObjectCommand({
      Bucket: Bucket,
      Key: `post/${fileName}`,
      Body: buffer,
      ContentType: 'image/png',
    }),
  );

  if (res.$metadata.httpStatusCode !== 200) {
    throw new Error('버킷에 업로드가 실패했습니다.');
  }

  const pastedImgUrl = `https://${process.env.BACKBLAZE_BUCKET}.s3.${process.env.BACKBLAZE_REGION}.backblazeb2.com/post/${fileName}`;

  return NextResponse.json({ url: pastedImgUrl });
}
