// API Configuration
const API_BASE_URL = "http://localhost:3000/api";

export const API_ENDPOINTS = {
  // Productos
  SEARCH_PRODUCTS: `${API_BASE_URL}/actas/products/search`,

  // Actas
  CREATE_ACTA: `${API_BASE_URL}/actas`,
  LIST_ACTAS: `${API_BASE_URL}/actas`,
  ADD_PRODUCTS_TO_ACTA: (actaId: string) =>
    `${API_BASE_URL}/actas/${actaId}/products`,
  GET_ACTA_PRODUCTS: (actaId: string) =>
    `${API_BASE_URL}/actas/${actaId}/products`,
  EDIT_ACTA_PRODUCT: (actaId: string, productoId: string) =>
    `${API_BASE_URL}/actas/${actaId}/products/${productoId}`,
  DELETE_ACTA_PRODUCT: (actaId: string, actaProductoId: string) =>
    `${API_BASE_URL}/actas/${actaId}/products/${actaProductoId}`,
  LOAD_ACTA_TO_INVENTORY: (actaId: string) =>
    `${API_BASE_URL}/actas/${actaId}/inventory`,
};

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleApiError = (error: any): never => {
  if (error instanceof ApiError) {
    throw error;
  }

  const message =
    error?.response?.data?.message || error.message || "Error en la solicitud";
  const statusCode = error?.response?.status || 500;

  throw new ApiError(message, statusCode, error?.response?.data);
};
