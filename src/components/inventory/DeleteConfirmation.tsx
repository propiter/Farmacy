import React from "react";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  productName: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  onConfirm,
  onCancel,
  productName,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-100 rounded-full p-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
            Confirmar Eliminación
          </h3>

          <p className="text-sm text-gray-500 text-center mb-6">
            ¿Está seguro que desea eliminar el producto "{productName}"? Esta
            acción no se puede deshacer.
          </p>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
