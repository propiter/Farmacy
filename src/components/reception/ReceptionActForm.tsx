import React, { useState } from "react";
import { Save } from "lucide-react";
import { ReceptionAct } from "../../types";
import { ACT_TYPES } from "../../constants/actTypes";

interface ReceptionActFormProps {
  onSubmit: (data: Partial<ReceptionAct>) => void;
}

const ReceptionActForm: React.FC<ReceptionActFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<ReceptionAct>>({
    fecha_recepcion: new Date().toISOString().split("T")[0],
    ciudad: "",
    Responsable: "",
    numero_factura: "",
    proveedor: "",
    tipo_acta: "",
    observaciones: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            name="fecha_recepcion"
            value={formData.fecha_recepcion}
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
            name="ciudad"
            value={formData.ciudad}
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
            name="Responsable"
            value={formData.Responsable}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Número de Factura
          </label>
          <input
            type="text"
            name="numero_factura"
            value={formData.numero_factura}
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
            name="proveedor"
            value={formData.proveedor}
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
            name="tipo_acta"
            value={formData.tipo_acta}
            onChange={handleChange}
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

        <div className="lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700">
            Observaciones
          </label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            rows={3}
          />
        </div>
      </div>

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
