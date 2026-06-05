import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { appointments as initialAppointments, type Appointment } from "@/data/appointments";

type AppointmentContextType = {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
};

const AppointmentContext = createContext<AppointmentContextType | null>(null);

export function AppointmentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("appointments");

    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export const useAppointments = () => {
  const ctx = useContext(AppointmentContext);

  if (!ctx) {
    throw new Error(
      "useAppointments must be used inside AppointmentProvider"
    );
  }

  return ctx;
};