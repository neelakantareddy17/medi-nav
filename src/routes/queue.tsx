import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Users, Timer } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { queueStatus } from "@/data/queue";

export const Route = createFileRoute("/queue")({
  head: () => ({
    meta: [
      { title: "Queue — MediQ" },
      { name: "description", content: "Track your live queue position and waiting time." },
    ],
  }),
  component: QueuePage,
});

function QueuePage() {
  const q = queueStatus;
  const ahead = Math.max(q.yourToken - q.currentToken, 0);
  const wait = ahead * q.avgMinutesPerPatient;
  const progress = Math.min(((q.currentToken / q.yourToken) * 100), 100);

  return (
    <div>
      <PageHeader title="Live Queue" subtitle={`${q.doctorName} · ${q.specialty}`} />

      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-foreground p-6 text-background shadow-[var(--shadow-elevated)]"
        >
          <p className="text-[11px] uppercase tracking-wider opacity-60">Your token</p>
          <p className="mt-1 text-6xl font-bold tracking-tight">#{q.yourToken}</p>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs opacity-80">
              <span>Now serving #{q.currentToken}</span>
              <span>You're #{q.yourToken}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-background/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full rounded-full bg-background"
              />
            </div>
          </div>
        </motion.div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat icon={Users} label="Ahead" value={`${ahead}`} />
          <Stat icon={Timer} label="Est. wait" value={`${wait}m`} />
          <Stat icon={Users} label="In queue" value={`${q.totalInQueue}`} />
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{q.room}</span>
          </div>
          <p className="mt-2 text-sm font-medium">
            We'll notify you when only 2 patients are ahead.
          </p>
        </div>

        <div className="mt-4 rounded-2xl bg-secondary p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Activity</p>
          <ul className="mt-3 space-y-3">
            {[
              { t: "Token #22 called", time: "Just now" },
              { t: "Token #21 completed", time: "6 min ago" },
              { t: "You checked in", time: "32 min ago" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
                <div className="flex-1">
                  <p className="text-sm">{a.t}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <p className="mt-2 text-lg font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
