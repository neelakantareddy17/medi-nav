import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import type { Appointment } from "@/data/appointments";
import { useAppointments } from "@/context/AppointmentContext";
const statusStyles: Record<Appointment["status"], string> = {
  upcoming: "bg-foreground text-background",
  completed: "bg-secondary text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

export function AppointmentCard({ appt }: { appt: Appointment }) {
  const { cancelAppointment } = useAppointments();

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
      <div className="mt-3 border-t border-border pt-3">
  <div className="flex items-center gap-4 text-xs text-muted-foreground">
    <span className="flex items-center gap-1.5">
      <Calendar className="h-3.5 w-3.5" />
      {appt.date}
    </span>

    <span className="flex items-center gap-1.5">
      <Clock className="h-3.5 w-3.5" />
      {appt.time}
    </span>
  </div>

  {appt.status === "upcoming" && (
    <button
      onClick={() => cancelAppointment(appt.id)}
      className="mt-3 w-full rounded-xl border border-border py-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive/5"
    >
      Cancel Appointment
    </button>
  )}
</div>
    </motion.div>
  );
}
