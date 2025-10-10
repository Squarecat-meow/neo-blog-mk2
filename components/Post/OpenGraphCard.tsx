'use client';

import { IOpenGraph } from '@/types/OpenGraphType';
import { HoverCard } from '@radix-ui/themes';
import ky from 'ky';
import { useEffect, useState } from 'react';

export default function OpenGraphCard({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string | undefined;
}) {
  const [ogData, setOgData] = useState<IOpenGraph>();

  useEffect(() => {
    ky.get('/api/opengraph', {
      searchParams: {
        url: href,
      },
    })
      .json<IOpenGraph>()
      .then((res) => setOgData(res));
  }, [href]);

  if (!ogData)
    return <span className="text-gray-500 text-sm">OG 로딩중...</span>;

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
          <img src={ogData.image} className="object-cover" />
        </div>
        <div className="p-2">
          <p className="font-bold">{ogData.title}</p>
          <p className="text-xs">{ogData.description}</p>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
