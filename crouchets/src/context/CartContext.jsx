import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('crouchets_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {}
    }

    const savedOrders = localStorage.getItem('crouchets_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {}
    } else {
      // Seed an initial dummy order so the user sees something in "Your Orders" if they log in
      const defaultOrder = {
        id: 'ord_' + Math.floor(Math.random() * 10000),
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        status: 'Delivered',
        total: 350,
        address: '123 Fake Street, Dummy City',
        items: [
          {
            product: { name: 'Classic Cherry Keychain', price: 350, image: 'https://images.unsplash.com/photo-1590005354167-6da97ce231ce?auto=format&fit=crop&q=80&w=400&h=400' },
            variant: 'Red',
            quantity: 1
          }
        ]
      };
      setOrders([defaultOrder]);
      localStorage.setItem('crouchets_orders', JSON.stringify([defaultOrder]));
    }
  }, []);

  // Save changes
  useEffect(() => {
    localStorage.setItem('crouchets_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('crouchets_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, variant, quantity) => {
    setCartItems(prev => {
      const existingToken = prev.findIndex(item => item.product.id === product.id && item.variant === variant);
      if (existingToken >= 0) {
        const newCart = [...prev];
        newCart[existingToken].quantity += quantity;
        return newCart;
      } else {
        return [...prev, { product, variant, quantity }];
      }
    });
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (address) => {
    if (cartItems.length === 0) return null;
    
    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder = {
      id: 'ord_' + Math.floor(Math.random() * 100000),
      date: new Date().toISOString(),
      status: 'Processing', // Newly placed orders are processing
      total: total,
      address: address,
      items: [...cartItems]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    
    // Increment total order counter for Admin dashboard stats
    const currentTotal = parseInt(localStorage.getItem('crouchets_total_orders') || '0', 10);
    localStorage.setItem('crouchets_total_orders', (currentTotal + 1).toString());

    return newOrder;
  };

  return (
    <CartContext.Provider value={{ cartItems, orders, addToCart, removeFromCart, clearCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
