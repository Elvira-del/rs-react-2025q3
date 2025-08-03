import { describe, expect, beforeEach, test } from 'vitest';
import { useStore } from '../store';

const exampleChar = { id: 1, name: 'Rick', species: 'Human', status: 'Alive' };
const anotherChar = { id: 2, name: 'Morty', species: 'Human', status: 'Alive' };

describe('useStore', () => {
  beforeEach(() => {
    useStore.setState({ selectedItems: [] });
  });

  test('adds a new selected item', () => {
    useStore.getState().addNewSelectedItems(exampleChar);
    expect(useStore.getState().selectedItems).toHaveLength(1);
    expect(useStore.getState().selectedItems[0]).toEqual(exampleChar);
  });

  test('does not add duplicate selected item', () => {
    useStore.getState().addNewSelectedItems(exampleChar);
    useStore.getState().addNewSelectedItems(exampleChar);
    expect(useStore.getState().selectedItems).toHaveLength(1);
  });

  test('removes a selected item by id', () => {
    useStore.getState().addNewSelectedItems(exampleChar);
    useStore.getState().addNewSelectedItems(anotherChar);
    useStore.getState().removeSelectedItem(1);
    expect(useStore.getState().selectedItems).toHaveLength(1);
    expect(useStore.getState().selectedItems[0]).toEqual(anotherChar);
  });

  test('removes all selected items', () => {
    useStore.getState().addNewSelectedItems(exampleChar);
    useStore.getState().addNewSelectedItems(anotherChar);
    useStore.getState().removeAllSelectedItems();
    expect(useStore.getState().selectedItems).toHaveLength(0);
  });
});
