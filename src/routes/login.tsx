import { createFileRoute } from "@tanstack/react-router";

import { LoginPage } from "@/pages/Login/LoginPage";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — MediQ" },
      { name: "description", content: "Sign in to your MediQ demo account." },
    ],
  }),
  component: LoginRoute,
});

function LoginRoute() {
  return <LoginPage />;
}