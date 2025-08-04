export default function Page() {
  return (
    <article className="w-5/6 flex flex-col mt-6">
      <h1 className="text-5xl font-noto-serif text-center mb-4">
        블로그 제목 테스트입니다
      </h1>
      <span className="text-sm font-light mb-12 text-center">
        2025년 8월 4일 10:15
      </span>
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
  );
}
