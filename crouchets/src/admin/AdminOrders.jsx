import React from 'react';
import { useOrders } from '../context/OrderContext';

export const AdminOrders = () => {
  const { orders, updateOrderStatus, deleteOrder } = useOrders();

  const statusOptions = ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];

  return (
    <div>
      <h1 className="font-playfair text-4xl font-bold text-dark mb-8">Manage Orders</h1>
      
      <div className="bg-white rounded-3xl shadow-sm border border-warm/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-warm/20 border-b border-warm/50">
              <tr className="text-mid uppercase text-xs tracking-widest">
                <th className="py-4 px-6 font-bold">Order ID & Date</th>
                <th className="py-4 px-6 font-bold">Customer</th>
                <th className="py-4 px-6 font-bold">Total</th>
                <th className="py-4 px-6 font-bold">Status</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-warm/20 hover:bg-warm/5 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-dark">{order.id}</p>
                    <p className="text-xs text-mid">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-dark">{order.customerDetails?.name || 'Guest'}</p>
                    <p className="text-xs text-mid">{order.customerDetails?.email}</p>
                  </td>
                  <td className="py-4 px-6 font-bold text-dark">₹{order.total}</td>
                  <td className="py-4 px-6">
                    <select
                      className="px-3 py-2 bg-cream border border-warm rounded-lg text-sm font-bold uppercase tracking-wider text-teal focus:outline-none"
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      {statusOptions.map(s => (
                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => { if(window.confirm('Are you sure?')) deleteOrder(order.id) }} 
                      className="text-xs font-bold uppercase tracking-wider text-red hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan="5" className="py-12 text-center text-mid">No orders to manage.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
