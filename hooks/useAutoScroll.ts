import { useEffect, RefObject } from "react";

export function useAutoScroll<T extends HTMLElement>(
  ref: RefObject<T | null>,
  deps: unknown[]
) {
  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, deps);
}

