import { create } from 'zustand';

export const useStore = create((set) => ({
  selectedItems: [],
  addNewSelectedItems: (item) =>
    set((state) => ({
      selectedItems: state.selectedItems.some((i) => i.id === item.id)
        ? state.selectedItems
        : [...state.selectedItems, item],
    })),
}));
