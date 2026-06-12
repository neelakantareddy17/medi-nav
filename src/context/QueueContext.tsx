import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  runTransaction,
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

  advanceQueue: (
    doctorId: string
  ) => Promise<void>;

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
  const advanceQueue = async (
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

  if (!snapshot.exists()) return;

  const queue =
    snapshot.data() as DoctorQueue;

  if (
    queue.currentToken >=
    queue.lastToken
  ) {
    return;
  }

  await updateDoc(queueRef, {
    currentToken:
      queue.currentToken + 1,
  });
};

  useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "queues"),
    (snapshot) => {
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
    },
    (error) => {
      console.error(error);
    }
  );

  return () => unsubscribe();
}, []);
 const generateToken = async (
  doctorId: string
) => {
  const queueRef = doc(
    db,
    "queues",
    doctorId
  );

  const token = await runTransaction(
    db,
    async (transaction) => {
      const snapshot =
        await transaction.get(
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

      transaction.update(
        queueRef,
        {
          lastToken:
            nextToken,
        }
      );

      return nextToken;
    }
  );

  return token;
};
   
   

  const getQueue = (
    doctorId: string
  ) => queues[doctorId];

  return (
    <QueueContext.Provider
      value={{
        queues,
        generateToken,
        advanceQueue,
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