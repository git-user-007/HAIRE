import { useCallback, useEffect, useState } from "react";

const KEY = "haire.saved.looks.v1";

export interface SavedLook {
  id: string;
  name: string;
  image: string;
  savedAt: number;
}

function read(): SavedLook[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedLook[]) : [];
  } catch {
    return [];
  }
}

export function useLooks() {
  const [looks, setLooks] = useState<SavedLook[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLooks(read());
    setReady(true);
  }, []);

  const persist = useCallback((next: SavedLook[]) => {
    setLooks(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggle = useCallback(
    (look: Omit<SavedLook, "savedAt">) => {
      const exists = looks.some((l) => l.id === look.id);
      persist(
        exists
          ? looks.filter((l) => l.id !== look.id)
          : [{ ...look, savedAt: Date.now() }, ...looks],
      );
      return !exists;
    },
    [looks, persist],
  );

  const remove = useCallback(
    (id: string) => persist(looks.filter((l) => l.id !== id)),
    [looks, persist],
  );

  const isSaved = useCallback((id: string) => looks.some((l) => l.id === id), [looks]);

  return { looks, ready, toggle, remove, isSaved };
}
