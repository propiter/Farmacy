import React from 'react';
import { Download, Filter, Search } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { Product } from '../types';
import { getInventory, updateProduct, deleteProduct } from '../utils/inventory';
import InventoryTable from '../components/inventory/InventoryTable';
import InventoryFilters from '../components/inventory/InventoryFilters';
import ProductDetails from '../components/inventory/ProductDetails';
import ProductEdit from '../components/inventory/ProductEdit';
import DeleteConfirmation from '../components/inventory/DeleteConfirmation';
import { generateInventoryReport } from '../utils/reports';

const Inventory = () => {
  const [inventory, setInventory] = React.useState<Product[]>([]);
  const [filters, setFilters] = React.useState({
    search: '',
    expirationRange: 'all',
    stockRange: 'all',
  });
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    const loadInventory = () => {
      const data = getInventory();
      setInventory(data);
    };
    
    loadInventory();
  }, []);

  const handleExport = () => {
    generateInventoryReport(inventory);
    toast.success('Reporte generado exitosamente');
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (product: Product) => {
    setDeletingProduct(product);
  };

  const handleSaveEdit = (updatedProduct: Product) => {
    const newInventory = updateProduct(updatedProduct);
    setInventory(newInventory);
    setEditingProduct(null);
    toast.success('Producto actualizado exitosamente');
  };

  const handleConfirmDelete = () => {
    if (deletingProduct) {
      const newInventory = deleteProduct(deletingProduct.id);
      setInventory(newInventory);
      setDeletingProduct(null);
      toast.success('Producto eliminado exitosamente');
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventario</h1>
          <p className="text-gray-600">Gestión de medicamentos y productos</p>
        </div>
        
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar Inventario
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <InventoryFilters filters={filters} onFilterChange={setFilters} />
        <InventoryTable 
          inventory={inventory} 
          filters={filters}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {editingProduct && (
        <ProductEdit
          product={editingProduct}
          onSave={handleSaveEdit}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {deletingProduct && (
        <DeleteConfirmation
          productName={deletingProduct.genericName}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
};

export default Inventory;