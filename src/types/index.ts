export interface User {
  id: string;
  name: string;
  role: "admin" | "cashier";
  email: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  concentration: string;
  pharmaceuticalForm: string;
  presentation: string;
  laboratory: string;
  sanitaryRegistration: string;
  requiresColdChain: boolean;
  temperature?: {
    min: number;
    max: number;
    type: "refrigeracion" | "congelacion" | "ultracongelacion";
  };
}

export interface Batch {
  id: string;
  productId: string;
  batchNumber: string;
  expirationDate: string;
  quantity: number;
  accepted: boolean;
}

export interface ReceptionAct {
  id: string;
  receptionDate: string;
  city: string;
  responsible: string;
  purchaseInvoice: string;
  remission: string;
  provider: string;
  products: Array<{
    product: Product;
    batch: Batch;
  }>;
}
