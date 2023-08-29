import React, { useEffect, useState, useCallback } from "react";

export const useDebounce = (wait: number, callback2: (value: string) => void) => {
  const [actualValue, setActualValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const debounce = useCallback(
    (func: Function) => {
      let timeout: NodeJS.Timeout;

      return (...args: string[] | number[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func(...args);
        }, wait);
      };
    },
    [wait]
  );

  const typewriterEffect = useCallback((header: string) => {
    const headerTimeout = setTimeout(() => {
      console.log("typewritter: value = ", header);
      console.log("------------------------------");
      // setDebouncedValue(header.slice(0, debouncedValue.length + 1));
      setDebouncedValue(header)
      console.log("debounced in func: value = ", debouncedValue);
    }, wait);
    return () => clearTimeout(headerTimeout);
  }, [wait]);

  const verify = useCallback(
    debounce((value: string) => {
      console.log("useDebounce: value = ", value);
      console.log("------------------------------");
      setDebouncedValue(value);
      callback2(value);
    }),
    [debounce, callback2]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setActualValue(value);
      verify(value);
    },
    [verify]
  );

  return {
    actualValue,
    setActualValue,
    debouncedValue,
    handleChange,
  };
};
