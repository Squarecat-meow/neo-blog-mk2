import Image from 'next/image';
import MinaImage from '@/public/images/mina.png';
import YunoImage from '@/public/images/yuno.png';

export default async function Sidebar() {
  return (
    <nav className="w-1/5 sticky top-0 h-fit">
      <h1 className="text-2xl">카테고리</h1>
      <Image src={MinaImage} alt="미나 카테고리 이미지" className="w-10" />
      <Image src={YunoImage} alt="미나 카테고리 이미지" className="w-10" />
    </nav>
  );
}
