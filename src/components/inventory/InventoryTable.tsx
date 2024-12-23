import React from 'react';
import { format } from 'date-fns';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types';
import { getExpirationStatus } from '../../utils/inventory';

interface InventoryTableProps {
  inventory: Product[];
  filters: {
    search: string;
    expirationRange: string;
    stockRange: string;
  };
  onViewDetails: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ 
  inventory, 
  filters,
  onViewDetails,
  onEdit,
  onDelete
}) => {
  const filteredInventory = inventory.filter(product => {
    const matchesSearch = 
      product.genericName.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.commercialName.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.batch.toLowerCase().includes(filters.search.toLowerCase());

    const expirationStatus = getExpirationStatus(product.expirationDate);
    const matchesExpiration = 
      filters.expirationRange === 'all' || 
      filters.expirationRange === expirationStatus;

    const matchesStock =
      filters.stockRange === 'all' ||
      (filters.stockRange === 'low' && product.stock <= 10) ||
      (filters.stockRange === 'normal' && product.stock > 10 && product.stock <= 50) ||
      (filters.stockRange === 'high' && product.stock > 50);

    return matchesSearch && matchesExpiration && matchesStock;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Producto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Laboratorio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lote
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vencimiento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredInventory.map((product) => {
            const expirationStatus = getExpirationStatus(product.expirationDate);
            const statusColors = {
              danger: 'bg-red-100 text-red-800',
              warning: 'bg-yellow-100 text-yellow-800',
              success: 'bg-green-100 text-green-800',
            };

            return (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {product.genericName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {product.commercialName}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.laboratory}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.batch}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.stock <= 10
                      ? 'bg-red-100 text-red-800'
                      : product.stock <= 50
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {format(new Date(product.expirationDate), 'dd/MM/yyyy')}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    statusColors[expirationStatus]
                  }`}>
                    {expirationStatus === 'danger'
                      ? 'Crítico'
                      : expirationStatus === 'warning'
                      ? 'Alerta'
                      : 'Normal'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onViewDetails(product)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Ver detalles"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => onEdit(product)}
                      className="text-green-600 hover:text-green-900"
                      title="Editar"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => onDelete(product)}
                      className="text-red-600 hover:text-red-900"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;