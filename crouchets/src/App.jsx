import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Admin } from './pages/Admin';
import { Dashboard } from './pages/Dashboard';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            {/* 404 Page */}
            <Route path="*" element={
              <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center p-6">
                <div className="text-6xl mb-6">🧶</div>
                <h1 className="font-playfair text-4xl text-dark mb-4">Looks like this thread went the wrong way!</h1>
                <a href="/" className="px-6 py-2 bg-dark text-white rounded-lg hover:bg-black transition-colors">
                  Back to Home
                </a>
              </div>
            } />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
