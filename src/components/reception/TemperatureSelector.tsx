import React from "react";
import { Product } from "../../types";
import { Thermometer } from "lucide-react";

interface TemperatureSelectorProps {
  product: Product;
}

const temperatureRanges = {
  refrigeracion: { min: 2, max: 8, label: "Refrigeración (2°C a 8°C)" },
  congelacion: { min: -20, max: -10, label: "Congelación (-20°C a -10°C)" },
  ultracongelacion: {
    min: -80,
    max: -60,
    label: "Ultra-congelación (-80°C a -60°C)",
  },
};

const TemperatureSelector: React.FC<TemperatureSelectorProps> = ({
  product,
}) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Thermometer className="w-5 h-5 text-blue-500" />
        <h4 className="font-medium text-blue-900">Control de Temperatura</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(temperatureRanges).map(([key, range]) => (
          <div
            key={key}
            className={`p-3 rounded-lg border ${
              product.temperature?.type === key
                ? "border-blue-500 bg-blue-100"
                : "border-gray-200"
            }`}
          >
            <div className="font-medium text-gray-900">{range.label}</div>
            <div className="text-sm text-gray-500">
              Rango: {range.min}°C a {range.max}°C
            </div>
          </div>
        ))}
      </div>

      {product.temperature && (
        <div className="mt-3 text-sm text-blue-600">
          Este producto requiere mantener una temperatura entre{" "}
          {product.temperature.min}°C y {product.temperature.max}°C
        </div>
      )}
    </div>
  );
};

export default TemperatureSelector;
