import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Minus, Plus, X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { MedicineCard } from "@/components/MedicineCard";
import { medicines } from "@/data/medicines";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/medicines")({
  head: () => ({
    meta: [
      { title: "Medicines — MediQ" },
      { name: "description", content: "Browse and order medicines for delivery." },
    ],
  }),
  component: Meds,
});

const categories = ["All", "Pain Relief", "Antibiotic", "Vitamins", "Cold & Flu", "Heart", "Diabetes"];

function Meds() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(false);
  const { items, add, remove, total, count } = useCart();

  const filtered = medicines.filter((m) => {
    const matchS = m.name.toLowerCase().includes(search.toLowerCase()) || m.brand.toLowerCase().includes(search.toLowerCase());
    const matchC = cat === "All" || m.category === cat;
    return matchS && matchC;
  });

  return (
    <div>
      <PageHeader title="Pharmacy" />

      <div className="space-y-4 px-5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search medicines or brands" />

        <div className="-mx-5 overflow-x-auto px-5">
          <div className="flex gap-2 pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium ${
                  cat === c ? "bg-foreground text-background" : "bg-secondary text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filtered.map((m) => <MedicineCard key={m.id} med={m} />)}
        </div>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">No medicines found.</p>
        )}
      </div>

      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-[88px] left-1/2 z-40 flex w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-full bg-foreground px-5 py-3.5 text-background shadow-[var(--shadow-elevated)]"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="text-sm font-semibold">{count} item{count > 1 ? "s" : ""}</span>
            </div>
            <span className="text-sm font-semibold">${total.toFixed(2)} · View cart</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/40"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 rounded-t-3xl bg-background p-5 pb-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Your cart</h3>
                <button onClick={() => setOpen(false)} className="rounded-full bg-secondary p-2"><X className="h-4 w-4" /></button>
              </div>
              <div className="mt-4 max-h-[50vh] space-y-3 overflow-y-auto">
                {items.map((i) => (
                  <div key={i.id} className="flex items-center gap-3 rounded-2xl border border-border p-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">{i.image}</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{i.name}</p>
                      <p className="text-xs text-muted-foreground">${i.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => remove(i.id)} className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary"><Minus className="h-3 w-3" /></button>
                      <span className="w-5 text-center text-sm font-semibold">{i.qty}</span>
                      <button onClick={() => add(i)} className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background"><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-lg font-bold">${total.toFixed(2)}</span>
              </div>
              <button className="mt-3 w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background">
                Checkout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
