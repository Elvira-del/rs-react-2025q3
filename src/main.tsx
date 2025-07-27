import { createBrowserRouter, RouterProvider } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/error/ErrorBoundary/ErrorBoundary.tsx';
import { FallbackUI } from './components/error/FallbackUI/FallbackUI.tsx';
import App from './App.tsx';
import './index.css';

const router = createBrowserRouter(
  [{ path: '/', element: <App />, errorElement: <FallbackUI /> }],
  { basename: '/rs-react-2025q3' }
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<FallbackUI />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
