import React, { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Product } from "../../types";
import ProductDetails from "./ProductDetails";
import { format } from "date-fns";
import { ActType } from "../../constants/actTypes";

interface ProductListProps {
  products: Product[];
  onEditProduct: (product: Product, index: number) => void;
  onRemoveProduct: (index: number) => void;
  actType: ActType;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onEditProduct,
  onRemoveProduct,
  actType,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<{
    product: Product;
    index: number;
  } | null>(null);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay productos agregados al acta
      </div>
    );
  }

  const getProductNameLabel = () => {
    switch (actType) {
      case "Medicamentos":
        return "Medicamento";
      case "Dispositivos Médicos":
        return "Dispositivo";
      default:
        return "Producto";
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {getProductNameLabel()}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Presentación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lote
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vencimiento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Costo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Temperatura
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product.acta_producto_id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {product.nombre_producto}
                  </div>
                  {actType === "Medicamentos" && (
                    <>
                      <div className="text-sm text-gray-500">
                        {product.forma_farmaceutica} - {product.concentracion}
                      </div>
                    </>
                  )}
                  <div className="text-xs text-gray-500">
                    {product.laboratorio}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.presentacion}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.lote_id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.fecha_vencimiento &&
                    format(new Date(product.fecha_vencimiento), "dd/MM/yyyy")}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.cantidad_recibida}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  ${product.precio_compra?.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.temperatura || "Temperatura Ambiente"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedProduct({ product, index })}
                      className="text-blue-600 hover:text-blue-900"
                      title="Ver detalles"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onEditProduct(product, index)}
                      className="text-green-600 hover:text-green-900"
                      title="Editar"
                    >
                      <Edit className="w-5 h-5" />
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
          product={selectedProduct.product}
          onClose={() => setSelectedProduct(null)}
          actType={actType}
        />
      )}
    </>
  );
};

export default ProductList;
