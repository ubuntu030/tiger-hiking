import { useState, useEffect } from "react";

/**
 * 用於延遲更新數值的 Hook (防抖動)
 * @param value 需要延遲更新的數值
 * @param delay 延遲時間 (毫秒)
 * @returns 延遲後的數值
 */
export default function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 設定計時器，在 delay 時間後更新數值
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 若在 delay 時間內 value 再次改變，清除上一次的計時器
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}