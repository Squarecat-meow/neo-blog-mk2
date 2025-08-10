import Sidebar from '@/components/Navigation/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-fit relative">
      <Sidebar />
      <section className="w-4/5">{children}</section>
    </main>
  );
}
