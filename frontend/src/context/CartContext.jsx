import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("ecommerce-cart") || "[]"));
  const [notice, setNotice] = useState("");

  useEffect(() => localStorage.setItem("ecommerce-cart", JSON.stringify(items)), [items]);

  const addItem = (product) => setItems((current) => {
    const existing = current.find((item) => item.product === product._id || item.product === product.id);
    if (existing) return current.map((item) => item.product === existing.product ? { ...item, quantity: item.quantity + 1 } : item);
    return [...current, { product: product._id || product.id, title: product.title, price: product.price, image: product.image, quantity: 1 }];
  });
  const addToCart = (product) => { addItem(product); setNotice(`${product.title} added to your bag`); window.setTimeout(() => setNotice(""), 2200); };
  const removeItem = (id) => setItems((current) => current.filter((item) => item.product !== id));
  const updateQuantity = (id, quantity) => quantity < 1 ? removeItem(id) : setItems((current) => current.map((item) => item.product === id ? { ...item, quantity } : item));
  const value = { items, addItem: addToCart, removeItem, updateQuantity, itemCount: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + item.price * item.quantity, 0) };
  return <CartContext.Provider value={value}>{children}{notice && <div className="cart-notice" role="status">{notice}<span>✓</span></div>}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}