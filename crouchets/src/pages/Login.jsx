import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If the user was redirected here from Checkout, send them back after login
  const from = location.state?.from?.pathname || '/orders';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Mock login always succeeds for demo
      loginUser(email, password);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 border border-warm/20">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-3xl font-bold text-dark mb-2">Welcome Back</h1>
            <p className="text-mid font-medium">Sign in to your Crouchets account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Email Address</label>
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-all font-medium" 
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Password</label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-teal/30 focus:border-teal/50 transition-all font-medium" 
                placeholder="••••••••"
              />
              <p className="text-xs text-slate-400 mt-2">*For demo purposes, any password will work.</p>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 mt-4 bg-teal text-white rounded-xl font-bold tracking-wide shadow-lg shadow-teal/20 hover:bg-teal-700 hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-slate-500">
            Don't have an account? <span className="text-teal hover:underline cursor-pointer">Sign up (Demo)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
