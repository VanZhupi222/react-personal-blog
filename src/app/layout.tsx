import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/layout/Navbar';
import { AppClientProvider } from '@/components/layout/AppClientLayout';
import { UpdateNotification } from '@/components/UpdateNotification';
import { Toaster } from 'sonner';
import { APP_NAME, APP_DESCRIPTION } from '@/config/app';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { getTranslations } from '@/lib/translations/server';
import { getServerLocale } from '@/lib/utils/getServerLocale';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const translations = await getTranslations(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <AppClientProvider locale={locale} translations={translations}>
          {/* ThemeProvider Used to synchronise themes during server-side and client-side rendering
          to prevent light/dark mode flicker (FOUC) issues during hydration. */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative min-h-screen">
              <Navbar ssrTranslations={translations} />
              <main>{children}</main>
              {/* Vercel Speed Insights and Analytics */}
              <SpeedInsights />
              <Analytics />
            </div>
            <UpdateNotification />
            <Toaster position="top-center" />
          </ThemeProvider>
        </AppClientProvider>
      </body>
    </html>
  );
}
