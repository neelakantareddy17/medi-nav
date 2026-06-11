import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Appointment } from "@/data/appointments";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
type AppointmentContextType = {
  appointments: Appointment[];
  
addAppointment: (
  appointment: Appointment
) => Promise<void>;
  cancelAppointment: (
  id: string
) => Promise<void>;
  checkInAppointment: (
  id: string,
  token: number
) => Promise<void>;
  completeAppointment: (
  id: string
) => Promise<void>;
};

const AppointmentContext = createContext<AppointmentContextType | null>(null);

export function AppointmentProvider({
  
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

const addAppointment = async (
  appointment: Appointment
) => {
  setAppointments((prev) => [
    ...prev,
    appointment,
  ]);

  if (!user) return;

  try {
    console.log("USER", user);
console.log("WRITING APPOINTMENT", appointment);
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
    console.log("WRITE SUCCESS");
  } catch (error) {
  console.error("FIRESTORE ERROR", error);
}
};

 const cancelAppointment = async (
  id: string
) => {
  setAppointments((prev) =>
    prev.map((appt) =>
      appt.id === id
        ? {
            ...appt,
            status: "cancelled",
          }
        : appt
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
        status: "cancelled",
      }
    );

    console.log("CANCEL SUCCESS");
  } catch (error) {
    console.error(error);
  }
};
const checkInAppointment = async (
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
        token,
      }
    );

    console.log("CHECKIN SUCCESS");
  } catch (error) {
    console.error(error);
  }
};
const completeAppointment = async (
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
        status: "completed",
      }
    );

    console.log("COMPLETE SUCCESS");
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  const loadAppointments = async () => {
    if (!user) return;

    try {
      const snapshot = await getDocs(
        collection(
          db,
          "users",
          user.id,
          "appointments"
        )
      );

      const firestoreAppointments =
        snapshot.docs.map(
          (doc) => doc.data() as Appointment
        );

     setAppointments(firestoreAppointments);
    } catch (error) {
      console.error(error);
    }
  };

  loadAppointments();
}, [user]);



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

