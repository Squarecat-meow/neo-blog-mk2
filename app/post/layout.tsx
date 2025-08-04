import Sidebar from '@/components/Navigation/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-fit">
      <Sidebar />
      <section className="w-4/5 border-l border-l-black grid divide-y place-items-center @container">
        {children}
      </section>
    </main>
  );
}
