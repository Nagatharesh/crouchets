import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { AdminLayout } from './AdminLayout';

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const STATUS_COLORS = {
  'Pending': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: '⏳' },
  'Processing': { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: '⚙️' },
  'Shipped': { bg: 'bg-purple-500/20', text: 'text-purple-400', icon: '🚚' },
  'Delivered': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', icon: '✅' },
  'Cancelled': { bg: 'bg-red-500/20', text: 'text-red-400', icon: '❌' }
};

export const AdminOrders = () => {
  const { orders, updateOrderStatus } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items?.some(item => item.product?.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    revenue: orders.reduce((sum, o) => sum + (o.total || 0), 0)
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Orders</h1>
            <p className="text-slate-400 text-sm mt-1">Manage and track customer orders</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-[#15152a] rounded-xl p-4 border border-white/[0.03]">
            <p className="text-slate-400 text-xs mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-[#15152a] rounded-xl p-4 border border-white/[0.03]">
            <p className="text-slate-400 text-xs mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
          </div>
          <div className="bg-[#15152a] rounded-xl p-4 border border-white/[0.03]">
            <p className="text-slate-400 text-xs mb-1">Processing</p>
            <p className="text-2xl font-bold text-blue-400">{stats.processing}</p>
          </div>
          <div className="bg-[#15152a] rounded-xl p-4 border border-white/[0.03]">
            <p className="text-slate-400 text-xs mb-1">Delivered</p>
            <p className="text-2xl font-bold text-emerald-400">{stats.delivered}</p>
          </div>
          <div className="bg-[#15152a] rounded-xl p-4 border border-white/[0.03]">
            <p className="text-slate-400 text-xs mb-1">Revenue</p>
            <p className="text-2xl font-bold text-white">₹{stats.revenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center bg-[#15152a] rounded-lg border border-white/5 px-4 py-2">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by order ID, address or product..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm ml-3 text-slate-200 placeholder-slate-500 w-full"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#15152a] text-slate-200 border border-white/5 rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500"
          >
            <option value="all">All Status</option>
            {ORDER_STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-[#15152a] rounded-xl border border-white/[0.03] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Order ID</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-6 py-4 hidden md:table-cell">Date</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Items</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Total</th>
                  <th className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-right text-xs font-bold text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-purple-400">{order.id}</span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-slate-400">{formatDate(order.date)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{order.items?.length || 0}</span>
                          <span className="text-slate-500 text-xs">item(s)</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-white">₹{order.total?.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold outline-none cursor-pointer ${
                            STATUS_COLORS[order.status]?.bg || 'bg-slate-500/20'
                          } ${STATUS_COLORS[order.status]?.text || 'text-slate-400'}`}
                        >
                          {ORDER_STATUSES.map(status => (
                            <option key={status} value={status} className="bg-[#15152a] text-white">
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openOrderDetails(order)}
                            className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm flex items-center gap-1.5"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        <AnimatePresence>
          {isModalOpen && selectedOrder && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={closeModal}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
              >
                <div className="bg-[#1a1a35] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div>
                      <h2 className="text-xl font-bold text-white">Order Details</h2>
                      <p className="text-sm text-slate-400 mt-1 font-mono">{selectedOrder.id}</p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
                    {/* Order Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-xs text-slate-400 mb-1">Order Date</p>
                        <p className="text-white font-medium">{formatDate(selectedOrder.date)}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-xs text-slate-400 mb-1">Status</p>
                        <select
                          value={selectedOrder.status}
                          onChange={(e) => {
                            handleStatusChange(selectedOrder.id, e.target.value);
                            setSelectedOrder({ ...selectedOrder, status: e.target.value });
                          }}
                          className={`w-full px-3 py-1.5 rounded-lg text-sm font-bold outline-none cursor-pointer ${
                            STATUS_COLORS[selectedOrder.status]?.bg || 'bg-slate-500/20'
                          } ${STATUS_COLORS[selectedOrder.status]?.text || 'text-slate-400'}`}
                        >
                          {ORDER_STATUSES.map(status => (
                            <option key={status} value={status} className="bg-[#15152a] text-white">
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-xs text-slate-400 mb-2">Shipping Address</p>
                      <p className="text-white">{selectedOrder.address || 'No address provided'}</p>
                    </div>

                    {/* Order Items */}
                    <div>
                      <p className="text-sm font-bold text-slate-300 mb-3">Order Items</p>
                      <div className="space-y-3">
                        {selectedOrder.items?.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-white/5 shrink-0">
                              <img 
                                src={item.product?.image} 
                                alt={item.product?.name}
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1584062590059-00918073b64c?auto=format&fit=crop&q=80&w=100&h=100'}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-white truncate">{item.product?.name || 'Unknown Product'}</p>
                              <p className="text-xs text-slate-400">
                                Variant: {item.variant || 'Default'} • Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-white">₹{(item.product?.price || 0) * item.quantity}</p>
                              <p className="text-xs text-slate-400">₹{item.product?.price} each</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                      <span className="text-slate-400">Order Total</span>
                      <span className="text-2xl font-bold text-white">₹{selectedOrder.total?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-6 border-t border-white/5">
                    <button
                      onClick={closeModal}
                      className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};
