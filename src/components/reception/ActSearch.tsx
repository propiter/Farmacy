import React, { useState } from "react";
import { Search } from "lucide-react";
import { ReceptionAct } from "../../types";
import { listActas } from "../../services/api";
import { format } from "date-fns";

interface ActSearchProps {
  onActSelect: (act: ReceptionAct) => void;
}

const ActSearch: React.FC<ActSearchProps> = ({ onActSelect }) => {
  const [searchParams, setSearchParams] = useState({
    fecha_inicio: "",
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

      {acts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {acts.map((act) => (
                <tr key={act.acta_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(act.fecha_recepcion), "dd/MM/yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {act.numero_factura}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {act.proveedor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {act.tipo_acta}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        act.Cargada_Inventario
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {act.Cargada_Inventario ? "Cargada" : "Pendiente"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => onActSelect(act)}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Seleccionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActSearch;
