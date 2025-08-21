'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchCharacter } from '../../../api/api';
import { Loader } from '../../../components/loader/Loader';

export default function CharacterDetailsPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const characterId = searchParams.get('details');
  const { data, isLoading } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => fetchCharacter(characterId),
    placeholderData: keepPreviousData,
    enabled: !!characterId,
  });

  if (!characterId) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end bg-black/30 transition-colors"
      onClick={() => router.back()}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <aside
        className="animate-slide-in relative flex h-full w-full max-w-md flex-col gap-4 rounded-l-2xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 rounded-full text-2xl font-bold text-gray-400 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          type="button"
          aria-label="Close panel"
        >
          ×
        </button>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <img
              src={data?.image}
              alt={data?.name}
              className="mx-auto h-32 w-32 rounded-2xl border border-indigo-100 object-cover shadow"
            />
            <h2 className="text-center text-2xl font-bold text-indigo-600">
              {data?.name}
            </h2>
            <ul className="flex flex-col gap-1 text-base text-gray-800">
              <li>
                <span className="font-semibold text-indigo-500">Species:</span>{' '}
                {data?.species}
              </li>
              <li>
                <span className="font-semibold text-indigo-500">Gender:</span>{' '}
                {data?.gender}
              </li>
              <li>
                <span className="font-semibold text-indigo-500">Status:</span>{' '}
                {data?.status}
              </li>
              <li>
                <span className="font-semibold text-indigo-500">
                  Last known location:
                </span>{' '}
                {data?.location?.name}
              </li>
            </ul>
          </>
        )}
      </aside>

      <style>{`
        .animate-slide-in {
          animation: slideInPanel .3s cubic-bezier(.4,0,.2,1);
        }
        @keyframes slideInPanel {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
