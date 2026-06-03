import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Medicine } from "@/data/medicines";
import { useCart } from "@/context/CartContext";

export function MedicineCard({ med }: { med: Medicine }) {
  const { add } = useCart();
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="flex flex-col rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]"
    >
      <div className="flex h-20 items-center justify-center rounded-xl bg-secondary text-4xl">{med.image}</div>
      <div className="mt-3 flex-1">
        <p className="text-xs text-muted-foreground">{med.brand}</p>
        <p className="line-clamp-1 text-sm font-semibold">{med.name}</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">{med.category}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-bold">${med.price.toFixed(2)}</span>
        <button
          disabled={!med.inStock}
          onClick={() => add(med)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background disabled:opacity-30"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {!med.inStock && <p className="mt-1 text-[10px] text-destructive">Out of stock</p>}
    </motion.div>
  );
}
