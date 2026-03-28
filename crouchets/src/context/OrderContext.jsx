import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();
export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem('crouchets_orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem('crouchets_orders', JSON.stringify(newOrders));
  };

  const placeOrder = (details, cart, total) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`,
      userId: user ? user.id : 'guest',
      customerDetails: details,
      items: cart,
      total,
      status: 'placed', // placed, confirmed, shipped, out_for_delivery, delivered
      payment: 'cod',
      createdAt: new Date().toISOString(),
      trackingSteps: [
        { label: 'Order Placed', completed: true, date: new Date().toISOString() },
        { label: 'Confirmed', completed: false, date: null },
        { label: 'Shipped', completed: false, date: null },
        { label: 'Out for Delivery', completed: false, date: null },
        { label: 'Delivered', completed: false, date: null }
      ],
      returnRequested: false,
      refundStatus: null // pending, approved, rejected, refunded
    };
    saveOrders([newOrder, ...orders]);
    return newOrder;
  };

  const updateOrderStatus = (id, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === id) {
        let updatedSteps = order.trackingSteps;
        
        const statusMap = {
          'placed': 0,
          'confirmed': 1,
          'shipped': 2,
          'out_for_delivery': 3,
          'delivered': 4
        };
        
        const newIndex = statusMap[newStatus];
        
        updatedSteps = updatedSteps.map((step, index) => {
          if (index <= newIndex) {
            return { ...step, completed: true, date: step.date || new Date().toISOString() };
          }
          return { ...step, completed: false, date: null };
        });

        return { ...order, status: newStatus, trackingSteps: updatedSteps };
      }
      return order;
    });
    saveOrders(updatedOrders);
  };

  const requestReturn = (id, reason) => {
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, returnRequested: true, refundStatus: 'pending', returnReason: reason } : order
    );
    saveOrders(updatedOrders);
  };

  const updateRefundStatus = (id, status) => {
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, refundStatus: status } : order
    );
    saveOrders(updatedOrders);
  };

  const deleteOrder = (id) => {
    saveOrders(orders.filter(o => o.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, requestReturn, updateRefundStatus, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
