export type Appointment = {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  avatar: string;
};

export const appointments: Appointment[] = [
  { id: "a1", doctorId: "d1", doctorName: "Dr. Sarah Khan", specialty: "Cardiologist", date: "Today", time: "4:30 PM", status: "upcoming", avatar: "https://i.pravatar.cc/120?img=47" },
  { id: "a2", doctorId: "d3", doctorName: "Dr. Ayesha Noor", specialty: "Pediatrician", date: "Jun 8, 2026", time: "11:00 AM", status: "upcoming", avatar: "https://i.pravatar.cc/120?img=32" },
  { id: "a3", doctorId: "d2", doctorName: "Dr. Imran Ali", specialty: "Dermatologist", date: "May 28, 2026", time: "2:15 PM", status: "completed", avatar: "https://i.pravatar.cc/120?img=12" },
  { id: "a4", doctorId: "d5", doctorName: "Dr. Hina Tariq", specialty: "Dentist", date: "May 14, 2026", time: "10:00 AM", status: "completed", avatar: "https://i.pravatar.cc/120?img=45" },
];

export const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];
