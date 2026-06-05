import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, FileText, Heart, Bell, Shield, HelpCircle, LogOut } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { prescriptions } from "@/data/medicines";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { useAppointments } from "@/context/AppointmentContext";
import { AppointmentCard } from "@/components/AppointmentCard";
export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — MediQ" },
      { name: "description", content: "Manage your profile, prescriptions, and settings." },
    ],
  }),
  component: Profile,
});

const menu = [
  { icon: Heart, label: "Health records" },
  { icon: Bell, label: "Notifications" },
  { icon: Shield, label: "Privacy" },
  { icon: HelpCircle, label: "Help & support" },
  { icon: LogOut, label: "Log out" },
];

function Profile() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { appointments } = useAppointments();
  const upcomingAppointments = appointments.filter(
    (a) => a.status === "upcoming"
  );

  const completedAppointments = appointments.filter(
  (a) => a.status === "completed"
);
  const handleLogout = () => {
    auth.logout();
    navigate({ to: "/login", replace: true });
  };

  return (
    <div>
      <PageHeader title="Profile" />

      <div className="px-5">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <img src="https://i.pravatar.cc/120?img=15" alt={auth.user?.name ?? "Alex"} className="h-14 w-14 rounded-full object-cover" />
          <div className="flex-1">
            <p className="font-semibold">{auth.user?.name ?? "Alex Morgan"}</p>
            <p className="text-xs text-muted-foreground">{auth.user?.email ?? "alex.morgan@email.com"}</p>
          </div>
          <button className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium">Edit</button>
        </div>

        <div className="mt-4">
          <Button variant="outline" onClick={handleLogout} className="h-11 w-full rounded-2xl text-sm font-medium">
            <LogOut className="h-4 w-4" />
            Fake Logout
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
  {[
    { l: "Visits", v: appointments.length.toString() },
    { l: "Reports", v: prescriptions.length.toString() },
    { l: "Meds", v: prescriptions.length.toString() },
  ].map((s) => (
    <div key={s.l} className="rounded-2xl bg-secondary p-3 text-center">
      <p className="text-lg font-bold">{s.v}</p>
      <p className="text-[10px] text-muted-foreground">{s.l}</p>
    </div>
  ))}
</div>
<section className="mt-6">
  <h2 className="mb-3 text-sm font-semibold">
    Upcoming Appointments
  </h2>

  <div className="space-y-3">
    {upcomingAppointments.length === 0 ? (
      <div className="rounded-2xl border border-border bg-card p-4 text-center text-sm text-muted-foreground">
        No upcoming appointments
      </div>
    ) : (
      upcomingAppointments.map((appt) => (
        <AppointmentCard
          key={appt.id}
          appt={appt}
        />
      ))
    )}
  </div>

</section>
<section className="mt-6">
  <h2 className="mb-3 text-sm font-semibold">
    Appointment History
  </h2>

  <div className="space-y-3">
    {completedAppointments.length === 0 ? (
      <div className="rounded-2xl border border-border bg-card p-4 text-center text-sm text-muted-foreground">
        No completed appointments
      </div>
    ) : (
      completedAppointments.map((appt) => (
        <AppointmentCard
          key={appt.id}
          appt={appt}
        />
      ))
    )}
  </div>
</section>
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-semibold">Prescription history</h2>
          <div className="space-y-2">
            {prescriptions.map((p) => (
              <div key={p.id} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{p.doctor}</p>
                  <p className="text-xs text-muted-foreground">{p.date}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.items.join(" · ")}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <ul className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            {menu.map(({ icon: Icon, label }, i) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={label === "Log out" ? handleLogout : undefined}
                  className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${i > 0 ? "border-t border-border" : ""}`}
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-sm">{label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-6 pb-4 text-center text-[10px] text-muted-foreground">MediQ v1.0 · Demo build</p>
      </div>
    </div>
  );
}
