import Sidebar from '@/components/Navigation/Sidebar';

export default function Home() {
  return (
    <main className="w-3/4 flex h-fit">
      <Sidebar />
      <div className="w-4/5 border-l border-l-black">
        <section className="p-4 col-span-3 lg:col-span-4">
          <article className="flex flex-col space-y-4">
            <h1 className="text-5xl font-noto-serif">
              블로그 제목 테스트입니다
            </h1>
            <span className="text-sm font-light">2025년 8월 4일 10:15</span>
            <p>
              블로그 본문 테스트입니다
              <br /> <br /> 와우 가독성 쩌는데?? <br /> <br />
              <br /> <br /> 와우 가독성 쩌는데?? <br /> <br />
              <br /> <br /> 와우 가독성 쩌는데?? <br /> <br />
              <br /> <br /> 와우 가독성 쩌는데?? <br /> <br />
              <br /> <br /> 와우 가독성 쩌는데?? <br /> <br />
              <br /> <br /> 와우 가독성 쩌는데?? <br /> <br />
              <br /> <br /> 와우 가독성 쩌는데?? <br /> <br />
              <br /> <br /> 와우 가독성 쩌는데?? <br /> <br />
              이 다음은 이미지입니다 <br /> <br />
              <img
                src={'https://picsum.photos/1600/900'}
                alt="플레이스홀더"
                className="w-full"
              />
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
