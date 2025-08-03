import type { FC } from 'react';
import { useStore } from '../../../../app/store';
import { downloadCSV } from '../../../../utils/downloadCSV';

export const SelectedFlyout: FC = () => {
  const selectedItems = useStore((state) => state.selectedItems);
  const onRemoveItems = useStore((state) => state.removeAllSelectedItems);

  if (selectedItems.length === 0) return null;

  return (
    <div className="fixed right-0 bottom-4 left-0 z-50 mx-auto flex max-w-md items-center justify-between rounded-2xl bg-indigo-500 p-4 text-white shadow-2xl">
      <span className="font-semibold">
        {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}{' '}
        selected
      </span>
      <div className="flex gap-2">
        <button
          className="rounded-xl bg-white/90 px-4 py-2 font-medium text-indigo-500 shadow hover:bg-indigo-50"
          type="button"
          onClick={onRemoveItems}
        >
          Unselect all
        </button>
        <button
          className="rounded-xl bg-white px-4 py-2 font-medium text-indigo-600 shadow hover:bg-indigo-100"
          type="button"
          onClick={() => downloadCSV(selectedItems)}
        >
          Download
        </button>
      </div>
    </div>
  );
};
