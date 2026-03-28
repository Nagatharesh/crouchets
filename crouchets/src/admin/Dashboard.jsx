import React from 'react';
import { useOrders } from '../context/OrderContext';
import { useProducts } from '../context/ProductContext';
import { ShoppingCart, DollarSign, RotateCcw, Users } from 'lucide-react';

export const Dashboard = () => {
  const { orders } = useOrders();
  const { products } = useProducts();

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const totalRevenue = deliveredOrders.reduce((acc, o) => acc + o.total, 0);
  const pendingReturns = orders.filter(o => o.returnRequested && o.refundStatus === 'pending').length;
  
  // Get unique customers (users & guests)
  const uniqueCustomers = new Set(orders.map(o => o.userId)).size;

  const stats = [
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: <DollarSign size={24} className="text-teal" />, bg: 'bg-teal/10' },
    { title: 'Total Orders', value: totalOrders, icon: <ShoppingCart size={24} className="text-blue-500" />, bg: 'bg-blue-500/10' },
    { title: 'Pending Returns', value: pendingReturns, icon: <RotateCcw size={24} className="text-red" />, bg: 'bg-red/10' },
    { title: 'Total Customers', value: uniqueCustomers, icon: <Users size={24} className="text-orange-500" />, bg: 'bg-orange-500/10' },
  ];

  return (
    <div>
      <h1 className="font-playfair text-4xl font-bold text-dark mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-warm/30 flex items-center gap-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-mid mb-1">{stat.title}</p>
              <h3 className="font-playfair text-3xl font-bold text-dark">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 border border-warm/30 shadow-sm">
         <h2 className="font-playfair text-2xl font-bold text-dark mb-6">Recent Orders</h2>
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="border-b border-warm/50 text-mid uppercase text-xs tracking-widest">
                 <th className="py-4 px-4 font-bold">Order ID</th>
                 <th className="py-4 px-4 font-bold">Customer</th>
                 <th className="py-4 px-4 font-bold">Status</th>
                 <th className="py-4 px-4 font-bold">Total</th>
               </tr>
             </thead>
             <tbody>
               {orders.slice(0, 5).map(o => (
                 <tr key={o.id} className="border-b border-warm/20 hover:bg-warm/10 transition-colors">
                   <td className="py-4 px-4 font-medium text-dark">{o.id}</td>
                   <td className="py-4 px-4 text-mid">{o.customerDetails?.name || 'Guest'}</td>
                   <td className="py-4 px-4">
                     <span className="px-3 py-1 bg-teal/10 text-teal text-xs font-bold rounded-lg uppercase tracking-wider">
                       {o.status.replace('_', ' ')}
                     </span>
                   </td>
                   <td className="py-4 px-4 font-bold text-dark">₹{o.total}</td>
                 </tr>
               ))}
               {orders.length === 0 && (
                 <tr><td colSpan="4" className="py-8 text-center text-mid">No orders yet.</td></tr>
               )}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};
