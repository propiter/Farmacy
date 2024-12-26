import React from "react";
import { X } from "lucide-react";
import { format } from "date-fns";
import { Product } from "../../types";
import { TEMPERATURE_OPTIONS } from "../../constants/pharmacy";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onClose,
}) => {
  const getTemperatureLabel = (tempId: string) => {
    return TEMPERATURE_OPTIONS[tempId]?.label || "Temperatura Ambiente";
  };

  const renderField = (label: string, value: any) => {
    if (!value) return null;

    return (
      <div className="mb-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {label.toLowerCase().includes("fecha")
            ? format(new Date(value), "dd/MM/yyyy")
            : value}
        </dd>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Detalles del Producto
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">
                Información General
              </h3>
              <dl>
                {renderField("Nombre del Producto", product.nombre_producto)}
                {renderField("Concentración", product.concentracion)}
                {renderField("Forma Farmacéutica", product.forma_farmaceutica)}
                {renderField("Presentación", product.presentacion)}
                {renderField("Laboratorio", product.laboratorio)}
              </dl>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4">
                Información Técnica
              </h3>
              <dl>
                {renderField("Registro INVIMA", product.registro_sanitario)}
                {renderField("Número de Lote", product.lote_id)}
                {renderField("Fecha de Vencimiento", product.fecha_vencimiento)}
                {renderField("Cantidad Recibida", product.cantidad_recibida)}
                {renderField(
                  "Temperatura",
                  getTemperatureLabel(product.temperatura_id as string)
                )}
              </dl>
            </div>
          </div>

          {product.observaciones && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-2">Observaciones</h3>
              <p className="text-sm text-gray-600">{product.observaciones}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
