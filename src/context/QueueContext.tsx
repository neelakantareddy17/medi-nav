import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type DoctorQueue = {
  doctorId: string;
  currentToken: number;
  lastToken: number;
};

type QueueContextType = {
  queues: Record<string, DoctorQueue>;
  generateToken: (doctorId: string) => number;
  getQueue: (doctorId: string) => DoctorQueue | undefined;
};

const QueueContext = createContext<QueueContextType | null>(null);

const defaultQueues = {
  d1: { doctorId: "d1", currentToken: 20, lastToken: 60 },
  d2: { doctorId: "d2", currentToken: 10, lastToken: 50 },
  d3: { doctorId: "d3", currentToken: 15, lastToken: 55 },
  d4: { doctorId: "d4", currentToken: 5, lastToken: 40 },
  d5: { doctorId: "d5", currentToken: 12, lastToken: 45 },
};

export function QueueProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queues, setQueues] =
    useState<Record<string, DoctorQueue>>(defaultQueues);
useEffect(() => {
  const stored = localStorage.getItem("queues");

  if (stored) {
    setQueues(JSON.parse(stored));
  }
}, []);

  useEffect(() => {
    localStorage.setItem(
      "queues",
      JSON.stringify(queues)
    );
  }, [queues]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueues((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((doctorId) => {
          const queue = updated[doctorId];

          if (queue.currentToken < queue.lastToken) {
            updated[doctorId] = {
              ...queue,
              currentToken: queue.currentToken + 1,
            };
          }
        });

        return updated;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const generateToken = (doctorId: string) => {
  const nextToken = queues[doctorId].lastToken + 1;

  setQueues((prev) => ({
    ...prev,
    [doctorId]: {
      ...prev[doctorId],
      lastToken: nextToken,
    },
  }));

  return nextToken;
};

  const getQueue = (doctorId: string) => queues[doctorId];

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
  const ctx = useContext(QueueContext);

  if (!ctx) {
    throw new Error(
      "useQueue must be used inside QueueProvider"
    );
  }

  return ctx;
}