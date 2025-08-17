'use client';

import Link from 'next/link';
import React, { useState, type ReactNode } from 'react';
import { ErrorTriggerBtn } from '../components/error/ErrorTriggerBtn/ErrorTriggerBtn';

export default function Page() {
  const [throwError, setThrowError] = useState(false);

  const handleTriggerError = (): void => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Simulated error for testing ErrorBoundary');
  }
  return (
    <>
      <header className="mb-10 pt-6">
        <nav>
          <ul className="flex justify-center gap-6">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section></section>
      </main>
      <footer>
        <ErrorTriggerBtn onTrigger={handleTriggerError} />
      </footer>
    </>
  );
}
