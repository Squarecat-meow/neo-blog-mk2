import type { Metadata } from 'next';
import './globals.css';
import { Theme } from '@radix-ui/themes';
import { IBM_Plex_Sans_KR, Noto_Serif_KR } from 'next/font/google';
import Navbar from '@/components/Navigation/Navbar';
import ClientProvider from '@/components/Apollo/ClientProvider';
import ReactQueryClientProvider from '@/lib/queryClient';

export const metadata: Metadata = {
  title: '놋치미나의 아늑한 집',
  description: '요즈미나와 유놋치의 아늑한 집',
};

const plex = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: ['200', '400', '700'],
  variable: '--font-plex',
});

const notoSerif = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['200', '400', '700'],
  variable: '--font-noto-serif',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: 구글 검색엔진 메타데이터 넣기
  return (
    <html lang="ko" className={`${plex.variable} ${notoSerif.variable}`}>
      <body>
        <ClientProvider>
          <ReactQueryClientProvider>
            <Theme
              className={`${plex.className} w-full h-screen flex flex-col items-center`}
            >
              <Navbar />
              <main className="flex-1 w-full lg:w-3/4 p-6">{children}</main>
              <footer className="w-full h-24"></footer>
              <div id="portal" className="fixed top-0 left-0" />
              <div id="global-loading" className="fixed top-0 left-0" />
            </Theme>
          </ReactQueryClientProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
