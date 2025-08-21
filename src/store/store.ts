import { create } from 'zustand';
import type { Character } from '../app/home/page';

export type StoreState = {
  selectedItems: Character[];
  addNewSelectedItems: (item: Character) => void;
  removeSelectedItem: (id: number | string) => void;
  removeAllSelectedItems: () => void;
};

export const useStore = create<StoreState>((set) => ({
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
