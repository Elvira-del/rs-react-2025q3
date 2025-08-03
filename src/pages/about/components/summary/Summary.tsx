import type { FC } from 'react';

export const Summary: FC = () => {
  return (
    <>
      <p className="mb-4 text-base leading-relaxed text-gray-700">
        Hi, I&apos;m Elvira - a frontend developer who treats every bug like a
        personal challenge (maybe because I&apos;ve survived three hackathons
        and countless Stack Overflow rabbit holes). I don&apos;t have commercial
        experience yet, but I&apos;ve definitely spent enough time arguing with
        React and wondering if CSS stands for &ldquo;Can&apos;t Style
        Stuff&rdquo;.
      </p>
      <p className="text-base leading-relaxed text-gray-700">
        I believe strong frontend skills come from practice, curiosity, and not
        being afraid to ask &ldquo;why?&rdquo; (or &ldquo;why won&apos;t this
        work?&rdquo;) a hundred times. I&apos;m dedicated to writing clear,
        maintainable code and growing a little bit every day - sometimes by
        learning, sometimes by making mistakes.
      </p>
    </>
  );
};
