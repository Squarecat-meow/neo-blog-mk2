'use client';

import dynamic from 'next/dynamic';

export const Editor = dynamic(() => import('@/components/Writer/Editor'), {
  ssr: false,
});
