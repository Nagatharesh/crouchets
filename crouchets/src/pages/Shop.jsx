import React from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';

export const Shop = () => {
  const { products } = useProducts();

  return (
    <div className="min-h-screen bg-cream py-16 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-playfair text-5xl text-dark mb-4">All Products.</h1>
        <p className="font-sans text-mid text-lg mb-12 max-w-xl">
          Browse our full collection of handmade charms, keychains, and plushies. Each piece is unique and looking for a loving home.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
