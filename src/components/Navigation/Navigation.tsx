'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
  const pathname = usePathname();

  const link = (path: string) =>
    `rounded-xl px-5 py-2 font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-200 ` +
    (pathname === path
      ? 'border border-indigo-500 bg-indigo-500 text-white shadow'
      : 'border border-indigo-200 bg-white/90 text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50');

  return (
    <nav>
      <ul className="flex justify-center gap-6 p-3">
        <li>
          <Link className={link('/')} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={link('/about')} href="/about">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};
