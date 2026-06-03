import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Doctor } from "@/data/doctors";

export function DoctorCard({ doctor, onSelect }: { doctor: Doctor; onSelect?: (d: Doctor) => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect?.(doctor)}
      className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left shadow-[var(--shadow-card)]"
    >
      <img src={doctor.avatar} alt={doctor.name} className="h-14 w-14 rounded-full object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{doctor.name}</p>
        <p className="text-xs text-muted-foreground">{doctor.specialty} · {doctor.experience}y exp</p>
        <div className="mt-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-foreground text-foreground" />
          <span className="text-xs font-medium">{doctor.rating}</span>
          <span className="text-xs text-muted-foreground">· ${doctor.fee}</span>
        </div>
      </div>
    </motion.button>
  );
}
