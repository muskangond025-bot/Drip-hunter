"use client";

import { useState, useCallback } from "react";

export function useAsyncAction(defaultDelayMs = 600) {
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (action: () => Promise<void> | void, delayMs = defaultDelayMs) => {
      if (isLoading) return; // Prevent double-submits
      setIsLoading(true);

      try {
        await action();
        // Brief minimum loading state for smooth UI feel
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } catch (error) {
        console.error("Async Action Error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, defaultDelayMs]
  );

  return { isLoading, execute };
}
