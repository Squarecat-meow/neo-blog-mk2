'use client';

import GlobalLoading from '@/components/Primitives/Modal/GlobalLoading';
import GlobalModal from '@/components/Primitives/Modal/GlobalModal';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <GlobalLoading />
      <GlobalModal />
    </>
  );
}
