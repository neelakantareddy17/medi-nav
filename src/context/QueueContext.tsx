import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type DoctorQueue = {
  doctorId: string;
  currentToken: number;
  lastToken: number;
};

type QueueContextType = {
  queues: Record<string, DoctorQueue>;
  generateToken: (
    doctorId: string
  ) => Promise<number>;
  getQueue: (
    doctorId: string
  ) => DoctorQueue | undefined;
};

const QueueContext =
  createContext<QueueContextType | null>(
    null
  );

export function QueueProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queues, setQueues] = useState<
    Record<string, DoctorQueue>
  >({});

  useEffect(() => {
    const loadQueues = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "queues")
        );

        const loaded: Record<
          string,
          DoctorQueue
        > = {};

        snapshot.forEach((docSnap) => {
          const data =
            docSnap.data() as DoctorQueue;

          loaded[data.doctorId] = data;
        });

        setQueues(loaded);
      } catch (error) {
        console.error(error);
      }
    };

    loadQueues();
  }, []);

  const generateToken = async (
    doctorId: string
  ) => {
    const queueRef = doc(
      db,
      "queues",
      doctorId
    );

    const snapshot = await getDoc(
      queueRef
    );

    if (!snapshot.exists()) {
      throw new Error(
        "Queue not found"
      );
    }

    const queue =
      snapshot.data() as DoctorQueue;

    const nextToken =
      queue.lastToken + 1;

    await updateDoc(queueRef, {
      lastToken: nextToken,
    });

    setQueues((prev) => ({
      ...prev,
      [doctorId]: {
        ...prev[doctorId],
        lastToken: nextToken,
      },
    }));

    return nextToken;
  };

  const getQueue = (
    doctorId: string
  ) => queues[doctorId];

  return (
    <QueueContext.Provider
      value={{
        queues,
        generateToken,
        getQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const ctx = useContext(
    QueueContext
  );

  if (!ctx) {
    throw new Error(
      "useQueue must be used inside QueueProvider"
    );
  }

  return ctx;
}