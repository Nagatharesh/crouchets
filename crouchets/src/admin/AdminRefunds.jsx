import React from 'react';
import { useOrders } from '../context/OrderContext';

export const AdminRefunds = () => {
  const { orders, updateRefundStatus } = useOrders();

  // orders with return requested
  const returnOrders = orders.filter(o => o.returnRequested);

  return (
    <div>
      <h1 className="font-playfair text-4xl font-bold text-dark mb-8">Returns & Refunds</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-warm/30 overflow-hidden">
        <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse min-w-[900px]">
             <thead className="bg-warm/20 border-b border-warm/50">
               <tr className="text-mid uppercase text-xs tracking-widest">
                 <th className="py-4 px-6 font-bold">Order ID</th>
                 <th className="py-4 px-6 font-bold">Reason</th>
                 <th className="py-4 px-6 font-bold">Amount</th>
                 <th className="py-4 px-6 font-bold">Status</th>
                 <th className="py-4 px-6 font-bold text-right">Actions</th>
               </tr>
             </thead>
             <tbody>
               {returnOrders.map(order => (
                 <tr key={order.id} className="border-b border-warm/20 hover:bg-warm/5 transition-colors">
                   <td className="py-4 px-6">
                     <p className="font-bold text-dark">{order.id}</p>
                     <p className="text-xs text-mid">{order.customerDetails?.name}</p>
                   </td>
                   <td className="py-4 px-6">
                     <span className="bg-red/10 text-red px-3 py-1 rounded-md text-xs font-bold">{order.returnReason || 'Unknown'}</span>
                   </td>
                   <td className="py-4 px-6 font-bold text-dark">₹{order.total}</td>
                   <td className="py-4 px-6">
                     <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                        order.refundStatus === 'pending' ? 'bg-orange-100 text-orange-600' :
                        order.refundStatus === 'approved' ? 'bg-blue-100 text-blue-600' :
                        order.refundStatus === 'rejected' ? 'bg-slate-100 text-slate-600' :
                        'bg-teal/10 text-teal'
                     }`}>
                       {order.refundStatus}
                     </span>
                   </td>
                   <td className="py-4 px-6 text-right space-x-2">
                     {order.refundStatus === 'pending' && (
                       <>
                         <button onClick={() => updateRefundStatus(order.id, 'approved')} className="text-xs bg-dark text-white px-3 py-1.5 rounded uppercase font-bold hover:bg-black transition-colors">Approve</button>
                         <button onClick={() => updateRefundStatus(order.id, 'rejected')} className="text-xs border text-dark px-3 py-1.5 rounded uppercase font-bold hover:bg-warm/50 transition-colors">Reject</button>
                       </>
                     )}
                     {order.refundStatus === 'approved' && (
                         <button onClick={() => updateRefundStatus(order.id, 'refunded')} className="text-xs bg-teal text-white px-3 py-1.5 rounded uppercase font-bold shadow-md hover:bg-teal-600 transition-colors">Mark Refunded</button>
                     )}
                   </td>
                 </tr>
               ))}
               {returnOrders.length === 0 && (
                 <tr><td colSpan="5" className="py-12 text-center text-mid">No return requests found.</td></tr>
               )}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};
