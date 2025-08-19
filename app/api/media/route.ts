import { uploadFile } from '@/lib/s3';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const img = data.get('file');

  if (!img || typeof img !== 'object') {
    return NextResponse.json({ error: '파일이 없습니다!' }, { status: 400 });
  }

  const pastedImgUrl = await uploadFile(img);

  return NextResponse.json({ url: pastedImgUrl });
}
