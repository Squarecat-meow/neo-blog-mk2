import prismaClient from '@/lib/prisma';
import { Box, HoverCard } from '@radix-ui/themes';
import {
  add,
  eachDayOfInterval,
  format,
  getHours,
  isSameDay,
  sub,
} from 'date-fns';

export default async function Page() {
  const today = Date.now();
  const beforeTodayDate = sub(today, { days: 8 });
  const afterTodayDate = add(today, { days: 8 });
  const currentDisplayMonthArray = eachDayOfInterval({
    start: beforeTodayDate,
    end: afterTodayDate,
  });

  const currentHour = getHours(today);
  const timeHandPosition = 41 + currentHour * 0.15;

  const anniversary = await prismaClient.anniversary.findMany();
  return (
    <section>
      <h1 className="mb-4">타임라인</h1>
      <div className="relative">
        <div
          className="h-24 absolute border-r border-red-400"
          style={{ left: `calc(${timeHandPosition} * 1em)` }}
        />
        {anniversary.map((event, i) => {
          const dayIndex = currentDisplayMonthArray.findIndex((day) =>
            isSameDay(day, event.startDay),
          );

          if (dayIndex === -1) return null;

          const sameDateCount = anniversary
            .slice(0, i)
            .filter((e) => isSameDay(e.startDay, event.startDay)).length;
          const cellWidth = 100 / currentDisplayMonthArray.length;
          const leftPosition =
            (dayIndex / currentDisplayMonthArray.length) * 100;
          const topPosition = 24 + sameDateCount * 30;

          return (
            <HoverCard.Root key={event.id}>
              <HoverCard.Trigger>
                <div
                  key={event.id}
                  className="w-fit p-1 absolute text-xs rounded-lg border border-gray-300 break-keep"
                  style={{
                    left: `${leftPosition}%`,
                    width: `${cellWidth}%`,
                    top: `${topPosition}px`,
                  }}
                >
                  <span>{event.name}</span>
                </div>
              </HoverCard.Trigger>
              <HoverCard.Content maxWidth={'300px'}>
                <Box>
                  <h2>{event.name}</h2>
                  <p className="text-xs">{event.description}</p>
                </Box>
              </HoverCard.Content>
            </HoverCard.Root>
          );
        })}
        <div className="flex justify-between">
          {currentDisplayMonthArray.map((day, i) => (
            <div
              key={i}
              className="w-full h-24 flex justify-center not-last:border-r border-gray-300"
            >
              <div className="w-full h-24 flex flex-col font-light text-xs">
                <span className="text-center">{format(day, 'MM/dd')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
