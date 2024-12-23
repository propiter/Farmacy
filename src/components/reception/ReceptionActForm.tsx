import React from "react";
import { Save } from "lucide-react";
import { ReceptionAct } from "../../types";
import { ACT_TYPES, ActType } from "../../constants/actTypes";
import { FIELDS_BY_TYPE, FormField } from "../../constants/formFields";

interface ReceptionActFormProps {
  onSubmit: (data: Partial<ReceptionAct>) => void;
}

const ReceptionActForm: React.FC<ReceptionActFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState<Partial<ReceptionAct>>({
    receptionDate: new Date().toISOString().split("T")[0],
    city: "",
    responsible: "",
    purchaseInvoice: "",
    actType: "",
    provider: "",
    products: [],
  });

  const [actType, setActType] = React.useState<ActType | "">("");
  const [dynamicFields, setDynamicFields] = React.useState<Record<string, any>>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      actType,
      dynamicFields,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleActTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as ActType;
    setActType(newType || "");
    setDynamicFields({});
  };

  const handleDynamicFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDynamicFields((prev) => ({ ...prev, [name]: value }));
  };

  const renderDynamicFields = () => {
    if (!actType || !(actType in FIELDS_BY_TYPE)) return null;

    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recepcion Tecnica de {ACT_TYPES[actType]}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FIELDS_BY_TYPE[actType].map((field: FormField) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={dynamicFields[field.name] || ""}
                onChange={handleDynamicFieldChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                required={field.required}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Recepción
          </label>
          <input
            type="date"
            name="receptionDate"
            value={formData.receptionDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ciudad
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Responsable
          </label>
          <input
            type="text"
            name="responsible"
            value={formData.responsible}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Factura de Compra
          </label>
          <input
            type="text"
            name="purchaseInvoice"
            value={formData.purchaseInvoice}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Proveedor
          </label>
          <input
            type="text"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Acta
          </label>
          <select
            name="actType"
            value={actType}
            onChange={handleActTypeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          >
            <option value="">Seleccione un tipo</option>
            {Object.entries(ACT_TYPES).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      {renderDynamicFields()}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Save className="w-4 h-4 mr-2" />
          Guardar Acta
        </button>
      </div>
    </form>
  );
};

export default ReceptionActForm;
