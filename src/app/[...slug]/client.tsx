'use client';

import React, { StrictMode } from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../page'), { ssr: false });

// export async function detailsLoader({
//   params,
// }: LoaderFunctionArgs): Promise<Character | null> {
//   if (!params.detailsId) return null;
//   const res = await fetch(
//     `https://rickandmortyapi.com/api/character/${params.detailsId}`
//   );
//   if (!res.ok) throw new Response('Not found', { status: 404 });

//   return await res.json();
// }

export function ClientOnly() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}
