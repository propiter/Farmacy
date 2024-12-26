import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Product } from "../../types";
import { TEMPERATURE_OPTIONS } from "../../constants/pharmacy";
import { FIELDS_BY_TYPE } from "../../constants/formFields";
import ProductSearch from "./ProductSearch";

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
  editingProduct?: Partial<Product>;
  onCancelEdit?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onAddProduct,
  editingProduct,
  onCancelEdit,
  actType,
}) => {
  const [productDetails, setProductDetails] = useState<Partial<Product>>({});
  const fields = FIELDS_BY_TYPE[actType] || [];

  useEffect(() => {
    if (editingProduct) {
      setProductDetails(editingProduct);
    } else {
      setProductDetails({});
    }
  }, [editingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(productDetails as Product);
    setProductDetails({});
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleProductSelect = (product: Product) => {
    setProductDetails({
      ...product,
      lote_id: "",
      fecha_vencimiento: "",
      cantidad_recibida: 0,
      precio_compra: 0,
    });
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900">
        {editingProduct ? "Editar Producto" : "Agregar Producto"}
      </h3>

      <ProductSearch onProductSelect={handleProductSelect} />

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre del Producto
          </label>
          <input
            type="text"
            name="nombre_producto"
            value={productDetails.nombre_producto || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Concentración
          </label>
          <input
            type="text"
            name="concentracion"
            value={productDetails.concentracion || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Forma Farmacéutica
          </label>
          <input
            type="text"
            name="forma_farmaceutica"
            value={productDetails.forma_farmaceutica || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Presentación
          </label>
          <input
            type="text"
            name="presentacion"
            value={productDetails.presentacion || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Laboratorio
          </label>
          <input
            type="text"
            name="laboratorio"
            value={productDetails.laboratorio || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registro INVIMA
          </label>
          <input
            type="text"
            name="registro_sanitario"
            value={productDetails.registro_sanitario || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Temperatura
          </label>
          <select
            name="temperatura_id"
            value={productDetails.temperatura_id || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          >
            <option value="">No requiere</option>
            {Object.entries(TEMPERATURE_OPTIONS).map(([key, temp]) => (
              <option key={key} value={key}>
                {temp.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Número de Lote
          </label>
          <input
            type="text"
            name="lote_id"
            value={productDetails.lote_id || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Vencimiento
          </label>
          <input
            type="date"
            name="fecha_vencimiento"
            value={productDetails.fecha_vencimiento || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cantidad Recibida
          </label>
          <input
            type="number"
            name="cantidad_recibida"
            value={productDetails.cantidad_recibida || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio de Compra
          </label>
          <input
            type="number"
            name="precio_compra"
            value={productDetails.precio_compra || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700">
            Observaciones
          </label>
          <textarea
            name="observaciones"
            value={productDetails.observaciones || ""}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
          />
        </div>

        <div className="lg:col-span-3 flex justify-end space-x-3">
          {editingProduct && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            {editingProduct ? "Guardar Cambios" : "Agregar Producto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
