"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Native <dialog> that opens on mount. Closing it (Esc, backdrop, button)
 * goes back in history, which un-intercepts the route and drops the modal.
 */
export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!ref.current?.open) ref.current?.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={() => router.back()}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className="m-auto rounded-xs bg-surface-100 backdrop:bg-surface-600/40"
    >
      <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="float-right p-3">
        ×
      </button>
      {children}
    </dialog>
  );
}
