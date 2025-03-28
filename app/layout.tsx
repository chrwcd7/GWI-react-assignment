import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cat Lovers App',
  description: 'An app for cat lovers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link href="/" className="text-2xl font-bold">
                  Cat Lovers App
                </Link>
                <nav>
                  <ul className="flex gap-6">
                    <li>
                      <Link
                        href="/breeds"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Breeds
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/favorites"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Favorites
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-6 flex-grow">
            {children}
          </main>
          <footer className="bg-white shadow mt-auto">
            <div className="container mx-auto px-4 py-4 text-center">
              <p className="text-gray-600">© 2025 Cat Lovers App</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
