import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./PageHeader-BsKUALKz.mjs";
import { a as useAppointments, b as useQueue } from "./router-DvZPEZyX.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__firestore.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { c as Users, T as Timer, M as MapPin } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function QueuePage() {
  const {
    appointments
  } = useAppointments();
  const {
    getQueue,
    advanceQueue
  } = useQueue();
  const upcoming = [...appointments].reverse().find((a) => a.status === "checked-in" && a.token);
  if (!upcoming) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Live Queue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-20 text-center text-sm text-muted-foreground", children: "No active appointment found." })
    ] });
  }
  const doctorQueue = getQueue(upcoming.doctorId);
  if (!doctorQueue) {
    return null;
  }
  const q = {
    yourToken: upcoming.token ?? 0,
    currentToken: doctorQueue.currentToken,
    totalInQueue: doctorQueue.lastToken,
    avgMinutesPerPatient: 6,
    doctorName: upcoming.doctorName,
    specialty: upcoming.specialty,
    room: "Room 204 · Block B"
  };
  const ahead = Math.max(q.yourToken - q.currentToken, 0);
  const wait = ahead * q.avgMinutesPerPatient;
  const progress = Math.min(q.currentToken / q.yourToken * 100, 100);
  let queueMessage = "You're in the queue.";
  if (ahead <= 3 && ahead > 0) {
    queueMessage = "⚡ Your turn is approaching. Please proceed to the clinic.";
  }
  if (ahead === 0) {
    queueMessage = "🩺 It's your turn now.";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Live Queue", subtitle: `${q.doctorName} · ${q.specialty}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 8
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "rounded-3xl bg-foreground p-6 text-background shadow-[var(--shadow-elevated)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider opacity-60", children: "Your token" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-6xl font-bold tracking-tight", children: [
          "#",
          q.yourToken
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs opacity-80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Now serving #",
              q.currentToken
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "You're #",
              q.yourToken
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-2 overflow-hidden rounded-full bg-background/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
            width: 0
          }, animate: {
            width: `${progress}%`
          }, transition: {
            duration: 1.2,
            ease: "easeOut"
          }, className: "h-full rounded-full bg-background" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Users, label: "Ahead", value: `${ahead}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Timer, label: "Est. wait", value: `${wait}m` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Users, label: "In queue", value: `${q.totalInQueue}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-4 rounded-2xl border p-4 shadow-[var(--shadow-card)] ${ahead === 0 ? "border-green-500 bg-green-50" : ahead <= 3 ? "border-yellow-500 bg-yellow-50" : "border-border bg-card"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: q.room })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-medium", children: queueMessage })
      ] })
    ] })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg font-bold", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: label })
  ] });
}
export {
  QueuePage as component
};
