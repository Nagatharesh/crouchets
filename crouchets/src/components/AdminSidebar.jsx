import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingCart, PackageSearch, Users, DollarSign, RotateCcw, LogOut } from 'lucide-react';

export const AdminSidebar = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { to: '/admin/orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { to: '/admin/products', label: 'Products', icon: <PackageSearch size={20} /> },
    { to: '/admin/customers', label: 'Customers', icon: <Users size={20} /> },
    { to: '/admin/revenue', label: 'Revenue', icon: <DollarSign size={20} /> },
    { to: '/admin/refunds', label: 'Refunds', icon: <RotateCcw size={20} /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-dark text-white p-6 flex flex-col">
      <Link to="/" className="font-playfair text-2xl font-bold tracking-tight mb-12 flex items-center">
        Crouchets<span className="text-red ml-1">.</span>
        <span className="text-[10px] ml-2 font-sans font-normal uppercase tracking-widest bg-white/20 px-2 py-1 rounded">Admin</span>
      </Link>
      
      <nav className="flex-1 space-y-2">
        {links.map(link => {
          const isActive = pathname === link.to;
          return (
            <Link 
              key={link.to} 
              to={link.to} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive ? 'bg-white text-dark font-medium shadow-sm' : 'text-warm/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      <button 
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 text-warm/70 hover:text-red transition-colors mt-auto"
      >
        <LogOut size={20} />
        Logout Admin
      </button>
    </div>
  );
};
