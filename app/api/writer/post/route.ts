import prismaClient from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const category = await prismaClient.category.findUnique({
    where: {
      id: data.categoryId,
    },
  });

  if (!category)
    return NextResponse.json(
      { error: '카테고리를 찾을 수 없습니다!' },
      { status: 404 },
    );

  const result = await prismaClient.post.create({
    data: {
      title: data.title,
      body: data.body,
      categoryName: category.name,
    },
  });

  return NextResponse.json({ result });
}
