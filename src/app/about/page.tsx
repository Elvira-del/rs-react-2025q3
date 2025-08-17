import { Summary } from './components/Summary/Summary';

export default function Page() {
  return (
    <section className="mx-auto mt-12 flex w-full max-w-xl flex-col items-center gap-6 rounded-2xl border border-indigo-100 bg-white/90 p-8 text-gray-800 shadow-lg">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-indigo-600">
        About
      </h1>
      <Summary />
    </section>
  );
}
