"use client";

import { useState, useCallback } from "react";

export function useAccordion(initialOpenId: string | null = null) {
  const [openId, setOpenId] = useState<string | null>(initialOpenId);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const isOpen = useCallback(
    (id: string) => {
      return openId === id;
    },
    [openId]
  );

  return { openId, toggle, isOpen, setOpenId };
}
