import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./PageHeader-BsKUALKz.mjs";
import { S as SearchBar } from "./SearchBar-DGsJ9awY.mjs";
import { c as useCart } from "./router-DvZPEZyX.mjs";
import { m as medicines } from "./medicines-CaSegDGz.mjs";
import "../_libs/firebase__auth.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__firestore.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { h as ShoppingBag, X, i as Minus, j as Plus } from "../_libs/lucide-react.mjs";
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
function MedicineCard({ med }) {
  const { add } = useCart();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      whileTap: { scale: 0.98 },
      className: "flex flex-col rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 items-center justify-center rounded-xl bg-secondary text-4xl", children: med.image }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: med.brand }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 text-sm font-semibold", children: med.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[10px] text-muted-foreground", children: med.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold", children: [
            "$",
            med.price.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              disabled: !med.inStock,
              onClick: () => add(med),
              className: "flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background disabled:opacity-30",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
            }
          )
        ] }),
        !med.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] text-destructive", children: "Out of stock" })
      ]
    }
  );
}
const categories = ["All", "Pain Relief", "Antibiotic", "Vitamins", "Cold & Flu", "Heart", "Diabetes"];
function Meds() {
  const [search, setSearch] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("All");
  const [open, setOpen] = reactExports.useState(false);
  const {
    items,
    add,
    remove,
    total,
    count
  } = useCart();
  const filtered = medicines.filter((m) => {
    const matchS = m.name.toLowerCase().includes(search.toLowerCase()) || m.brand.toLowerCase().includes(search.toLowerCase());
    const matchC = cat === "All" || m.category === cat;
    return matchS && matchC;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Pharmacy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, { value: search, onChange: setSearch, placeholder: "Search medicines or brands" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-5 overflow-x-auto px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 pb-1", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCat(c), className: `whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium ${cat === c ? "bg-foreground text-background" : "bg-secondary text-foreground"}`, children: c }, c)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: filtered.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MedicineCard, { med: m }, m.id)) }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-10 text-center text-sm text-muted-foreground", children: "No medicines found." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: count > 0 && !open && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { initial: {
      y: 80,
      opacity: 0
    }, animate: {
      y: 0,
      opacity: 1
    }, exit: {
      y: 80,
      opacity: 0
    }, onClick: () => setOpen(true), className: "fixed bottom-[88px] left-1/2 z-40 flex w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-full bg-foreground px-5 py-3.5 text-background shadow-[var(--shadow-elevated)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold", children: [
          count,
          " item",
          count > 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold", children: [
        "$",
        total.toFixed(2),
        " · View cart"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, exit: {
        opacity: 0
      }, onClick: () => setOpen(false), className: "fixed inset-0 z-40 bg-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        y: "100%"
      }, animate: {
        y: 0
      }, exit: {
        y: "100%"
      }, transition: {
        type: "spring",
        damping: 28,
        stiffness: 280
      }, className: "fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 rounded-t-3xl bg-background p-5 pb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: "Your cart" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), className: "rounded-full bg-secondary p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 max-h-[50vh] space-y-3 overflow-y-auto", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-border p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl", children: i.image }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: i.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "$",
              i.price.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(i.id), className: "flex h-7 w-7 items-center justify-center rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 text-center text-sm font-semibold", children: i.qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => add(i), className: "flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }) })
          ] })
        ] }, i.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-border pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold", children: [
            "$",
            total.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-3 w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background", children: "Checkout" })
      ] })
    ] }) })
  ] });
}
export {
  Meds as component
};
