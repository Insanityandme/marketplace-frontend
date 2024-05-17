"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface ProductCategoryDTO {
  id: string;
  name: string;
}

export interface CartProductDTO {
  productId: string;
  name: string;
  productCategory: ProductCategoryDTO;
  price: number;
  condition: number;
  status: number;
  description: string;
  seller: string;
  buyer: string;
  color: number | undefined;
  productionYear: number | undefined;
  createdAt: string; // Instant
  imageUrls: string[];
}

interface CartContextType {
  items: CartProductDTO[];
  // eslint-disable-next-line no-unused-vars
  addToCart: (item: CartProductDTO) => void;
  // eslint-disable-next-line no-unused-vars
  removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { readonly children: ReactNode }) {
  const [items, setItems] = useState<CartProductDTO[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartProductDTO) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.productId === item.productId,
      );
      if (existingItem) {
        return prevItems;
      }

      return [...prevItems, item];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.productId !== productId));
  };

  const contextValue = useMemo(
    () => ({ items, addToCart, removeFromCart }),
    [items],
  );
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
