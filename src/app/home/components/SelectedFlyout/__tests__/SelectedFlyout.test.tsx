import { render } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { useStore } from '../../../../../store/store';
import { SelectedFlyout } from '../SelectedFlyout';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  useStore.setState({ selectedItems: [] });
});

describe('Flyout', () => {
  test('does not render if no items are selected', () => {
    const { queryByText } = render(<SelectedFlyout />);

    expect(queryByText(/selected/)).toBeNull();
  });

  test('shows correct count when items are selected', () => {
    useStore.setState({
      selectedItems: [
        { id: 1, name: 'Rick', status: 'Alive', species: 'Human', image: '' },
        { id: 2, name: 'Morty', status: 'Alive', species: 'Human', image: '' },
      ],
    });
    const { getByText } = render(<SelectedFlyout />);
    expect(getByText('2 items selected')).toBeInTheDocument();
  });

  test('clicking "Unselect all" calls removeAllSelectedItems', async () => {
    const user = userEvent.setup();
    const removeAllSelectedItems = vi.fn();
    useStore.setState({
      selectedItems: [
        { id: 1, name: 'Rick', status: 'Alive', species: 'Human', image: '' },
      ],
      removeAllSelectedItems,
    });
    const { getByRole } = render(<SelectedFlyout />);
    const unselectButton = getByRole('button', { name: /unselect all/i });
    await user.click(unselectButton);
    expect(removeAllSelectedItems).toHaveBeenCalled();
  });
});
