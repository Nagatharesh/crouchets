import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    const stored = localStorage.getItem('crouchets_cart');
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('crouchets_cart', JSON.stringify(newCart));
  };

  const addToCart = (product, quantity = 1) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      saveCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      saveCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (id) => {
    saveCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);
    saveCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    saveCart([]);
  };

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, cartCount: cart.length }}>
      {children}
    </CartContext.Provider>
  );
};
