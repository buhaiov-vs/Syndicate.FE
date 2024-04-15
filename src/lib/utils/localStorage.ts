import { useCallback, useState } from 'react';

type UseLocalStorageReturn<T> = [T | null, (newValue: T | null) => void];

export function useLocalStorage<T>(
  keyName: string,
  defaultValue?: T,
): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return;

    const value = window?.localStorage?.getItem(keyName);
    return value ? JSON.parse(value) : defaultValue;
  });

  const setValue = useCallback(
    (newValue: any | null) => {
      if (typeof window === 'undefined') return;

      try {
        if (!newValue) {
          window?.localStorage?.removeItem(keyName);
        } else {
          window?.localStorage?.setItem(keyName, JSON.stringify(newValue));
        }
        // eslint-disable-next-line no-empty
      } catch (err) {}

      setStoredValue(newValue);
    },
    [keyName],
  );

  return [storedValue, setValue];
}