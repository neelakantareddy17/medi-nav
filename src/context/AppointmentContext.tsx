import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Appointment } from "@/data/appointments";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useQueue } from "@/context/QueueContext";


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
  const { queues } = useQueue();
  
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
await setDoc(
  doc(
    db,
    "appointments",
    appointment.id
  ),
  {
    ...appointment,
    userId: user.id,
  }
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
    await updateDoc(
  doc(
    db,
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
    await updateDoc(
  doc(
    db,
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
    await updateDoc(
  doc(
    db,
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
  if (!user) {
    setAppointments([]);
    return;
  }

  const unsubscribe = onSnapshot(
    collection(
      db,
      "users",
      user.id,
      "appointments"
    ),
    (snapshot) => {
      const firestoreAppointments =
        snapshot.docs.map(
          (doc) =>
            doc.data() as Appointment
        );

      setAppointments(
        firestoreAppointments
      );
    },
    (error) => {
      console.error(error);
    }
  );

  return () => unsubscribe();
}, [user]);
useEffect(() => {
  appointments.forEach((appt) => {
    if (
      appt.status === "checked-in" &&
      appt.token
    ) {
      const queue =
        queues[appt.doctorId];

      if (
        queue &&
        queue.currentToken >=
          appt.token
      ) {
        completeAppointment(
          appt.id
        );
      }
    }
  });
}, [appointments, queues]);



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

