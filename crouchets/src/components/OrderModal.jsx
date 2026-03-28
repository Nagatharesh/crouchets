import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const OrderModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    variant: product?.variants?.[0] || '',
    quantity: 1,
    notes: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product) return;

    const total = product.price * formData.quantity;

    const subject = encodeURIComponent(`New Order from ${formData.name}`);
    const bodyText = `
🧶 NEW CROUCHETS ORDER
─────────────────────
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}
─────────────────────
Product: ${product.name}
Variant: ${formData.variant || 'N/A'}
Quantity: ${formData.quantity}
Total: ₹${total}
─────────────────────
Special Notes: ${formData.notes || 'None'}
─────────────────────
Please contact customer to confirm order.
    `.trim();

    const mailto = `mailto:crouchets.orders@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

    // Open mail client
    window.location.href = mailto;
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
          className="bg-cream rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col"
        >
          <div className="sticky top-0 bg-cream/90 backdrop-blur-md px-6 py-4 border-b border-warm/50 flex justify-between items-center z-10">
            <h2 className="font-playfair text-2xl font-semibold text-dark">Order Request</h2>
            <button onClick={onClose} className="text-mid hover:text-dark text-xl font-bold p-2">✕</button>
          </div>

          <div className="p-6">
            {isSuccess ? (
              <div className="text-center py-12 flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-teal/20 text-teal rounded-full flex items-center justify-center text-3xl mb-4">✓</div>
                <h3 className="font-playfair text-2xl font-semibold text-dark">Order Sent!</h3>
                <p className="text-mid max-w-sm">
                  The owner will contact you shortly on your provided phone or email to confirm your order.
                </p>
                <div className="mt-8">
                  <span className="text-4xl animate-bounce inline-block">🎉</span>
                </div>
                <button
                  onClick={onClose}
                  className="mt-8 px-6 py-2 bg-dark text-white rounded-lg hover:bg-black transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-warm/30 p-4 rounded-xl flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img src={product?.image} alt={product?.name} className="w-12 h-12 rounded bg-warm object-cover" />
                    <div>
                      <h4 className="font-bold text-dark">{product?.name}</h4>
                      <p className="text-sm text-mid">₹{product?.price}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-mid mb-1">Full Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white border border-warm focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-mid mb-1">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white border border-warm focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-mid mb-1">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white border border-warm focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-mid mb-1">Delivery Address *</label>
                  <textarea required rows={3} name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white border border-warm focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition-all"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-mid mb-1">Variant / Color</label>
                    {product?.variants?.length > 0 ? (
                      <select name="variant" value={formData.variant} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white border border-warm focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition-all">
                        {product.variants.map((v) => <option key={v} value={v}>{v}</option>)}
                      </select>
                    ) : (
                      <input type="text" disabled value="Standard" className="w-full px-4 py-2 rounded-lg bg-warm/50 text-mid border border-warm outline-none" />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-mid mb-1">Quantity *</label>
                    <input required type="number" min={1} max={product?.stock || 1} name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white border border-warm focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-mid mb-1">Special Instructions (Optional)</label>
                  <textarea rows={2} name="notes" value={formData.notes} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white border border-warm focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition-all"></textarea>
                </div>

                <div className="pt-4 border-t border-warm/50 flex items-center justify-between">
                  <div className="text-lg font-bold font-playfair text-dark">
                    Total: ₹{(product?.price || 0) * (formData.quantity || 1)}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-8 py-3 bg-teal text-white rounded-xl font-medium shadow-md shadow-teal/20 hover:bg-teal/90 transition-colors"
                  >
                    Send Order via Email
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
