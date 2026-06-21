import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./PageHeader-BsKUALKz.mjs";
import { A as AppointmentCard } from "./AppointmentCard-B88mkoKg.mjs";
import { S as SearchBar } from "./SearchBar-DGsJ9awY.mjs";
import { a as useAppointments } from "./router-DvZPEZyX.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__firestore.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { X, n as Check, o as Star } from "../_libs/lucide-react.mjs";
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
function DoctorCard({ doctor, onSelect }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      whileTap: { scale: 0.97 },
      onClick: () => onSelect?.(doctor),
      className: "flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left shadow-[var(--shadow-card)]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: doctor.avatar, alt: doctor.name, className: "h-14 w-14 rounded-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold", children: doctor.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            doctor.specialty,
            " · ",
            doctor.experience,
            "y exp"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-foreground text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: doctor.rating }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "· $",
              doctor.fee
            ] })
          ] })
        ] })
      ]
    }
  );
}
const doctors = [
  {
    id: "d1",
    name: "Dr. Neel Reddy",
    specialty: "Cardiologist",
    rating: 4.9,
    experience: 12,
    fee: 60,
    avatar: "https://i.pravatar.cc/120?img=47"
  },
  { id: "d2", name: "Dr. Imran Ali", specialty: "Dermatologist", rating: 4.7, experience: 8, fee: 45, avatar: "https://i.pravatar.cc/120?img=12" },
  { id: "d3", name: "Dr. Ayesha Noor", specialty: "Pediatrician", rating: 4.8, experience: 10, fee: 40, avatar: "https://i.pravatar.cc/120?img=32" },
  { id: "d4", name: "Dr. Bilal Raza", specialty: "Neurologist", rating: 4.6, experience: 15, fee: 80, avatar: "https://i.pravatar.cc/120?img=68" },
  { id: "d5", name: "Dr. Hina Tariq", specialty: "Dentist", rating: 4.9, experience: 9, fee: 35, avatar: "https://i.pravatar.cc/120?img=45" }
];
function Appointments() {
  const [tab, setTab] = reactExports.useState("upcoming");
  const [search, setSearch] = reactExports.useState("");
  const [picked, setPicked] = reactExports.useState(null);
  const [selectedDate, setSelectedDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [confirmed, setConfirmed] = reactExports.useState(false);
  const filtered = doctors.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()));
  const {
    appointments,
    addAppointment
  } = useAppointments();
  const list = appointments.filter((a) => {
    if (tab === "upcoming") {
      return a.status === "upcoming" || a.status === "checked-in";
    }
    if (tab === "past") {
      return a.status === "completed" || a.status === "cancelled";
    }
    return false;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Appointments" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 rounded-full bg-secondary p-1", children: ["upcoming", "past", "book"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
      setTab(t);
      setPicked(null);
      setConfirmed(false);
    }, className: `flex-1 rounded-full py-2 text-xs font-medium capitalize transition-colors ${tab === t ? "bg-background shadow-[var(--shadow-card)] text-foreground" : "text-muted-foreground"}`, children: t }, t)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-5", children: [
      tab !== "book" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "py-10 text-center text-sm text-muted-foreground", children: [
        "No ",
        tab,
        " appointments."
      ] }) : list.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(AppointmentCard, { appt: a }, a.id)) }),
      tab === "book" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        !picked && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, { value: search, onChange: setSearch, placeholder: "Search doctor or specialty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorCard, { doctor: d, onSelect: setPicked }, d.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
          picked && !confirmed && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            y: 12
          }, animate: {
            opacity: 1,
            y: 0
          }, exit: {
            opacity: 0
          }, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPicked(null), className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
              " Change doctor"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorCard, { doctor: picked }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm font-semibold", children: "Select Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: selectedDate, min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0], onChange: (e) => setSelectedDate(e.target.value), className: "w-full rounded-xl border border-border bg-card p-3" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-secondary p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Queue token will be generated during check-in." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Estimated wait time depends on the live queue." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { whileTap: {
              scale: 0.97
            }, disabled: !picked, onClick: async () => {
              if (!picked) return;
              try {
                await addAppointment({
                  id: crypto.randomUUID(),
                  doctorId: picked.id,
                  doctorName: picked.name,
                  specialty: picked.specialty,
                  date: selectedDate,
                  time: "Queue Based",
                  status: "upcoming",
                  avatar: picked.avatar
                });
                setConfirmed(true);
              } catch (error) {
                console.error(error);
                alert("Failed to create appointment");
              }
              setConfirmed(true);
            }, className: "w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background disabled:opacity-30", children: [
              "Confirm booking · $",
              picked.fee
            ] })
          ] }),
          confirmed && picked && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            scale: 0.95
          }, animate: {
            opacity: 1,
            scale: 1
          }, className: "rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-7 w-7" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base font-semibold", children: "Booking confirmed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
              picked.name,
              " · ",
              selectedDate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setTab("upcoming");
              setPicked(null);
              setConfirmed(false);
            }, className: "mt-5 w-full rounded-full bg-secondary py-3 text-sm font-medium", children: "Done" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Appointments as component
};
