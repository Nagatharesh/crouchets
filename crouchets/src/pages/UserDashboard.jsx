import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Navbar } from '../components/Navbar';

export const UserDashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const { orders } = useCart();

  if (!isAuthenticated || user?.role === 'admin') {
    return <Navigate to="/login" replace />;
  }

  // Get user's orders
  const userOrders = orders.slice(0, 5);
  
  // Calculate stats
  const stats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, o) => sum + (o.total || 0), 0),
    pendingOrders: orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length,
    deliveredOrders: orders.filter(o => o.status === 'Delivered').length
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-teal/20 text-teal border-teal/30';
      case 'Shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-playfair text-4xl font-bold text-dark mb-2">
            Welcome back, {user?.name || 'there'}! 👋
          </h1>
          <p className="text-mid">
            Here's an overview of your account and recent activity.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-10">
          <Link 
            to="/shop"
            className="px-5 py-2.5 bg-dark text-white rounded-xl font-medium hover:bg-black transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Continue Shopping
          </Link>
          <Link 
            to="/cart"
            className="px-5 py-2.5 bg-warm text-dark rounded-xl font-medium hover:bg-white transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            View Cart
          </Link>
          <Link 
            to="/user/profile"
            className="px-5 py-2.5 bg-warm text-dark rounded-xl font-medium hover:bg-white transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Account Settings
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-warm/50"
          >
            <div className="w-12 h-12 rounded-xl bg-dark/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-sm text-mid mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-dark">{stats.totalOrders}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-warm/50"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-mid mb-1">Total Spent</p>
            <p className="text-3xl font-bold text-dark">₹{stats.totalSpent.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-warm/50"
          >
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-mid mb-1">Pending Orders</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-warm/50"
          >
            <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-mid mb-1">Delivered</p>
            <p className="text-3xl font-bold text-teal">{stats.deliveredOrders}</p>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-warm/50 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-warm/50">
            <h2 className="font-playfair text-xl font-bold text-dark">Recent Orders</h2>
            <Link to="/orders" className="text-sm text-teal hover:text-dark transition-colors font-medium">
              View All →
            </Link>
          </div>
          
          {userOrders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-mid mb-4">No orders yet</p>
              <Link 
                to="/shop"
                className="px-6 py-2.5 bg-dark text-white rounded-xl font-medium hover:bg-black transition-colors inline-block"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-warm/50">
              {userOrders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-warm/10 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-warm/30 overflow-hidden">
                        <img 
                          src={order.items?.[0]?.product?.image} 
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-dark">{order.items?.[0]?.product?.name || 'Order'}</p>
                        <p className="text-sm text-mid">
                          {order.items?.length > 1 ? `+${order.items.length - 1} more item(s)` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-bold text-dark">₹{order.total?.toLocaleString()}</p>
                        <p className="text-xs text-mid">{formatDate(order.date)}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-2xl shadow-sm border border-warm/50 p-6"
        >
          <h2 className="font-playfair text-xl font-bold text-dark mb-4">Account Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-mid mb-1">Name</p>
              <p className="font-medium text-dark">{user?.name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-mid mb-1">Email</p>
              <p className="font-medium text-dark">{user?.email || 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-mid mb-1">Account Type</p>
              <p className="font-medium text-dark capitalize">{user?.role || 'user'}</p>
            </div>
            <div>
              <p className="text-sm text-mid mb-1">Member Since</p>
              <p className="font-medium text-dark">N/A</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
