import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();

  // Background transitions from transparent -> frosted glass
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(253, 249, 245, 0)', 'rgba(253, 249, 245, 0.4)']
  );

  const backdropFilter = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(16px)']
  );

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const isUser = isAuthenticated && user?.role === 'user';
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.nav
      style={{
        backgroundColor: location.pathname === '/' ? backgroundColor : 'rgba(253, 249, 245, 0.4)',
        backdropFilter: location.pathname === '/' ? backdropFilter : 'blur(16px)',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-shadow duration-300"
    >
      <Link to="/" className="font-playfair italic text-2xl font-semibold tracking-wide flex items-center gap-2">
        <span>Crouchets</span>
        <span className="text-red text-xl">🍒</span>
      </Link>

      <div className="flex gap-4 sm:gap-6 items-center">
        <Link to="/" className="text-mid hover:text-dark transition-colors font-medium">Home</Link>
        <Link to="/shop" className="text-mid hover:text-dark transition-colors font-medium relative group">
          Shop
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark transition-all group-hover:w-full"></span>
        </Link>
        
        {isUser ? (
          <>
            <Link to="/orders" className="text-mid hover:text-dark transition-colors font-medium">Orders</Link>
            <button onClick={logout} className="text-mid hover:text-dark transition-colors font-medium cursor-pointer">Logout</button>
          </>
        ) : (
          <Link to="/login" className="text-mid hover:text-dark transition-colors font-medium">Login</Link>
        )}

        <Link to="/cart" className="relative text-mid hover:text-dark transition-colors ml-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {cartQuantity}
            </span>
          )}
        </Link>
      </div>
    </motion.nav>
  );
};
