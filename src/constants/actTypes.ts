export const ACT_TYPES = {
  Medicamentos: "Medicamentos",
  "Productos de Aseo y Limpieza": "Productos de Aseo y Limpieza",
  Cosméticos: "Cosméticos",
  "Dispositivos Médicos": "Dispositivos Médicos",
  "Reactivos de Diagnóstico": "Reactivos de Diagnóstico",
} as const;

export type ActType = keyof typeof ACT_TYPES;
