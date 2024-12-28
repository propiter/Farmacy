// Tipos base
export interface Temperature {
  temperatura_id: number;
  descripcion: string;
  rango_temperatura: string;
}

export interface Product {
  acta_producto_id?: number;
  producto_id?: number;
  nombre_producto: string;
  concentracion?: string;
  forma_farmaceutica?: string;
  presentacion: string;
  laboratorio: string;
  registro_sanitario: string;
  temperatura?: string;
  temperatura_id?: number;
  codigo_barras?: string;
  categoria?: string;
  lote_id: string;
  fecha_vencimiento: string;
  cantidad_recibida: number;
  precio_compra: number;
  observaciones?: string;
  stock?: number;
  estado?: boolean;
}

export interface Batch {
  lote_id: string;
  producto_id: number;
  fecha_vencimiento: string;
  cantidad_disponible: number;
  precio_compra: number;
  observaciones?: string;
  estado: boolean;
}

export interface ReceptionAct {
  acta_id: number;
  fecha_recepcion: string;
  ciudad: string;
  Responsable: string;
  numero_factura: string;
  proveedor: string;
  tipo_acta: string;
  observaciones?: string;
  Cargada_Inventario: boolean;
  estado: boolean;
  fecha_creacion: string;
}

export interface ActProduct {
  acta_producto_id: number;
  acta_id: number;
  producto_id: number;
  lote_id: string;
  cantidad_recibida: number;
  precio_compra: number;
}
