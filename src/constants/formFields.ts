import { ActType } from "./actTypes";

export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

const COMMON_FIELDS: FormField[] = [
  { name: "presentacion", label: "Presentación", type: "text", required: true },
  { name: "laboratorio", label: "Laboratorio", type: "text", required: true },
  { name: "lote_id", label: "Número de Lote", type: "text", required: true },
  {
    name: "fecha_vencimiento",
    label: "Fecha de Vencimiento",
    type: "date",
    required: true,
  },
  {
    name: "registro_sanitario",
    label: "Registro Sanitario INVIMA",
    type: "text",
    required: true,
  },
  {
    name: "cantidad_recibida",
    label: "Cantidad Recibida",
    type: "number",
    required: true,
  },
  {
    name: "temperatura_id",
    label: "Temperatura Requerida",
    type: "select",
    required: true,
  },
  {
    name: "precio_compra",
    label: "Precio de Compra",
    type: "number",
    required: true,
  },
];

export const FIELDS_BY_TYPE: Record<ActType, FormField[]> = {
  Medicamentos: [
    {
      name: "nombre_producto",
      label: "Nombre del Medicamento",
      type: "text",
      required: true,
    },
    {
      name: "concentracion",
      label: "Concentración",
      type: "text",
      required: true,
    },
    {
      name: "forma_farmaceutica",
      label: "Forma Farmacéutica",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
  "Productos de Aseo y Limpieza": [
    {
      name: "nombre_producto",
      label: "Marca o Nombre Comercial",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
  Cosméticos: [
    {
      name: "nombre_producto",
      label: "Marca o Nombre Comercial",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
  "Dispositivos Médicos": [
    {
      name: "nombre_producto",
      label: "Nombre del Dispositivo",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
  "Reactivos de Diagnóstico": [
    {
      name: "nombre_producto",
      label: "Marca o Nombre Comercial",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
};
