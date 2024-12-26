import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FileText, PackagePlus, Plus } from "lucide-react";
import { ReceptionAct, Product } from "../types";
import ReceptionActForm from "../components/reception/ReceptionActForm";
import ProductForm from "../components/reception/ProductForm";
import ProductList from "../components/reception/ProductList";
import ActSearch from "../components/reception/ActSearch";
import { generateReceptionActPDF } from "../utils/pdf";
import {
  createActa,
  addProductsToActa,
  loadActaToInventory,
  deleteActaProduct,
  editActaProduct,
  getActaProducts,
} from "../services/api";

const Reception = () => {
  const [currentAct, setCurrentAct] = useState<ReceptionAct | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<{
    product: Product;
    index: number;
  } | null>(null);
  const [showNewActForm, setShowNewActForm] = useState(false);

  // Cargar productos del acta cuando se crea o cambia
  useEffect(() => {
    if (currentAct?.acta_id) {
      loadActProducts();
    }
  }, [currentAct?.acta_id]);

  const loadActProducts = async () => {
    try {
      if (currentAct?.acta_id) {
        const fetchedProducts = await getActaProducts(
          currentAct.acta_id.toString()
        );
        setProducts(fetchedProducts);
      }
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
  };

  const handleSubmitAct = async (actData: Partial<ReceptionAct>) => {
    try {
      const response = await createActa(actData);
      setCurrentAct(response.acta);
      setShowNewActForm(false);
      toast.success("Acta creada exitosamente");
    } catch (error) {
      toast.error("Error al crear el acta");
    }
  };

  const handleAddProduct = async (product: Product) => {
    try {
      if (!currentAct?.acta_id) {
        toast.error("Debe crear el acta primero");
        return;
      }

      if (editingProduct) {
        // Editar producto existente
        await editActaProduct(
          currentAct.acta_id.toString(),
          editingProduct.product.producto_id!.toString(),
          product
        );
        setEditingProduct(null);
      } else {
        // Agregar nuevo producto
        await addProductsToActa(currentAct.acta_id, [
          {
            producto: product,
            lote: product.lote_id,
            cantidad: product.cantidad_recibida,
            precio_compra: product.precio_compra,
          },
        ]);
      }
      await loadActProducts();
      toast.success(
        `Producto ${editingProduct ? "actualizado" : "agregado"} exitosamente`
      );
    } catch (error) {
      toast.error(
        `Error al ${editingProduct ? "actualizar" : "agregar"} el producto`
      );
    }
  };

  const handleRemoveProduct = async (index: number) => {
    try {
      const productToRemove = products[index];
      if (currentAct?.acta_id && productToRemove.acta_producto_id) {
        await deleteActaProduct(
          currentAct.acta_id.toString(),
          productToRemove.acta_producto_id.toString()
        );
        await loadActProducts();
        toast.success("Producto eliminado exitosamente");
      }
    } catch (error) {
      toast.error("Error al eliminar el producto");
    }
  };

  const handleLoadToInventory = async () => {
    try {
      if (!currentAct?.acta_id) {
        toast.error("No hay acta seleccionada");
        return;
      }
      await loadActaToInventory(currentAct.acta_id.toString());
      // Recargar el acta para actualizar su estado
      const updatedProducts = await getActaProducts(
        currentAct.acta_id.toString()
      );
      setProducts(updatedProducts);
      setCurrentAct({ ...currentAct, cargada_inventario: true });
      toast.success("Acta cargada al inventario exitosamente");
    } catch (error) {
      toast.error("Error al cargar al inventario");
    }
  };

  const handleActSelect = async (act: ReceptionAct) => {
    setCurrentAct(act);
    setShowNewActForm(false);
    try {
      const fetchedProducts = await getActaProducts(act.acta_id.toString());
      setProducts(fetchedProducts);
      toast.success("Acta cargada exitosamente");
    } catch (error) {
      toast.error("Error al cargar los productos del acta");
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Acta de Recepción
          </h1>
          <p className="text-gray-600">Registre la recepción de productos</p>
        </div>

        <button
          onClick={() => {
            setShowNewActForm(!showNewActForm);
            setCurrentAct(null);
            setProducts([]);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Acta
        </button>
      </div>

      {!showNewActForm && !currentAct && (
        <ActSearch onActSelect={handleActSelect} />
      )}

      {(showNewActForm || currentAct) && (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {showNewActForm ? (
              <ReceptionActForm onSubmit={handleSubmitAct} />
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">
                    Acta #{currentAct?.acta_id} - {currentAct?.tipo_acta}
                  </h2>
                  <p className="text-gray-600">
                    Factura: {currentAct?.numero_factura} - Proveedor:{" "}
                    {currentAct?.proveedor}
                  </p>
                  <p className="text-gray-600">
                    Responsable: {currentAct?.Responsable} - Fecha:{" "}
                    {currentAct?.fecha_recepcion &&
                      new Date(currentAct.fecha_recepcion).toLocaleDateString(
                        "es-ES",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => generateReceptionActPDF(currentAct!)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Generar PDF
                  </button>

                  {!currentAct?.cargada_inventario && (
                    <button
                      onClick={handleLoadToInventory}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <PackagePlus className="w-4 h-4 mr-2" />
                      Cargar al Inventario
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {currentAct && !currentAct.cargada_inventario && (
            <ProductForm
              onAddProduct={handleAddProduct}
              editingProduct={editingProduct?.product}
              onCancelEdit={() => setEditingProduct(null)}
            />
          )}

          {currentAct && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Productos en el Acta
              </h2>
              <ProductList
                products={products}
                onEditProduct={(product, index) =>
                  setEditingProduct({ product, index })
                }
                onRemoveProduct={handleRemoveProduct}
                onUpdateObservations={(index, observations) => {
                  const updatedProducts = [...products];
                  updatedProducts[index].observaciones = observations;
                  setProducts(updatedProducts);
                }}
                actType={currentAct.tipo_acta}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reception;
