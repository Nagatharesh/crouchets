import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-warm/30"
    >
      <div className="relative aspect-square overflow-hidden bg-warm/20">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute top-4 left-4 bg-dark/90 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
            Sold Out
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-mid uppercase tracking-widest font-semibold mb-1">{product.category}</p>
            <h3 className="font-playfair text-xl font-medium text-dark">{product.name}</h3>
          </div>
          <p className="font-sans font-medium text-dark">₹{product.price}</p>
        </div>
        <p className="text-sm text-mid mt-2 flex-grow">{product.description}</p>
        
        <button 
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className={`mt-6 w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${
            product.inStock 
            ? 'bg-dark text-white shadow-md hover:bg-black' 
            : 'bg-warm text-mid cursor-not-allowed'
          }`}
        >
          <ShoppingBag size={18} />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </motion.div>
  );
};
