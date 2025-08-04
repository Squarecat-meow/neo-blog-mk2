import Sidebar from '@/components/Navigation/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-3/4 flex h-fit">
      <Sidebar />
      <section className="w-4/5 border-l border-l-black p-6 grid place-items-center">
        {children}
      </section>
    </main>
  );
}
