import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { UpdateNotification } from '@/components/UpdateNotification';
import { Toaster } from 'sonner';
import { APP_NAME, APP_DESCRIPTION } from '@/config/app';

import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ClientLayout>
            <div className="relative min-h-screen">
              <Navbar />
              <main>{children}</main>
              <SpeedInsights />
            </div>
            <UpdateNotification />
            <Toaster position="top-center" />
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
