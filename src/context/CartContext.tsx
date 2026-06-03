import { createContext, useContext, useState, type ReactNode } from "react";
import type { Medicine } from "@/data/medicines";

type CartItem = Medicine & { qty: number };

type CartContextType = {
  items: CartItem[];
  add: (m: Medicine) => void;
  remove: (id: string) => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (m: Medicine) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === m.id);
      if (existing) return prev.map((i) => (i.id === m.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...m, qty: 1 }];
    });
  };

  const remove = (id: string) => {
    setItems((prev) => prev.flatMap((i) => (i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i])));
  };

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return <CartContext.Provider value={{ items, add, remove, total, count }}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
