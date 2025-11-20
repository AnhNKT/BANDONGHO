// src/context/CartContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface CartProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  image: string;
  stock: number;
  quantity: number;
}

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: Omit<CartProduct, "quantity">) => void;
  removeFromCart: (_id: string) => void;
  updateQuantity: (_id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number; // ✨ thêm: tổng số sản phẩm trong giỏ
  getTotalPrice: () => number; // ✨ thêm: tổng tiền giỏ hàng
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const saved = localStorage.getItem("cart");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return []; // ✨ thêm: phòng khi dữ liệu localStorage hỏng
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Omit<CartProduct, "quantity">) => {
    setCart(prev => {
      const existing = prev.find(p => p._id === product._id);
      if (existing) {
        return prev.map(p =>
          p._id === product._id
            ? { ...p, quantity: Math.min(p.quantity + 1, p.stock) } // ✨ giới hạn max bằng stock
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (_id: string) => {
    setCart(prev => prev.filter(p => p._id !== _id));
  };

  const updateQuantity = (_id: string, quantity: number) => {
    setCart(prev =>
      prev.map(p => {
        if (p._id === _id) {
          const validQty = Math.max(1, Math.min(quantity, p.stock)); // ✨ đảm bảo quantity >=1 và <= stock
          return { ...p, quantity: validQty };
        }
        return p;
      })
    );
  };

  const clearCart = () => setCart([]);

  // ✨ thêm các helper
  const getTotalItems = () => cart.reduce((acc, p) => acc + p.quantity, 0);
  const getTotalPrice = () =>
    cart.reduce((acc, p) => acc + p.quantity * (p.price ?? 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
