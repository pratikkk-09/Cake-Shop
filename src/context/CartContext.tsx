import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import toast from 'react-hot-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, options: { weight: string, flavour: string, shape: string, isEggless: boolean, message?: string }) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number, options: { weight: string, flavour: string, shape: string, isEggless: boolean, message?: string }) => {
    setItems(prev => {
      // Check if exact same configuration exists
      const existingIndex = prev.findIndex(item => 
        item.product._id === product._id &&
        item.selectedWeight === options.weight &&
        item.selectedFlavour === options.flavour &&
        item.selectedShape === options.shape &&
        item.isEggless === options.isEggless &&
        item.specialInstructions === options.message
      );

      if (existingIndex >= 0) {
        const newItems = [...prev];
        newItems[existingIndex].quantity += quantity;
        toast.success(`Increased quantity of ${product.name}`);
        return newItems;
      }

      toast.success(`Added ${product.name} to cart`);
      return [...prev, { 
        product, 
        quantity, 
        selectedWeight: options.weight,
        selectedFlavour: options.flavour,
        selectedShape: options.shape,
        isEggless: options.isEggless,
        specialInstructions: options.message
      }];
    });
  };

  const removeFromCart = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
    toast.success('Removed item from cart');
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(index);
      return;
    }
    setItems(prev => {
      const newItems = [...prev];
      newItems[index].quantity = quantity;
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    // In a real app, price might vary by weight. Using base price for now.
    const price = item.product.discountPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
