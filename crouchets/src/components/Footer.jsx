import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-dark text-warm/70 py-16 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-playfair text-2xl font-bold text-cream mb-4 flex items-center">
            Crouchets<span className="text-red ml-1">.</span>
          </h3>
          <p className="font-sans text-sm max-w-sm mb-6 leading-relaxed">
            Premium handmade crochet keychains and charms. Crafted with love, one tiny stitch at a time.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-warm/30 hover:bg-white/10 cursor-pointer transition-colors">IG</div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-warm/30 hover:bg-white/10 cursor-pointer transition-colors">TT</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 font-playfair tracking-wide uppercase text-sm">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Keychains</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Charms</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 font-playfair tracking-wide uppercase text-sm">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>© {new Date().getFullYear()} Crouchets. All rights reserved.</p>
        <Link to="/admin" className="mt-4 md:mt-0 opacity-30 hover:opacity-100 transition-opacity uppercase tracking-widest font-bold">Admin</Link>
      </div>
    </footer>
  );
};
