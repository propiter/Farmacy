export const TEMPERATURE_OPTIONS = {
  1: {
    id: 1,
    label: "Temperatura Ambiente",
    description: "Temperatura Ambiente (15°C - 25°C)",
    range: "15°C - 25°C",
  },
  2: {
    id: 2,
    label: "Refrigeración",
    description: "Refrigeración (2°C - 8°C)",
    range: "2°C - 8°C",
  },
  3: {
    id: 3,
    label: "Congelación",
    description: "Congelación (-20°C - -10°C)",
    range: "-20°C - -10°C",
  },
};

export type TemperatureId = keyof typeof TEMPERATURE_OPTIONS;
