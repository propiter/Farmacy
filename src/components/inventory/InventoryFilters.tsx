import React from 'react';
import { Search, Filter } from 'lucide-react';

interface InventoryFiltersProps {
  filters: {
    search: string;
    expirationRange: string;
    stockRange: string;
  };
  onFilterChange: (filters: any) => void;
}

const InventoryFilters: React.FC<InventoryFiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Buscar por nombre, lote..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="min-w-[200px]">
          <select
            name="expirationRange"
            value={filters.expirationRange}
            onChange={handleChange}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="all">Todos los vencimientos</option>
            <option value="danger">Crítico (≤ 6 meses)</option>
            <option value="warning">Alerta (7-12 meses)</option>
            <option value="success">Normal (≥ 12 meses)</option>
          </select>
        </div>

        <div className="min-w-[200px]">
          <select
            name="stockRange"
            value={filters.stockRange}
            onChange={handleChange}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="all">Todo el inventario</option>
            <option value="low">Stock bajo (≤ 10)</option>
            <option value="normal">Stock normal (11-50)</option>
            <option value="high">Stock alto (≥ 50)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InventoryFilters;