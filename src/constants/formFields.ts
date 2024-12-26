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
  { name: "lote", label: "Nº de lote", type: "text", required: true },
  {
    name: "fecha_vencimiento",
    label: "Fecha de vencimiento",
    type: "date",
    required: true,
  },
  {
    name: "registro_sanitario",
    label: "Registro sanitario Invima",
    type: "text",
    required: true,
  },
  {
    name: "cantidad_recibida",
    label: "Cantidad recibida",
    type: "number",
    required: true,
  },
  {
    name: "temperatura",
    label: "Temperatura requerida",
    type: "select",
    required: true,
  },
];

export const FIELDS_BY_TYPE: Record<ActType, FormField[]> = {
  Medicamentos: [
    {
      name: "nombre_producto",
      label: "Nombre del medicamento",
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
      name: "forma_farmacéutica",
      label: "Forma farmacéutica",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
  Productos_de_Aseo_y_Limpieza: [
    {
      name: "nombre_producto",
      label: "Marca comercial o nombre comercial",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
  Cosméticos: [
    {
      name: "nombre_producto",
      label: "Marca comercial o nombre comercial",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
  Dispositivos_Médicos: [
    {
      name: "nombre_producto",
      label: "Nombre del dispositivo",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
  Reactivos_de_Diagnóstico: [
    {
      name: "nombre_producto",
      label: "Marca comercial o nombre comercial",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
};
