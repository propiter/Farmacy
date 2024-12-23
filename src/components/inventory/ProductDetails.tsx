import React from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { Product } from '../../types';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Detalles del Medicamento</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Información General</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nombre Genérico</dt>
                  <dd className="text-sm text-gray-900">{product.genericName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nombre Comercial</dt>
                  <dd className="text-sm text-gray-900">{product.commercialName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Concentración</dt>
                  <dd className="text-sm text-gray-900">{product.concentration}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Forma Farmacéutica</dt>
                  <dd className="text-sm text-gray-900">{product.pharmaceuticalForm}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Detalles Técnicos</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Fecha de Vencimiento</dt>
                  <dd className="text-sm text-gray-900">
                    {format(new Date(product.expirationDate), 'dd/MM/yyyy')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Presentación</dt>
                  <dd className="text-sm text-gray-900">{product.presentation}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Laboratorio</dt>
                  <dd className="text-sm text-gray-900">{product.laboratory}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Lote</dt>
                  <dd className="text-sm text-gray-900">{product.batch}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Información Regulatoria</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Registro Sanitario</dt>
                  <dd className="text-sm text-gray-900">{product.sanitaryRegistration}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Cadena de Frío</dt>
                  <dd className="text-sm text-gray-900">
                    {product.requiresColdChain ? 'Sí' : 'No'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Precio</dt>
                  <dd className="text-sm text-gray-900">
                    {new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP'
                    }).format(product.price)}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Inventario</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Stock Actual</dt>
                  <dd className="text-sm text-gray-900">{product.stock}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;