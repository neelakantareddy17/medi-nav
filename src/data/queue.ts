export type QueueStatus = {
  yourToken: number;
  currentToken: number;
  totalInQueue: number;
  avgMinutesPerPatient: number;
  doctorName: string;
  specialty: string;
  room: string;
};

export const queueStatus: QueueStatus = {
  yourToken: 27,
  currentToken: 22,
  totalInQueue: 41,
  avgMinutesPerPatient: 6,
  doctorName: "Dr. Sarah Khan",
  specialty: "Cardiologist",
  room: "Room 204 · Block B",
};
