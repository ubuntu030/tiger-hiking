import { useState, useEffect } from "react";

/**
 * A custom hook to debounce a value.
 * @param value The value to debounce.
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the specified delay.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: if the value changes before the delay has passed,
    // clear the timer to prevent the previous value from being set.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run the effect if the value or delay changes.

  return debouncedValue;
}

export default useDebounce;
