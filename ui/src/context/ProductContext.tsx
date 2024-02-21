import React, { createContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  produtct_img: string;
}

interface ProductContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  deleteFromCart: (id: number) => void;
  clearCart: () => void; // clearCart funksiyasini qo'shish
  totalPrice: number;
}

export const ProductContext = createContext<ProductContextType>({
  cart: [],
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  deleteFromCart: () => {},
  clearCart: () => {}, // clearCart funksiyasini qo'shish
  totalPrice: 0,
});

interface ProductProviderProps {
  children: ReactNode;
}

const ProductProvider = ({ children }: ProductProviderProps) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, { ...product, quantity: product.quantity }]);
  };

  const increaseQuantity = (id: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (id: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deleteFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ProductContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteFromCart,
        clearCart, // clearCart ni qiymati
        totalPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
