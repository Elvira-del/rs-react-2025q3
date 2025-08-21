import { Suspense, type ReactNode } from 'react';
import { Loader } from 'components/loader/Loader';

export default function HomeLayout({
  children,
  details,
}: {
  children: ReactNode;
  details: ReactNode;
}) {
  return (
    <>
      {children}
      <Suspense fallback={<Loader />}>{details}</Suspense>
    </>
  );
}
