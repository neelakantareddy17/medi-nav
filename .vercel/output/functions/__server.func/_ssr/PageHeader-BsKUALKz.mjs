import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function PageHeader({ title, subtitle }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-5 pt-6 pb-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: title }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: subtitle })
  ] });
}
export {
  PageHeader as P
};
