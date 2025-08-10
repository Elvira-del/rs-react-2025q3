import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { ErrorTriggerBtn } from '../ErrorTriggerBtn/ErrorTriggerBtn';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { FallbackUI } from '../FallbackUI/FallbackUI';
import App from '../../../App';
import { HomePage } from '../../../pages/home/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FC, PropsWithChildren, ReactNode } from 'react';

const TestError = vi.fn(() => {
  throw new Error('Test error');
});

const Stub = createRoutesStub([
  {
    path: '/',
    Component: App,
    ErrorBoundary: FallbackUI,
    children: [
      {
        Component: HomePage,
        children: [{ index: true }],
      },
    ],
  },
]);

const queryClient = new QueryClient();
const Wrapper: FC<PropsWithChildren<ReactNode>> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('Error boundary', () => {
  test('catches and handles JavaScript errors in child components', async () => {
    expect(() =>
      render(
        <ErrorBoundary fallback={<p>Oops, something went wrong</p>}>
          <TestError />
        </ErrorBoundary>
      )
    ).not.toThrow();
  });

  test('displays fallback UI when error occurs', async () => {
    render(
      <ErrorBoundary fallback={<div>Something broke in the multiverse</div>}>
        <TestError />
      </ErrorBoundary>
    );

    const errorText = await screen.findByText(
      /something broke in the multiverse/i
    );
    expect(errorText).toBeInTheDocument();
  });

  test('logs error to console', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={<p>Oops, something went wrong</p>}>
        <TestError />
      </ErrorBoundary>
    );

    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });

  test('throws error when test button is clicked', async () => {
    const user = userEvent.setup();
    const handleTrigger = vi.fn();

    const { getByRole } = render(<ErrorTriggerBtn onTrigger={handleTrigger} />);

    const triggerButton = getByRole('button', { name: /simulate error/i });
    await user.click(triggerButton);

    expect(handleTrigger).toHaveBeenCalled();
  });

  test('triggers error boundary fallback UI', async () => {
    const user = userEvent.setup();

    const { getByRole, findByText } = render(
      <Wrapper>
        <ErrorBoundary fallback={<FallbackUI />}>
          <Stub initialEntries={['/']} />
        </ErrorBoundary>
      </Wrapper>
    );

    const triggerButton = getByRole('button', { name: /simulate error/i });
    await user.click(triggerButton);

    const fallback = await findByText(/wubba lubba dub dub/i);
    expect(fallback).toBeInTheDocument();
  });

  test('displays fallback UI when error is triggered by parent', async () => {
    const user = userEvent.setup();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { getByRole } = render(
      <Wrapper>
        <Stub initialEntries={['/']} />
      </Wrapper>
    );

    const errorBtn = getByRole('button', { name: /simulate error/i });

    await user.click(errorBtn);

    const fallback = await screen.findByText(
      /something broke in the multiverse/i
    );
    expect(fallback).toBeInTheDocument();

    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});
