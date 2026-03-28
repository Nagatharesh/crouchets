import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleAvailability } = useProducts();
  const { logout } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Keychain',
    variants: '',
    stock: '',
    inStock: true,
  });

  const stats = {
    total: products.length,
    inStock: products.filter(p => p.inStock).length,
    outOfStock: products.filter(p => !p.inStock).length,
    orders: parseInt(localStorage.getItem('crouchets_total_orders') || '0', 10) || 0
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      variants: formData.variants.split(',').map(s => s.trim()).filter(Boolean),
      stock: parseInt(formData.stock, 10),
      inStock: formData.inStock,
      image: formData.image || 'https://images.unsplash.com/photo-1584062590059-00918073b64c?auto=format&fit=crop&q=80&w=400&h=400',
    });
    
    // Reset form
    setFormData({
      name: '', description: '', price: '', category: 'Keychain',
      variants: '', stock: '', inStock: true, image: null
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans px-4 sm:px-8 py-10 selection:bg-teal/20">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red/10 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal/10 rounded-full blur-[100px] mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Premium Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row items-center justify-between mb-16 gap-6 bg-white/70 backdrop-blur-2xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-dark text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-dark/20 relative overflow-hidden group">
              <span className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">🍒</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
            <div>
              <h1 className="font-playfair text-3xl font-bold text-dark tracking-tight">Admin Portal</h1>
              <p className="text-slate-500 text-sm font-medium tracking-wide">CROUCHETS HEADQUARTERS</p>
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={logout}
            className="px-6 py-2.5 rounded-xl bg-slate-100/80 text-slate-600 font-semibold text-sm hover:bg-red/10 hover:text-red transition-all duration-300 border border-transparent hover:border-red/20"
          >
            Sign Out →
          </motion.button>
        </motion.div>

        {/* Analytics Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Assortment', value: stats.total, icon: '📦', color: 'bg-slate-800 text-white', glow: 'shadow-slate-800/30' },
            { label: 'Units Available', value: stats.inStock, icon: '✨', color: 'bg-teal/10 text-teal-800', glow: 'shadow-teal/20 border-teal/10 border' },
            { label: 'Out of Stock', value: stats.outOfStock, icon: '🚨', color: 'bg-red/10 text-red-800', glow: 'shadow-red/20 border-red/10 border' },
            { label: 'Total Inquiries', value: stats.orders, icon: '💌', color: 'bg-orange-50 text-orange-800', glow: 'shadow-orange-500/10 border-orange-200 border' },
          ].map((stat, i) => (
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className={`p-6 rounded-3xl flex flex-col justify-between shadow-xl ${stat.color} ${stat.glow} transition-all duration-500 hover:-translate-y-1 relative overflow-hidden`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold tracking-wider opacity-80 uppercase">{stat.label}</span>
                <span className="text-2xl drop-shadow-sm">{stat.icon}</span>
              </div>
              <span className="text-5xl font-playfair font-black tracking-tighter">{stat.value}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add Product Form - Premium Glass Form */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-4 bg-white/80 backdrop-blur-2xl p-8 rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-white h-fit relative"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/60 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="font-playfair text-2xl font-bold mb-1 tracking-tight text-dark">Add New Piece</h2>
              <p className="text-slate-500 text-sm mb-8 font-medium">Expand your handcrafted collection</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="group">
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider transition-colors group-focus-within:text-teal">Product Title</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50/50 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-all border border-slate-200 text-slate-800 font-medium" />
                </div>
                
                <div className="group">
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider transition-colors group-focus-within:text-teal">Description</label>
                  <textarea required rows={2} name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-slate-50/50 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-all border border-slate-200 text-slate-800 font-medium resize-none"></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider transition-colors group-focus-within:text-teal">Price (₹)</label>
                    <input required type="number" min={0} name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-slate-50/50 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-all border border-slate-200 text-slate-800 font-medium" />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider transition-colors group-focus-within:text-teal">Stock Count</label>
                    <input required type="number" min={0} name="stock" value={formData.stock} onChange={handleInputChange} className="w-full bg-slate-50/50 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-all border border-slate-200 text-slate-800 font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider transition-colors group-focus-within:text-teal">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-slate-50/50 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-all border border-slate-200 text-slate-800 font-medium appearance-none">
                      <option value="Keychain">Keychain</option>
                      <option value="Bag Charm">Bag Charm</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider transition-colors group-focus-within:text-teal">Variants</label>
                    <input name="variants" placeholder="e.g. Red, Pink" value={formData.variants} onChange={handleInputChange} className="w-full bg-slate-50/50 px-4 py-3 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-all border border-slate-200 text-slate-800 font-medium" />
                  </div>
                </div>

                <div className="group pt-2">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl hover:bg-slate-50 hover:border-teal/50 transition-all cursor-pointer overflow-hidden relative">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="text-2xl mb-2">📸</span>
                        <p className="mb-1 text-sm text-slate-500 font-medium">Click to upload image</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>

                <div className="flex items-center gap-3 mt-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="relative w-12 h-6 rounded-full bg-slate-200 peer-focus:outline-none overflow-hidden hover:cursor-pointer">
                    <input type="checkbox" id="inStock" name="inStock" checked={formData.inStock} onChange={handleInputChange} className="sr-only peer" />
                    <div className={`absolute top-0.5 left-[2px] w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-full shadow-sm ${formData.inStock ? 'translate-x-[24px]' : ''}`}></div>
                    <div className={`absolute inset-0 transition-colors ${formData.inStock ? 'bg-teal' : 'bg-slate-300'}`}></div>
                  </div>
                  <label htmlFor="inStock" className="text-sm font-bold tracking-wide text-slate-600 cursor-pointer select-none">Piece is currently available</label>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full mt-6 py-4 bg-dark text-white rounded-2xl font-bold tracking-wide shadow-xl shadow-dark/20 hover:bg-black transition-all"
                >
                  Confirm & Add to Gallery
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Product Gallery (Table Replacement) */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-8 bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-white overflow-hidden flex flex-col h-[85vh]"
          >
            <div className="p-8 border-b border-slate-100/50 bg-white/50">
              <h2 className="font-playfair text-2xl font-bold tracking-tight text-dark">Live Inventory</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Manage standard and custom keychain pieces</p>
            </div>

            <div className="flex-grow overflow-y-auto p-4 sm:p-8 space-y-4 rounded-b-[2rem]">
              <AnimatePresence>
                {products.map((p) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, height: 0 }}
                    key={p.id} 
                    className="group bg-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-stretch gap-6 shadow-sm border border-slate-100/50 hover:shadow-lg hover:border-teal/20 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Status edge indicator */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors ${p.inStock ? 'bg-teal' : 'bg-red'}`}></div>

                    <div className="w-24 h-24 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-center text-center sm:text-left">
                      <div className="flex items-center gap-3 mb-1 justify-center sm:justify-start">
                        <h3 className="font-bold text-slate-800 text-lg">{p.name}</h3>
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider rounded-lg">
                          {p.category}
                        </span>
                      </div>
                      <p className="text-xl font-playfair font-black text-dark/90 mb-2">₹{p.price}</p>
                      
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-auto">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${p.inStock ? 'bg-teal/5 text-teal-700 border-teal/10' : 'bg-red/5 text-red-700 border-red/10'}`}>
                          {p.inStock ? 'Available' : 'Sold Out'}
                        </span>
                        <span className="text-sm font-medium text-slate-400">
                          &bull; {p.stock} units
                        </span>
                        {p.variants && p.variants.length > 0 && (
                          <span className="text-xs font-semibold text-slate-400 border border-slate-200 px-2 py-0.5 rounded-md ml-1">
                            {p.variants.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center justify-center gap-3 sm:gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
                      <button 
                        onClick={() => toggleAvailability(p.id)}
                        className={`px-4 py-2 w-full text-sm font-bold rounded-xl transition-colors ${p.inStock ? 'text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-dark' : 'text-teal-700 bg-teal/10 hover:bg-teal/20'}`}
                      >
                        {p.inStock ? 'Mark Sold' : 'Restock'}
                      </button>
                      <button 
                        onClick={() => {
                          if(window.confirm('Delete this product?')) deleteProduct(p.id);
                        }}
                        className="px-4 py-2 w-full text-sm font-bold text-red-500 bg-red-50/50 hover:bg-red border border-transparent hover:text-white rounded-xl transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
                
                {products.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl mb-4 flex items-center justify-center text-4xl shadow-inner border border-slate-100">🧶</div>
                    <h3 className="font-playfair text-2xl font-bold text-slate-300">Inventory is empty</h3>
                    <p className="text-slate-400 font-medium mt-1">Start by adding a handcrafted piece on the left.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
