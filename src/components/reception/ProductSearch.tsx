import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Product } from "../../types";
import { searchProducts } from "../../services/api";
import { toast } from "react-hot-toast";

interface ProductSearchProps {
  onProductSelect: (product: Product) => void;
  onBarcodeNotFound?: (barcode: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  onProductSelect,
  onBarcodeNotFound,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isBarcodeFormat = (value: string) => {
    return /^\d{8,14}$/.test(value);
  };

  const handleSearch = async () => {
    if (searchTerm.length >= 3) {
      setIsLoading(true);
      try {
        const data = await searchProducts(searchTerm);
        setResults(data);

        // Si es un código de barras y no se encontraron resultados
        if (
          isBarcodeFormat(searchTerm) &&
          data.length === 0 &&
          onBarcodeNotFound
        ) {
          onBarcodeNotFound(searchTerm);
        }
      } catch (error) {
        toast.error("Error al buscar productos");
        console.error("Error searching products:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          placeholder="Buscar por nombre o código de barras..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md overflow-hidden">
          {results.map((product) => (
            <button
              key={product.producto_id}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              onClick={() => {
                onProductSelect(product);
                setSearchTerm("");
                setResults([]);
              }}
            >
              <div className="font-medium">{product.nombre_producto}</div>
              <div className="text-sm text-gray-600">
                {product.concentracion && `${product.concentracion} - `}
                {product.laboratorio}
              </div>
              {product.codigo_barras && (
                <div className="text-xs text-gray-500">
                  Código: {product.codigo_barras}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
