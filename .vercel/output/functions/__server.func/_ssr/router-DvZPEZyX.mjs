import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate, e as useRouterState, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { o as onAuthStateChanged, s as signOut, c as createUserWithEmailAndPassword, u as updateProfile, a as signInWithEmailAndPassword, g as getAuth } from "../_libs/firebase__auth.mjs";
import { i as initializeApp } from "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/firebase.mjs";
import { o as onSnapshot, c as collection, d as doc, g as getDoc, u as updateDoc, r as runTransaction, a as getFirestore, s as setDoc } from "../_libs/firebase__firestore.mjs";
import { H as House, C as Clock, U as User, a as Calendar, P as Pill } from "../_libs/lucide-react.mjs";
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
const appCss = "/assets/styles-DPz0rfej.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const firebaseConfig = {
  apiKey: "AIzaSyBpg-fgtyEP_-PlxFwCTOxyifZAkTz_KAM",
  authDomain: "mediiq-afb72.firebaseapp.com",
  projectId: "mediiq-afb72",
  storageBucket: "mediiq-afb72.firebasestorage.app",
  messagingSenderId: "633349088772",
  appId: "1:633349088772:web:1d2177f8375d2d5b27f751",
  measurementId: "G-BTZM8C6DP3"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const AuthContext = reactExports.createContext(
  void 0
);
const DOCTOR_MAP = {
  "neelakantareddy017@gmail.com": "d1"
};
function mapUser(user) {
  const email = user.email || "";
  return {
    id: user.uid,
    name: user.displayName || "User",
    email,
    isDoctor: email in DOCTOR_MAP,
    doctorId: DOCTOR_MAP[email]
  };
}
function AuthProvider({
  children
}) {
  const [user, setUser] = reactExports.useState(null);
  const [hydrated, setHydrated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ? mapUser(firebaseUser) : null);
      setHydrated(true);
    });
    return unsubscribe;
  }, []);
  const value = reactExports.useMemo(
    () => ({
      user,
      hydrated,
      isAuthenticated: Boolean(user),
      login: async ({ email, password }) => {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      },
      signup: async ({
        fullName,
        email,
        password
      }) => {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(
          cred.user,
          {
            displayName: fullName
          }
        );
      },
      logout: async () => {
        await signOut(auth);
      }
    }),
    [user, hydrated]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value, children });
}
function useAuth() {
  const context = reactExports.useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }
  return context;
}
const patientTabs = [
  { to: "/", label: "Home", icon: House },
  {
    to: "/appointments",
    label: "Visits",
    icon: Calendar
  },
  { to: "/queue", label: "Queue", icon: Clock },
  {
    to: "/medicines",
    label: "Meds",
    icon: Pill
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User
  }
];
const doctorTabs = [
  { to: "/", label: "Dashboard", icon: House },
  { to: "/queue", label: "Queue", icon: Clock },
  {
    to: "/profile",
    label: "Profile",
    icon: User
  }
];
function BottomNavigation() {
  const { user } = useAuth();
  const tabs = user?.isDoctor ? doctorTabs : patientTabs;
  const { location } = useRouterState();
  const path = location.pathname;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex max-w-md items-center justify-between px-4 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2", children: tabs.map(({ to, label, icon: Icon }) => {
    const active = to === "/" ? path === "/" : path.startsWith(to);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "relative flex flex-1 flex-col items-center gap-1 py-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          whileTap: { scale: 0.9 },
          className: `flex h-9 w-9 items-center justify-center rounded-full transition-colors ${active ? "bg-foreground text-background" : "text-muted-foreground"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[18px] w-[18px]", strokeWidth: 2.2 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`, children: label })
    ] }, to);
  }) }) });
}
const CartContext = reactExports.createContext(null);
function CartProvider({ children }) {
  const [items, setItems] = reactExports.useState([]);
  const add = (m) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === m.id);
      if (existing) return prev.map((i) => i.id === m.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...m, qty: 1 }];
    });
  };
  const remove = (id) => {
    setItems((prev) => prev.flatMap((i) => i.id === id ? i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : [] : [i]));
  };
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CartContext.Provider, { value: { items, add, remove, total, count }, children });
}
const useCart = () => {
  const ctx = reactExports.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
const AppointmentContext = reactExports.createContext(null);
function AppointmentProvider({
  children
}) {
  const { user } = useAuth();
  const [appointments, setAppointments] = reactExports.useState([]);
  const addAppointment = async (appointment) => {
    setAppointments((prev) => [
      ...prev,
      appointment
    ]);
    if (!user) return;
    try {
      await setDoc(
        doc(
          db,
          "users",
          user.id,
          "appointments",
          appointment.id
        ),
        appointment
      );
      await setDoc(
        doc(
          db,
          "appointments",
          appointment.id
        ),
        {
          ...appointment,
          userId: user.id
        }
      );
    } catch (error) {
      console.error("FIRESTORE ERROR", error);
    }
  };
  const cancelAppointment = async (id) => {
    setAppointments(
      (prev) => prev.map(
        (appt) => appt.id === id ? {
          ...appt,
          status: "cancelled"
        } : appt
      )
    );
    if (!user) return;
    try {
      await updateDoc(
        doc(
          db,
          "users",
          user.id,
          "appointments",
          id
        ),
        {
          status: "cancelled"
        }
      );
      await updateDoc(
        doc(
          db,
          "appointments",
          id
        ),
        {
          status: "cancelled"
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const checkInAppointment = async (id, token) => {
    setAppointments(
      (prev) => prev.map(
        (appt) => appt.id === id ? {
          ...appt,
          status: "checked-in",
          token
        } : appt
      )
    );
    if (!user) return;
    try {
      await updateDoc(
        doc(
          db,
          "users",
          user.id,
          "appointments",
          id
        ),
        {
          status: "checked-in",
          token
        }
      );
      await updateDoc(
        doc(
          db,
          "appointments",
          id
        ),
        {
          status: "checked-in",
          token
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const completeAppointment = async (id) => {
    setAppointments(
      (prev) => prev.map(
        (appt) => appt.id === id ? {
          ...appt,
          status: "completed"
        } : appt
      )
    );
    if (!user) return;
    try {
      await updateDoc(
        doc(
          db,
          "users",
          user.id,
          "appointments",
          id
        ),
        {
          status: "completed"
        }
      );
      await updateDoc(
        doc(
          db,
          "appointments",
          id
        ),
        {
          status: "completed"
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  reactExports.useEffect(() => {
    if (!user) {
      setAppointments([]);
      return;
    }
    const unsubscribe = onSnapshot(
      collection(
        db,
        "users",
        user.id,
        "appointments"
      ),
      (snapshot) => {
        const firestoreAppointments = snapshot.docs.map(
          (doc2) => doc2.data()
        );
        setAppointments(
          firestoreAppointments
        );
      },
      (error) => {
        console.error(error);
      }
    );
    return () => unsubscribe();
  }, [user]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppointmentContext.Provider,
    {
      value: {
        appointments,
        addAppointment,
        cancelAppointment,
        checkInAppointment,
        completeAppointment
      },
      children
    }
  );
}
const useAppointments = () => {
  const ctx = reactExports.useContext(AppointmentContext);
  if (!ctx) {
    throw new Error(
      "useAppointments must be used inside AppointmentProvider"
    );
  }
  return ctx;
};
const QueueContext = reactExports.createContext(
  null
);
function QueueProvider({
  children
}) {
  const [queues, setQueues] = reactExports.useState({});
  const advanceQueue = async (doctorId) => {
    const queueRef = doc(
      db,
      "queues",
      doctorId
    );
    const snapshot = await getDoc(
      queueRef
    );
    if (!snapshot.exists()) return;
    const queue = snapshot.data();
    if (queue.currentToken >= queue.lastToken) {
      return;
    }
    await updateDoc(queueRef, {
      currentToken: queue.currentToken + 1
    });
  };
  reactExports.useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "queues"),
      (snapshot) => {
        const loaded = {};
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          loaded[data.doctorId] = data;
        });
        setQueues(loaded);
      },
      (error) => {
        console.error(error);
      }
    );
    return () => unsubscribe();
  }, []);
  const generateToken = async (doctorId) => {
    const queueRef = doc(
      db,
      "queues",
      doctorId
    );
    const token = await runTransaction(
      db,
      async (transaction) => {
        const snapshot = await transaction.get(
          queueRef
        );
        if (!snapshot.exists()) {
          throw new Error(
            "Queue not found"
          );
        }
        const queue = snapshot.data();
        const nextToken = queue.lastToken + 1;
        transaction.update(
          queueRef,
          {
            lastToken: nextToken
          }
        );
        return nextToken;
      }
    );
    return token;
  };
  const getQueue = (doctorId) => queues[doctorId];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    QueueContext.Provider,
    {
      value: {
        queues,
        generateToken,
        advanceQueue,
        getQueue
      },
      children
    }
  );
}
function useQueue() {
  const ctx = reactExports.useContext(
    QueueContext
  );
  if (!ctx) {
    throw new Error(
      "useQueue must be used inside QueueProvider"
    );
  }
  return ctx;
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background",
        children: "Go home"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Try refreshing the page." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background",
        children: "Try again"
      }
    )
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "MediQ — Hospital Queue" },
      { name: "description", content: "Book appointments, track your hospital queue, and order medicines." }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(QueueProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppointmentProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, {}) }) }) }) }) });
}
const publicRoutes = /* @__PURE__ */ new Set(["/login", "/signup"]);
function AppShell() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { hydrated, user } = useAuth();
  const isAuthRoute = publicRoutes.has(pathname);
  reactExports.useEffect(() => {
    if (!hydrated) {
      return;
    }
    if (!user && !isAuthRoute) {
      navigate({ to: "/login", replace: true });
      return;
    }
    if (user && isAuthRoute) {
      navigate({ to: "/", replace: true });
    }
  }, [hydrated, isAuthRoute, navigate, user]);
  if (!hydrated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4 text-sm text-muted-foreground" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mx-auto min-h-screen max-w-md bg-background ${isAuthRoute ? "" : "pb-24"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    !isAuthRoute && /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNavigation, {})
  ] });
}
const $$splitComponentImporter$6 = () => import("./signup-CqNUqouh.mjs");
const Route$6 = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: "Signup — MediQ"
    }, {
      name: "description",
      content: "Create a demo MediQ account."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./queue-7cv5dtLJ.mjs");
const Route$5 = createFileRoute("/queue")({
  head: () => ({
    meta: [{
      title: "Queue — MediQ"
    }, {
      name: "description",
      content: "Track your live queue position and waiting time."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./profile-BJuyZUg1.mjs");
const Route$4 = createFileRoute("/profile")({
  head: () => ({
    meta: [{
      title: "Profile — MediQ"
    }, {
      name: "description",
      content: "Manage your profile, prescriptions, and settings."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./medicines-3RLuom1M.mjs");
const Route$3 = createFileRoute("/medicines")({
  head: () => ({
    meta: [{
      title: "Medicines — MediQ"
    }, {
      name: "description",
      content: "Browse and order medicines for delivery."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./login-C3YGT7yX.mjs");
const Route$2 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Login — MediQ"
    }, {
      name: "description",
      content: "Sign in to your MediQ demo account."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./appointments-DV9mGR9q.mjs");
const Route$1 = createFileRoute("/appointments")({
  head: () => ({
    meta: [{
      title: "Appointments — MediQ"
    }, {
      name: "description",
      content: "Book and manage your hospital appointments."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-B1GYSNUA.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "MediQ — Home"
    }, {
      name: "description",
      content: "Your hospital, simplified. Book, queue, and order from one app."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$6.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$7
});
const QueueRoute = Route$5.update({
  id: "/queue",
  path: "/queue",
  getParentRoute: () => Route$7
});
const ProfileRoute = Route$4.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$7
});
const MedicinesRoute = Route$3.update({
  id: "/medicines",
  path: "/medicines",
  getParentRoute: () => Route$7
});
const LoginRoute = Route$2.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$7
});
const AppointmentsRoute = Route$1.update({
  id: "/appointments",
  path: "/appointments",
  getParentRoute: () => Route$7
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  AppointmentsRoute,
  LoginRoute,
  MedicinesRoute,
  ProfileRoute,
  QueueRoute,
  SignupRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  useAppointments as a,
  useQueue as b,
  useCart as c,
  router as r,
  useAuth as u
};
