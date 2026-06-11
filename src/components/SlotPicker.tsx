import { motion } from "framer-motion";

type Props = {
  slots: string[];
  bookedSlots: string[];
  selected: string | null;
  onSelect: (s: string) => void;
};

export function SlotPicker({
  slots,
  bookedSlots,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => {
        const active = selected === slot;
        const disabled = bookedSlots.includes(slot);
        return (
          <motion.button
  key={slot}
  whileTap={!disabled ? { scale: 0.95 } : undefined}
  disabled={disabled}
  onClick={() => !disabled && onSelect(slot)}
  className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors ${
    active
      ? "border-foreground bg-foreground text-background"
      : disabled
      ? "border-border bg-secondary text-muted-foreground opacity-50 cursor-not-allowed"
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
