import { describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../Pagination';

describe("Pagination's tests", () => {
  test('does not render if totalPages <= 1', () => {
    const { container } = render(
      <Pagination currentPage={2} totalPages={1} onPageChange={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  test('shows correct current page and total pages', () => {
    const { getByLabelText } = render(
      <Pagination currentPage={2} totalPages={10} onPageChange={vi.fn()} />
    );

    expect(getByLabelText('Page 2 of 10')).toBeInTheDocument();
  });

  test('calls onPageChange with correct page when Next is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    const { getByRole } = render(
      <Pagination currentPage={2} totalPages={10} onPageChange={onPageChange} />
    );

    await user.click(getByRole('button', { name: /next page/i }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('calls onPageChange with correct page when Prev is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    const { getByRole } = render(
      <Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />
    );

    await user.click(getByRole('button', { name: /previous page/i }));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  test('disables Prev on first page', () => {
    const { getByRole } = render(
      <Pagination currentPage={1} totalPages={10} onPageChange={vi.fn()} />
    );

    expect(getByRole('button', { name: /previous page/i })).toBeDisabled();
  });

  test('disables Next on last page', () => {
    const { getByRole } = render(
      <Pagination currentPage={10} totalPages={10} onPageChange={vi.fn()} />
    );

    expect(getByRole('button', { name: /next page/i })).toBeDisabled();
  });

  test('has correct aria attributes', () => {
    const { getByRole } = render(
      <Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />
    );

    expect(
      getByRole('navigation', { name: /pagination/i })
    ).toBeInTheDocument();
    expect(getByRole('button', { name: /previous page/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /next page/i })).toBeInTheDocument();
  });
});
