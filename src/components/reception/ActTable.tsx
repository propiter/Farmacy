import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { ReceptionAct } from "../../types";
import { format } from "date-fns";

interface ActTableProps {
  acts: ReceptionAct[];
  onActSelect: (act: ReceptionAct) => void;
}

type SortField =
  | "fecha_recepcion"
  | "numero_factura"
  | "proveedor"
  | "tipo_acta"
  | "estado";
type SortOrder = "asc" | "desc";
type LoadStatus = "all" | "pending" | "loaded";

export const ActTable: React.FC<ActTableProps> = ({ acts, onActSelect }) => {
  const [sortField, setSortField] = useState<SortField>("fecha_recepcion");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("all");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedAndFilteredActs = acts
    .filter((act) => {
      if (loadStatus === "all") return true;
      if (loadStatus === "pending") return !act.Cargada_Inventario;
      return act.Cargada_Inventario;
    })
    .sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;

      switch (sortField) {
        case "fecha_recepcion":
          return (
            (new Date(a.fecha_recepcion).getTime() -
              new Date(b.fecha_recepcion).getTime()) *
            multiplier
          );
        case "numero_factura":
          return a.numero_factura.localeCompare(b.numero_factura) * multiplier;
        case "proveedor":
          return a.proveedor.localeCompare(b.proveedor) * multiplier;
        case "tipo_acta":
          return a.tipo_acta.localeCompare(b.tipo_acta) * multiplier;
        case "estado":
          return (
            ((a.Cargada_Inventario ? 1 : 0) - (b.Cargada_Inventario ? 1 : 0)) *
            multiplier
          );
        default:
          return 0;
      }
    });

  const SortButton = ({
    field,
    label,
  }: {
    field: SortField;
    label: string;
  }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 hover:text-primary"
    >
      <span>{label}</span>
      <ArrowUpDown
        className={`w-4 h-4 ${
          sortField === field ? "text-primary" : "text-gray-400"
        }`}
      />
    </button>
  );

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-end">
        <select
          value={loadStatus}
          onChange={(e) => setLoadStatus(e.target.value as LoadStatus)}
          className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        >
          <option value="all">Todos los estados</option>
          <option value="pending">Pendientes</option>
          <option value="loaded">Cargadas</option>
        </select>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="fecha_recepcion" label="Fecha" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="numero_factura" label="Factura" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="proveedor" label="Proveedor" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="tipo_acta" label="Tipo" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton field="estado" label="Estado" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acción
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedAndFilteredActs.map((act) => (
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
  );
};

export default ActTable;
