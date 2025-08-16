import prismaClient from '@/lib/prisma';

export async function GET() {
  const categories = await prismaClient.category.findMany();

  const ownerId = categories.map((category) => category.categoryOwnerId);
  // TODO: 만들어진 카테고리 정보 반환

  return categories;
}
