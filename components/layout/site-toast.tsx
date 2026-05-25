"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type ToastState = {
  message: string;
  id: number;
};

export function SiteToastHost() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let timeoutId: number | undefined;

    const onToast = (event: Event) => {
      const message = (event as CustomEvent<{ message: string }>).detail?.message;
      if (!message) return;

      const id = Date.now();
      setToast({ message, id });
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setToast(null), 3200);
    };

    window.addEventListener("site-toast", onToast);
    return () => {
      window.removeEventListener("site-toast", onToast);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          key={toast.id}
          role="status"
          aria-live="polite"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-none fixed bottom-6 left-1/2 z-[100] w-[min(90vw,22rem)] -translate-x-1/2",
            "fx-rainbow-border fx-rainbow-border--rounded fx-glimmer fx-glimmer--subtle",
          )}
        >
          <p className="fx-glass fx-glass--pill rounded-full px-4 py-2.5 text-center text-sm font-medium text-neutral-800 dark:text-neutral-100">
            {toast.message}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
