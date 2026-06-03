import { motion } from "framer-motion";

type Props = {
  slots: string[];
  selected: string | null;
  onSelect: (s: string) => void;
};

export function SlotPicker({ slots, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => {
        const active = selected === slot;
        return (
          <motion.button
            key={slot}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(slot)}
            className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors ${
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-foreground"
            }`}
          >
            {slot}
          </motion.button>
        );
      })}
    </div>
  );
}
