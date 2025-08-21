import type { Metadata } from 'next';
import { StrictMode, type ReactNode } from 'react';
import Providers from './providers';
import { Navigation } from '../components/Navigation/Navigation';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Next App',
  description: 'Rick & Morty + React Query',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-green-300">
        <StrictMode>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <header className="mb-10 border-b border-green-400 p-6 shadow-md shadow-green-500/20">
                <Navigation />
              </header>
              <main id="root" className="mx-auto px-2 md:px-4 lg:px-8">
                <section>{children}</section>
              </main>
            </div>
          </Providers>
        </StrictMode>
      </body>
    </html>
  );
}
