import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ObservationModalProps {
  isOpen: boolean;
  currentObservations: string;
  onClose: () => void;
  onConfirm: (observations: string) => void;
}

const ObservationModal: React.FC<ObservationModalProps> = ({
  isOpen,
  currentObservations,
  onClose,
  onConfirm,
}) => {
  const [observations, setObservations] = useState(currentObservations);

  // Actualizar las observaciones cuando cambien las observaciones actuales
  useEffect(() => {
    setObservations(currentObservations);
  }, [currentObservations]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Observaciones del Acta
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              {currentObservations
                ? "Observaciones existentes. Puede modificarlas o agregar nuevas observaciones:"
                : "No hay observaciones previas. Agregue las observaciones del acta:"}
            </p>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={8}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-3"
              placeholder="Ingrese las observaciones del acta..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={() => onConfirm(observations)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
            >
              Confirmar y Generar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservationModal;
