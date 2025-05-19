import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Provider } from '@/components/ui/provider';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "SF's Portfolio",
  description: 'Personal website and portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <ThemeProvider>
            <div className="relative min-h-screen">
              <Navbar />
              <main>{children}</main>
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
