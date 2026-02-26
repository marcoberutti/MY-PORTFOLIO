import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Marco Berutti | Full Stack Developer',
  description: 'Portfolio of Marco Berutti, Full Stack Developer based in Italy. Specializing in React, TypeScript, PHP, and modern web technologies.',
  keywords: ['Marco Berutti', 'Full Stack Developer', 'React', 'TypeScript', 'PHP', 'Web Developer', 'Italy'],
  authors: [{ name: 'Marco Berutti' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Marco Berutti | Full Stack Developer',
    description: 'Portfolio of Marco Berutti, Full Stack Developer based in Italy',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
