import * as React from "react";

import {
  clearStoredUser,
  createDemoUser,
  createSignupUser,
  getStoredUser,
  persistUser,
  type AuthUser,
  type LoginInput,
  type SignupInput,
} from "@/services/authService";

type AuthContextValue = {
  user: AuthUser | null;
  hydrated: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => AuthUser;
  signup: (input: SignupInput) => AuthUser;
  loginAsGuest: () => AuthUser;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(() => getStoredUser());
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    const handleStorage = () => {
      setUser(getStoredUser());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = React.useMemo<AuthContextValue>(() => {
    return {
      user,
      hydrated,
      isAuthenticated: Boolean(user),
      login: ({ email }) => {
        const nextUser = createDemoUser(email);
        setUser(nextUser);
        persistUser(nextUser);
        return nextUser;
      },
      signup: ({ fullName, email }) => {
        const nextUser = createSignupUser(fullName, email);
        setUser(nextUser);
        persistUser(nextUser);
        return nextUser;
      },
      loginAsGuest: () => {
        const nextUser = createDemoUser();
        setUser(nextUser);
        persistUser(nextUser);
        return nextUser;
      },
      logout: () => {
        setUser(null);
        clearStoredUser();
      },
    };
  }, [hydrated, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}