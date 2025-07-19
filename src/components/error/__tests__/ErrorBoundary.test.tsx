import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const TestError = vi.fn(() => {
  throw new Error('Test error');
});

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
    <ErrorBoundary fallback={<p>Oops, something went wrong</p>}>
      <TestError />
    </ErrorBoundary>
  );

  const errorText = await screen.findByText('Oops, something went wrong');
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
