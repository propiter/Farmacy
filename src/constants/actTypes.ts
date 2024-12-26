export const ACT_TYPES = {
  Medicamentos: "Medicamentos",
  Productos_de_Aseo_y_Limpieza: "Productos de Aseo y Limpieza",
  Cosméticos: "Cosméticos",
  Dispositivos_Médicos: "Dispositivos Médicos",
  Reactivos_de_Diagnóstico: "Reactivos de Diagnóstico",
} as const;

export type ActType = keyof typeof ACT_TYPES;
