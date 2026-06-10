import * as React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import type { LoginInput, SignupInput } from "@/services/authService";

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  hydrated: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);

function mapUser(user: User): AuthUser {
  return {
    id: user.uid,
    name: user.displayName || "User",
    email: user.email || "",
  };
}

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ? mapUser(firebaseUser) : null);
      setHydrated(true);
    });

    return unsubscribe;
  }, []);

  const value = React.useMemo<AuthContextValue>(
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
        password,
      }) => {
        const cred =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        await updateProfile(
          cred.user,
          {
            displayName: fullName,
          }
        );
      },

      logout: async () => {
        await signOut(auth);
      },
    }),
    [user, hydrated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}