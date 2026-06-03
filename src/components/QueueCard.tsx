import { motion } from "framer-motion";
import type { QueueStatus } from "@/data/queue";

export function QueueCard({ q }: { q: QueueStatus }) {
  const ahead = Math.max(q.yourToken - q.currentToken, 0);
  const wait = ahead * q.avgMinutesPerPatient;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-foreground p-5 text-background shadow-[var(--shadow-elevated)]"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wider opacity-60">Your token</p>
          <p className="text-4xl font-bold">#{q.yourToken}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider opacity-60">Now serving</p>
          <p className="text-4xl font-bold">#{q.currentToken}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs opacity-80">
        <span>{ahead} patients ahead</span>
        <span>~{wait} min wait</span>
      </div>
    </motion.div>
  );
}
