export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const STORAGE_KEY = "mediq-auth-user";

export const demoUser: AuthUser = {
  id: 1,
  name: "Neel",
  email: "demo@gmail.com",
};

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawUser = window.localStorage.getItem(STORAGE_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawUser) as AuthUser;

    if (!parsed || typeof parsed.id !== "number" || typeof parsed.name !== "string" || typeof parsed.email !== "string") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function persistUser(user: AuthUser) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function createDemoUser(email?: string): AuthUser {
  return {
    ...demoUser,
    email: email?.trim() || demoUser.email,
  };
}

export function createSignupUser(fullName: string, email: string): AuthUser {
  return {
    id: 1,
    name: fullName.trim() || demoUser.name,
    email: email.trim() || demoUser.email,
  };
}