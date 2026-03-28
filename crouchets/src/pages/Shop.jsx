import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { ProductCard } from '../components/ProductCard';
import { OrderModal } from '../components/OrderModal';
import { useProducts } from '../context/ProductContext';

export const Shop = () => {
  const { products } = useProducts();
  const [filter, setFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = ['All', 'In Stock', 'Out of Stock'];

  const filteredProducts = products.filter(p => {
    if (filter === 'In Stock') return p.inStock;
    if (filter === 'Out of Stock') return !p.inStock;
    return true;
  });

  const handleOrder = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col pt-24">
      <Navbar />

      <main className="flex-grow px-6 lg:px-24 py-12 max-w-7xl mx-auto w-full">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-dark mb-4 text-center md:text-left">
              The Collection
            </h1>
            <p className="text-mid max-w-lg text-center md:text-left">
              Explore our handmade crochet pieces. Each item is carefully crafted to add a little joy to your everyday.
            </p>
          </div>
          
          <div className="flex gap-2 p-1 bg-warm/50 rounded-xl backdrop-blur-sm self-center md:self-end">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  filter === f 
                    ? 'bg-white text-dark shadow-sm' 
                    : 'text-mid hover:text-dark'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map(product => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
              >
                <ProductCard product={product} onOrder={handleOrder} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-32 h-32 bg-warm rounded-full mb-6 flex items-center justify-center text-4xl transform -rotate-12 hover:rotate-12 transition-transform duration-500">
              🧶
            </div>
            <h3 className="font-playfair text-2xl font-bold text-dark mb-2">No items found</h3>
            <p className="text-mid">New drops coming soon — check back!</p>
          </motion.div>
        )}

      </main>

      {/* Order Modal */}
      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
      />
    </div>
  );
};
