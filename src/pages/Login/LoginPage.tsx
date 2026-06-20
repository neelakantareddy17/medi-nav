import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = React.useState("@gmail.com");
  const [password, setPassword] = React.useState("");

 const handleLogin = async () => {
  try {
    await auth.login({
      email,
      password,
    });

    navigate({
      to: "/",
      replace: true,
    });
  } catch (error) {
    alert("Invalid email or password");
    console.error(error);
  }
};

  const handleGuest = async () => {
    try {
      await auth.login({
        email: "guest@example.com",
        password: "guest",
      });
      navigate({ to: "/", replace: true });
    } catch (error) {
      alert("Failed to login as guest");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen px-5 pb-10 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-md flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-foreground text-background shadow-[var(--shadow-card)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">MediQ</p>
              <p className="text-xs text-muted-foreground">Hospital queue management</p>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-sm font-medium text-muted-foreground">Welcome back</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Sign in to continue</h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              View your queue, appointments, and medicines in one clean place.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-4 rounded-2xl bg-secondary/70 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Fast check-in</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Skip the long queues and check in to your appointments with ease.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="enter your email(@gmail.com)"
                  className="h-11 rounded-2xl bg-background"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="h-11 rounded-2xl bg-background"
                />
              </div>

              <Button onClick={handleLogin} className="h-11 w-full rounded-2xl text-sm font-medium">
                Login
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleGuest}
                className="h-11 w-full rounded-2xl text-sm font-medium"
              >
                Continue as Guest
              </Button>
            </div>

            <div className="mt-5 flex items-center justify-between text-sm">
              <Link to="/signup" className="inline-flex items-center gap-1 font-medium">
                Create account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-xs text-muted-foreground">No account? <Link to="/signup" className="font-medium underline-offset-4 hover:underline">
                Sign up
              </Link></p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Simple, private, frontend-only auth for now
        </div>
      </motion.div>
    </div>
  );
}