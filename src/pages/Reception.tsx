import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { FileText, PackagePlus } from "lucide-react";
import { ReceptionAct, Product } from "../types";
import ReceptionActForm from "../components/reception/ReceptionActForm";
import ProductForm from "../components/reception/ProductForm";
import ProductList from "../components/reception/ProductList";
import { generateReceptionActPDF } from "../utils/pdf";
import { addProductsToInventory } from "../utils/inventory";
import { ActType } from "../constants/actTypes";

const Reception = () => {
  const [products, setProducts] = React.useState<Partial<Product>[]>([]);
  const [currentAct, setCurrentAct] =
    React.useState<Partial<ReceptionAct> | null>(null);
  const [actType, setActType] = React.useState<ActType | "">("");

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
    toast.success("Producto agregado exitosamente");
  };

  const handleRemoveProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
    toast.success("Producto eliminado exitosamente");
  };

  const handleSubmitAct = (actData: Partial<ReceptionAct>) => {
    const completeAct = {
      ...actData,
      products,
      id: Date.now().toString(),
    } as ReceptionAct;

    setCurrentAct(completeAct);
    setActType(actData.actType as ActType);
    toast.success("Acta guardada exitosamente");
  };

  const handleGeneratePDF = () => {
    if (!currentAct) {
      toast.error("Debe guardar el acta antes de generar el PDF");
      return;
    }

    const { doc, fileName } = generateReceptionActPDF(
      currentAct as ReceptionAct
    );
    doc.save(fileName);
    toast.success("PDF generado exitosamente");
  };

  const handleAddToInventory = () => {
    if (!currentAct) {
      toast.error("Debe guardar el acta antes de agregar al inventario");
      return;
    }

    if (products.length === 0) {
      toast.error("No hay productos para agregar al inventario");
      return;
    }

    const inventory = addProductsToInventory(products as Product[]);
    toast.success(
      `${
        products.filter((p) => p.accepted).length
      } productos agregados al inventario`
    );
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Acta de Recepción
          </h1>
          <p className="text-gray-600">Registre la recepción de medicamentos</p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleGeneratePDF}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={!currentAct}
          >
            <FileText className="w-4 h-4 mr-2" />
            Generar PDF
          </button>

          <button
            onClick={handleAddToInventory}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={!currentAct}
          >
            <PackagePlus className="w-4 h-4 mr-2" />
            Cargar al Inventario
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <ReceptionActForm onSubmit={handleSubmitAct} />
      </div>

      {actType && (
        <ProductForm onAddProduct={handleAddProduct} actType={actType} />
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Productos en el Acta
        </h2>
        <ProductList
          products={products}
          onRemoveProduct={handleRemoveProduct}
        />
      </div>
    </div>
  );
};

export default Reception;
