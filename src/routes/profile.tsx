import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, FileText, Heart, Bell, Shield, HelpCircle, LogOut } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { prescriptions } from "@/data/medicines";

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
  return (
    <div>
      <PageHeader title="Profile" />

      <div className="px-5">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <img src="https://i.pravatar.cc/120?img=15" alt="Alex" className="h-14 w-14 rounded-full object-cover" />
          <div className="flex-1">
            <p className="font-semibold">Alex Morgan</p>
            <p className="text-xs text-muted-foreground">alex.morgan@email.com</p>
          </div>
          <button className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium">Edit</button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { l: "Visits", v: "12" },
            { l: "Reports", v: "5" },
            { l: "Meds", v: "8" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-secondary p-3 text-center">
              <p className="text-lg font-bold">{s.v}</p>
              <p className="text-[10px] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>

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
                <button className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${i > 0 ? "border-t border-border" : ""}`}>
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
