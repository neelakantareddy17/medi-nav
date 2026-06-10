import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { appointments as initialAppointments, type Appointment } from "@/data/appointments";

type AppointmentContextType = {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (id: string) => void;
  checkInAppointment: (
    id: string,
    token: number
  ) => void;
  completeAppointment: (id: string) => void;
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

  const cancelAppointment = (id: string) => {
  setAppointments((prev) =>
    prev.map((appt) =>
      appt.id === id
        ? { ...appt, status: "cancelled" }
        : appt
    )
  );
};
const checkInAppointment = (
  id: string,
  token: number
) => {
  setAppointments((prev) =>
    prev.map((appt) =>
      appt.id === id
        ? {
            ...appt,
            status: "checked-in",
            token,
          }
        : appt
    )
  );
};
const completeAppointment = (
  id: string
) => {
  setAppointments((prev) =>
    prev.map((appt) =>
      appt.id === id
        ? {
            ...appt,
            status: "completed",
          }
        : appt
    )
  );
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
        cancelAppointment,
        checkInAppointment,
        completeAppointment,
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
