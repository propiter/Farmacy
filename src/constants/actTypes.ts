export const ACT_TYPES = {
  MEDICATIONS: "Medicamentos",
  CLEANING: "Productos de Aseo y Limpieza",
  COSMETICS: "Cosméticos",
  MEDICAL_DEVICES: "Dispositivos Médicos",
  DIAGNOSTIC: "Reactivos de Diagnóstico",
} as const;

export type ActType = keyof typeof ACT_TYPES;