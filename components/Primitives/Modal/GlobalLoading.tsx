'use client';

import { useGlobalLoadingStore } from '@/store/GlobalLoadingStore';
import { Loader2Icon } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function GlobalLoading() {
  const isLoading = useGlobalLoadingStore((state) => state.isVisible);
  return isLoading
    ? createPortal(
        <div className="w-screen h-screen grid place-items-center">
          <div className="w-full h-full absolute inset-0 backdrop-blur-sm" />
          <Loader2Icon className="animate-spin" />
        </div>,
        document.getElementById('global-loading') as HTMLElement,
      )
    : null;
}
