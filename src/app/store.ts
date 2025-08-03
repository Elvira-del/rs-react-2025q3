import { create } from 'zustand';
import type { Character } from '../pages/home/HomePage';

export const useStore = create((set) => ({
  selectedItems: [],
  addNewSelectedItems: (item: Character) =>
    set((state) => ({
      selectedItems: state.selectedItems.some(
        (i: Character) => i.id === item.id
      )
        ? state.selectedItems
        : [...state.selectedItems, item],
    })),
  removeSelectedItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter(
        (item: Character) => item.id !== id
      ),
    })),
  removeAllSelectedItems: () => set({ selectedItems: [] }),
}));
