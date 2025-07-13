import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/error/ErrorBoundary.tsx';
import './index.css';
import App from './App.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
