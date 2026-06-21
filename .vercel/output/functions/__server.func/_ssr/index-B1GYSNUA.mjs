import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, b as useQueue, a as useAppointments } from "./router-DvZPEZyX.mjs";
import { A as AppointmentCard } from "./AppointmentCard-B88mkoKg.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__firestore.mjs";
import { a as Calendar, C as Clock, P as Pill, F as FileText, d as ChevronRight } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "async_hooks";
import "stream";
import "util";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__webchannel-wrapper.mjs";
import "../_libs/@grpc/grpc-js.mjs";
import "process";
import "tls";
import "fs";
import "os";
import "net";
import "events";
import "http2";
import "http";
import "url";
import "dns";
import "zlib";
import "../_libs/@grpc/proto-loader.mjs";
import "path";
import "../_libs/lodash.camelcase.mjs";
import "../_libs/protobufjs.mjs";
import "../_libs/protobufjs__aspromise.mjs";
import "../_libs/protobufjs__base64.mjs";
import "../_libs/protobufjs__eventemitter.mjs";
import "../_libs/protobufjs__float.mjs";
import "../_libs/@protobufjs/inquire.mjs";
import "../_libs/protobufjs__utf8.mjs";
import "../_libs/protobufjs__pool.mjs";
import "../_libs/long.mjs";
import "../_libs/protobufjs__codegen.mjs";
import "../_libs/protobufjs__fetch.mjs";
import "../_libs/protobufjs__path.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function QueueCard({ q }) {
  const ahead = Math.max(q.yourToken - q.currentToken, 0);
  const wait = ahead * q.avgMinutesPerPatient;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      className: "rounded-2xl bg-foreground p-5 text-background shadow-[var(--shadow-elevated)]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider opacity-60", children: "Your token" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold", children: [
              "#",
              q.yourToken
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider opacity-60", children: "Now serving" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold", children: [
              "#",
              q.currentToken
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between text-xs opacity-80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            ahead,
            " patients ahead"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "~",
            wait,
            " min wait"
          ] })
        ] })
      ]
    }
  );
}
const quickActions = [{
  to: "/appointments",
  label: "Book Visit",
  icon: Calendar
}, {
  to: "/queue",
  label: "My Queue",
  icon: Clock
}, {
  to: "/medicines",
  label: "Medicines",
  icon: Pill
}, {
  to: "/profile",
  label: "Records",
  icon: FileText
}];
function Home() {
  const {
    user
  } = useAuth();
  const {
    getQueue,
    advanceQueue,
    queues
  } = useQueue();
  const {
    appointments
  } = useAppointments();
  if (user?.isDoctor) {
    const doctorQueue2 = queues["d1"];
    if (!doctorQueue2) return null;
    const waiting = doctorQueue2.lastToken - doctorQueue2.currentToken;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-5 pt-8 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Doctor Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold tracking-tight", children: [
          "Hi, Dr. ",
          user.name,
          " 👋"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-foreground p-6 text-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-70", children: "Current Token" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-6xl font-bold", children: [
            "#",
            doctorQueue2.currentToken
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card p-4 border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Waiting Patients" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold", children: waiting })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card p-4 border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last Token" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold", children: [
              "#",
              doctorQueue2.lastToken
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
          await advanceQueue("d1");
        }, className: "w-full rounded-2xl bg-foreground py-4 text-background font-semibold", children: "Call Next Patient" })
      ] })
    ] });
  }
  const checkedInAppointments = appointments.filter((a) => a.status === "checked-in" && a.token);
  const upcoming = checkedInAppointments.length > 0 ? checkedInAppointments.reduce((best, current) => {
    const bestQueue = getQueue(best.doctorId);
    const currentQueue = getQueue(current.doctorId);
    const bestAhead = (best.token ?? 0) - (bestQueue?.currentToken ?? 0);
    const currentAhead = (current.token ?? 0) - (currentQueue?.currentToken ?? 0);
    if (currentAhead < bestAhead) {
      return current;
    }
    if (currentAhead === bestAhead) {
      return (currentQueue?.currentToken ?? 0) > (bestQueue?.currentToken ?? 0) ? current : best;
    }
    return best;
  }) : appointments.find((a) => a.status === "upcoming");
  const doctorQueue = upcoming ? getQueue(upcoming.doctorId) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-5 pt-8 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Good afternoon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold tracking-tight", children: [
        "Hi, ",
        user?.name ?? "Alex",
        " 👋"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/queue", className: "block", children: upcoming && doctorQueue && /* @__PURE__ */ jsxRuntimeExports.jsx(QueueCard, { q: {
      yourToken: upcoming.token ?? doctorQueue.currentToken,
      currentToken: doctorQueue.currentToken,
      totalInQueue: doctorQueue.lastToken,
      avgMinutesPerPatient: 6,
      doctorName: upcoming.doctorName,
      specialty: upcoming.specialty,
      room: "Room 204"
    } }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: quickActions.map(({
      to,
      label,
      icon: Icon
    }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.04
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5", strokeWidth: 2 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium", children: label })
    ] }) }, to)) }) }),
    upcoming && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Upcoming appointment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/appointments", className: "flex items-center text-xs text-muted-foreground", children: [
          "See all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppointmentCard, { appt: upcoming })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-5 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-secondary p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "HEALTH TIP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-semibold leading-snug", children: "Stay hydrated — aim for 8 glasses of water a day to keep your energy up." })
    ] }) })
  ] });
}
export {
  Home as component
};
