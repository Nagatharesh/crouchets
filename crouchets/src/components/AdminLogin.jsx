import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError(true);
      setTimeout(() => setError(false), 500); // reset for next shake
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-cream">
      <div className="text-center mb-10">
        <h1 className="font-playfair italic text-4xl font-semibold tracking-wide flex items-center justify-center gap-3">
          <span>Crouchets Admin</span>
          <span className="text-red">🍒</span>
        </h1>
        <p className="text-mid mt-3 text-sm tracking-widest uppercase">Management Portal</p>
      </div>

      <motion.form 
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm border border-warm w-full max-w-md"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-mid mb-2">Username</label>
            <input 
              required
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl bg-cream border transition-all ${error ? 'border-red/50 focus:ring-red' : 'border-warm focus:ring-dark focus:border-transparent'} outline-none focus:ring-2`}
              placeholder="crouchets_admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-mid mb-2">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl bg-cream border transition-all ${error ? 'border-red/50 focus:ring-red' : 'border-warm focus:ring-dark focus:border-transparent'} outline-none focus:ring-2`}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red text-sm font-medium text-center">Invalid username or password.</p>
          )}

          <motion.button 
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="w-full py-3 bg-dark text-white rounded-xl font-medium mt-4 hover:bg-black transition-colors"
          >
            Access Dashboard
          </motion.button>
        </div>
      </motion.form>
      
      <p className="mt-8 text-sm text-mid/80">
        Return to <a href="/" className="underline hover:text-dark">Storefront</a>
      </p>
    </div>
  );
};
