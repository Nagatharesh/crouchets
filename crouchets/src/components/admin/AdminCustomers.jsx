import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { AdminLayout } from './AdminLayout';

export const AdminCustomers = () => {
  const { orders } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Extract unique customers from orders
  const customers = useMemo(() => {
    const customerMap = new Map();
    
    orders.forEach(order => {
      const email = order.address?.split(',').pop()?.trim() || 'guest@crouchets.com';
      const name = order.address?.split(',')[0]?.trim() || 'Guest User';
      
      if (!customerMap.has(email)) {
        customerMap.set(email, {
          id: email,
          name: name,
          email: email,
          totalOrders: 0,
          totalSpent: 0,
          lastOrder: null,
          orders: []
        });
      }
      
      const customer = customerMap.get(email);
      customer.totalOrders += 1;
      customer.totalSpent += order.total || 0;
      if (!customer.lastOrder || new Date(order.date) > new Date(customer.lastOrder)) {
        customer.lastOrder = order.date;
      }
      customer.orders.push(order);
    });
    
    return Array.from(customerMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  }, [orders]);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const stats = {
    total: customers.length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue: customers.length > 0 
      ? Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length) 
      : 0
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Customers</h1>
            <p className="text-slate-400 text-sm mt-1">View and manage your customer base</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-[#15152a] rounded-xl p-4 border border-white/[0.03]">
            <p className="text-slate-400 text-xs mb-1">Total Customers</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-[#15152a] rounded-xl p-4 border border-white/[0.03]">
            <p className="text-slate-400 text-xs mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-emerald-400">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-[#15152a] rounded-xl p-4 border border-white/[0.03]">
            <p className="text-slate-400 text-xs mb-1">Avg. Order Value</p>
            <p className="text-2xl font-bold text-purple-400">₹{stats.avgOrderValue.toLocaleString()}</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center bg-[#15152a] rounded-lg border border-white/5 px-4 py-2">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm ml-3 text-slate-200 placeholder-slate-500 w-full"
          />
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500">
              No customers found
            </div>
          ) : (
            filteredCustomers.map((customer, index) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#15152a] rounded-xl p-5 border border-white/[0.03] hover:border-purple-500/30 transition-all cursor-pointer group"
                onClick={() => setSelectedCustomer(customer)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate group-hover:text-purple-400 transition-colors">
                      {customer.name}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">{customer.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Total Orders</span>
                    <span className="text-sm font-bold text-white">{customer.totalOrders}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Total Spent</span>
                    <span className="text-sm font-bold text-emerald-400">₹{customer.totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Last Order</span>
                    <span className="text-xs text-slate-400">{formatDate(customer.lastOrder)}</span>
                  </div>
                </div>

                {/* Order Status Breakdown */}
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-xs text-slate-500 mb-2">Order History</p>
                  <div className="flex gap-2 flex-wrap">
                    {customer.orders.slice(0, 3).map((order, i) => (
                      <span 
                        key={i}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                          order.status === 'Shipped' ? 'bg-purple-500/20 text-purple-400' :
                          order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                          order.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {order.status}
                      </span>
                    ))}
                    {customer.orders.length > 3 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-slate-400">
                        +{customer.orders.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Customer Detail Sidebar */}
        {selectedCustomer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setSelectedCustomer(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#1a1a35] border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#1a1a35] border-b border-white/5 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Customer Details</h2>
                  <p className="text-sm text-slate-400 mt-1">{selectedCustomer.name}</p>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div className="bg-white/5 rounded-xl p-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl mb-4">
                    {selectedCustomer.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{selectedCustomer.name}</h3>
                  <p className="text-sm text-slate-400 mb-4">{selectedCustomer.email}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <p className="text-xs text-slate-500">Total Orders</p>
                      <p className="text-xl font-bold text-white">{selectedCustomer.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Total Spent</p>
                      <p className="text-xl font-bold text-emerald-400">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white/5 rounded-xl p-5">
                  <p className="text-sm font-bold text-slate-300 mb-3">Shipping Address</p>
                  <p className="text-slate-400 text-sm">
                    {selectedCustomer.orders[0]?.address || 'No address on file'}
                  </p>
                </div>

                {/* Order History */}
                <div>
                  <p className="text-sm font-bold text-slate-300 mb-3">Order History</p>
                  <div className="space-y-3">
                    {selectedCustomer.orders.map((order, index) => (
                      <div key={index} className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs text-purple-400">{order.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                            order.status === 'Shipped' ? 'bg-purple-500/20 text-purple-400' :
                            order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                            order.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">{formatDate(order.date)}</span>
                          <span className="font-bold text-white">₹{order.total?.toLocaleString()}</span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/5">
                          <p className="text-xs text-slate-400">
                            {order.items?.length} item(s): {order.items?.map(i => i.product?.name).join(', ')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};
