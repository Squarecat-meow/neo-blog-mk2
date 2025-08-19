import NotFoundImg from '@/public/images/not-found.webp';
import Image from 'next/image';

export default function NotFound() {
  return (
    <section className="grid place-items-center">
      <Image
        src={NotFoundImg}
        alt="유놋치 찾을 수 없습니다 이미지"
        height={200}
      />
      <h1 className="text-2xl">페이지를 찾을 수 없어요!</h1>
    </section>
  );
}
