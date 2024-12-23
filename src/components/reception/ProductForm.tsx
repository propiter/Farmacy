import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Product } from "../../types";
import ProductSearch from "./ProductSearch";
import { FIELDS_BY_TYPE } from "../../constants/formFields";
import { ActType } from "../../constants/actTypes";
import { TEMPERATURE_OPTIONS } from "../../constants/pharmacy";

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
  actType: ActType;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct, actType }) => {
  const [productDetails, setProductDetails] = useState<Partial<Product>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(productDetails as Product);
    setProductDetails({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const fields = actType ? FIELDS_BY_TYPE[actType] : [];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900">Agregar Producto</h3>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {field.name === "temperature" ? (
              <select
                name={field.name}
                value={productDetails[field.name] || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                required={field.required}
              >
                <option value="">Seleccione temperatura</option>
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
              />
            )}
          </div>
        ))}

        <div className="lg:col-span-3 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
