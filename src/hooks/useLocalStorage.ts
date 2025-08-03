import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export function useLocalStorage(
  key: string,
  defaultValue: string
): [string, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? storedValue : defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
