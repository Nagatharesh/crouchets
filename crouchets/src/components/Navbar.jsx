import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, User, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-warm/30 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-playfair text-2xl font-bold tracking-tight text-dark flex items-center">
          Crouchets<span className="text-red ml-1">.</span>
        </Link>
        
        <div className="flex items-center gap-6 text-sm font-medium text-mid">
          <Link to="/shop" className="hover:text-dark transition-colors">Shop</Link>
          
          {user ? (
            <>
              <Link to="/orders" className="hover:text-dark transition-colors">Orders</Link>
              <div className="flex items-center gap-4 border-l border-warm pl-6">
                <span className="flex items-center gap-2"><User size={16}/> {user.name}</span>
                <button onClick={logout} className="hover:text-red transition-colors" title="Logout">
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="border-l border-warm pl-6">
              <Link to="/login" className="hover:text-dark transition-colors">Login</Link>
            </div>
          )}

          <Link to="/cart" className="relative flex items-center justify-center p-2 hover:bg-warm/50 rounded-full transition-colors group">
            <ShoppingBag size={20} className="text-dark group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-teal text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};
