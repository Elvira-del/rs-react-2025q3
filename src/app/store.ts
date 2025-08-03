import { create } from 'zustand';

export const useStore = create((set) => ({
  selectedItems: [],
  addNewSelectedItems: (item) =>
    set((state) => ({
      selectedItems: state.selectedItems.some((i) => i.id === item.id)
        ? state.selectedItems
        : [...state.selectedItems, item],
    })),
  removeSelectedItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((item) => item.id !== id),
    })),
  removeAllSelectedItems: () => set({ selectedItems: [] }),
}));
