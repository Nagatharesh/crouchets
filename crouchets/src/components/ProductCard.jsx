import React from 'react';
import { motion } from 'framer-motion';

export const ProductCard = ({ product, onOrder }) => {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-warm/50 flex flex-col h-full transition-shadow duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-warm/30">
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1584062590059-00918073b64c?auto=format&fit=crop&q=80&w=400&h=400'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          {product.inStock && product.stock > 0 ? (
            <span className="px-3 py-1 bg-teal/10 text-teal text-xs font-semibold rounded-full backdrop-blur-md border border-teal/20">
              In Stock
            </span>
          ) : (
            <span className="px-3 py-1 bg-red/10 text-red text-xs font-semibold rounded-full backdrop-blur-md border border-red/20">
              Out of Stock
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair text-xl font-semibold leading-tight">{product.name}</h3>
          <p className="font-sans font-medium text-dark">₹{product.price}</p>
        </div>
        
        <p className="text-mid text-sm mb-6 flex-grow">{product.description}</p>
        
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onOrder(product)}
          disabled={!product.inStock}
          className={`w-full py-3 rounded-xl font-medium transition-colors ${
            product.inStock 
              ? 'bg-dark text-white hover:bg-black' 
              : 'bg-warm text-mid cursor-not-allowed hidden'
          }`}
        >
          {product.inStock ? 'Order Now' : 'Sold Out'}
        </motion.button>
      </div>
    </motion.div>
  );
};
