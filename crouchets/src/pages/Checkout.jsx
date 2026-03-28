import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  
  const [placed, setPlaced] = useState(false);

  if (cart.length === 0 && !placed) {
    return <Navigate to="/shop" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder(formData, cart, subtotal);
    clearCart();
    setPlaced(true);
    setTimeout(() => {
      navigate('/orders');
    }, 3000);
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-white p-12 rounded-3xl shadow-xl border border-warm/30 text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-teal text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal/30">
            <Check size={40} strokeWidth={3} />
          </div>
          <h2 className="font-playfair text-4xl font-bold text-dark mb-4">Order Placed!</h2>
          <p className="text-mid mb-8">Your handmade companions are getting ready for their journey. Redirecting you to orders...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-16 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Checkout Form */}
        <div className="flex-1 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-warm/30">
          <h1 className="font-playfair text-3xl font-bold text-dark mb-8">Checkout.</h1>
          
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-mid uppercase tracking-widest mb-2">Full Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-warm/20 border border-warm/50 focus:border-teal outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-mid uppercase tracking-widest mb-2">Phone Number *</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-warm/20 border border-warm/50 focus:border-teal outline-none transition-colors" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-mid uppercase tracking-widest mb-2">Email Address *</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-warm/20 border border-warm/50 focus:border-teal outline-none transition-colors" />
            </div>

            <div>
              <label className="block text-xs font-bold text-mid uppercase tracking-widest mb-2">Delivery Address *</label>
              <textarea required rows={4} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-warm/20 border border-warm/50 focus:border-teal outline-none transition-colors"></textarea>
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-bold text-dark mb-4">Payment Method</h3>
              <div className="bg-teal/5 border-2 border-teal rounded-xl p-4 flex items-center justify-between">
                <span className="font-medium text-dark">Cash on Delivery (COD)</span>
                <div className="w-6 h-6 rounded-full border-4 border-teal bg-white" />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-[400px]">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-warm/30 sticky top-32">
            <h2 className="font-playfair text-2xl font-bold text-dark mb-6 pb-6 border-b border-warm/50">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative">
                    <img src={item.images[0]} className="w-16 h-16 rounded-lg object-cover bg-warm" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-dark text-white text-[10px] font-bold flex items-center justify-center rounded-full">{item.quantity}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-dark">{item.name}</p>
                    <p className="text-sm text-mid">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-warm/50 mb-8">
              <div className="flex justify-between text-mid"><p>Subtotal</p><p>₹{subtotal}</p></div>
              <div className="flex justify-between text-mid"><p>Shipping</p><p>Free</p></div>
              <div className="flex justify-between font-bold text-2xl text-dark pt-3 mt-3 border-t border-warm/30">
                <p>Total</p><p>₹{subtotal}</p>
              </div>
            </div>

            <button 
              form="checkout-form"
              type="submit" 
              className="w-full py-4 bg-teal text-white rounded-xl font-medium text-lg leading-none shadow-xl shadow-teal/20 hover:bg-teal-600 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
