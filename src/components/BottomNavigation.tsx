import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calendar, Clock, Pill, User } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/appointments", label: "Visits", icon: Calendar },
  { to: "/queue", label: "Queue", icon: Clock },
  { to: "/medicines", label: "Meds", icon: Pill },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNavigation() {
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <Link key={to} to={to} className="relative flex flex-1 flex-col items-center gap-1 py-1.5">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  active ? "bg-foreground text-background" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </motion.div>
              <span className={`text-[10px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
