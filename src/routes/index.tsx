import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Clock, Pill, FileText, ChevronRight } from "lucide-react";

import { useQueue } from "@/context/QueueContext";
import { AppointmentCard } from "@/components/AppointmentCard";
import { QueueCard } from "@/components/QueueCard";
import { useAuth } from "@/context/AuthContext";
import { useAppointments } from "@/context/AppointmentContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediQ — Home" },
      { name: "description", content: "Your hospital, simplified. Book, queue, and order from one app." },
    ],
  }),
  component: Home,
});

const quickActions = [
  { to: "/appointments", label: "Book Visit", icon: Calendar },
  { to: "/queue", label: "My Queue", icon: Clock },
  { to: "/medicines", label: "Medicines", icon: Pill },
  { to: "/profile", label: "Records", icon: FileText },
] as const;

function Home() {
  const { user } = useAuth();
 const {
  getQueue,
  advanceQueue,
  queues,
} = useQueue();
  const { appointments } = useAppointments();
  if (user?.isDoctor) {
  const doctorQueue = queues["d1"];

  if (!doctorQueue) return null;

  const waiting =
    doctorQueue.lastToken -
    doctorQueue.currentToken;

  return (
    <div>
      <header className="px-5 pt-8 pb-2">
        <p className="text-sm text-muted-foreground">
          Doctor Dashboard
        </p>

        <h1 className="text-2xl font-bold tracking-tight">
          Hi, Dr. {user.name} 👋
        </h1>
      </header>

      <div className="px-5 space-y-4">
        <div className="rounded-3xl bg-foreground p-6 text-background">
          <p className="text-sm opacity-70">
            Current Token
          </p>

          <p className="text-6xl font-bold">
            #{doctorQueue.currentToken}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-card p-4 border">
            <p className="text-xs text-muted-foreground">
              Waiting Patients
            </p>

            <p className="text-3xl font-bold">
              {waiting}
            </p>
          </div>

          <div className="rounded-2xl bg-card p-4 border">
            <p className="text-xs text-muted-foreground">
              Last Token
            </p>

            <p className="text-3xl font-bold">
              #{doctorQueue.lastToken}
            </p>
          </div>
        </div>

       <button
  onClick={async () => {
    await advanceQueue("d1");
  }}
  className="w-full rounded-2xl bg-foreground py-4 text-background font-semibold"
>
  Call Next Patient
</button>
      </div>
    </div>
  );
}




  const checkedInAppointments = appointments.filter(
  (a) => a.status === "checked-in" && a.token
);

const upcoming =

  checkedInAppointments.length > 0
    ? checkedInAppointments.reduce((best, current) => {
        const bestQueue = getQueue(best.doctorId);
        const currentQueue = getQueue(current.doctorId);

        const bestAhead =
          (best.token ?? 0) -
          (bestQueue?.currentToken ?? 0);

        const currentAhead =
          (current.token ?? 0) -
          (currentQueue?.currentToken ?? 0);

        if (currentAhead < bestAhead) {
  return current;
}

if (currentAhead === bestAhead) {
  return (currentQueue?.currentToken ?? 0) >
    (bestQueue?.currentToken ?? 0)
    ? current
    : best;
}

return best;
      })
    : appointments.find(
        (a) => a.status === "upcoming"
      );


 
  const doctorQueue =
  upcoming ? getQueue(upcoming.doctorId) : undefined;
  return (
    <div>
      <header className="px-5 pt-8 pb-2">
        <p className="text-sm text-muted-foreground">Good afternoon</p>
        <h1 className="text-2xl font-bold tracking-tight">Hi, {user?.name ?? "Alex"} 👋</h1>
      </header>

      <section className="px-5 pt-4">
        <Link to="/queue" className="block">
          {upcoming && doctorQueue && (
  <QueueCard
    q={{
      yourToken: upcoming.token ?? doctorQueue.currentToken,
      currentToken: doctorQueue.currentToken,
      totalInQueue: doctorQueue.lastToken,
      avgMinutesPerPatient: 6,
      doctorName: upcoming.doctorName,
      specialty: upcoming.specialty,
      room: "Room 204",
    }}
  />
)}
        </Link>
      </section>

      <section className="px-5 pt-6">
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map(({ to, label, icon: Icon }, i) => (
            <motion.div
              key={to}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={to}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {upcoming && (
        <section className="px-5 pt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Upcoming appointment</h2>
            <Link to="/appointments" className="flex items-center text-xs text-muted-foreground">
              See all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <AppointmentCard appt={upcoming} />
        </section>
      )}

      <section className="px-5 pt-6">
        <div className="rounded-2xl bg-secondary p-5">
          <p className="text-xs font-medium text-muted-foreground">HEALTH TIP</p>
          <p className="mt-1 text-sm font-semibold leading-snug">
            Stay hydrated — aim for 8 glasses of water a day to keep your energy up.
          </p>
        </div>
      </section>
    </div>
  );
}
