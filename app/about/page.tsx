import prismaClient from '@/lib/prisma';
import { Avatar } from '@radix-ui/themes';

export default async function Page() {
  try {
    // TODO: 둘 중 한 사람 없어도 표시되게
    const left = await prismaClient.user.findUniqueOrThrow({
      where: {
        userId: 'yozumina',
      },
    });

    const right = await prismaClient.user.findUniqueOrThrow({
      where: {
        userId: 'yunochi',
      },
    });

    return (
      <section className="w-xl space-y-4 mx-auto">
        <h1 className="text-4xl font-bold text-center">놋치미나의 블로그</h1>
        <p className="break-keep">
          여기는 놋치미나의 블로그에요! 저희가 보고, 느끼고, 즐기는 것들을 적는
          곳이랍니다!
        </p>
        <section className="flex justify-center gap-12">
          <div className="flex flex-col items-center gap-4">
            <span className="text-3xl">{left.nickname}</span>
            <Avatar
              radius="full"
              size={'8'}
              src={left.profileImgUrl ?? ''}
              fallback={
                left.nickname?.substring(0, 1) ?? left.userId.substring(0, 1)
              }
            />
            {left.introduction && (
              <span className="italic">&quot;{left.introduction}&quot;</span>
            )}
          </div>
          <div className="grid place-items-center text-3xl">💖</div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-3xl">{right.nickname}</span>
            <Avatar
              radius="full"
              size={'8'}
              src={right.profileImgUrl ?? ''}
              fallback={
                right.nickname?.substring(0, 1) ?? right.userId.substring(0, 1)
              }
            />
            {right.introduction && (
              <span className="italic">&quot;{right.introduction}&quot;</span>
            )}
          </div>
        </section>
      </section>
    );
  } catch (err) {
    if (err instanceof Error)
      return (
        <section>
          <span>에러가 발생했습니다! {err.message}</span>
        </section>
      );
  }
}
