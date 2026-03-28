import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../../context/ProductContext';
import { AdminLayout } from './AdminLayout';

export const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleAvailability } = useProducts();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStock, setFilterStock] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Keychain',
    variants: '',
    stock: '',
    inStock: true,
    image: ''
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStock = filterStock === 'all' ||
      (filterStock === 'inStock' && product.inStock) ||
      (filterStock === 'outOfStock' && !product.inStock);
    return matchesSearch && matchesStock;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Keychain',
      variants: '',
      stock: '',
      inStock: true,
      image: ''
    });
    setEditingProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      variants: product.variants?.join(', ') || '',
      stock: product.stock.toString(),
      inStock: product.inStock,
      image: product.image || ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
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
    
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      variants: formData.variants.split(',').map(s => s.trim()).filter(Boolean),
      stock: parseInt(formData.stock, 10) || 0,
      inStock: formData.inStock,
      image: formData.image || 'https://images.unsplash.com/photo-1584062590059-00918073b64c?auto=format&fit=crop&q=80&w=400&h=400',
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    
    closeModal();
  };

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      deleteProduct(productId);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Products</h1>
            <p className="text-slate-400 text-sm mt-1">Manage your crochet product inventory</p>
          </div>
          <button 
            onClick={openAddModal}
            className="px-5 py-2.5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-sm font-bold rounded-lg shadow-lg shadow-purple-500/20 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#15152a] rounded-xl p-4 border border-white/[0.03]">
            <p className="text-slate-400 text-xs mb-1">Total Products</p>
            <p className="text-2xl font-bold text-white">{products.length}</p>
          </div>
          <div className="bg-[#15152a] rounded-xl p-4 border border-white/[0.03]">
            <p className="text-slate-400 text-xs mb-1">In Stock</p>
            <p className="text-2xl font-bold text-[#10b981]">{products.filter(p => p.inStock).length}</p>
          </div>
          <div className="bg-[#15152a] rounded-xl p-4 border border-white/[0.03]">
            <p className="text-slate-400 text-xs mb-1">Out of Stock</p>
            <p className="text-2xl font-bold text-red-400">{products.filter(p => !p.inStock).length}</p>
          </div>
          <div className="bg-[#15152a] rounded-xl p-4 border border-white/[0.03]">
            <p className="text-slate-400 text-xs mb-1">Total Value</p>
            <p className="text-2xl font-bold text-white">₹{products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center bg-[#15152a] rounded-lg border border-white/5 px-4 py-2">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm ml-3 text-slate-200 placeholder-slate-500 w-full"
            />
          </div>
          <select 
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            className="bg-[#15152a] text-slate-200 border border-white/5 rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500"
          >
            <option value="all">All Products</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>

        {/* Products Table */}
        <div className="bg-[#15152a] rounded-xl border border-white/[0.03] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Product</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-6 py-4 hidden md:table-cell">Category</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Price</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Stock</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-6 py-4 hidden lg:table-cell">Status</th>
                  <th className="text-right text-xs font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1584062590059-00918073b64c?auto=format&fit=crop&q=80&w=100&h=100'}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate">{product.name}</p>
                            <p className="text-xs text-slate-500 truncate max-w-[200px]">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="px-2.5 py-1 bg-white/5 text-slate-300 text-xs rounded-full">{product.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-white">₹{product.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={product.inStock ? 'text-[#10b981]' : 'text-red-400'}>{product.stock}</span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <button
                          onClick={() => toggleAvailability(product.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            product.inStock 
                              ? 'bg-[#10b981]/20 text-[#10b981] hover:bg-[#10b981]/30' 
                              : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                          }`}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={closeModal}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
              >
                <div className="bg-[#1a1a35] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="space-y-5">
                      {/* Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Product Image</label>
                        <div className="flex items-start gap-4">
                          {formData.image && (
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/5">
                              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex-1">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="image-upload"
                            />
                            <label
                              htmlFor="image-upload"
                              className="flex items-center justify-center px-4 py-3 bg-white/5 border border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-sm text-slate-400"
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              Upload Image
                            </label>
                            <p className="text-xs text-slate-500 mt-2">Or paste an image URL below</p>
                          </div>
                        </div>
                        <input
                          type="url"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          placeholder="https://example.com/image.jpg"
                          className="mt-3 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500"
                        />
                      </div>

                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Product Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Classic Cherry Keychain"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Description *</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          placeholder="Describe the product..."
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500 resize-none"
                        />
                      </div>

                      {/* Price and Stock */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Price (₹) *</label>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                            min="0"
                            placeholder="350"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Stock Quantity *</label>
                          <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            required
                            min="0"
                            placeholder="10"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      {/* Category and Variants */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Category *</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                          >
                            <option value="Keychain">Keychain</option>
                            <option value="Bag Charm">Bag Charm</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Custom">Custom</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Variants</label>
                          <input
                            type="text"
                            name="variants"
                            value={formData.variants}
                            onChange={handleInputChange}
                            placeholder="Red, Blue, Green"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      {/* In Stock Toggle */}
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="inStock"
                          id="inStock"
                          checked={formData.inStock}
                          onChange={handleInputChange}
                          className="w-5 h-5 rounded border-white/20 bg-white/5 text-purple-500 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                        />
                        <label htmlFor="inStock" className="text-sm text-slate-300">
                          Mark as In Stock
                        </label>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-white/5">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-5 py-2.5 text-slate-300 hover:text-white text-sm font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-sm font-bold rounded-lg shadow-lg shadow-purple-500/20 transition-colors"
                      >
                        {editingProduct ? 'Update Product' : 'Add Product'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};
