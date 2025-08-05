import prismaClient from '@/lib/prisma';

const prisma = prismaClient;

export default async function Sidebar() {
  const categories = await prisma.category.findMany({
    select: {
      subCategories: true,
    },
  });

  return (
    <nav className="w-1/5 sticky top-0 h-fit">
      <div className="py-4 space-y-4">
        <p className="text-2xl">카테고리</p>
      </div>
    </nav>
  );
}
