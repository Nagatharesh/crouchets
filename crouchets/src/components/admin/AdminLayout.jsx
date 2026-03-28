import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { name: 'Products', path: '#', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { name: 'Customers', path: '#', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { name: 'Orders', path: '#', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
];

export const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#0c0c1e] text-slate-300 font-sans selection:bg-purple-500/30">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c0c1e] border-r border-white/5 flex flex-col shrink-0 min-h-screen sticky top-0 hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3 w-full">
            <span className="text-xl">🦅</span> 
            <span className="font-bold text-white tracking-wide">CROUCHETS</span>
          </div>
        </div>

        <div className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`flex items-center gap-4 px-6 py-3 transition-colors ${location.pathname === link.path ? 'bg-purple-600/10 text-white border-l-4 border-purple-500' : 'hover:bg-white/5 hover:text-white border-l-4 border-transparent'}`}
            >
              <svg className={`w-5 h-5 ${location.pathname === link.path ? 'text-purple-400' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
              </svg>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
          
          <div className="px-6 py-4 mt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Settings</p>
            <button onClick={logout} className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors w-full text-left">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0c0c1e]/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center bg-white/5 rounded-lg border border-white/5 px-4 py-2 w-64 md:w-96">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm ml-3 text-slate-200 placeholder-slate-500 w-full" />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <svg className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#0c0c1e]">4</span>
            </div>
            <div className="relative">
              <svg className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#0c0c1e]">17</span>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20 ml-2"></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>

      </div>
    </div>
  );
};
