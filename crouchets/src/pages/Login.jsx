import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="bg-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-warm/20 border border-warm/30 max-w-md w-full">
        <h1 className="font-playfair text-4xl font-bold text-dark mb-2 text-center">Welcome Back.</h1>
        <p className="text-mid text-center mb-8">Log in to view your orders and fast checkout.</p>
        
        {error && <div className="bg-red/10 text-red text-sm p-4 rounded-xl mb-6 font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-mid uppercase tracking-widest mb-2">Email</label>
            <input 
              required type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-warm/20 border border-warm/50 focus:border-teal outline-none transition-colors" 
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-mid uppercase tracking-widest mb-2">Password</label>
            <input 
              required type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-warm/20 border border-warm/50 focus:border-teal outline-none transition-colors" 
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="w-full py-4 bg-dark text-white rounded-xl font-bold text-lg shadow-xl shadow-dark/20 hover:bg-black transition-all">
            Log In
          </button>
        </form>
        
        <p className="text-center text-sm text-mid mt-8">
          Don't have an account? <Link to="/register" className="text-teal font-bold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};
