import { createBrowserRouter, RouterProvider } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/error/ErrorBoundary/ErrorBoundary.tsx';
import { FallbackUI } from './components/error/FallbackUI/FallbackUI.tsx';
import { CharacterDetailsPanel } from './components/details/CharacterDetailsPanel.tsx';
import { AboutPage } from './pages/about/AboutPage.tsx';
import { HomePage, type Character } from './pages/home/HomePage.tsx';
import App from './App.tsx';
import './index.css';

export async function detailsLoader({ params }): Promise<Character | null> {
  if (!params.detailsId) return null;
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${params.detailsId}`
  );
  if (!res.ok) throw new Response('Not found', { status: 404 });

  return await res.json();
}

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: App,
      ErrorBoundary: FallbackUI,
      children: [
        {
          Component: HomePage,
          children: [
            { index: true },
            {
              path: ':detailsId',
              loader: detailsLoader,
              Component: CharacterDetailsPanel,
            },
          ],
        },
        {
          path: '/about',
          Component: AboutPage,
        },
      ],
    },
  ],
  { basename: '/rs-react-2025q3/' }
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<FallbackUI />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
