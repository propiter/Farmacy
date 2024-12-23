import React, { useState } from "react";
import { Search, Barcode } from "lucide-react";
import { Product } from "../../types";
import { searchProducts } from "../../services/productService";

interface ProductSearchProps {
  onProductSelect: (product: Partial<Product>) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onProductSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (value.length > 2) {
      setIsSearching(true);
      const results = await searchProducts(value);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  const handleProductSelect = (product: Product) => {
    // Solo enviamos los campos base que queremos pre-llenar
    const baseProduct = {
      genericName: product.name,
      commercialName: product.name,
      concentration: product.concentration,
      pharmaceuticalForm: product.pharmaceuticalForm,
      presentation: product.presentation,
      laboratory: product.laboratory,
      sanitaryRegistration: product.sanitaryRegistration,
      requiresColdChain: product.requiresColdChain,
      temperature: product.temperature,
      // Estos campos se dejan vacíos para que el usuario los complete
      batch: "",
      expirationDate: "",
      requestedQuantity: 0,
      receivedQuantity: 0,
      accepted: true,
    };

    onProductSelect(baseProduct);
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar medicamento..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
          />
          {isSearching && (
            <div className="absolute right-3 top-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto">
          {searchResults.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductSelect(product)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              <div className="flex justify-between">
                <span className="font-medium">{product.name}</span>
                <span className="text-gray-500 text-sm">
                  {product.concentration}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {product.laboratory} - {product.pharmaceuticalForm}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
