import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Product } from "../../types";
import { TEMPERATURE_OPTIONS } from "../../constants/pharmacy";
import { FIELDS_BY_TYPE } from "../../constants/formFields";
import { ActType } from "../../constants/actTypes";
import ProductSearch from "./ProductSearch";

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
  editingProduct?: Partial<Product>;
  onCancelEdit?: () => void;
  actType: ActType;
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
      setProductDetails({
        categoria: actType,
        temperatura_id: "AMBIENTE",
      });
    }
  }, [editingProduct, actType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productToSubmit = {
      ...productDetails,
      categoria: actType,
    };
    onAddProduct(productToSubmit as Product);
    setProductDetails({
      categoria: actType,
      temperatura_id: "AMBIENTE",
    });
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
      categoria: actType,
      temperatura_id: product.temperatura_id || "AMBIENTE",
      lote_id: "",
      fecha_vencimiento: "",
      cantidad_recibida: 0,
      precio_compra: 0,
    });
  };

  const handleBarcodeNotFound = (barcode: string) => {
    setProductDetails((prev) => ({
      ...prev,
      codigo_barras: barcode,
    }));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900">
        {editingProduct ? "Editar Producto" : "Agregar Producto"}
      </h3>

      <ProductSearch
        onProductSelect={handleProductSelect}
        onBarcodeNotFound={handleBarcodeNotFound}
      />

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={productDetails[field.name] || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                required={field.required}
              >
                <option value="">Seleccione una opción</option>
                {Object.entries(TEMPERATURE_OPTIONS).map(([key, temp]) => (
                  <option key={key} value={key}>
                    {temp.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={productDetails[field.name] || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                required={field.required}
                min={field.type === "number" ? "0" : undefined}
                step={
                  field.type === "number" && field.name === "precio_compra"
                    ? "0.01"
                    : undefined
                }
              />
            )}
          </div>
        ))}

        {/* Campo oculto para código de barras */}
        <input
          type="hidden"
          name="codigo_barras"
          value={productDetails.codigo_barras || ""}
        />

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
