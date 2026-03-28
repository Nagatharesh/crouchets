import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = register(name, email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[90vh] bg-cream flex items-center justify-center p-6">
      <div className="bg-white p-10 md:p-14 rounded-[2rem] shadow-xl shadow-warm/20 border border-warm/30 max-w-md w-full">
        <h1 className="font-playfair text-4xl font-bold text-dark mb-2 text-center">Join Us.</h1>
        <p className="text-mid text-center mb-8">Create an account to track your adorable companions.</p>
        
        {error && <div className="bg-red/10 text-red text-sm p-4 rounded-xl mb-6 font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-mid uppercase tracking-widest mb-2">Full Name</label>
            <input 
              required type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-warm/20 border border-warm/50 focus:border-teal outline-none transition-colors" 
              placeholder="Jane Doe"
            />
          </div>
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
          
          <button type="submit" className="w-full py-4 bg-teal text-white rounded-xl font-bold text-lg shadow-xl shadow-teal/20 hover:bg-teal-600 transition-all">
            Create Account
          </button>
        </form>
        
        <p className="text-center text-sm text-mid mt-8">
          Already have an account? <Link to="/login" className="text-dark font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};
