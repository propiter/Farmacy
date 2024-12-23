import { Product } from '../types';
import { differenceInMonths } from 'date-fns';

// This would be replaced with actual API calls in production
let inventory: Product[] = [];

export const addProductsToInventory = (products: Product[]) => {
  const acceptedProducts = products.filter(product => product.accepted);
  
  acceptedProducts.forEach(product => {
    const existingProduct = inventory.find(p => 
      p.genericName === product.genericName &&
      p.commercialName === product.commercialName &&
      p.concentration === product.concentration &&
      p.batch === product.batch
    );
    
    if (existingProduct) {
      existingProduct.stock += product.receivedQuantity;
    } else {
      inventory.push({
        ...product,
        id: Date.now().toString(),
        stock: product.receivedQuantity,
        price: 0 // This would be set by the user in production
      });
    }
  });
  
  return inventory;
};

export const getInventory = () => inventory;

export const updateProduct = (updatedProduct: Product) => {
  const index = inventory.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    inventory[index] = updatedProduct;
  }
  return inventory;
};

export const deleteProduct = (productId: string) => {
  inventory = inventory.filter(p => p.id !== productId);
  return inventory;
};

export const getExpirationStatus = (expirationDate: string): 'danger' | 'warning' | 'success' => {
  const months = differenceInMonths(new Date(expirationDate), new Date());
  
  if (months <= 6) return 'danger';
  if (months <= 12) return 'warning';
  return 'success';
};

// For development/testing purposes
export const clearInventory = () => {
  inventory = [];
};