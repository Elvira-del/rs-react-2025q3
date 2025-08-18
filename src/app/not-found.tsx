import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="m-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6 text-indigo-800">
      <h2 className="mb-2 text-xl font-semibold">404 — Portal not found</h2>
      <p>Oops. That route doesn't exist.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
