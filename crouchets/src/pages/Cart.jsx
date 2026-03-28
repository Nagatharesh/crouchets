import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-cream px-6">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-4xl text-warm">🛒</div>
        <h2 className="font-playfair text-3xl text-dark mb-4">Your cart is empty</h2>
        <p className="text-mid mb-8 max-w-sm text-center">Looks like you haven't added any tiny companions to your bag yet.</p>
        <Link to="/shop" className="px-8 py-3 bg-dark text-white rounded-xl shadow-md hover:bg-black transition-colors">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-16 px-6 lg:px-24">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden shadow-dark/5 p-8 md:p-12 border border-warm/30">
        <div className="flex justify-between items-end mb-10 pb-6 border-b border-warm/50">
          <h1 className="font-playfair text-4xl text-dark">Your Cart.</h1>
          <button onClick={clearCart} className="text-sm text-red font-semibold uppercase tracking-widest hover:underline">Clear all</button>
        </div>

        <div className="space-y-8">
          {cart.map(item => (
            <motion.div layout key={item.id} className="flex gap-6 items-center">
              <img src={item.images[0]} alt={item.name} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover bg-warm" />
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-mid font-bold mb-1">{item.category}</p>
                <h3 className="font-playfair text-xl md:text-2xl font-bold text-dark">{item.name}</h3>
                <p className="text-teal font-medium mt-1">₹{item.price}</p>
              </div>
              
              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-4 bg-cream px-4 py-2 rounded-xl border border-warm/50">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-mid hover:text-dark">
                    <Minus size={16} />
                  </button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-mid hover:text-dark">
                    <Plus size={16} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-mid hover:text-red transition-colors flex items-center gap-1 text-sm">
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-warm/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-mid uppercase tracking-widest font-bold mb-1">Subtotal</p>
            <p className="font-playfair text-4xl font-bold text-dark">₹{subtotal}</p>
            <p className="text-xs text-mid mt-2">Shipping calculated at checkout.</p>
          </div>
          
          <Link to="/checkout" className="w-full md:w-auto px-10 py-5 bg-dark text-white rounded-2xl font-medium shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 text-lg">
            Proceed to Checkout <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};
