import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const OrderModal = ({ isOpen, onClose, product }) => {
  const [variant, setVariant] = useState(product?.variants?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Reset defaults when product changes
  React.useEffect(() => {
    if (product) {
      setVariant(product.variants?.[0] || '');
      setQuantity(1);
      setIsSuccess(false);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product) return;

    addToCart(product, variant || 'Standard', parseInt(quantity, 10));
    setIsSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-cream rounded-2xl shadow-2xl w-full max-w-sm flex flex-col"
        >
          <div className="flex justify-between items-center p-4 border-b border-warm/50">
            <h2 className="font-playfair text-xl font-semibold text-dark">Add to Cart</h2>
            <button onClick={onClose} className="text-mid hover:text-dark font-bold p-1">✕</button>
          </div>

          <div className="p-6">
            {isSuccess ? (
              <div className="text-center py-6 flex flex-col items-center">
                <div className="w-12 h-12 bg-teal/20 text-teal rounded-full flex items-center justify-center text-xl mb-4">✓</div>
                <h3 className="font-playfair text-xl font-semibold text-dark mb-2">Added Successfully!</h3>
                <div className="flex gap-3 mt-6 w-full">
                  <button onClick={onClose} className="flex-1 py-2.5 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition-colors">
                    Keep Shopping
                  </button>
                  <button onClick={() => navigate('/cart')} className="flex-1 py-2.5 bg-teal text-white rounded-xl font-medium shadow-md hover:bg-teal-700 transition-colors">
                    View Cart
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-warm/30 mb-2">
                  <img src={product?.image} alt={product?.name} className="w-16 h-16 rounded object-cover" />
                  <div>
                    <h4 className="font-bold text-dark leading-tight">{product?.name}</h4>
                    <p className="text-sm text-mid mt-1">₹{product?.price}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-mid mb-1">Variant / Color</label>
                  {product?.variants?.length > 0 ? (
                    <select value={variant} onChange={e => setVariant(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-white border border-warm focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition-all">
                      {product.variants.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  ) : (
                    <input type="text" disabled value="Standard" className="w-full px-4 py-2.5 rounded-lg bg-warm/50 text-mid border border-warm outline-none" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-mid mb-1">Quantity</label>
                  <div className="flex items-center border border-warm rounded-lg bg-white w-full overflow-hidden">
                     <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2.5 hover:bg-warm/30 text-dark font-bold transition-colors">-</button>
                     <input type="number" min={1} max={product?.stock || 1} value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full text-center bg-transparent outline-none font-medium text-dark border-x border-warm" />
                     <button type="button" onClick={() => setQuantity(Math.min(product?.stock || 10, quantity + 1))} className="px-4 py-2.5 hover:bg-warm/30 text-dark font-bold transition-colors">+</button>
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button whileTap={{ scale: 0.97 }} type="submit" className="w-full py-3.5 bg-[#ffd814] hover:bg-[#f7ca00] text-black border border-[#fcd200] rounded-xl font-bold shadow-sm transition-colors">
                    Add to Cart • ₹{(product?.price || 0) * (quantity || 1)}
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
