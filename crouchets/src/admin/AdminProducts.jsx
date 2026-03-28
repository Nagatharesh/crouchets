import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export const AdminProducts = () => {
  const { products, toggleAvailability, deleteProduct, addProduct } = useProducts();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    stock: 10,
    images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&h=600&fit=crop'],
    inStock: true
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addProduct({
      ...newProduct,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock)
    });
    setShowAddForm(false);
    setNewProduct({ name: '', price: '', category: '', description: '', stock: 10, images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&h=600&fit=crop'], inStock: true });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-playfair text-4xl font-bold text-dark">Manage Products</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-xl shadow-md hover:bg-black font-medium transition-colors"
        >
          <Plus size={20} /> {showAddForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-warm/30 mb-8">
          <h2 className="font-playfair text-2xl font-bold text-dark mb-6">New Product Details</h2>
          <form onSubmit={handleAddSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div><label className="block text-xs uppercase text-mid font-bold mb-2">Name</label><input required className="w-full p-3 bg-cream border border-warm rounded-xl outline-none focus:border-teal" value={newProduct.name} onChange={e=>setNewProduct({...newProduct, name: e.target.value})} /></div>
              <div><label className="block text-xs uppercase text-mid font-bold mb-2">Price (₹)</label><input required type="number" className="w-full p-3 bg-cream border border-warm rounded-xl outline-none focus:border-teal" value={newProduct.price} onChange={e=>setNewProduct({...newProduct, price: e.target.value})} /></div>
              <div><label className="block text-xs uppercase text-mid font-bold mb-2">Category</label><input required className="w-full p-3 bg-cream border border-warm rounded-xl outline-none focus:border-teal" value={newProduct.category} onChange={e=>setNewProduct({...newProduct, category: e.target.value})} /></div>
              <div><label className="block text-xs uppercase text-mid font-bold mb-2">Initial Stock</label><input required type="number" className="w-full p-3 bg-cream border border-warm rounded-xl outline-none focus:border-teal" value={newProduct.stock} onChange={e=>setNewProduct({...newProduct, stock: e.target.value})} /></div>
              <div className="md:col-span-2"><label className="block text-xs uppercase text-mid font-bold mb-2">Image URL</label><input required type="url" className="w-full p-3 bg-cream border border-warm rounded-xl outline-none focus:border-teal" value={newProduct.images[0]} onChange={e=>setNewProduct({...newProduct, images: [e.target.value]})} /></div>
            </div>
            <div>
              <label className="block text-xs uppercase text-mid font-bold mb-2">Description</label>
              <textarea required rows={3} className="w-full p-3 bg-cream border border-warm rounded-xl outline-none focus:border-teal" value={newProduct.description} onChange={e=>setNewProduct({...newProduct, description: e.target.value})}></textarea>
            </div>
            <button type="submit" className="px-8 py-3 bg-teal text-white font-bold rounded-xl shadow-md hover:bg-teal-600 transition-colors">Save Product</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-warm/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-warm/20 border-b border-warm/50">
              <tr className="text-mid uppercase text-xs tracking-widest">
                <th className="py-4 px-6 font-bold">Product</th>
                <th className="py-4 px-6 font-bold">Price</th>
                <th className="py-4 px-6 font-bold">Category</th>
                <th className="py-4 px-6 font-bold text-center">In Stock</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-warm/20 hover:bg-warm/5 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-4">
                    <img src={product.images[0]} className="w-12 h-12 rounded-lg object-cover bg-warm" />
                    <div>
                      <p className="font-bold text-dark">{product.name}</p>
                      <p className="text-xs text-mid truncate max-w-[200px]">{product.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-dark">₹{product.price}</td>
                  <td className="py-4 px-6 text-sm text-mid">{product.category}</td>
                  <td className="py-4 px-6 text-center">
                    <button 
                      onClick={() => toggleAvailability(product.id)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${product.inStock ? 'bg-teal' : 'bg-warm/50 border border-warm'}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${product.inStock ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </td>
                  <td className="py-4 px-6 text-right space-x-4">
                    <button onClick={() => {if(window.confirm('Delete product?')) deleteProduct(product.id)}} className="text-mid hover:text-red transition-colors"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
