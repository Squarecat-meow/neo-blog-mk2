import Image from 'next/image';
import MockProfile from '../../public/images/mock-profile-picture.webp';

export default function Sidebar() {
  const mock = {
    일상: ['├ 여행', '├ 바이크', '└ 음악'],
    개발: ['├ 리눅스', '├ 연합우주', '├ React/Next', '└ Typescript'],
  };
  return (
    <nav className="w-1/5 sticky top-0 h-fit">
      <div className="w-full flex flex-col lg:flex-row justify-between items-center space-x-6 py-6 pr-2 border-b border-black">
        <Image
          src={MockProfile}
          alt="프로필사진 목데이터"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <span className="text-3xl">요즈미나</span>
          <p className="font-light break-keep">
            &lt;head&gt;와 &lt;body&gt;로 이루어진 사람
          </p>
        </div>
      </div>
      <div className="py-4 space-y-4">
        <p className="text-2xl">카테고리</p>
        {Object.entries(mock).map(([key, value], index) => (
          <ul key={index}>
            <li className="text-lg">
              {key}
              <ul>
                {value.map((el, index) => (
                  <li key={index} className="font-light hover:font-normal">
                    {el}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))}
      </div>
    </nav>
  );
}
