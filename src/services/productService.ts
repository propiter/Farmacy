import { Product } from "../types";

// Simulación de base de datos
const mockProducts: Product[] = [
  {
    id: "1",
    code: "7702057073514",
    name: "Acetaminofén",
    concentration: "500mg",
    pharmaceuticalForm: "Tableta",
    presentation: "Caja x 100",
    laboratory: "MK",
    sanitaryRegistration: "INVIMA 2015M-0015965",
    batch: "",
    expirationDate: "",
    quantity: 0,
    requiresColdChain: false,
  },
  {
    id: "2",
    code: "7702057083513",
    name: "Amoxicilina",
    concentration: "500mg",
    pharmaceuticalForm: "Cápsula",
    presentation: "Caja x 50",
    laboratory: "Genfar",
    sanitaryRegistration: "INVIMA 2016M-0016234",
    batch: "",
    expirationDate: "",
    quantity: 0,
    requiresColdChain: false,
  },
];

export const searchProducts = async (term: string): Promise<Product[]> => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 300));

  const normalizedTerm = term.toLowerCase();
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(normalizedTerm) ||
      product.code.includes(normalizedTerm) ||
      product.laboratory.toLowerCase().includes(normalizedTerm)
  );
};
