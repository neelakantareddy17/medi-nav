import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, UserRound } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

export function SignupPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    auth.signup({ fullName, email, password, confirmPassword });
    navigate({ to: "/", replace: true });
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
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <div className="mt-10">
            <p className="text-sm font-medium text-muted-foreground">Create account</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Start your demo profile</h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Add your details once and continue into the queue dashboard instantly.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-4 rounded-2xl bg-secondary/70 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background">
                <UserRound className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Quick setup</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  This is a frontend-only signup that stores a fake user in local storage.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">Full name</label>
                <Input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Neel"
                  className="h-11 rounded-2xl bg-background"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="demo@gmail.com"
                  className="h-11 rounded-2xl bg-background"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  className="h-11 rounded-2xl bg-background"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">Confirm password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repeat password"
                  className="h-11 rounded-2xl bg-background"
                />
              </div>

              {error && <p className="text-xs font-medium text-destructive">{error}</p>}

              <Button onClick={handleSignup} className="h-11 w-full rounded-2xl text-sm font-medium">
                Create Account
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Premium minimal UI, no backend authentication yet
        </div>
      </motion.div>
    </div>
  );
}