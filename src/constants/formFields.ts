import { ActType } from "./actTypes";

export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

const COMMON_FIELDS: FormField[] = [
  { name: "presentation", label: "Presentación", type: "text", required: true },
  { name: "laboratory", label: "Laboratorio", type: "text", required: true },
  { name: "batch", label: "Nº de lote", type: "text", required: true },
  {
    name: "expirationDate",
    label: "Fecha de vencimiento",
    type: "date",
    required: true,
  },
  {
    name: "sanitaryRegistration",
    label: "Registro sanitario Invima",
    type: "text",
    required: true,
  },
  {
    name: "quantity",
    label: "Cantidad recibida",
    type: "number",
    required: true,
  },
  {
    name: "temperature",
    label: "Temperatura requerida",
    type: "text",
    required: true,
  },
];

export const FIELDS_BY_TYPE: Record<ActType, FormField[]> = {
  MEDICATIONS: [
    {
      name: "medicationName",
      label: "Nombre del medicamento",
      type: "text",
      required: true,
    },
    {
      name: "concentration",
      label: "Concentración",
      type: "text",
      required: true,
    },
    {
      name: "pharmaceuticalForm",
      label: "Forma farmacéutica",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
  CLEANING: [
    {
      name: "commercialName",
      label: "Marca comercial o nombre comercial",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
  COSMETICS: [
    {
      name: "commercialName",
      label: "Marca comercial o nombre comercial",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
  MEDICAL_DEVICES: [
    {
      name: "deviceName",
      label: "Nombre del dispositivo",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
  DIAGNOSTIC: [
    {
      name: "commercialName",
      label: "Marca comercial o nombre comercial",
      type: "text",
      required: true,
    },
    ...COMMON_FIELDS,
  ],
};
