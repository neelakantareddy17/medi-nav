import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { p as Search } from "../_libs/lucide-react.mjs";
function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        className: "w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
      }
    )
  ] });
}
export {
  SearchBar as S
};
