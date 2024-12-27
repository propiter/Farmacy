import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { ReceptionAct } from "../../types";
import { listActas } from "../../services/api";
import ActTable from "./ActTable";

interface ActSearchProps {
  onActSelect: (act: ReceptionAct) => void;
}

const ActSearch: React.FC<ActSearchProps> = ({ onActSelect }) => {
  // Calcular la fecha actual menos 90 días
  const getDefaultStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 60); // Restar 90 días
    return date.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  };

  const [searchParams, setSearchParams] = useState({
    fecha_inicio: getDefaultStartDate(), // Fecha predeterminada
    fecha_fin: "",
    Responsable: "",
    numero_factura: "",
    proveedor: "",
    tipo_acta: "",
  });

  const [acts, setActs] = useState<ReceptionAct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await listActas(searchParams);
      setActs(results);
    } catch (error) {
      console.error("Error searching acts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Buscar Acta</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha Inicio
          </label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={searchParams.fecha_inicio}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                fecha_inicio: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha Fin
          </label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={searchParams.fecha_fin}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                fecha_fin: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Número Factura
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={searchParams.numero_factura}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                numero_factura: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Responsable
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={searchParams.Responsable}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                Responsable: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Proveedor
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={searchParams.proveedor}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                proveedor: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Acta
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={searchParams.tipo_acta}
            onChange={(e) =>
              setSearchParams((prev) => ({
                ...prev,
                tipo_acta: e.target.value,
              }))
            }
          >
            <option value="">Todos</option>
            <option value="Medicamentos">Medicamentos</option>
            <option value="Dispositivos Médicos">Dispositivos Médicos</option>
            <option value="Productos de Aseo">Productos de Aseo</option>
            <option value="Cosméticos">Cosméticos</option>
            <option value="Reactivos de Diagnóstico">
              Reactivos de Diagnóstico
            </option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleSearch}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          disabled={isLoading}
        >
          <Search className="w-4 h-4 mr-2" />
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {acts.length > 0 && <ActTable acts={acts} onActSelect={onActSelect} />}
    </div>
  );
};

export default ActSearch;
