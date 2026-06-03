import { createFileRoute } from "@tanstack/react-router";

import { SignupPage } from "@/pages/Signup/SignupPage";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Signup — MediQ" },
      { name: "description", content: "Create a demo MediQ account." },
    ],
  }),
  component: SignupRoute,
});

function SignupRoute() {
  return <SignupPage />;
}