import React from 'react';
import { Product } from '../../types';
import { format } from 'date-fns';

interface ProductDetailsProps {
  product: Partial<Product>;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Detalles del Producto</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
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
                    {product.expirationDate && format(new Date(product.expirationDate), 'dd/MM/yyyy')}
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
                  <dt className="text-sm font-medium text-gray-500">Estado</dt>
                  <dd className="text-sm text-gray-900">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.accepted
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.accepted ? 'Aceptado' : 'Rechazado'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Cantidades</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Cantidad Solicitada</dt>
                  <dd className="text-sm text-gray-900">{product.requestedQuantity}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Cantidad Recibida</dt>
                  <dd className="text-sm text-gray-900">{product.receivedQuantity}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Diferencia</dt>
                  <dd className={`text-sm ${
                    (product.receivedQuantity || 0) < (product.requestedQuantity || 0)
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}>
                    {((product.receivedQuantity || 0) - (product.requestedQuantity || 0))}
                  </dd>
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