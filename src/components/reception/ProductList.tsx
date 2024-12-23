import React, { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Product } from "../../types";
import ProductDetails from "./ProductDetails";
import { FIELDS_BY_TYPE } from "../../constants/formFields";
import { ActType } from "../../constants/actTypes";

interface ProductListProps {
  products: Partial<Product>[];
  onRemoveProduct: (index: number) => void;
  actType?: ActType;
  onUpdateObservations?: (index: number, observations: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onRemoveProduct,
  actType,
  onUpdateObservations,
}) => {
  const [selectedProduct, setSelectedProduct] =
    useState<Partial<Product> | null>(null);
  const [editingObservations, setEditingObservations] = useState<number | null>(
    null
  );

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay productos agregados al acta
      </div>
    );
  }

  const fields = actType ? FIELDS_BY_TYPE[actType] : [];

  const handleObservationsChange = (index: number, value: string) => {
    if (onUpdateObservations) {
      onUpdateObservations(index, value);
    }
    setEditingObservations(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {fields.map((field) => (
                <th
                  key={field.name}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {field.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Observaciones
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {fields.map((field) => (
                  <td key={field.name} className="px-6 py-4 whitespace-nowrap">
                    {field.type === "date"
                      ? new Date(
                          product[field.name] as string
                        ).toLocaleDateString()
                      : product[field.name]}
                  </td>
                ))}
                <td className="px-6 py-4">
                  {editingObservations === index ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        defaultValue={product.observations || ""}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                        onBlur={(e) =>
                          handleObservationsChange(index, e.target.value)
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleObservationsChange(
                              index,
                              e.currentTarget.value
                            );
                          }
                        }}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                      onClick={() => setEditingObservations(index)}
                    >
                      {product.observations ||
                        "Click para agregar observaciones"}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Ver detalles"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onRemoveProduct(index)}
                      className="text-red-600 hover:text-red-900"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default ProductList;
