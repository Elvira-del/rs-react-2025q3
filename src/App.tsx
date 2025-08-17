import { useState, type FC } from 'react';
import { NavLink, Outlet } from 'react-router';
import { ErrorTriggerBtn } from './components/error/ErrorTriggerBtn/ErrorTriggerBtn';
import './App.css';

const App: FC = () => {
  const [throwError, setThrowError] = useState(false);

  const handleTriggerError = (): void => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Simulated error for testing ErrorBoundary');
  }
  return (
    <>
      <header className="mb-10 pt-6">
        <nav>
          <ul className="flex justify-center gap-6">
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  `rounded-xl px-5 py-2 font-medium shadow-sm transition focus:ring-2 focus:ring-indigo-200 focus:outline-none ${isActive ? 'border border-indigo-500 bg-indigo-500 text-white shadow' : 'border border-indigo-200 bg-white/90 text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50'} ${isPending ? 'pointer-events-none opacity-60' : ''}`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive, isPending }) =>
                  `rounded-xl px-5 py-2 font-medium shadow-sm transition focus:ring-2 focus:ring-indigo-200 focus:outline-none ${isActive ? 'border border-indigo-500 bg-indigo-500 text-white shadow' : 'border border-indigo-200 bg-white/90 text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50'} ${isPending ? 'pointer-events-none opacity-60' : ''}`
                }
                to="about"
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <Outlet />
        </section>
      </main>
      <footer>
        <ErrorTriggerBtn onTrigger={handleTriggerError} />
      </footer>
    </>
  );
};

export default App;
