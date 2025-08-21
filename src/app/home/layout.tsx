'use client';

import { Suspense, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';

export default function HomeLayout({
  children,
  details,
}: {
  children: ReactNode;
  details: ReactNode;
}) {
  const searchParams = useSearchParams();
  const showDetails = Boolean(searchParams.get('details'));

  return (
    <Suspense>
      {children}
      {showDetails && details}
    </Suspense>
  );
}
