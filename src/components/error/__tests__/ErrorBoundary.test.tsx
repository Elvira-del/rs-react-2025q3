import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import userEvent from '@testing-library/user-event';
import { ErrorTriggerBtn } from '../ErrorTriggerBtn/ErrorTriggerBtn';
import { FallbackUI } from '../FallbackUI/FallbackUI';
import App from '../../../App';

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
    <ErrorBoundary fallback={<FallbackUI />}>
      <App />
    </ErrorBoundary>
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
    <ErrorBoundary fallback={<div>Oops, something went wrong</div>}>
      <App />
    </ErrorBoundary>
  );

  const errorBtn = getByRole('button', { name: /simulate error/i });

  await user.click(errorBtn);

  const fallback = await screen.findByText(/oops, something went wrong/i);
  expect(fallback).toBeInTheDocument();

  expect(errorSpy).toHaveBeenCalled();

  errorSpy.mockRestore();
});
