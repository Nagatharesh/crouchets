import React from 'react';
import { useOrders } from '../context/OrderContext';
import { DollarSign, TrendingUp } from 'lucide-react';

export const AdminRevenue = () => {
  const { orders } = useOrders();

  // Revenue is only from delivered orders
  const validOrders = orders.filter(o => o.status === 'delivered');
  const totalRev = validOrders.reduce((sum, o) => sum + o.total, 0);
  const totalCount = validOrders.length;
  const avgOrderValue = totalCount > 0 ? (totalRev / totalCount).toFixed(2) : 0;

  return (
    <div>
      <h1 className="font-playfair text-4xl font-bold text-dark mb-8">Revenue Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-teal/10 p-8 rounded-3xl border border-teal/20 text-center flex flex-col items-center justify-center">
           <DollarSign size={32} className="text-teal mb-2" />
           <p className="text-sm font-bold uppercase tracking-widest text-teal mb-2">Net Revenue</p>
           <h3 className="font-playfair text-5xl font-bold text-dark">₹{totalRev.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-warm/30 text-center flex flex-col items-center justify-center">
           <TrendingUp size={32} className="text-blue-500 mb-2" />
           <p className="text-sm font-bold uppercase tracking-widest text-mid mb-2">Valid Orders</p>
           <h3 className="font-playfair text-5xl font-bold text-dark">{totalCount}</h3>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-warm/30 text-center flex flex-col items-center justify-center">
           <p className="text-sm font-bold uppercase tracking-widest text-mid mb-2">Average Order Value</p>
           <h3 className="font-playfair text-5xl font-bold text-dark">₹{avgOrderValue}</h3>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-warm/30 shadow-sm">
         <h2 className="font-playfair text-2xl font-bold text-dark mb-6">Completed Transactions</h2>
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse min-w-[600px]">
             <thead>
               <tr className="border-b border-warm/50 text-mid uppercase text-xs tracking-widest">
                 <th className="py-4 px-4 font-bold">Order ID</th>
                 <th className="py-4 px-4 font-bold">Date Delivered</th>
                 <th className="py-4 px-4 font-bold text-right">Amount</th>
               </tr>
             </thead>
             <tbody>
               {validOrders.map(o => {
                 const deliveryStep = o.trackingSteps.find(s => s.label === 'Delivered');
                 const date = deliveryStep?.date ? new Date(deliveryStep.date).toLocaleDateString() : 'Unknown';
                 return (
                   <tr key={o.id} className="border-b border-warm/20 hover:bg-warm/5 transition-colors">
                     <td className="py-4 px-4 font-mono text-sm">{o.id}</td>
                     <td className="py-4 px-4 text-mid">{date}</td>
                     <td className="py-4 px-4 font-bold text-teal text-right">₹{o.total}</td>
                   </tr>
                 );
               })}
               {validOrders.length === 0 && (
                 <tr><td colSpan="3" className="py-12 text-center text-mid">No completed transactions yet.</td></tr>
               )}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};
