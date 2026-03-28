import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

export const Cart = () => {
  const { cartItems, removeFromCart, placeOrder } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const isUserLoggedIn = isAuthenticated && user?.role === 'user';

  const handleCheckout = () => {
    if (!isUserLoggedIn) {
      // Redirect to login, but remember we came from cart
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }

    // In a real app we'd collect address here. For demo, we use a dummy one.
    const address = "123 Shipping Lane, Handcraft City";
    placeOrder(address);
    navigate('/orders'); // Send them to order tracking page
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="font-playfair text-3xl font-bold text-dark mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-xl font-bold text-dark mb-2">Your cart is empty</h2>
                <p className="text-slate-500 mb-6 font-medium">Looks like you haven't added any keychains yet.</p>
                <button onClick={() => navigate('/shop')} className="px-6 py-2.5 bg-teal text-white rounded-lg font-bold hover:bg-teal-700 transition">
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div 
                      key={`${item.product.id}-${index}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-4 border-b border-slate-100 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-dark sm:text-lg leading-tight">{item.product.name}</h3>
                            <p className="text-slate-500 text-sm mt-1">Variant: <span className="font-semibold">{item.variant}</span></p>
                          </div>
                          <p className="font-playfair font-black text-lg text-dark">₹{item.product.price}</p>
                        </div>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-600">Qty: {item.quantity}</span>
                          </div>
                          <button 
                            onClick={() => removeFromCart(index)}
                            className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Checkout Summary - Amazon Style Right Column */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-dark mb-4 pb-4 border-b border-slate-100">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-600 font-medium text-sm">
                    <span>Items ({cartItems.length}):</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium text-sm">
                    <span>Shipping:</span>
                    <span className="text-teal-600">Free</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mb-6 flex justify-between items-center">
                  <span className="font-bold text-dark text-lg">Order Total:</span>
                  <span className="font-playfair font-black text-2xl text-dark">₹{total}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#ffd814] hover:bg-[#f7ca00] text-black rounded-xl font-bold tracking-wide shadow-sm transition-all duration-200 border border-[#fcd200]"
                >
                  Proceed to Checkout
                </button>
                
                {!isUserLoggedIn && (
                  <p className="text-xs text-center font-medium text-slate-500 mt-4">
                    You will be asked to sign in securely.
                  </p>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
