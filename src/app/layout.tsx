import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SWRProvider } from './swr-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JobHub',
  description: 'this is for jobhub',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRProvider>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </SWRProvider>
  );
}
