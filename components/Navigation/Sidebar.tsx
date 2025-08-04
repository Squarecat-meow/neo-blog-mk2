export default function Sidebar() {
  const mock = {
    일상: ['├ 여행', '├ 바이크', '└ 음악'],
    개발: ['├ 리눅스', '├ 연합우주', '├ React/Next', '└ Typescript'],
  };
  return (
    <nav className="w-1/5 sticky top-0 h-fit">
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
