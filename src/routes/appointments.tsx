import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { AppointmentCard } from "@/components/AppointmentCard";
import { DoctorCard } from "@/components/DoctorCard";
import { SearchBar } from "@/components/SearchBar";
import { SlotPicker } from "@/components/SlotPicker";
import { timeSlots } from "@/data/appointments";
import { useAppointments } from "@/context/AppointmentContext";
import { doctors, type Doctor } from "@/data/doctors";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — MediQ" },
      { name: "description", content: "Book and manage your hospital appointments." },
    ],
  }),
  component: Appointments,
});

function Appointments() {
  const [tab, setTab] = useState<"upcoming" | "past" | "book">("upcoming");
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState<Doctor | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const filtered = doctors.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()),
  );

 const { appointments, addAppointment } = useAppointments();
  const list = appointments.filter((a) =>
    tab === "upcoming" ? a.status === "upcoming" : a.status !== "upcoming",
  );

  return (
    <div>
      <PageHeader title="Appointments" />

      <div className="px-5">
        <div className="flex gap-1 rounded-full bg-secondary p-1">
          {(["upcoming", "past", "book"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setPicked(null); setSlot(null); setConfirmed(false); }}
              className={`flex-1 rounded-full py-2 text-xs font-medium capitalize transition-colors ${
                tab === t ? "bg-background shadow-[var(--shadow-card)] text-foreground" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5">
        {tab !== "book" && (
          <div className="space-y-3">
            {list.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">No {tab} appointments.</p>
            ) : (
              list.map((a) => <AppointmentCard key={a.id} appt={a} />)
            )}
          </div>
        )}

        {tab === "book" && (
          <div className="space-y-4">
            {!picked && (
              <>
                <SearchBar value={search} onChange={setSearch} placeholder="Search doctor or specialty" />
                <div className="space-y-2">
                  {filtered.map((d) => <DoctorCard key={d.id} doctor={d} onSelect={setPicked} />)}
                </div>
              </>
            )}

            <AnimatePresence>
              {picked && !confirmed && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <button onClick={() => setPicked(null)} className="flex items-center gap-1 text-xs text-muted-foreground">
                      <X className="h-3 w-3" /> Change doctor
                    </button>
                  </div>
                  <DoctorCard doctor={picked} />
                  <div>
                    <p className="mb-2 text-sm font-semibold">Pick a time</p>
                    <SlotPicker slots={timeSlots} selected={slot} onSelect={setSlot} />
                  </div>
                  <motion.button
  whileTap={{ scale: 0.97 }}
  disabled={!slot}
  onClick={() => {
    if (!picked || !slot) return;

    addAppointment({
      id: crypto.randomUUID(),
      doctorId: picked.id,
      doctorName: picked.name,
      specialty: picked.specialty,
      date: "Today",
      time: slot,
      status: "upcoming",
      avatar: picked.avatar,
    });

    setConfirmed(true);
  }}
  className="w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background disabled:opacity-30"
>
  Confirm booking · ${picked.fee}
</motion.button>
                </motion.div>
              )}

              {confirmed && picked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)]"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background">
                    <Check className="h-7 w-7" />
                  </div>
                  <p className="mt-4 text-base font-semibold">Booking confirmed</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {picked.name} · {slot}
                  </p>
                  <button
                    onClick={() => { setTab("upcoming"); setPicked(null); setSlot(null); setConfirmed(false); }}
                    className="mt-5 w-full rounded-full bg-secondary py-3 text-sm font-medium"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
