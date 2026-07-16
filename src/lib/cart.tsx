import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = { slug: string; title: string; price: number; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "Deadly:cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems((JSON.parse(raw) as CartItem[]).map((item) => ({ ...item, qty: 1 })));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = useCallback((item: Omit<CartItem, "qty">, _qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.slug === item.slug);
      if (found) return prev.map((p) => (p.slug === item.slug ? { ...p, qty: 1 } : p));
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);
  const remove = useCallback((slug: string) => setItems((prev) => prev.filter((p) => p.slug !== slug)), []);
  const setQty = useCallback(
    (slug: string, _qty: number) =>
      setItems((prev) => prev.map((p) => (p.slug === slug ? { ...p, qty: 1 } : p))),
    []
  );
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      add,
      remove,
      setQty,
      clear,
      count: items.length,
      total: items.reduce((s, i) => s + i.price, 0),
    }),
    [items, add, remove, setQty, clear]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}

