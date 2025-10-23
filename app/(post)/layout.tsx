import Sidebar from '@/components/Navigation/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  // TODO: 카테고리 사이드바 모바일 대응
  return (
    <main className="flex h-fit relative">
      <Sidebar />
      <section className="w-4/5">{children}</section>
    </main>
  );
}
