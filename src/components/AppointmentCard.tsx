import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import type { Appointment } from "@/data/appointments";

const statusStyles: Record<Appointment["status"], string> = {
  upcoming: "bg-foreground text-background",
  completed: "bg-secondary text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

export function AppointmentCard({ appt }: { appt: Appointment }) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center gap-3">
        <img src={appt.avatar} alt={appt.doctorName} className="h-12 w-12 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{appt.doctorName}</p>
          <p className="text-xs text-muted-foreground">{appt.specialty}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium capitalize ${statusStyles[appt.status]}`}>
          {appt.status}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{appt.date}</span>
        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{appt.time}</span>
      </div>
    </motion.div>
  );
}
