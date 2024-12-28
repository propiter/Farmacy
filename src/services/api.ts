import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { Product, ReceptionAct, ActProduct } from "../types";

// Búsqueda de productos
export const searchProducts = async (term: string) => {
  try {
    const response = await axios.get(API_ENDPOINTS.SEARCH_PRODUCTS, {
      params: { busqueda: term },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

// Crear acta de recepción
export const createActa = async (actaData: Partial<ReceptionAct>) => {
  try {
    const formattedActaData = {
      ...actaData,
      tipo_acta: actaData.tipo_acta,
    };

    const response = await axios.post(
      API_ENDPOINTS.CREATE_ACTA,
      formattedActaData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating acta:", error);
    throw error;
  }
};

// Agregar productos al acta
export const addProductsToActa = async (
  actaId: number,
  productos: Array<{
    producto: Product;
    lote: string;
    cantidad: number;
    precio_compra: number;
    temperatura_id: number;
  }>
) => {
  try {
    const formattedProducts = productos.map((item) => ({
      ...item,
      producto: {
        ...item.producto,
        temperatura_id: item.producto.temperatura_id,
        categoria: item.producto.categoria,
      },
    }));

    const response = await axios.post(
      API_ENDPOINTS.ADD_PRODUCTS_TO_ACTA(actaId.toString()),
      { productos: formattedProducts }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding products to acta:", error);
    throw error;
  }
};

// Obtener productos de un acta
export const getActaProducts = async (actaId: string) => {
  try {
    const response = await axios.get(API_ENDPOINTS.GET_ACTA_PRODUCTS(actaId));
    return response.data;
  } catch (error) {
    console.error("Error getting acta products:", error);
    throw error;
  }
};

// Editar producto en acta
export const editActaProduct = async (
  actaId: string,
  productoId: string,
  productData: Partial<ActProduct>
) => {
  try {
    const response = await axios.patch(
      API_ENDPOINTS.EDIT_ACTA_PRODUCT(actaId, productoId),
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error editing acta product:", error);
    throw error;
  }
};

// Eliminar producto de acta
export const deleteActaProduct = async (
  actaId: string,
  actaProductoId: string
) => {
  try {
    const response = await axios.delete(
      API_ENDPOINTS.DELETE_ACTA_PRODUCT(actaId, actaProductoId)
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting acta product:", error);
    throw error;
  }
};

// Cargar acta al inventario
export const loadActaToInventory = async (actaId: string) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.LOAD_ACTA_TO_INVENTORY(actaId)
    );
    return response.data;
  } catch (error) {
    console.error("Error loading acta to inventory:", error);
    throw error;
  }
};

// Listar actas
export const listActas = async (params: {
  fecha_inicio?: string;
  fecha_fin?: string;
  Responsable?: string;
  numero_factura?: string;
  proveedor?: string;
  tipo_acta?: string;
}) => {
  try {
    const response = await axios.get(API_ENDPOINTS.LIST_ACTAS, {
      params: {
        ...params,
        fecha_inicio: params.fecha_inicio || null,
        fecha_fin: params.fecha_fin || null,
        Responsable: params.Responsable || null,
        numero_factura: params.numero_factura || null,
        proveedor: params.proveedor || null,
        tipo_acta: params.tipo_acta || null,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error listing acts:", error);
    throw error;
  }
};

//actualizar observaciones de acta
export const updateActaObservations = async (
  actaId: string,
  observaciones: string
) => {
  try {
    const response = await axios.patch(
      `${API_ENDPOINTS.UPDATE_ACTA_OBSERVATIONS(actaId)}`,
      { observaciones }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating acta observations:", error);
    throw error;
  }
};
