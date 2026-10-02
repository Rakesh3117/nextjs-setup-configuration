import type { Metadata } from 'next';

import { AppProvider } from '@/providers/AppProvider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js Setup',
  description: 'Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
