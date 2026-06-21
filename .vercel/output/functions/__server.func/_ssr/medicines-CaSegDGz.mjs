const medicines = [
  { id: "m1", name: "Panadol Extra", brand: "GSK", price: 3.5, category: "Pain Relief", inStock: true, image: "💊" },
  { id: "m2", name: "Amoxicillin 500mg", brand: "Cipla", price: 8, category: "Antibiotic", inStock: true, image: "💊" },
  { id: "m3", name: "Vitamin D3", brand: "Centrum", price: 12.5, category: "Vitamins", inStock: true, image: "🧴" },
  { id: "m4", name: "Cough Syrup", brand: "Benylin", price: 6.25, category: "Cold & Flu", inStock: true, image: "🧪" },
  { id: "m5", name: "Insulin Pen", brand: "NovoRapid", price: 35, category: "Diabetes", inStock: false, image: "💉" },
  { id: "m6", name: "Aspirin 75mg", brand: "Bayer", price: 4, category: "Heart", inStock: true, image: "💊" }
];
const prescriptions = [
  { id: "p1", date: "May 28, 2026", doctor: "Dr. Imran Ali", items: ["Cetirizine 10mg", "Mometasone cream"] },
  { id: "p2", date: "May 14, 2026", doctor: "Dr. Hina Tariq", items: ["Amoxicillin 500mg", "Ibuprofen 400mg"] }
];
export {
  medicines as m,
  prescriptions as p
};
