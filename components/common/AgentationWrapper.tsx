"use client";

import React, { useState, useEffect } from "react";
import { Agentation } from "agentation";

export function AgentationWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (process.env.NODE_ENV !== "development") return null;

  return <Agentation />;
}
