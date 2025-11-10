'use client';

import { IOpenGraph } from '@/types/OpenGraphType';
import { HoverCard } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

export default function OpenGraphCard({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['opengraph', href],
    queryFn: async () => {
      const res = await ky
        .get('/api/opengraph', {
          searchParams: {
            url: href,
          },
        })
        .json<IOpenGraph>()
        .catch((err) => console.log(err));
      return res;
    },
  });

  if (isLoading)
    return <span className="text-gray-500 text-sm">OG 로딩중...</span>;

  if (isError)
    return (
      <a
        className="text-sky-700 decoration-sky-700 no-underline hover:underline"
        href={href}
      >
        {children}
      </a>
    );

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-700 decoration-sky-700 no-underline hover:underline"
        >
          {children}
        </a>
      </HoverCard.Trigger>
      <HoverCard.Content
        maxWidth="400px"
        maxHeight="130px"
        className="flex"
        style={{ padding: 0 }}
      >
        <div className="h-[130px] aspect-square">
          <img src={data?.image} className="object-cover" />
        </div>
        <div className="p-2">
          <p className="font-bold">{data?.title}</p>
          <p className="text-xs">{data?.description}</p>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
