import { add, eachDayOfInterval, getHours, sub } from 'date-fns';

export default function Page() {
  const today = Date.now();
  const beforeTodayDate = sub(today, { days: 12 });
  const afterTodayDate = add(today, { days: 12 });
  const currentDisplayMonthArray = eachDayOfInterval({
    start: beforeTodayDate,
    end: afterTodayDate,
  });

  const currentHour = getHours(today);
  const timeHandPosition = 55.8 + 0.14 * currentHour;
  return (
    <section>
      <span>타임라인</span>
      <div
        className="h-24 absolute border-r border-red-400"
        style={{ left: `calc(${timeHandPosition} * 1em)` }}
      />
      <div className="flex justify-between">
        {currentDisplayMonthArray.map((day, i) => (
          <div key={i} className="h-24 px-2 not-last:border-r border-gray-300">
            <div className="font-light text-xs">
              {day.getMonth() + 1} / {day.getDate()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
