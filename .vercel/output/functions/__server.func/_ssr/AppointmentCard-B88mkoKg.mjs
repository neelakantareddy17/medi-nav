import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useAppointments, b as useQueue } from "./router-DvZPEZyX.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { a as Calendar, C as Clock } from "../_libs/lucide-react.mjs";
const statusStyles = {
  upcoming: "bg-foreground text-background",
  "checked-in": "bg-blue-100 text-blue-700",
  completed: "bg-secondary text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive"
};
function AppointmentCard({ appt }) {
  const {
    cancelAppointment,
    checkInAppointment
  } = useAppointments();
  const { generateToken } = useQueue();
  const handleCheckIn = async () => {
    try {
      const token = await generateToken(
        appt.doctorId
      );
      await checkInAppointment(
        appt.id,
        token
      );
    } catch (error) {
      console.error(error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      whileTap: { scale: 0.98 },
      className: "rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: appt.avatar, alt: appt.doctorName, className: "h-12 w-12 rounded-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold", children: appt.doctorName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: appt.specialty })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-1 text-[10px] font-medium capitalize ${statusStyles[appt.status]}`, children: appt.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 border-t border-border pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
              appt.date
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
              appt.time
            ] })
          ] }),
          appt.status === "checked-in" && appt.token && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-xl bg-secondary p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your Token" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold", children: [
              "#",
              appt.token
            ] })
          ] }),
          appt.status === "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleCheckIn,
                className: "w-full rounded-xl bg-foreground py-2 text-xs font-medium text-background",
                children: "Check In"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => cancelAppointment(appt.id),
                className: "w-full rounded-xl border border-border py-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive/5",
                children: "Cancel Appointment"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  AppointmentCard as A
};
