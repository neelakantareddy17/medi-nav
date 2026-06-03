export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  fee: number;
  avatar: string;
};

export const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Sarah Khan", specialty: "Cardiologist", rating: 4.9, experience: 12, fee: 60, avatar: "https://i.pravatar.cc/120?img=47" },
  { id: "d2", name: "Dr. Imran Ali", specialty: "Dermatologist", rating: 4.7, experience: 8, fee: 45, avatar: "https://i.pravatar.cc/120?img=12" },
  { id: "d3", name: "Dr. Ayesha Noor", specialty: "Pediatrician", rating: 4.8, experience: 10, fee: 40, avatar: "https://i.pravatar.cc/120?img=32" },
  { id: "d4", name: "Dr. Bilal Raza", specialty: "Neurologist", rating: 4.6, experience: 15, fee: 80, avatar: "https://i.pravatar.cc/120?img=68" },
  { id: "d5", name: "Dr. Hina Tariq", specialty: "Dentist", rating: 4.9, experience: 9, fee: 35, avatar: "https://i.pravatar.cc/120?img=45" },
];
